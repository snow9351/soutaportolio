import React, { useState, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

const MESSAGE_MIN_LENGTH = 5;
const MESSAGE_MAX_LENGTH = 5000;

function formatEmailJsError(err: unknown): string {
  // EmailJS rejects with EmailJSResponseStatus { status, text } (often logs as {} in DevTools)
  if (
    err &&
    typeof err === "object" &&
    "status" in err &&
    typeof (err as { text?: unknown }).text === "string"
  ) {
    const { status, text } = err as { status: number; text: string };
    const raw = text.trim();
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { message?: string; text?: string };
        return parsed.message || parsed.text || raw;
      } catch {
        return raw.length > 200 ? `${raw.slice(0, 200)}…` : raw;
      }
    }
    return `Request failed (${status}). Check EmailJS dashboard (template variables, service, limits).`;
  }
  if (err instanceof Error && err.message) return err.message;
  return "Unknown error";
}

export default function Gedit() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  /** When checked, success banner stays visible while editing fields (errors still clear on edit). */
  const [keepSuccessFeedback, setKeepSuccessFeedback] = useState(false);

  useEffect(() => {
    const userId = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (userId) {
      emailjs.init(userId);
    }
  }, []);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const nameOk = name.trim().length >= 1;
  const emailOk = isValidEmail(email.trim());
  const messageOk =
    message.trim().length >= MESSAGE_MIN_LENGTH &&
    message.trim().length <= MESSAGE_MAX_LENGTH;
  const canSend = nameOk && emailOk && messageOk && !loading;

  const sendMessage = useCallback(async () => {
    setStatus("idle");
    setStatusMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length === 0) {
      setStatus("error");
      setStatusMessage("Please enter your name so I know who to reply to.");
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setStatus("error");
      setStatusMessage(
        "Please enter a valid email address (e.g. you@example.com)."
      );
      return;
    }
    if (trimmedMessage.length < MESSAGE_MIN_LENGTH) {
      setStatus("error");
      setStatusMessage(
        `Your message should be at least ${MESSAGE_MIN_LENGTH} characters.`
      );
      return;
    }
    if (trimmedMessage.length > MESSAGE_MAX_LENGTH) {
      setStatus("error");
      setStatusMessage(`Message is too long (max ${MESSAGE_MAX_LENGTH} characters).`);
      return;
    }

    try {
      setLoading(true);
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();

      if (!publicKey || !serviceId || !templateId) {
        setStatus("error");
        setStatusMessage(
          process.env.NODE_ENV === "development"
            ? "EmailJS isn’t set up: add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, NEXT_PUBLIC_EMAILJS_SERVICE_ID, and NEXT_PUBLIC_EMAILJS_TEMPLATE_ID to .env.local (see README), then restart the dev server."
            : "Contact form isn’t configured yet. Please use LinkedIn or email from the About page."
        );
        return;
      }

      // Every key here becomes {{key}} in your EmailJS template — names must match exactly.
      const templateParams = {
        // Sender name (use any of these in the template)
        title: trimmedName,
        name: trimmedName,
        sender_name: trimmedName,
        from_name: trimmedName,
        full_name: trimmedName,
        // Contact & message
        email: trimmedEmail,
        reply_to: trimmedEmail,
        user_email: trimmedEmail,
        message: trimmedMessage,
        body: trimmedMessage,
        content: trimmedMessage,
        from_message: trimmedMessage,
        subject: trimmedSubject || "Portfolio contact form",
        from_subject: trimmedSubject || "Portfolio contact form",
      };
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      setStatus("success");
      setStatusMessage(
        "Thanks! Your message was sent. I’ll get back to you as soon as I can."
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      const detail = formatEmailJsError(err);
      console.error("[EmailJS]", detail, err);
      setStatus("error");
      setStatusMessage(
        process.env.NODE_ENV === "development"
          ? `Could not send: ${detail}`
          : "Something went wrong sending your message. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  }, [name, email, subject, message]);

  const remaining = MESSAGE_MAX_LENGTH - message.length;

  const clearFeedbackOnEdit = () => {
    if (status === "idle") return;
    if (status === "success" && keepSuccessFeedback) return;
    setStatus("idle");
    setStatusMessage("");
  };

  return (
    <div className="w-full flex-1 relative flex flex-col bg-gradient-to-b from-[#2d333b] to-[#1e2329] text-gray-100 select-none overflow-hidden">
      {/* Header */}
      <header className="shrink-0 border-b border-white/10 bg-black/25">
        <div className="px-4 py-2 md:px-6 md:py-2.5">
          <div className="mx-auto flex w-full max-w-lg justify-start">
            <div className="flex min-w-0 w-full items-start gap-3 sm:gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/20 text-orange-300 md:h-11 md:w-11">
                <Mail className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h1 className="text-lg font-bold text-white tracking-tight sm:text-xl">
                  Contact me
                </h1>
                <p className="mt-1 max-w-xl text-sm leading-snug text-gray-400 md:text-base">
                  Send a quick note—I usually respond within a couple of days. All
                  fields marked below are required except subject.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Status banner */}
      {status !== "idle" && statusMessage ? (
        <div
          role="alert"
          aria-live="polite"
          className={`shrink-0 border-b py-2.5 text-sm ${
            status === "error"
              ? "bg-red-950/50 text-red-100 border-red-500/30"
              : "bg-emerald-950/45 text-emerald-100 border-emerald-500/30"
          }`}
        >
          <div className="px-4 md:px-6">
            <div className="mx-auto flex w-full max-w-lg items-start gap-2">
              {status === "error" ? (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              )}
              <span>{statusMessage}</span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Form */}
      <div className="flex-1 overflow-y-auto custom-scrollbar windowMainScreen px-4 py-3 md:px-6 md:py-4">
        <form
          className="mx-auto flex max-w-lg w-full flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage();
          }}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4">
            <div className="space-y-1.5 min-w-0">
              <label
                htmlFor="sender-name"
                className="block text-xs font-medium uppercase tracking-wide text-gray-400"
              >
                Your name <span className="text-orange-400">*</span>
              </label>
              <input
                id="sender-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setStatusMessage("");
                  }
                }}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/25"
                placeholder="Jane Doe"
                spellCheck={false}
                autoComplete="name"
                type="text"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5 min-w-0">
              <label
                htmlFor="sender-email"
                className="block text-xs font-medium uppercase tracking-wide text-gray-400"
              >
                Email <span className="text-orange-400">*</span>
              </label>
              <input
                id="sender-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFeedbackOnEdit();
                }}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/25"
                placeholder="you@example.com"
                spellCheck={false}
                autoComplete="email"
                type="email"
                disabled={loading}
              />
              {email.length > 0 && !emailOk ? (
                <p className="text-xs text-amber-400/90">
                  That doesn’t look like a valid email yet.
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="sender-subject"
              className="block text-xs font-medium uppercase tracking-wide text-gray-400"
            >
              Subject <span className="text-gray-500 normal-case">(optional)</span>
            </label>
            <input
              id="sender-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/25"
              placeholder="e.g. Collaboration, question about your work…"
              spellCheck={true}
              autoComplete="off"
              type="text"
              disabled={loading}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="sender-message"
              className="block text-xs font-medium uppercase tracking-wide text-gray-400"
            >
              Message <span className="text-orange-400">*</span>
            </label>
            <textarea
              id="sender-message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                clearFeedbackOnEdit();
              }}
              rows={5}
              className="w-full min-h-[120px] resize-y rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/25"
              placeholder={`What would you like to say? (at least ${MESSAGE_MIN_LENGTH} characters)`}
              spellCheck={true}
              autoComplete="off"
              disabled={loading}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
              <span>
                {message.trim().length < MESSAGE_MIN_LENGTH
                  ? `${MESSAGE_MIN_LENGTH - message.trim().length} more characters needed`
                  : "Looks good to send"}
              </span>
              <span className={remaining < 200 ? "text-amber-400" : ""}>
                {message.length} / {MESSAGE_MAX_LENGTH}
              </span>
            </div>
          </div>

          <div className="mt-1 flex flex-col gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="order-2 space-y-3 sm:order-1 sm:max-w-[55%]">
              <p className="text-xs leading-relaxed text-gray-500">
                Tip: include how I can best reach you and what timezone you’re in.
              </p>
              <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-400">
                <input
                  type="checkbox"
                  checked={keepSuccessFeedback}
                  onChange={(e) => setKeepSuccessFeedback(e.target.checked)}
                  className="mt-0.5 size-3.5 shrink-0 rounded border-white/30 bg-black/40 text-orange-600 focus:ring-orange-500/50"
                />
                <span>
                  Keep the “sent successfully” message visible while I edit the form
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={!canSend}
              className="order-1 sm:order-2 inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none sm:ml-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden />
                  Send message
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-black/20"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
