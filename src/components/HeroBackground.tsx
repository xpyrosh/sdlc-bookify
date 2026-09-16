"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = 26;
    const rows = 16;
    const spacingX = width / cols;
    const spacingY = height / rows;

    const points: { x: number; y: number; baseY: number; offset: number }[] = [];
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        points.push({
          x: i * spacingX,
          y: j * spacingY,
          baseY: j * spacingY,
          offset: Math.random() * Math.PI * 2,
        });
      }
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // draw faint connecting lines
      ctx.strokeStyle = "rgba(100, 180, 255, 0.045)";
      ctx.lineWidth = 0.8;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const wave =
          Math.sin(p.x * 0.0025 + time * 0.0003 + p.offset) *
          Math.cos(p.y * 0.004 + time * 0.0002) *
          22;
        p.y = p.baseY + wave;
      }

      // horizontal lines
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath();
        for (let i = 0; i <= cols; i++) {
          const p = points[j * (cols + 1) + i];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // vertical lines
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        for (let j = 0; j <= rows; j++) {
          const p = points[j * (cols + 1) + i];
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // draw points
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100, 200, 255, 0.18)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)" }}
    />
  );
}
