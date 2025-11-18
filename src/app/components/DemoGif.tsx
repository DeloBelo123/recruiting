'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface DemoGifProps {
  className?: string;
}

export default function DemoGif({ className = '' }: DemoGifProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.playbackRate = 2.0;
      video.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className={`relative ${className}`}
    >
      <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-border bg-card scale-105">
        <video
          ref={videoRef}
          className="w-full h-auto"
          playsInline
          muted
          loop
          autoPlay
        >
          <source src="/demo-gif.mov" type="video/quicktime" />
          <source src="/demo-gif.mov" type="video/mp4" />
        </video>
      </div>
    </motion.div>
  );
}

