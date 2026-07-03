"use client";

import { useEffect, useState } from "react";

const defaultGuestImages = Array.from({ length: 15 }, (_, i) => `/assets/img/guests/g${i + 1}.jpg`);

type GuestSlideshowProps = {
  className?: string;
  intervalMs?: number;
  images?: string[];
};

const GuestSlideshow = ({
  className = "",
  intervalMs = 6000,
  images = defaultGuestImages,
}: GuestSlideshowProps) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images, intervalMs]);

  return (
    <div className={`os-guest-slideshow ${className}`.trim()} role="img" aria-label="Happy guests photo slideshow">
      {images.map((src, i) => (
        <div
          key={src}
          className={`os-guest-slide ${i === active ? "is-active" : ""} ${i % 2 === 0 ? "zoom-in" : "zoom-out"}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  );
};

export default GuestSlideshow;
