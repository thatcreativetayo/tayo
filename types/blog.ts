export interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  likes: number;
  createdAt: Date;
  replies?: Comment[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  body: string; // HTML content from Tiptap
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: Comment[];
  shares: number;
  reads: number;
  readTime: number; // in minutes
}
