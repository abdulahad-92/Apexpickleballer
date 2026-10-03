import React from 'react';

interface PaddleLogoProps {
  size?: number;
  className?: string;
}

export default function PaddleLogo({ size = 36, className }: PaddleLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Apex Pickleball Paddle"
    >
      <defs>
        {/* Carbon Face Gradient */}
        <linearGradient id="carbonFace" x1="12" y1="8" x2="36" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#253328" />
          <stop offset="100%" stopColor="#111813" />
        </linearGradient>

        {/* Optic Volt Ball Gradient */}
        <radialGradient id="voltBall" cx="34" cy="14" r="9" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E2F952" />
          <stop offset="85%" stopColor="#6E9400" />
          <stop offset="100%" stopColor="#4D6B00" />
        </radialGradient>

        {/* Subtle Drop Shadow */}
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#111813" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Main Group tilted at dynamic athletic angle */}
      <g filter="url(#logoGlow)">
        {/* === PADDLE === */}
        <g transform="rotate(-15 22 26)">
          {/* Handle Grip */}
          <path
            d="M20 30 L20 42 C20 43.1 20.9 44 22 44 L24 44 C25.1 44 26 43.1 26 42 L26 30 Z"
            fill="#18221B"
            stroke="#111813"
            strokeWidth="1.2"
          />
          {/* Handle Grip Tape Wraps */}
          <line x1="20" y1="33" x2="26" y2="35" stroke="#E2F952" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="20" y1="37" x2="26" y2="39" stroke="#E2F952" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="20" y1="41" x2="26" y2="43" stroke="#E2F952" strokeWidth="0.8" strokeOpacity="0.6" />

          {/* Handle Butt Cap */}
          <rect x="19.5" y="43" width="7" height="2" rx="1" fill="#6E9400" />

          {/* Paddle Neck / Throat */}
          <path
            d="M17 26 C17 28 19 30 20 30 L26 30 C27 30 29 28 29 26 Z"
            fill="#18221B"
          />

          {/* Paddle Outer Edge Guard (Solid Carbon Frame) */}
          <rect
            x="11"
            y="6"
            width="24"
            height="23"
            rx="6"
            fill="#111813"
            stroke="#6E9400"
            strokeWidth="1.5"
          />

          {/* Paddle Carbon Hitting Face */}
          <rect
            x="12.5"
            y="7.5"
            width="21"
            height="20"
            rx="4.5"
            fill="url(#carbonFace)"
          />

          {/* Dynamic Volt Graphic Line on Paddle Face (Apex Chevron) */}
          <path
            d="M16 22 L23 13 L30 22"
            stroke="#E2F952"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="23" cy="18" r="1.5" fill="#E2F952" />
        </g>

        {/* === OPTIC VOLT PICKLEBALL (Perforated) === */}
        <g>
          {/* Ball Sphere */}
          <circle cx="35" cy="13" r="8" fill="url(#voltBall)" stroke="#FFFFFF" strokeWidth="0.8" />

          {/* Authentic Pickleball Holes */}
          <circle cx="35" cy="13" r="1.4" fill="#243300" opacity="0.85" />
          <circle cx="31.8" cy="10.8" r="1.1" fill="#243300" opacity="0.85" />
          <circle cx="38.2" cy="10.8" r="1.1" fill="#243300" opacity="0.85" />
          <circle cx="32.5" cy="15.5" r="1.1" fill="#243300" opacity="0.85" />
          <circle cx="37.5" cy="15.5" r="1.1" fill="#243300" opacity="0.85" />
        </g>
      </g>
    </svg>
  );
}
