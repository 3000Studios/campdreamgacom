import { useEffect, useRef } from 'react';

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const WireframeBrand = ({ label = 'Camp Dream Store' }: { label?: string }): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animationFrame = 0;
    let lastTimestamp = 0;

    const points = Array.from({ length: 64 }, (_, index) => {
      const t = (index / 64) * Math.PI * 2;
      const z = (index % 2 === 0 ? 1 : -1) * 0.55;
      return { x: Math.cos(t), y: Math.sin(t), z };
    });

    const resize = (): void => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const size = 56;
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (timestamp: number): void => {
      const dt = Math.min(48, timestamp - lastTimestamp);
      lastTimestamp = timestamp;

      const speed = prefersReducedMotion() ? 0 : 0.0012;
      const rotation = timestamp * speed;
      const wobble = Math.sin(timestamp * 0.001) * 0.25;

      ctx.clearRect(0, 0, 56, 56);

      const centerX = 28;
      const centerY = 28;
      const radius = 22;

      const projected = points.map((point) => {
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const cosW = Math.cos(wobble);
        const sinW = Math.sin(wobble);

        let x = point.x;
        let y = point.y;
        let z = point.z;

        const x1 = x * cosR - z * sinR;
        const z1 = x * sinR + z * cosR;
        x = x1;
        z = z1;

        const y2 = y * cosW - z * sinW;
        const z2 = y * sinW + z * cosW;
        y = y2;
        z = z2;

        const depth = 1.6 / (2.1 - z);
        return {
          x: centerX + x * radius * depth,
          y: centerY + y * radius * depth,
          z,
        };
      });

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(200, 240, 255, 0.55)';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';

      for (let i = 0; i < projected.length; i += 1) {
        const a = projected[i];
        const b = projected[(i + 1) % projected.length];
        if (!a || !b) continue;
        ctx.globalAlpha = 0.35 + ((a.z + 1) / 2) * 0.35;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      projected.forEach((p) => {
        ctx.globalAlpha = 0.7 + ((p.z + 1) / 2) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      if (dt >= 0 && !prefersReducedMotion()) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <span className="wireframe-brand" aria-label={label} role="img">
      <canvas ref={canvasRef} />
    </span>
  );
};
