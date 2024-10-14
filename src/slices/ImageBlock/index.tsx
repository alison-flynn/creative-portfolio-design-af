"use client"; // Add this directive to make it a Client Component

import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  // Check if the image is a GIF
  const isGif = slice.primary.image.url?.match(/\.gif$/i);

  return (
    <div
      ref={imageRef}
      className={isGif ? "mx-auto flex justify-center" : "w-full mx-auto px-4 md:px-12"} // Similar padding as the two-column layout
    >
      <PrismicNextImage
        field={slice.primary.image}
        imgixParams={{ w: isGif ? 400 : 1920 }} // Shrink GIF width to 400px, full width for images
        className={isGif ? "rounded-lg w-auto h-auto" : "rounded-lg w-full h-auto shadow-lg"} // Added shadow for non-GIF images
      />
    </div>
  );
};

export default ImageBlock;
