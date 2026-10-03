'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLElement | null>;
  dotOnly?: boolean;
}

export default function CustomCursor({ containerRef, dotOnly = false }: CustomCursorProps) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = dotOnly
    ? { damping: 30, stiffness: 450 } // Snappy for dot
    : { damping: 22, stiffness: 280 }; // Fluid trailing ring

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      if (!isHovering) setIsHovering(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    if (isFinePointer) {
      container.style.cursor = 'none';
    }

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.style.cursor = '';
    };
  }, [containerRef, mouseX, mouseY, isHovering]);

  if (dotOnly) {
    // Pure glowing neon dot cursor
    return (
      <motion.div
        style={{
          position: 'absolute',
          top: -6,
          left: -6,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#dfff00',
          boxShadow: '0 0 10px #dfff00, 0 0 20px rgba(223, 255, 0, 0.7)',
          x: cursorX,
          y: cursorY,
          pointerEvents: 'none',
          opacity: isHovering ? 1 : 0,
          zIndex: 999
        }}
      />
    );
  }

  // Ring + center dot cursor for Camp Moments
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: -22,
        left: -22,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '2px solid rgba(223, 255, 0, 0.85)',
        boxShadow: '0 0 15px rgba(223, 255, 0, 0.3)',
        x: cursorX,
        y: cursorY,
        pointerEvents: 'none',
        opacity: isHovering ? 1 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
      }}
    >
      <motion.div
        style={{
          width: '8px',
          height: '8px',
          background: '#dfff00',
          borderRadius: '50%',
          boxShadow: '0 0 8px #dfff00'
        }}
        animate={isHovering ? { scale: [1, 1.4, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.2 }}
      />
    </motion.div>
  );
}
