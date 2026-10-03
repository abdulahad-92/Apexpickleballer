'use client';
import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export default function AnimationPhysics() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 0.8;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

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
    canvas.style.pointerEvents = 'auto';

    // Static Boundaries (thickness = 100 to prevent tunneling)
    const wallThickness = 100;
    const boundaryOpts = { isStatic: true, restitution: 0.85, friction: 0.02 };
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, { ...boundaryOpts, label: 'ground' });
    const wallLeft = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { ...boundaryOpts, label: 'wallLeft' });
    const wallRight = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { ...boundaryOpts, label: 'wallRight' });
    const roof = Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, { ...boundaryOpts, label: 'roof' });

    Composite.add(engine.world, [ground, wallLeft, wallRight, roof]);

    // Helper to create an authentic pickleball
    const BALL_RADIUS = 26;
    const createBall = (x: number, y: number) => {
      const ball = Bodies.circle(x, y, BALL_RADIUS, {
        restitution: 0.9, // Ultra-bouncy pickleball
        friction: 0.015,
        frictionAir: 0.005,
        density: 0.002,
        label: 'pickleball',
        render: {
          visible: false // We will custom draw authentic pickleballs with holes
        }
      });
      // Store random hole rotation angle for realistic 3D appearance
      (ball as any).rotationOffset = Math.random() * Math.PI * 2;
      return ball;
    };

    // Spawn initial set of balls across top area
    const initialBalls = [];
    const ballCount = 14;
    for (let i = 0; i < ballCount; i++) {
      const x = (width * 0.15) + Math.random() * (width * 0.7);
      const y = 50 + Math.random() * (height * 0.4);
      initialBalls.push(createBall(x, y));
    }
    Composite.add(engine.world, initialBalls);

    // Mouse control for dragging balls
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.35,
        damping: 0.1,
        render: { visible: false }
      }
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Safety: ensure dragging constraint releases if mouse leaves or button is up
    Events.on(engine, 'beforeUpdate', () => {
      if (mouseConstraint.body && mouse.button === -1) {
        mouseConstraint.constraint.bodyB = null;
        (mouseConstraint as any).body = null;
      }
    });

    // Custom Drawing: Render Authentic Perforated Pickleballs
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

        // 1. Ball Glow & Body
        ctx.shadowColor = 'rgba(223, 255, 0, 0.4)';
        ctx.shadowBlur = 12;

        const gradient = ctx.createRadialGradient(-6, -6, 2, 0, 0, BALL_RADIUS);
        gradient.addColorStop(0, '#ffffff'); // bright highlight
        gradient.addColorStop(0.25, '#e2f952'); // electric volt
        gradient.addColorStop(0.85, '#d4f200'); // optic chartreuse
        gradient.addColorStop(1, '#6E9400'); // deep optic volt edge for 3D sphere illusion

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // 2. Subtle Outer Rim
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.stroke();

        // 3. Authentic Pickleball Holes (perforations)
        const holePositions = [
          { x: 0, y: 0, r: 3.5 },
          { x: -12, y: -10, r: 3 },
          { x: 12, y: -10, r: 3 },
          { x: -14, y: 8, r: 3 },
          { x: 14, y: 8, r: 3 },
          { x: 0, y: -16, r: 3.2 },
          { x: 0, y: 16, r: 3.2 },
        ];

        ctx.fillStyle = 'rgba(20, 30, 10, 0.85)'; // dark perforation color
        for (const h of holePositions) {
          ctx.beginPath();
          ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
          ctx.fill();

          // Inner shadow/depth for hole
          ctx.strokeStyle = 'rgba(10, 20, 5, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      }
    });

    // ResizeObserver to keep walls and canvas perfectly sized to container
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

    // Spawn ball on user click if clicked away from active dragging
    let isDragging = false;
    Events.on(mouseConstraint, 'startdrag', () => { isDragging = true; });
    Events.on(mouseConstraint, 'enddrag', () => { setTimeout(() => { isDragging = false; }, 100); });

    // Window-level tracking to prevent balls from ever freezing or getting stuck during drags
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (mouseConstraint.body) {
        const rect = canvas.getBoundingClientRect();
        mouse.position.x = e.clientX - rect.left;
        mouse.position.y = e.clientY - rect.top;
      }
    };

    const handleWindowMouseUp = () => {
      if (mouseConstraint.body) {
        mouseConstraint.constraint.bodyB = null;
        (mouseConstraint as any).body = null;
      }
      isDragging = false;
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    const handleCanvasClick = (e: MouseEvent) => {
      if (isDragging) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      // Spawn new bouncy ball
      Composite.add(engine.world, createBall(clickX, clickY));
    };
    canvas.addEventListener('click', handleCanvasClick);

    // Run engine and renderer
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      canvas.removeEventListener('click', handleCanvasClick);
      resizeObserver.disconnect();
      Render.stop(render);
      Runner.stop(runner);
      if (canvas && canvas.parentNode) {
        canvas.remove();
      }
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none' // The canvas inside will have pointer-events: auto
      }}
    />
  );
}
