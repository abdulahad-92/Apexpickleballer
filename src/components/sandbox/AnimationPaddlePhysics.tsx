'use client';
import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export default function AnimationPaddlePhysics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rallyCount, setRallyCount] = useState(0);
  const [isUserControlling, setIsUserControlling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { Engine, Render, Runner, Bodies, Composite, Events, Body } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 0.65; // realistic pickleball drop gravity

    let width = container.clientWidth || 800;
    const height = 320; // Fixed crisp court height

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
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;

    // Static Boundaries
    const wallThick = 80;
    const leftWall = Bodies.rectangle(-wallThick / 2, height / 2, wallThick, height * 2, { isStatic: true, label: 'wall' });
    const rightWall = Bodies.rectangle(width + wallThick / 2, height / 2, wallThick, height * 2, { isStatic: true, label: 'wall' });
    const ceiling = Bodies.rectangle(width / 2, -wallThick / 2, width * 2, wallThick, { isStatic: true, label: 'ceiling' });

    // Paddles
    const paddleW = 115;
    const paddleH = 16;
    const paddleY = height - 28;

    // Left Paddle (User / Auto)
    const paddleLeft = Bodies.rectangle(width / 4, paddleY, paddleW, paddleH, {
      isStatic: true,
      label: 'paddleLeft',
      render: { visible: false } // custom drawn
    });

    // Right Paddle (Unbeatable Computer AI)
    const paddleRight = Bodies.rectangle(width * 0.75, paddleY, paddleW, paddleH, {
      isStatic: true,
      label: 'paddleRight',
      render: { visible: false } // custom drawn
    });

    // Ball creation helper
    const BALL_RADIUS = 16;
    const createBall = (x: number, y: number, vx: number = 0) => {
      const ball = Bodies.circle(x, y, BALL_RADIUS, {
        restitution: 0.95,
        friction: 0.001,
        frictionAir: 0.002,
        density: 0.002,
        label: 'ball',
        render: { visible: false }
      });
      Body.setVelocity(ball, { x: vx || (Math.random() * 4 - 2), y: 1 + Math.random() * 2 });
      return ball;
    };

    // Initial 2 Balls
    const ball1 = createBall(width * 0.25, 40, 2);
    const ball2 = createBall(width * 0.75, 60, -2);

    Composite.add(engine.world, [leftWall, rightWall, ceiling, paddleLeft, paddleRight, ball1, ball2]);

    // Tracking state
    let targetUserX = width / 4;
    let lastUserAction = 0;
    let userActive = false;

    // Mouse movement inside the court
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // When hovering over court
      if (mouseY >= 0 && mouseY <= height) {
        if (mouseX < width / 2) {
          // User is controlling the left side!
          userActive = true;
          lastUserAction = Date.now();
          targetUserX = mouseX;
          setIsUserControlling(true);
        }
      }
    };

    const handleMouseLeave = () => {
      userActive = false;
      setIsUserControlling(false);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Ball-Paddle Collision & Rally counter
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        const isBall = bodyA.label === 'ball' ? bodyA : (bodyB.label === 'ball' ? bodyB : null);
        const paddle = bodyA.label.startsWith('paddle') ? bodyA : (bodyB.label.startsWith('paddle') ? bodyB : null);

        if (isBall && paddle) {
          setRallyCount((prev) => prev + 1);

          // Calculate deflection based on hit position relative to paddle center
          const offset = (isBall.position.x - paddle.position.x) / (paddleW / 2);
          const bounceAngleSpeed = offset * 5.5; // angle deflection
          
          // Rebound velocity upward
          Body.setVelocity(isBall, {
            x: bounceAngleSpeed + (Math.random() * 1.5 - 0.75),
            y: -(9.5 + Math.random() * 2.5)
          });
        }
      });
    });

    // Main AI & Physics Loop
    Events.on(engine, 'beforeUpdate', () => {
      const now = Date.now();
      if (userActive && now - lastUserAction > 1500) {
        userActive = false;
        setIsUserControlling(false);
      }

      const bodies = Composite.allBodies(engine.world);
      const balls = bodies.filter((b) => b.label === 'ball');

      // 1. Identify lowest incoming ball on left & right halves
      let leftTargetBall: Matter.Body | null = null;
      let rightTargetBall: Matter.Body | null = null;
      let maxLeftY = -Infinity;
      let maxRightY = -Infinity;

      balls.forEach((b) => {
        // Respawn if ball dropped out of court bounds
        if (b.position.y > height + 40) {
          Body.setPosition(b, {
            x: Math.random() > 0.5 ? width * 0.25 : width * 0.75,
            y: 30
          });
          Body.setVelocity(b, { x: (Math.random() * 4 - 2), y: 2 });
        }

        // Left half target
        if (b.position.x < width / 2) {
          if (b.position.y > maxLeftY && b.velocity.y >= -1) {
            maxLeftY = b.position.y;
            leftTargetBall = b;
          }
        }

        // Right half target
        if (b.position.x >= width / 2) {
          if (b.position.y > maxRightY && b.velocity.y >= -1) {
            maxRightY = b.position.y;
            rightTargetBall = b;
          }
        }
      });

      // 2. Control Left Paddle
      const minLeftX = paddleW / 2 + 10;
      const maxLeftX = width / 2 - paddleW / 2 - 10;

      if (userActive) {
        // User mouse control
        const clampedUserX = Math.max(minLeftX, Math.min(maxLeftX, targetUserX));
        const currentX = paddleLeft.position.x;
        const newX = currentX + (clampedUserX - currentX) * 0.35; // smooth tracking
        Body.setPosition(paddleLeft, { x: newX, y: paddleY });
      } else {
        // Auto-pilot AI: tracks the ball with high precision so it never misses!
        let targetX = width / 4;
        if (leftTargetBall) {
          // Anticipate landing X
          const tb = leftTargetBall as Matter.Body;
          const timeToPaddle = Math.max(1, (paddleY - tb.position.y) / Math.max(2, tb.velocity.y));
          targetX = tb.position.x + tb.velocity.x * Math.min(timeToPaddle, 12);
        }
        const clampedX = Math.max(minLeftX, Math.min(maxLeftX, targetX));
        const currentX = paddleLeft.position.x;
        const newX = currentX + (clampedX - currentX) * 0.28; // agile intercept
        Body.setPosition(paddleLeft, { x: newX, y: paddleY });
      }

      // 3. Control Right Paddle (Unbeatable Computer AI)
      const minRightX = width / 2 + paddleW / 2 + 10;
      const maxRightX = width - paddleW / 2 - 10;

      let targetRightX = width * 0.75;
      if (rightTargetBall) {
        const tb = rightTargetBall as Matter.Body;
        const timeToPaddle = Math.max(1, (paddleY - tb.position.y) / Math.max(2, tb.velocity.y));
        targetRightX = tb.position.x + tb.velocity.x * Math.min(timeToPaddle, 15);
      }
      const clampedRightX = Math.max(minRightX, Math.min(maxRightX, targetRightX));
      const currentRightX = paddleRight.position.x;
      const newRightX = currentRightX + (clampedRightX - currentRightX) * 0.32; // flawless tracking
      Body.setPosition(paddleRight, { x: newRightX, y: paddleY });
    });

    // Custom Canvas Rendering: Court, Net, Paddles, and Pickleballs
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      if (!ctx) return;

      // 1. Center Court Net
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(width / 2, 20);
      ctx.lineTo(width / 2, height - 10);
      ctx.stroke();

      // Net Center Post
      ctx.fillStyle = 'rgba(255, 213, 79, 0.4)';
      ctx.fillRect(width / 2 - 3, height - 32, 6, 22);
      ctx.restore();

      // 2. Render Left Paddle (Yellow / Lime)
      const lx = paddleLeft.position.x;
      const ly = paddleLeft.position.y;
      ctx.save();
      ctx.shadowColor = 'rgba(223, 255, 0, 0.5)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#dfff00';
      ctx.beginPath();
      ctx.roundRect(lx - paddleW / 2, ly - paddleH / 2, paddleW, paddleH, 8);
      ctx.fill();

      // Paddle Grip Accent
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(lx - 12, ly - paddleH / 2 + 2, 24, paddleH - 4);
      ctx.restore();

      // 3. Render Right Paddle (Crimson / Coral Pro AI)
      const rx = paddleRight.position.x;
      const ry = paddleRight.position.y;
      ctx.save();
      ctx.shadowColor = 'rgba(255, 82, 82, 0.5)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#ff5252';
      ctx.beginPath();
      ctx.roundRect(rx - paddleW / 2, ry - paddleH / 2, paddleW, paddleH, 8);
      ctx.fill();

      // Paddle Grip Accent
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(rx - 12, ry - paddleH / 2 + 2, 24, paddleH - 4);
      ctx.restore();

      // 4. Render Authentic Pickleballs with Perforated Holes
      const bodies = Composite.allBodies(engine.world);
      bodies.forEach((b) => {
        if (b.label !== 'ball') return;
        const { x, y } = b.position;

        ctx.save();
        ctx.translate(x, y);

        // Ball Glow & Body
        ctx.shadowColor = 'rgba(223, 255, 0, 0.6)';
        ctx.shadowBlur = 10;
        const gradient = ctx.createRadialGradient(-4, -4, 2, 0, 0, BALL_RADIUS);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.25, '#f5ff47');
        gradient.addColorStop(0.9, '#d4f200');
        gradient.addColorStop(1, '#9cb800');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // Distinctive Perforations (Holes)
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(60, 80, 0, 0.8)';
        const holes = [
          { dx: 0, dy: 0, r: 2.2 },
          { dx: -7, dy: -6, r: 1.8 },
          { dx: 7, dy: -6, r: 1.8 },
          { dx: -8, dy: 5, r: 1.8 },
          { dx: 8, dy: 5, r: 1.8 },
        ];
        holes.forEach((h) => {
          ctx.beginPath();
          ctx.arc(h.dx, h.dy, h.r, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      });
    });

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        if (newWidth === 0) continue;

        width = newWidth;
        canvas.width = newWidth;
        render.options.width = newWidth;

        Body.setPosition(rightWall, { x: newWidth + wallThick / 2, y: height / 2 });
        Body.setPosition(ceiling, { x: newWidth / 2, y: -wallThick / 2 });
      }
    });
    resizeObserver.observe(container);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      Render.stop(render);
      Runner.stop(runner);
      if (canvas && canvas.parentNode) canvas.remove();
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto',
        borderRadius: '16px',
        background: 'rgba(12, 12, 12, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(223, 255, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Top Arena Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.4)',
          fontFamily: 'var(--font-heading)',
          fontSize: '12px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}
      >
        {/* Left Side Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isUserControlling ? '#dfff00' : '#22c55e',
              boxShadow: `0 0 8px ${isUserControlling ? '#dfff00' : '#22c55e'}`
            }}
          />
          <span style={{ color: isUserControlling ? '#dfff00' : 'rgba(255,255,255,0.7)' }}>
            LEFT PADDLE: {isUserControlling ? 'YOU (MOUSE CONTROL)' : 'AUTO-PILOT (NEVER MISSES)'}
          </span>
        </div>

        {/* Rally Counter */}
        <div
          style={{
            background: 'rgba(255, 213, 79, 0.12)',
            padding: '3px 12px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 213, 79, 0.3)',
            color: 'var(--clr-yellow)',
            fontWeight: 700,
          }}
        >
          RALLIES: {rallyCount}
        </div>

        {/* Right Side Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#ff6b6b' }}>
            RIGHT PADDLE: COMPUTER AI (100% HIT RATE)
          </span>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ff5252',
              boxShadow: '0 0 8px #ff5252'
            }}
          />
        </div>
      </div>

      {/* Physics Canvas Court Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '320px',
          cursor: 'crosshair',
        }}
      />
    </div>
  );
}
