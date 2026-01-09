import { useState } from "react";
import Image from "~/components/Image";
import type { SanityImage } from "~/types/sanity";
import CloseButton from "./CloseButton";

export interface GridGalleryProps {
  title?: string;
  images: SanityImage[];
}

export default function GridGallery({ title, images }: GridGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const selectedImage =
    selectedIndex != null && images
      ? images[selectedIndex]
      : undefined;

  return (
    <>
      <section aria-label="Gallery">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((image, index) => (
            <figure key={index} className="relative aspect-square overflow-hidden rounded-lg cursor-pointer">
              <Image
                asset={image.asset._ref}
                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                onClick={() => handleOpen(index)}
              />
            </figure>
          ))}
        </div>
      </section>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={handleClose}
        >
          <div className="relative max-h-full max-w-4xl">
            <CloseButton onClick={handleClose} />
            <figure>
              <Image
                asset={selectedImage.asset._ref}
                className="max-h-[80vh] w-auto rounded-lg object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </figure>
          </div>
        </div>
      )}
    </>
  )
}