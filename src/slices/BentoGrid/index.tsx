"use client"; // Add this to mark the component as a Client Component

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Props for BentoGrid.
 */
export type BentoGridProps = SliceComponentProps<Content.BentoGridSlice>;

/**
 * Bento Grid component.
 */
const BentoGrid = ({ slice }: BentoGridProps): JSX.Element => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gridItems = gridRef.current?.querySelectorAll(".bento-item");

    if (gridItems) {
      gsap.fromTo(
        gridItems,
        {
          opacity: 0,
          y: 50, // Start position: below the viewport
        },
        {
          opacity: 1,
          y: 0, // End position: back to original
          duration: 1,
          ease: "power2.out",
          stagger: 0.2, // Animate each item one after another
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%", // Start the animation when the top of the grid is 80% into the viewport
            toggleActions: "play none none none", // Only play the animation once
          },
        }
      );
    }
  }, []);

  // Determine the number of items in the bento grid
  const itemCount = slice.primary.bento_grid_items.length;

  // Determine the grid configuration based on the number of items
  const gridColsClass = itemCount === 4 ? "grid-cols-2" : "lg:grid-cols-3";

  return (
    <section className="py-12 px-4 md:px-12">
      <div
        ref={gridRef}
        className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-6`}
      >
        {/* Loop through each grid item */}
        {slice.primary.bento_grid_items.map((item, index) => (
          <div
            key={index}
            className="bento-item relative overflow-hidden group rounded-lg shadow-lg"
          >
            {/* Image */}
            {item.image && (
              <PrismicNextImage
                field={item.image}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {/* Overlay with Title and Description on Hover */}
            {(item.title || item.description) && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 p-4">
                {item.title && (
                  <div className="text-white font-bold text-lg mb-2">
                    {/* Reduced the font size from text-xl to text-lg */}
                    <PrismicRichText field={item.title} />
                  </div>
                )}
                {item.description && (
                  <div className="text-gray-300 text-sm text-center">
                    {/* Reduced the font size by adding text-sm for description */}
                    <PrismicRichText field={item.description} />
                  </div>
                )}
              </div>
            )}

            {/* Optional Link to Figjam file */}
            {item.figjam && (
              <PrismicNextLink field={item.figjam}>
                <span className="absolute inset-0" />
              </PrismicNextLink>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
