'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PosterImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

export function PosterImage({ src, alt, className }: PosterImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const hasPoster = src && src !== 'N/A' && src.trim() !== '';

  return (
    <div
      className={`relative rounded-md overflow-hidden border bg-gray-200 ${className}`}
    >
      {loading && !error && hasPoster && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {(!hasPoster || error) && (
        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-600 text-center px-1">
          No image
        </div>
      )}

      {hasPoster && !error && (
        <Image
          src={src}
          alt={alt}
          width={300}
          height={450}
          className={`object-cover w-full h-full transition-opacity duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
}
