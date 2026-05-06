'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight01FreeIcons, Tick01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

const FORM_ID = "bzygwxxa";

// ─── Success Modal ─────────────────────────────────────────────────────────────

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-sm p-8 flex flex-col items-center gap-5 text-center"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-full bg-base/5 flex items-center justify-center">
          <HugeiconsIcon icon={Tick01FreeIcons} size={28} className="text-base" />
        </div>
        <div>
          <h3 className="text-base text-lg font-semibold mb-1">Message sent!</h3>
          <p className="text-base/50 text-sm">
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2.5 bg-base text-white text-sm font-medium rounded-full hover:bg-base/80 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}

// ─── Ball Canvas ───────────────────────────────────────────────────────────────

function BallCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ball = useRef({ x: 180, y: 140, vx: 3.2, vy: 2.4, radius: 52 });
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastDragPos = useRef({ x: 0, y: 0 });
  const dragVel = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const drawBall = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number) => {
    const b = ball.current;
    ctx.clearRect(0, 0, W, H);
    const shadowY = H - 16;
    const proximity = Math.max(0.2, 1 - (shadowY - b.y) / (H * 0.9));
    ctx.save();
    ctx.translate(b.x, shadowY);
    ctx.scale(proximity, 0.15);
    const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, b.radius);
    sg.addColorStop(0, "rgba(0,0,0,0.22)");
    sg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = sg;
    ctx.beginPath();
    ctx.arc(0, 0, b.radius * 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    const grad = ctx.createRadialGradient(
      b.x - b.radius * 0.35, b.y - b.radius * 0.38, b.radius * 0.04,
      b.x + b.radius * 0.1, b.y + b.radius * 0.1, b.radius
    );
    grad.addColorStop(0, "#c47a3a");
    grad.addColorStop(0.4, "#8b4513");
    grad.addColorStop(0.75, "#5c2d0a");
    grad.addColorStop(1, "#2e1205");
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    const spec = ctx.createRadialGradient(
      b.x - b.radius * 0.36, b.y - b.radius * 0.36, 1,
      b.x - b.radius * 0.28, b.y - b.radius * 0.28, b.radius * 0.55
    );
    spec.addColorStop(0, "rgba(255,220,160,0.6)");
    spec.addColorStop(0.4, "rgba(255,200,120,0.1)");
    spec.addColorStop(1, "rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = spec;
    ctx.fill();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const GRAVITY = 0.35;
    const BOUNCE = 0.74;
    const loop = () => {
      const W = canvas.width;
      const H = canvas.height;
      const b = ball.current;
      if (!dragging.current) {
        b.vy += GRAVITY;
        b.x += b.vx;
        b.y += b.vy;
        if (b.x + b.radius > W) { b.x = W - b.radius; b.vx *= -BOUNCE; }
        if (b.x - b.radius < 0) { b.x = b.radius; b.vx *= -BOUNCE; }
        if (b.y + b.radius > H) {
          b.y = H - b.radius;
          b.vy *= -BOUNCE;
          b.vx *= 0.985;
          if (Math.abs(b.vy) < 1.2) b.vy = -BOUNCE * 6;
        }
        if (b.y - b.radius < 0) { b.y = b.radius; b.vy *= -BOUNCE; }
      }
      drawBall(ctx, W, H);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [drawBall]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const c = canvasRef.current!;
    const sx = c.width / rect.width;
    const sy = c.height / rect.height;
    const src = "touches" in e ? e.touches[0] : e;
    return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy };
  };

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPos(e);
    const b = ball.current;
    if (Math.hypot(pos.x - b.x, pos.y - b.y) < b.radius + 10) {
      dragging.current = true;
      dragOffset.current = { x: pos.x - b.x, y: pos.y - b.y };
      lastDragPos.current = pos;
      dragVel.current = { x: 0, y: 0 };
    }
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging.current) return;
    const pos = getPos(e);
    dragVel.current = { x: (pos.x - lastDragPos.current.x) * 0.75, y: (pos.y - lastDragPos.current.y) * 0.75 };
    lastDragPos.current = pos;
    ball.current.x = pos.x - dragOffset.current.x;
    ball.current.y = pos.y - dragOffset.current.y;
  };

  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    ball.current.vx = dragVel.current.x * 1.5;
    ball.current.vy = dragVel.current.y * 1.5;
  };

  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={460}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none touch-none"
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
      onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
    />
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const inputClass =
    "w-full bg-transparent text-base text-sm placeholder:text-base/30 border-b border-base/10 py-4 outline-none focus:border-base/40 transition-colors duration-200";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(`https://forminit.com/f/${FORM_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message || 'Submission failed');
      }

      setStatus('success');
      formRef.current?.reset();
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-base/3 px-4 sm:px-8 py-16 sm:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full max-w-6xl items-center">

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex">
            <span className="flex items-center gap-1.5 text-xs border border-base/10 rounded-full px-3 py-1 text-base/60">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Available
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-base text-2xl sm:text-[2.1rem] font-semibold leading-tight tracking-tight">
              Always searching for new problems, fun teams and great ideas.
            </h2>
            <p className="text-base/50 text-sm">If this sounds like you, reach out :)</p>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <input
              className={inputClass}
              placeholder="Name [or nickname, we don't judge]"
              name="fi-sender-firstName"
              required
            />
            <input
              className={inputClass}
              placeholder="E-mail address"
              type="email"
              name="fi-sender-email"
              required
            />
            <textarea
              className={`${inputClass} resize-none min-h-[100px]`}
              placeholder="Message"
              name="fi-text-message"
              required
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-xs -mt-4">{errorMsg}</p>
          )}

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileTap={{ scale: 0.97 }}
            className="self-start flex items-center gap-2 bg-base/5 hover:bg-base/10 text-base text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-200 disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send'}
            <HugeiconsIcon icon={ArrowRight01FreeIcons} size={14} />
          </motion.button>
        </form>

        <div className="hidden md:flex w-full justify-center bg-[#FBFBFB] rounded-3xl border-3 border-base/5">
          <Image src="/contact.png" alt="" width={1000} height={1000} className="h-auto max-h-145 w-auto" />
        </div>
      </div>

      {/* Success modal */}
      <AnimatePresence>
        {status === 'success' && (
          <SuccessModal onClose={() => setStatus('idle')} />
        )}
      </AnimatePresence>
    </div>
  );
}
