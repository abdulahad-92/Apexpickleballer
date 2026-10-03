'use client';

import React, { useEffect, useRef } from 'react';
import styles from './HeroLightAnimation.module.css';

interface Ball {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  rotation: number;
  vRot: number;
  color: string;
}

export default function HeroLightAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Generate floating branded optic volt pickleballs
    const BALL_COUNT = 14;
    const balls: Ball[] = [];
    const colors = [
      '#d4f21d', // optic volt neon
      '#c7eb14', // tournament optic green
      '#e2f952', // electric volt highlight
      '#bfe012'  // vibrant court chartreuse
    ];

    for (let i = 0; i < BALL_COUNT; i++) {
      balls.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 14 + 10, // 10px to 24px radius
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.35 - 0.15, // slight upward natural drift
        alpha: Math.random() * 0.4 + 0.35,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.015,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Helper: Draw authentic pickleball with hole pattern
    const drawPickleball = (ball: Ball) => {
      ctx.save();
      ctx.translate(ball.x, ball.y);
      ctx.rotate(ball.rotation);

      // Outer glow
      ctx.shadowColor = 'rgba(110, 148, 0, 0.4)';
      ctx.shadowBlur = ball.radius * 0.6;

      // Ball sphere gradient (3D depth look)
      const grad = ctx.createRadialGradient(
        -ball.radius * 0.3,
        -ball.radius * 0.3,
        ball.radius * 0.1,
        0,
        0,
        ball.radius
      );
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, ball.color);
      grad.addColorStop(1, '#6E9400');

      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.globalAlpha = ball.alpha;
      ctx.fill();

      // Draw iconic pickleball holes (dark inset circles with soft drop shadow)
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(17, 24, 19, 0.75)';

      const holeRadius = ball.radius * 0.16;
      // Center hole
      ctx.beginPath();
      ctx.arc(0, 0, holeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner ring of holes (5 holes)
      const innerDist = ball.radius * 0.45;
      for (let h = 0; h < 5; h++) {
        const angle = (h * Math.PI * 2) / 5;
        const hx = Math.cos(angle) * innerDist;
        const hy = Math.sin(angle) * innerDist;
        ctx.beginPath();
        ctx.arc(hx, hy, holeRadius * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Outer ring of holes (7 holes)
      const outerDist = ball.radius * 0.75;
      for (let h = 0; h < 7; h++) {
        const angle = (h * Math.PI * 2) / 7 + 0.3;
        const hx = Math.cos(angle) * outerDist;
        const hy = Math.sin(angle) * outerDist;
        ctx.beginPath();
        ctx.arc(hx, hy, holeRadius * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // Draw neon court baseline & kitchen line perspective at the bottom
    const drawCourtLines = (time: number) => {
      ctx.save();
      const courtY = height * 0.88;
      const pulse = 0.5 + Math.sin(time * 0.0015) * 0.2;

      ctx.strokeStyle = `rgba(17, 24, 19, ${pulse * 0.12})`;
      ctx.lineWidth = 1.5;

      // Baseline
      ctx.beginPath();
      ctx.moveTo(width * 0.1, courtY);
      ctx.lineTo(width * 0.9, courtY);
      ctx.stroke();

      // Center court divider
      ctx.beginPath();
      ctx.moveTo(width * 0.5, courtY);
      ctx.lineTo(width * 0.5, height);
      ctx.stroke();

      // Diagonal perspective sideline cues
      ctx.beginPath();
      ctx.moveTo(width * 0.1, courtY);
      ctx.lineTo(width * 0.04, height);
      ctx.moveTo(width * 0.9, courtY);
      ctx.lineTo(width * 0.96, height);
      ctx.stroke();

      ctx.restore();
    };

    let startTime = performance.now();

    const render = (currentTime: number) => {
      ctx.clearRect(0, 0, width, height);

      drawCourtLines(currentTime - startTime);

      // Render & update balls
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];

        // Mouse avoidance/attraction
        if (mouseRef.current.active) {
          const dx = b.x - mouseRef.current.x;
          const dy = b.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 0) {
            const force = (140 - dist) / 140 * 0.06;
            b.vx += (dx / dist) * force;
            b.vy += (dy / dist) * force;
          }
        }

        // Apply friction to prevent runaway speeds
        b.vx *= 0.99;
        b.vy *= 0.99;

        // Position update
        b.x += b.vx;
        b.y += b.vy;
        b.rotation += b.vRot;

        // Boundary wrapping
        if (b.x < -b.radius * 2) b.x = width + b.radius;
        if (b.x > width + b.radius * 2) b.x = -b.radius;
        if (b.y < -b.radius * 2) b.y = height + b.radius;
        if (b.y > height + b.radius * 2) b.y = -b.radius;

        drawPickleball(b);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.lightCanvasContainer} ref={containerRef} aria-hidden="true">
      <div className={styles.ambientGlow} />
      <div className={styles.courtGridLines} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
