'use client';
import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

interface AnimationPhysicsProps {
  ballCount?: number;
}

export default function AnimationPhysics({ ballCount = 14 }: AnimationPhysicsProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

    const engine = Engine.create({
      enableSleeping: false, // keep balls active and responsive to hover
    });
    engine.gravity.y = 0.6;

    let width = container.clientWidth || 1200;
    let height = container.clientHeight || 450;

    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        showSleeping: false,
      }
    });

    const canvas = render.canvas;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // Never block footer links or interactions

    // Static Boundaries (walls around the footer container)
    const wallThickness = 120;
    const boundaryOpts = { isStatic: true, restitution: 0.9, friction: 0.02 };
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, { ...boundaryOpts, label: 'ground' });
    const wallLeft = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { ...boundaryOpts, label: 'wallLeft' });
    const wallRight = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { ...boundaryOpts, label: 'wallRight' });
    const roof = Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, { ...boundaryOpts, label: 'roof' });

    Composite.add(engine.world, [ground, wallLeft, wallRight, roof]);

    // Authentic Pickleball Body Creator
    const BALL_RADIUS = 26;
    const createBall = (x: number, y: number) => {
      const ball = Bodies.circle(x, y, BALL_RADIUS, {
        restitution: 0.92, // Ultra-bouncy pickleball
        friction: 0.01,
        frictionAir: 0.006,
        density: 0.002,
        label: 'pickleball',
        render: { visible: false } // We custom-draw the pickleball with realistic holes
      });
      (ball as any).rotationOffset = Math.random() * Math.PI * 2;
      return ball;
    };

    // Spawn initial set of balls spread across width
    const initialBalls = [];
    for (let i = 0; i < ballCount; i++) {
      const x = (width * 0.08) + Math.random() * (width * 0.84);
      const y = 30 + Math.random() * (height * 0.5);
      initialBalls.push(createBall(x, y));
    }
    Composite.add(engine.world, initialBalls);

    // Track mouse position over container for HOVER scattering
    let mousePos = { x: -9999, y: -9999 };
    let isMouseInside = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mousePos = { x, y };
        isMouseInside = true;
      } else {
        isMouseInside = false;
        mousePos = { x: -9999, y: -9999 };
      }
    };

    const handleMouseLeave = () => {
      isMouseInside = false;
      mousePos = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // On every physics update: apply hover repulsion when cursor is near any ball
    const HOVER_RADIUS = 95;
    Events.on(engine, 'beforeUpdate', () => {
      if (!isMouseInside) return;

      const bodies = Composite.allBodies(engine.world);
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        if (body.label !== 'pickleball') continue;

        const dx = body.position.x - mousePos.x;
        const dy = body.position.y - mousePos.y;
        const dist = Math.hypot(dx, dy);

        if (dist < HOVER_RADIUS && dist > 2) {
          // Calculate repulsive force away from mouse cursor
          const forceMagnitude = (1 - dist / HOVER_RADIUS) * 0.045;
          const forceX = (dx / dist) * forceMagnitude;
          // Pop ball upward and outward
          const forceY = (dy / dist) * forceMagnitude - 0.02;

          Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
          Matter.Body.setAngularVelocity(body, body.angularVelocity + (Math.random() - 0.5) * 0.18);
        }
      }
    });

    // Custom Drawing: Render Authentic Glowing Pickleballs with Perforated Holes
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      if (!ctx) return;

      const bodies = Composite.allBodies(engine.world);

      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        if (body.label !== 'pickleball') continue;

        const { x, y } = body.position;
        const angle = body.angle + ((body as any).rotationOffset || 0);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // 1. Ball Glow & Sphere Gradient
        ctx.shadowColor = 'rgba(223, 255, 0, 0.45)';
        ctx.shadowBlur = 14;

        const gradient = ctx.createRadialGradient(-7, -7, 2, 0, 0, BALL_RADIUS);
        gradient.addColorStop(0, '#ffffff'); // bright sheen
        gradient.addColorStop(0.25, '#f4ff52'); // volt glow
        gradient.addColorStop(0.85, '#d4f200'); // optic chartreuse
        gradient.addColorStop(1, '#668a00'); // deep 3D contour edge

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // 2. Subtle Outer Rim
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.stroke();

        // 3. Authentic Pickleball Perforations (Holes)
        const holePositions = [
          { x: 0, y: 0, r: 3.6 },
          { x: -12, y: -10, r: 3.2 },
          { x: 12, y: -10, r: 3.2 },
          { x: -14, y: 8, r: 3.2 },
          { x: 14, y: 8, r: 3.2 },
          { x: 0, y: -16, r: 3.3 },
          { x: 0, y: 16, r: 3.3 },
        ];

        ctx.fillStyle = 'rgba(20, 32, 8, 0.88)';
        for (const h of holePositions) {
          ctx.beginPath();
          ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(8, 16, 4, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      }
    });

    // ResizeObserver to keep canvas and boundary walls in sync with container
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth === 0 || newHeight === 0) continue;

        width = newWidth;
        height = newHeight;

        canvas.width = newWidth;
        canvas.height = newHeight;
        render.options.width = newWidth;
        render.options.height = newHeight;

        Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
        Matter.Body.setVertices(ground, Bodies.rectangle(newWidth / 2, newHeight + wallThickness / 2, newWidth * 2, wallThickness).vertices);

        Matter.Body.setPosition(wallLeft, { x: -wallThickness / 2, y: newHeight / 2 });
        Matter.Body.setPosition(wallRight, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
        Matter.Body.setPosition(roof, { x: newWidth / 2, y: -wallThickness / 2 });
      }
    });
    resizeObserver.observe(container);

    // Run engine & renderer
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      Render.stop(render);
      Runner.stop(runner);
      if (canvas && canvas.parentNode) {
        canvas.remove();
      }
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [ballCount]);

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none', // Allows full pass-through for links and inputs
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
