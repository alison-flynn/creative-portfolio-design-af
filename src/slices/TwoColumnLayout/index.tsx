"use client";

import { PrismicRichText } from "@prismicio/react";
import { SliceComponentProps } from "@prismicio/react";
import { Content, RichTextField } from "@prismicio/client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./TwoColumnLayout.module.css"; // Import the CSS module

/**
 * Props for TwoColumnLayout.
 */
export type TwoColumnLayoutProps = SliceComponentProps<Content.TwoColumnLayoutSlice>;

/**
 * Component for "TwoColumnLayout" Slices.
 */
const TwoColumnLayout = ({ slice }: TwoColumnLayoutProps): JSX.Element => {
  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (leftColumnRef.current && rightColumnRef.current) {
      gsap.fromTo(
        [leftColumnRef.current, rightColumnRef.current],
        { opacity: 0, y: 50, rotation: 10 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.75)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: leftColumnRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
      {/* Left Column: Rich Text */}
      <div className="flex items-center justify-center order-1 text-left" ref={leftColumnRef}>
        {slice.primary.left_column ? (
          <div className={styles.richTextColumn}> {/* Apply the updated CSS for left column */}
            <PrismicRichText
              field={slice.primary.left_column as RichTextField}
              components={{
                heading3: ({ children }) => (
                  <h3 className={styles.heading}>{children}</h3> // Apply the custom heading style
                ),
                paragraph: ({ children }) => (
                  <p className={styles.text}>{children}</p> // Apply the custom paragraph style
                ),
              }}
            />
          </div>
        ) : (
          <p className="text-left">No content provided for the left column.</p>
        )}
      </div>

      {/* Right Column: Image or Rich Text */}
      <div className="flex items-center justify-center order-2" ref={rightColumnRef}>
        {slice.primary.right_image?.url ? (
          <img
            src={slice.primary.right_image.url}
            alt={slice.primary.right_image.alt || "Right column image"}
            className="rounded-lg w-full h-auto mx-auto"
          />
        ) : slice.primary.right_column ? (
          <div className={styles.richTextColumn}> {/* Apply the updated CSS for right column */}
            <PrismicRichText
              field={slice.primary.right_column as RichTextField}
              components={{
                heading3: ({ children }) => (
                  <h3 className={styles.heading}>{children}</h3> // Apply the custom heading style
                ),
                paragraph: ({ children }) => (
                  <p className={styles.text}>{children}</p> // Apply the custom paragraph style
                ),
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

export default TwoColumnLayout;