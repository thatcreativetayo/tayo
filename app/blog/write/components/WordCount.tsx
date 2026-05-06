'use client';

interface WordCountProps {
  text: string;
}

export default function WordCount({ text }: WordCountProps) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readTime = Math.ceil(words / 200);

  return (
    <div className="fixed bottom-5 right-5 pointer-events-none" style={{ fontSize: 12 }}>
      <span className="text-neutral-400">
        {words.toLocaleString()} {words === 1 ? 'word' : 'words'} · {readTime} min read
      </span>
    </div>
  );
}
