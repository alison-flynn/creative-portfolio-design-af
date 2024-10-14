"use client";

import { PrismicRichText, PrismicImage } from "@prismicio/react";
import { SliceComponentProps } from "@prismicio/react";
import { Content, RichTextField } from "@prismicio/client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./ImageLeftTextRight.module.css"; // Import the CSS module

/**
 * Props for `ImageLeftTextRight`.
 */
export type ImageLeftTextRightProps = SliceComponentProps<Content.ImageLeftTextRightSlice>;

/**
 * Component for "ImageLeftTextRight" Slices.
 */
const ImageLeftTextRight = ({ slice }: ImageLeftTextRightProps): JSX.Element => {
  const leftImageRef = useRef<HTMLDivElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (leftImageRef.current && rightColumnRef.current) {
      // GSAP animation
      gsap.fromTo(
        [leftImageRef.current, rightColumnRef.current],
        { opacity: 0, y: 50, rotation: 10 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.75)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: leftImageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
      {/* Left Column: Image */}
      <div className="flex items-center justify-center order-1" ref={leftImageRef}>
        {slice.primary.left_image ? (
          <PrismicImage
            field={slice.primary.left_image}
            className="rounded-lg w-full h-auto mx-auto"
            loading="lazy"
          />
        ) : (
          <p className="text-center">No image provided for the left column.</p>
        )}
      </div>

      {/* Right Column: Rich Text */}
      <div className={`${styles.richTextColumn} flex items-center justify-center order-2`} ref={rightColumnRef}>
        {slice.primary.right_column ? (
          <div className="text-left">
            <PrismicRichText
              field={slice.primary.right_column as RichTextField}
              components={{
                heading3: ({ children }) => <h3 className={styles.heading}>{children}</h3>, // Apply custom heading style
                paragraph: ({ children }) => <p className={styles.text}>{children}</p>, // Apply custom text style
              }}
            />
          </div>
        ) : (
          <p className="text-left">No content provided for the right column.</p>
        )}
      </div>
    </section>
  );
};

export default ImageLeftTextRight;
