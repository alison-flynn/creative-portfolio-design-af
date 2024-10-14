"use client"; // Mark this as a Client Component

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          markers: false,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        }
      );
    }, component);
    return () => ctx.revert(); // Clean Up
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
      ref={component}
    >
      <Bounded as="div" className="overflow-hidden">
        <Heading size="xl" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>

      {slice.primary.tech.map((item, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-[#D3D3D3] z-10" // Changed to light grey
          aria-label={item.tech_name || undefined}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className="tech-item text-5xl font-extrabold uppercase tracking-tight" // Reduced text size from 8xl to 5xl
                style={{
                  color: index === 7 && item.tech_color ? item.tech_color : "inherit", // Retains custom color for specific tech
                }}
              >
                {item.tech_name}
              </span>

              <span className="text-2xl"> {/* Reduced icon size */}
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
