'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Heart,
  Comment,
  Share08FreeIcons,
  Bookmark01FreeIcons,
  Loading03Icon,
  Copy01FreeIcons,
  NewTwitterIcon,
  Cancel01FreeIcons,
} from '@hugeicons/core-free-icons';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getBlogBySlug, likeBlog, shareBlog, addComment, likeComment, addReply } from '@/lib/api';
import Contact from '@/components/sections/Contact';
import '@/app/blog/write/styles/prose.css';

interface Reply {
  _id: string;
  author: string;
  content: string;
  likes: number;
  createdAt: string;
}

interface CommentType {
  _id: string;
  author: string;
  content: string;
  likes: number;
  createdAt: string;
  replies: Reply[];
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  body: string;
  tags: string[];
  coverImage?: string;
  createdAt: string;
  likes: number;
  comments: CommentType[];
  shares: number;
  reads: number;
  author: string;
}

// ── Share Modal ────────────────────────────────────────────────────────────────

function ShareModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      label: 'Copy link',
      icon: Copy01FreeIcons,
      action: copy,
      active: copied,
      activeLabel: 'Copied!',
    },
    {
      label: 'Share on X',
      icon: NewTwitterIcon,
      action: () => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      label: 'Share on WhatsApp',
      icon: null,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank'),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 px-4" onClick={onClose}>
      <motion.div
        className="bg-white rounded-2xl w-full max-w-sm p-5 mb-4 sm:mb-0"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base text-sm">Share this post</h3>
          <button onClick={onClose} className="text-base/40 hover:text-base transition-colors">
            <HugeiconsIcon icon={Cancel01FreeIcons} size={18} />
          </button>
        </div>

        {/* URL preview */}
        <div className="bg-neutral-50 rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
          <span className="text-xs text-neutral-400 truncate flex-1">{url}</span>
        </div>

        <div className="space-y-2">
          {shareOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={opt.action}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                {opt.icon ? (
                  <HugeiconsIcon icon={opt.icon} size={16} className="text-base" />
                ) : (
                  <span className="text-sm">💬</span>
                )}
              </div>
              <span className="text-sm text-base font-medium">
                {opt.active ? opt.activeLabel : opt.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ── Comment Item ───────────────────────────────────────────────────────────────

function CommentItem({
  comment,
  slug,
  onUpdate,
}: {
  comment: CommentType;
  slug: string;
  onUpdate: (comments: CommentType[]) => void;
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [likedComment, setLikedComment] = useState(false);

  const handleLike = async () => {
    try {
      const res = await likeComment(slug, comment._id);
      if (res.success) {
        setLikedComment(true);
        onUpdate(res.data);
      }
    } catch {}
  };

  const handleReply = async () => {
    if (!replyText.trim() || !replyAuthor.trim()) return;
    setSubmitting(true);
    try {
      const res = await addReply(slug, comment._id, replyAuthor, replyText);
      if (res.success) {
        onUpdate(res.data);
        setReplyText('');
        setReplyAuthor('');
        setShowReply(false);
      }
    } catch {}
    finally { setSubmitting(false); }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-base/10 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-base">
          {comment.author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="bg-neutral-50 rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="text-xs font-semibold text-base mb-1">{comment.author}</p>
            <p className="text-sm text-base/80 leading-relaxed">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-1.5 px-1">
            <span className="text-xs text-base/40">
              {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs transition-colors ${likedComment ? 'text-red-500' : 'text-base/40 hover:text-red-400'}`}
            >
              <HugeiconsIcon icon={Heart} size={13} />
              <span>{comment.likes}</span>
            </button>
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-xs text-base/40 hover:text-base transition-colors font-medium"
            >
              Reply
            </button>
          </div>

          {/* Reply input */}
          <AnimatePresence>
            {showReply && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-2"
              >
                <input
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  placeholder="Your name"
                  className="w-full text-sm px-3 py-2 border border-base/15 rounded-xl focus:outline-none focus:border-base/30 bg-white"
                />
                <div className="flex gap-2">
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleReply(); }}
                    placeholder={`Reply to ${comment.author}...`}
                    className="flex-1 text-sm px-3 py-2 border border-base/15 rounded-xl focus:outline-none focus:border-base/30 bg-white"
                  />
                  <button
                    onClick={handleReply}
                    disabled={submitting || !replyText.trim() || !replyAuthor.trim()}
                    className="px-4 py-2 bg-base text-white text-xs font-medium rounded-xl disabled:opacity-40 hover:bg-base/80 transition-colors"
                  >
                    {submitting ? '...' : 'Send'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replies */}
          {comment.replies?.length > 0 && (
            <div className="mt-3 space-y-2 pl-2 border-l-2 border-base/5">
              {comment.replies.map((reply) => (
                <div key={reply._id} className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-base/5 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-base/60">
                    {reply.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="bg-neutral-50 rounded-2xl rounded-tl-sm px-3 py-2">
                      <p className="text-xs font-semibold text-base mb-0.5">{reply.author}</p>
                      <p className="text-xs text-base/70 leading-relaxed">{reply.content}</p>
                    </div>
                    <p className="text-xs text-base/30 mt-1 px-1">
                      {new Date(reply.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [cleanBody, setCleanBody] = useState('');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getBlogBySlug(slug);
        if (response.success) {
          setPost(response.data);
          const DOMPurify = (await import('dompurify')).default;
          setCleanBody(DOMPurify.sanitize(response.data.body));
        }
      } catch {
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleLike = async () => {
    if (!post) return;
    try {
      const response = await likeBlog(slug);
      if (response.success) {
        setPost({ ...post, likes: response.data.likes });
        setLiked(!liked);
      }
    } catch {}
  };

  const handleShare = async () => {
    if (!post) return;
    try {
      await shareBlog(slug);
      setPost((p) => p ? { ...p, shares: p.shares + 1 } : p);
    } catch {}
    setShowShare(true);
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim() || !commentAuthor.trim() || !post) return;
    setSubmittingComment(true);
    try {
      const response = await addComment(slug, commentAuthor, commentText);
      if (response.success) {
        setPost({ ...post, comments: response.data });
        setCommentText('');
        setCommentAuthor('');
      }
    } catch {}
    finally { setSubmittingComment(false); }
  };

  const handleCommentsUpdate = (comments: CommentType[]) => {
    if (!post) return;
    setPost({ ...post, comments });
  };

  const calculateReadTime = (body: string) =>
    Math.ceil(body.replace(/<[^>]*>/g, '').split(/\s+/).length / 200);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfbfb] flex items-center justify-center">
        <HugeiconsIcon icon={Loading03Icon} size={48} className="text-base/40 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fbfbfb] flex items-center justify-center">
        <p className="text-xl text-base/50">Post not found</p>
      </div>
    );
  }

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <Navbar />

      <article className="max-w-3xl pt-32 mx-auto px-4 sm:px-6 py-12">
        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-base mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          {post.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg sm:text-xl text-base/70 mb-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        >
          {post.description}
        </motion.p>

        {/* Meta */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-base/10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center gap-2 text-sm text-base/60">
            <span className="font-medium">{post.author}</span>
            <span>·</span>
            <span>{calculateReadTime(post.body)} min read</span>
            <span>·</span>
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>·</span>
            <span>{post.reads.toLocaleString()} reads</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${liked ? 'text-red-500' : 'text-base/40 hover:text-base'}`}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >
              <HugeiconsIcon icon={Heart} size={22} />
            </motion.button>
            <motion.button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-full transition-colors ${bookmarked ? 'text-base' : 'text-base/40 hover:text-base'}`}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >
              <HugeiconsIcon icon={Bookmark01FreeIcons} size={22} />
            </motion.button>
            <motion.button
              onClick={handleShare}
              className="p-2 rounded-full text-base/40 hover:text-base transition-colors"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >
              <HugeiconsIcon icon={Share08FreeIcons} size={22} />
            </motion.button>
          </div>
        </motion.div>

        {/* Cover Image */}
        {post.coverImage && (
          <motion.div
            className="w-full h-72 sm:h-96 mb-12 rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

        {/* Body */}
        <motion.div
          className="tayo-prose mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          dangerouslySetInnerHTML={{ __html: cleanBody }}
        />

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
        >
          {post.tags.map((tag) => (
            <span key={tag} className="bg-base/5 text-base px-4 py-2 rounded-full text-sm font-medium hover:bg-base/10 transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Engagement bar */}
        <motion.div
          className="flex items-center gap-6 py-5 border-y border-base/10 mb-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${liked ? 'text-red-500' : 'text-base/50 hover:text-base'}`}
          >
            <HugeiconsIcon icon={Heart} size={20} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-2 transition-colors ${showComments ? 'text-base' : 'text-base/50 hover:text-base'}`}
          >
            <HugeiconsIcon icon={Comment} size={20} />
            <span className="text-sm font-medium">{post.comments.length}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-base/50 hover:text-base transition-colors"
          >
            <HugeiconsIcon icon={Share08FreeIcons} size={20} />
            <span className="text-sm font-medium">{post.shares}</span>
          </button>
        </motion.div>

        {/* Comments */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg font-bold text-base mb-6">
                {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
              </h3>

              {/* New comment form */}
              <div className="mb-8 space-y-3">
                <input
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="Your name"
                  className="w-full text-sm px-4 py-3 border border-base/15 rounded-xl focus:outline-none focus:border-base/30 bg-white"
                />
                <div className="flex gap-2">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={3}
                    className="flex-1 text-sm px-4 py-3 border border-base/15 rounded-xl focus:outline-none focus:border-base/30 resize-none bg-white"
                  />
                </div>
                <div className="flex justify-end">
                  <motion.button
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim() || !commentAuthor.trim() || submittingComment}
                    className="px-5 py-2 bg-base text-white rounded-full text-sm font-semibold disabled:opacity-40 flex items-center gap-2 hover:bg-base/80 transition-colors"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  >
                    {submittingComment && <HugeiconsIcon icon={Loading03Icon} size={14} className="animate-spin" />}
                    {submittingComment ? 'Posting...' : 'Post comment'}
                  </motion.button>
                </div>
              </div>

              {/* Comment list */}
              <div className="space-y-6">
                {post.comments.length === 0 ? (
                  <p className="text-center text-base/40 py-8 text-sm">No comments yet. Be the first!</p>
                ) : (
                  post.comments.map((comment) => (
                    <CommentItem
                      key={comment._id}
                      comment={comment}
                      slug={slug}
                      onUpdate={handleCommentsUpdate}
                    />
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>

      <Contact />

      {/* Share modal */}
      <AnimatePresence>
        {showShare && (
          <ShareModal
            url={pageUrl}
            title={post.title}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
