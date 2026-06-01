"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export function Gallery({ images }: GalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[activeImage] || images[0];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
        <Image
          src={currentImage!.src}
          alt={currentImage!.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`relative aspect-square w-20 overflow-hidden rounded-md border-2 ${
              activeImage === index ? "border-blue-600" : "border-transparent"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}