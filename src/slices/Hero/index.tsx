"use client"; // Mark this as a Client Component

import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1, 0.3)",
          duration: 1,
          transformOrigin: "left top",
          delay: 0.5,
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      );

      tl.fromTo(
        ".job-title",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
        }
      );
    }, component);

    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[30vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes />
        <div className="col-start-1 md:row-start-1 mt-0 md:mt-[-5vh]">
          <h1
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={slice.primary.first_name + " " + slice.primary.last_name}
          >
            {/* First Name in Light Gray */}
            <span className="block text-[#B0A0C4]">
              {renderLetters(slice.primary.first_name, "first")}
            </span>

            {/* Last Name in Dark Gray (#191919) */}
            <span className="-mt-[.2em] block text-[#708090]">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>

          {/* Job Title with Yellow Gradient and Shadow */}
          <span
            className="job-title block bg-gradient-to-tr from-lavender-600 via-lavender-400 to-lavender-600 bg-clip-text text-2xl font-bold uppercase tracking-[.15em] text-yellow-500 opacity-100 md:text-4xl"
            style={{
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)", // Soft glow for better visibility
            }}
          >
            {slice.primary.tag_line} {/* This will render "Junior UX Designer" in yellow */}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
