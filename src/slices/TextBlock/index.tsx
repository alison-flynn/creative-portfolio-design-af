"use client";

import { PrismicRichText } from "@prismicio/react";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from './TextBlock.module.css'; // Import the CSS module

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  const textBlockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textBlockRef.current) {
      gsap.fromTo(
        textBlockRef.current,
        { opacity: 0, y: 50, x: -20 }, // Dynamic movement
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1.5,
          ease: "expo.out", // More dynamic easing
          scrollTrigger: {
            trigger: textBlockRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  // Check if there is an h3 and if it's the only content
  const hasHeading = slice.primary.text.some(block => block.type === 'heading3');
  const hasOnlyHeading = slice.primary.text.every(block => block.type === 'heading3');
  
  // Apply the appropriate CSS class based on the content
  const sectionClassName = hasOnlyHeading
    ? styles.textBlockOnlyHeading // Only contains an h3
    : hasHeading
    ? styles.textBlockSectionWithHeading // Contains both h3 and other content
    : styles.textBlockSectionWithoutHeading; // Only contains paragraph text

  return (
    <section className={`${sectionClassName} w-full p-0`} ref={textBlockRef}>
      <div className={`${styles.richTextColumn} max-w-none px-8 py-12`}>
        <PrismicRichText
          field={slice.primary.text}
          components={{
            heading3: ({ children }) => (
              <h3 className={styles.heading}>{children}</h3> // Custom heading style
            ),
            paragraph: ({ children }) => (
              <p className={styles.text}>{children}</p> // Custom paragraph style
            ),
          }}
        />
      </div>
    </section>
  );
};

export default TextBlock;
