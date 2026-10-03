'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import styles from './VideoModalPlayer.module.css';

interface VideoModalPlayerProps {
  youtubeId: string;
  title: string;
  caption?: string;
  posterUrl?: string;
}

export default function VideoModalPlayer({
  youtubeId,
  title,
  caption,
  posterUrl,
}: VideoModalPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    posterUrl || `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
  );

  return (
    <div className={styles.playerCard}>
      <div className={styles.aspectRatioBox}>
        {isPlaying ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div
            className={styles.posterCover}
            style={{ backgroundImage: `url(${imgSrc})` }}
            onClick={() => setIsPlaying(true)}
            role="button"
            tabIndex={0}
            aria-label={`Play video: ${title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsPlaying(true);
              }
            }}
          >
            <div className={styles.posterOverlay} />
            <div className={styles.playBtnWrap}>
              <div className={styles.playCircle}>
                <Play className={styles.playIcon} fill="currentColor" />
              </div>
              {caption && <span className={styles.captionBadge}>{caption}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
