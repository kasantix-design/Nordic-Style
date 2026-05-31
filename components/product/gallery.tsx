"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageItem {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: ImageItem[];
}

export function Gallery({ images }: GalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
        <Image
          src={images[activeImage].src}
          alt={images[activeImage].alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative aspect-square w-20 overflow-hidden border-2 ${
                activeImage === index ? "border-neutral-900" : "border-transparent"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
