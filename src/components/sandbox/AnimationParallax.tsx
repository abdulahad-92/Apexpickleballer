'use client';

export default function AnimationParallax() {
  return (
    <div 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden', 
        background: 'transparent',
        pointerEvents: 'none'
      }}
    >
      {/* Dynamic Ambient Background Grid */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(223, 255, 0, 0.12) 1px, transparent 0)', 
          backgroundSize: '36px 36px',
          opacity: 0.7
        }} 
      />
      {/* Subtle Radial Glows */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(223, 255, 0, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 200, 66, 0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  );
}
