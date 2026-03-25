/**
 * Firestore collections for the Community window.
 *
 * `visitorCommunityPosts` — visitor messages (unified wall).
 * `visitorCommunityThumbs` — one doc per thumbs-up (optional display name).
 *
 * Deploy rules from the repo root file `firestore.rules` (Firebase CLI:
 * `firebase deploy --only firestore:rules`) or paste into Console → Firestore → Rules.
 * **allow read: if true** on both collections is what makes thumbs/messages visible to all visitors.
 *
 * Example rules (same as firestore.rules):
 *
 *   match /visitorCommunityPosts/{id} {
 *     allow read: if true;
 *     allow create: if request.resource.data.keys().hasAll(['type','displayName','message','createdAt'])
 *       && request.resource.data.type in ['feedback','recommendation','post']
 *       && request.resource.data.message is string
 *       && request.resource.data.message.size() > 0
 *       && request.resource.data.message.size() < 2000;
 *     allow update, delete: if false;
 *   }
 *   match /visitorCommunityThumbs/{id} {
 *     allow read: if true;
 *     allow create: if request.resource.data.keys().hasAll(['displayName','createdAt'])
 *       && request.resource.data.displayName is string
 *       && request.resource.data.displayName.size() < 120;
 *     allow update, delete: if false;
 *   }
 */
export const VISITOR_POSTS_COLLECTION = "visitorCommunityPosts";
export const VISITOR_THUMBS_COLLECTION = "visitorCommunityThumbs";

/** Legacy + unified post type (new writes use `post`). */
export type VisitorPostType = "feedback" | "recommendation" | "post";

export type VisitorPost = {
  id: string;
  type: VisitorPostType;
  displayName: string;
  role?: string;
  message: string;
  createdAt: { seconds: number; nanoseconds: number } | null;
};

export type ThumbEntry = {
  id: string;
  displayName: string;
  createdAt: { seconds: number; nanoseconds: number } | null;
};
