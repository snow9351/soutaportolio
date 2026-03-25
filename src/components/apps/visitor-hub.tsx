"use client";

import db, { isFirebaseConfigured } from "@/components/utils/firebase";
import {
  VISITOR_POSTS_COLLECTION,
  VISITOR_THUMBS_COLLECTION,
  type VisitorPost,
  type VisitorPostType,
  type ThumbEntry,
} from "@/config/community";
import {
  addDoc,
  collection,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Send,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ThumbsUp,
} from "lucide-react";

const MESSAGE_MAX = 1800;
const MESSAGE_MIN = 4;
/** Shown total is never below this; each saved thumbs-up adds one on top. */
const THUMB_DISPLAY_BASE = 43;

function toTimestampSeconds(val: unknown): { seconds: number; nanoseconds: number } | null {
  if (val instanceof Timestamp) {
    return { seconds: val.seconds, nanoseconds: val.nanoseconds };
  }
  if (
    val &&
    typeof val === "object" &&
    "seconds" in val &&
    typeof (val as { seconds: unknown }).seconds === "number"
  ) {
    const s = val as { seconds: number; nanoseconds?: number };
    return { seconds: s.seconds, nanoseconds: s.nanoseconds ?? 0 };
  }
  return null;
}

function mapPost(id: string, data: Record<string, unknown>): VisitorPost | null {
  const type = data.type as VisitorPostType;
  if (type !== "feedback" && type !== "recommendation" && type !== "post") {
    return null;
  }
  const message = typeof data.message === "string" ? data.message : "";
  const displayName =
    typeof data.displayName === "string" ? data.displayName : "Visitor";
  const role = typeof data.role === "string" ? data.role : undefined;
  const createdAt = toTimestampSeconds(data.createdAt);
  return { id, type, displayName, role, message, createdAt };
}

function mapThumb(id: string, data: Record<string, unknown>): ThumbEntry | null {
  const displayName =
    typeof data.displayName === "string" ? data.displayName : "Someone";
  const createdAt = toTimestampSeconds(data.createdAt);
  return { id, displayName, createdAt };
}

function formatDate(ts: { seconds: number } | null): string {
  if (!ts?.seconds) return "";
  try {
    return new Date(ts.seconds * 1000).toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return "";
  }
}

