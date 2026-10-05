'use client';

import React, { useEffect, useRef } from 'react';
import styles from './FooterLightAnimation.module.css';

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

export default function FooterLightAnimation() {
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
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // Balls color palette harmonized with the dark #111813 footer and volt branding
    const BALL_COUNT = 15;
    const balls: Ball[] = [];
    const colors = [
      '#e2f952', // electric volt highlight
      '#d4f21d', // optic chartreuse neon
      '#c7eb14', // vibrant tournament volt
      '#bfe012', // glowing court lime
      '#f5ff82', // platinum specular volt
    ];

    for (let i = 0; i < BALL_COUNT; i++) {
      balls.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 12 + 12, // 12px to 24px radius
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.35 - 0.1, // natural gentle upward float
        alpha: Math.random() * 0.35 + 0.45, // high visibility on dark background
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Draw authentic 3D perforated pickleball adapted for dark background
    const drawPickleball = (ball: Ball) => {
      ctx.save();
      ctx.translate(ball.x, ball.y);
      ctx.rotate(ball.rotation);

      // Luminous neon glow on dark footer
      ctx.shadowColor = 'rgba(226, 249, 82, 0.45)';
      ctx.shadowBlur = ball.radius * 0.75;

      // 3D Sphere radial gradient
      const grad = ctx.createRadialGradient(
        -ball.radius * 0.32,
        -ball.radius * 0.32,
        ball.radius * 0.08,
        0,
        0,
        ball.radius
      );
      grad.addColorStop(0, '#ffffff'); // bright sheen
      grad.addColorStop(0.28, ball.color); // glowing volt body
      grad.addColorStop(0.85, '#8aa800'); // deep volt edge
      grad.addColorStop(1, '#3b4c00'); // 3D contour shadow

      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.globalAlpha = ball.alpha;
      ctx.fill();

      // Subtle Outer Rim highlight
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.stroke();

      // Perforated pickleball holes (dark inset circles)
      ctx.fillStyle = 'rgba(12, 18, 14, 0.95)';

      const holeRadius = ball.radius * 0.16;

      // Center hole
      ctx.beginPath();
      ctx.arc(0, 0, holeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Inner ring (5 holes)
      const innerDist = ball.radius * 0.45;
      for (let h = 0; h < 5; h++) {
        const angle = (h * Math.PI * 2) / 5;
        const hx = Math.cos(angle) * innerDist;
        const hy = Math.sin(angle) * innerDist;
        ctx.beginPath();
        ctx.arc(hx, hy, holeRadius * 0.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Outer ring (7 holes)
      const outerDist = ball.radius * 0.74;
      for (let h = 0; h < 7; h++) {
        const angle = (h * Math.PI * 2) / 7 + 0.3;
        const hx = Math.cos(angle) * outerDist;
        const hy = Math.sin(angle) * outerDist;
        ctx.beginPath();
        ctx.arc(hx, hy, holeRadius * 0.75, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    };

    // Subtle ambient neon court lines for dark footer
    const drawCourtLines = (time: number) => {
      ctx.save();
      const courtY = height * 0.9;
      const pulse = 0.5 + Math.sin(time * 0.0015) * 0.25;

      ctx.strokeStyle = `rgba(226, 249, 82, ${pulse * 0.08})`;
      ctx.lineWidth = 1.2;

      // Baseline
      ctx.beginPath();
      ctx.moveTo(width * 0.08, courtY);
      ctx.lineTo(width * 0.92, courtY);
      ctx.stroke();

      // Center court divider
      ctx.beginPath();
      ctx.moveTo(width * 0.5, courtY);
      ctx.lineTo(width * 0.5, height);
      ctx.stroke();

      // Diagonal perspective sideline cues
      ctx.beginPath();
      ctx.moveTo(width * 0.08, courtY);
      ctx.lineTo(width * 0.03, height);
      ctx.moveTo(width * 0.92, courtY);
      ctx.lineTo(width * 0.97, height);
      ctx.stroke();

      ctx.restore();
    };

    let startTime = performance.now();

    const render = (currentTime: number) => {
      ctx.clearRect(0, 0, width, height);

      drawCourtLines(currentTime - startTime);

      // Render & update floating balls
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];

        // Mouse hover evasion
        if (mouseRef.current.active) {
          const dx = b.x - mouseRef.current.x;
          const dy = b.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150 && dist > 0) {
            const force = ((150 - dist) / 150) * 0.07;
            b.vx += (dx / dist) * force;
            b.vy += (dy / dist) * force;
          }
        }

        // Damping / friction for smooth gliding
        b.vx *= 0.988;
        b.vy *= 0.988;

        // Position & rotation update
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
