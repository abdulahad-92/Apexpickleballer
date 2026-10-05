import React from 'react';
import Image from 'next/image';

interface PaddleLogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PaddleLogo({ size = 40, className, style }: PaddleLogoProps) {
  return (
    <Image
      src="/images/apex_logo.jpeg"
      alt="Apex Pickleball Official Logo"
      width={size}
      height={size}
      className={className}
      style={{
        borderRadius: '50%',
        objectFit: 'cover',
        display: 'inline-block',
        verticalAlign: 'middle',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        border: '1px solid rgba(226, 249, 82, 0.3)',
        ...style,
      }}
      unoptimized
    />
  );
}