export default function VisitorHub() {
  const [posts, setPosts] = useState<VisitorPost[]>([]);
  const [thumbs, setThumbs] = useState<ThumbEntry[]>([]);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [thumbsError, setThumbsError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "ok" | "err">("idle");
  const [formHint, setFormHint] = useState("");

  const [thumbSubmitting, setThumbSubmitting] = useState(false);
  const [thumbSaveNotice, setThumbSaveNotice] = useState<string | null>(null);
  const [thumbActionError, setThumbActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) return;
    const q = query(
      collection(db, VISITOR_POSTS_COLLECTION),
      orderBy("createdAt", "desc"),
      limit(80)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setPostsError(null);
        const next: VisitorPost[] = [];
        snap.forEach((docSnap) => {
          const m = mapPost(docSnap.id, docSnap.data() as Record<string, unknown>);
          if (m) next.push(m);
        });
        setPosts(next);
      },
      (err) => {
        console.error("[visitor-hub] posts:", err);
        setPostsError(
          "Could not load messages. Check Firestore rules and Firebase config."
        );
        setPosts([]);
      }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db) return;
    // No limit — load every saved thumbs-up so all visitors see the full list.
    const q = query(
      collection(db, VISITOR_THUMBS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setThumbsError(null);
        const next: ThumbEntry[] = [];
        snap.forEach((docSnap) => {
          const t = mapThumb(docSnap.id, docSnap.data() as Record<string, unknown>);
          if (t) next.push(t);
        });
        setThumbs(next);
      },
      (err) => {
        console.error("[visitor-hub] thumbs:", err);
        setThumbsError(
          "Could not load thumbs up. Add Firestore rules for visitorCommunityThumbs."
        );
        setThumbs([]);
      }
    );
    return () => unsub();
  }, []);

  const thumbRecordedCount = thumbs.length;
  const thumbDisplayTotal = THUMB_DISPLAY_BASE + thumbRecordedCount;

  const sortedPosts = useMemo(
    () =>
      [...posts].sort((a, b) => {
        const ta = a.createdAt?.seconds ?? 1;
        const tb = b.createdAt?.seconds ?? 1;
        return tb - ta;
      }),
    [posts]
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("idle");
    setFormHint("");
    const trimmed = message.trim();
    if (trimmed.length < MESSAGE_MIN) {
      setFormStatus("err");
      setFormHint(`Please write at least ${MESSAGE_MIN} characters.`);
      return;
    }
    if (trimmed.length > MESSAGE_MAX) {
      setFormStatus("err");
      setFormHint(`Message is too long (max ${MESSAGE_MAX} characters).`);
      return;
    }
    if (!db) {
      setFormStatus("err");
      setFormHint(
        "Community is not connected. Add Firebase keys to .env.local (see Project settings in Firebase Console)."
      );
      return;
    }
    const firestore = db;
    try {
      setSubmitting(true);
      await addDoc(collection(firestore, VISITOR_POSTS_COLLECTION), {
        type: "post" as VisitorPostType,
        displayName: displayName.trim() || "Anonymous",
        role: role.trim() || "",
        message: trimmed,
        createdAt: serverTimestamp(),
      });
      setFormStatus("ok");
      setFormHint("Posted! Thanks for sharing.");
      setMessage("");
      setRole("");
    } catch (err) {
      console.error(err);
      setFormStatus("err");
      setFormHint("Could not save. Check Firestore rules for community posts.");
    } finally {
      setSubmitting(false);
    }
  };

  const addThumb = async () => {
    setThumbActionError(null);
    setThumbSaveNotice(null);
    if (!db) {
      setThumbActionError(
        "Community is not connected. Add Firebase keys to .env.local."
      );
      return;
    }
    const firestore = db;
    try {
      setThumbSubmitting(true);
      const ref = await addDoc(collection(firestore, VISITOR_THUMBS_COLLECTION), {
        displayName: "Anonymous",
        createdAt: serverTimestamp(),
      });
      const saved = await getDoc(ref);
      if (!saved.exists()) {
        throw new Error("Thumb write did not persist");
      }
      setThumbSaveNotice(
        "Saved to the cloud — everyone who opens Community sees this list and count."
      );
      window.setTimeout(() => setThumbSaveNotice(null), 6000);
    } catch (err) {
      console.error(err);
      setThumbActionError("Could not save thumbs up. Check Firestore rules.");
    } finally {
      setThumbSubmitting(false);
    }
  };

  return (
    <div className="windowMainScreen flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-[#2d333b] to-[#1e2329] text-gray-100">
      <header className="shrink-0 border-b border-white/10 bg-black/25 px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Sparkles className="size-5 shrink-0 text-orange-300" aria-hidden />
          <div>
            <h1 className="text-lg font-bold text-white md:text-xl">Community</h1>
            <p className="text-xs text-gray-400 md:text-sm">
              Leave a thumbs up and read or post messages.
            </p>
          </div>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-5">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {!isFirebaseConfigured || !db ? (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-950/40 px-4 py-4 text-sm text-amber-100">
              <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div className="space-y-2">
                <p className="font-medium text-amber-50">Community needs Firebase configuration</p>
                <p className="text-amber-100/90">
                  Add these to <code className="rounded bg-black/30 px-1 py-0.5 text-xs">.env.local</code>{" "}
                  (values from Firebase Console → Project settings → Your apps → web app), then restart the dev server:
                </p>
                <ul className="list-inside list-disc text-xs text-amber-100/80">
                  <li>NEXT_PUBLIC_APIKEY</li>
                  <li>NEXT_PUBLIC_AUTHDOMAIN</li>
                  <li>NEXT_PUBLIC_PROJECTID</li>
                  <li>NEXT_PUBLIC_STORAGEBUCKET</li>
                  <li>NEXT_PUBLIC_MESSAGINGSENDERID</li>
                  <li>NEXT_PUBLIC_APPID</li>
                  <li>NEXT_PUBLIC_MEASUREMENTID (optional)</li>
                </ul>
              </div>
            </div>
          ) : null}

          {/* Thumbs up */}
          <section className="rounded-xl border border-white/10 bg-black/25 p-4">
            {thumbSaveNotice ? (
              <div className="mb-3 flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-100">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                <span>{thumbSaveNotice}</span>
              </div>
            ) : null}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => void addThumb()}
                disabled={thumbSubmitting || !db}
                className="inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-orange-600/30 px-4 py-3 text-base font-semibold text-orange-100 transition hover:bg-orange-600/50 disabled:opacity-50"
              >
                {thumbSubmitting ? (
                  <Loader2 className="size-6 animate-spin" aria-hidden />
                ) : (
                  <ThumbsUp className="size-6" aria-hidden />
                )}
                Thumbs up
              </button>
              <div className="text-sm text-gray-300">
                <span className="text-2xl font-bold text-white">{thumbDisplayTotal}</span>
                <span className="ml-2">total</span>
              </div>
            </div>

            {thumbActionError ? (
              <p className="mt-2 text-sm text-red-300">{thumbActionError}</p>
            ) : null}

            {thumbsError ? (
              <p className="mt-2 text-sm text-amber-200">{thumbsError}</p>
            ) : null}

            
          </section>

          {/* All messages */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
              All feedback &amp; messages ({7})
            </h2>
            {postsError ? (
              <div className="mb-3 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-2 text-sm text-amber-100">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{postsError}</span>
              </div>
            ) : null}
          </section>

          {/* New message */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
              Write a message
            </h2>
            <form
              onSubmit={submitPost}
              className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-gray-400">
                    Your name (optional)
                  </label>
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500/40"
                    placeholder="Jane Doe"
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-400">
                    Role / company (optional)
                  </label>
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500/40"
                    placeholder="Engineer · ACME"
                    disabled={submitting || !db}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">
                  Message <span className="text-orange-400">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full resize-y rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500/40"
                  placeholder="Feedback, idea, or shout-out—anything you’d like to share publicly."
                  disabled={submitting || !db}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {message.length} / {MESSAGE_MAX}
                </p>
              </div>

              {formStatus !== "idle" && formHint ? (
                <div
                  className={
                    "flex items-start gap-2 text-sm " +
                    (formStatus === "ok" ? "text-emerald-300" : "text-red-300")
                  }
                >
                  {formStatus === "ok" ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  ) : (
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  )}
                  <span>{formHint}</span>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitting || !db}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-500 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Posting…
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Post message
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
