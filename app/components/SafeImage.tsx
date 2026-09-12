"use client";

import { useEffect, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
};

export default function SafeImage({ src, alt, className = "", eager = false }: Props) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} is unavailable`}
        className={`grid place-items-center bg-surface-image-placeholder px-5 text-center text-sm text-ink-muted ${className}`}
      >
        Image unavailable
      </div>
    );
  }

  return (
    // A plain img accepts legacy Firestore URLs from arbitrary hosts; fixed dimensions prevent layout shifts.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={1600}
      height={900}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
