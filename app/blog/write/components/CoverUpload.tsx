'use client';

import { useRef, useState } from 'react';

interface CoverUploadProps {
  value?: string;
  onChange: (base64: string | undefined) => void;
}

export default function CoverUpload({ value, onChange }: CoverUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [hovering, setHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) toBase64(file);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) toBase64(file);
    e.target.value = '';
  };

  if (value) {
    return (
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ height: 280 }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <img src={value} alt="Cover" className="w-full h-full object-cover" />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
          style={{
            background: 'rgba(0,0,0,0.45)',
            opacity: hovering ? 1 : 0,
            pointerEvents: hovering ? 'auto' : 'none',
          }}
        >
          <button
            onClick={() => inputRef.current?.click()}
            className="text-white text-sm font-medium px-4 py-2 border border-white/50 rounded-full hover:bg-white/10 transition-colors"
          >
            Change image
          </button>
        </div>

        {/* Remove button */}
        <button
          onClick={() => onChange(undefined)}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-sm"
        >
          ×
        </button>

        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={handleFile} />
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors duration-150 ${
        dragOver
          ? 'border-blue-400 bg-blue-50'
          : 'border-neutral-200 bg-white hover:border-neutral-400 hover:bg-neutral-50'
      }`}
      style={{ height: 220 }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mb-3 text-neutral-300">
        <rect x="2" y="6" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 22l7-6 5 5 4-4 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-neutral-400 text-sm">Drop cover image or click to upload</p>
      <p className="text-neutral-300 text-xs mt-1">PNG, JPG, WEBP, GIF</p>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={handleFile} />
    </div>
  );
}
