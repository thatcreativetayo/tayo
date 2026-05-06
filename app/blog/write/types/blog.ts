export interface BlogPostDraft {
  title: string;
  description: string;
  body: string;
  tags: string[];
  coverImage?: string;
}

export type SaveStatus = 'unsaved' | 'saving' | 'saved';

export interface SavedDraft extends BlogPostDraft {
  savedAt: string; // ISO string
}
