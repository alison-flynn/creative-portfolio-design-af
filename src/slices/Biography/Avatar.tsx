'use client';

import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type AvatarProps = {
    image: ImageField;
    className?: string;
};

export default function Avatar({ image, className }: AvatarProps) {
    const component = useRef(null);

    useEffect(() => {
        // Initial animation for scaling and opacity on page load
        gsap.fromTo(
            ".avatar",
            { opacity: 0, scale: 1.4 },
            { scale: 1, opacity: 1, duration: 1.3, ease: "power3.inOut" }
        );

        // Mouse movement logic for avatar
        window.onmousemove = (e) => {
            if (!component.current) return;
            const componentRect = (component.current as HTMLElement).getBoundingClientRect();
            const componentCenterX = componentRect.left + componentRect.width / 2;

            let componentPercent = {
                x: (e.clientX - componentCenterX) / componentRect.width / 2
            };

            gsap.timeline({
                defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" }
            })
            .to(
                ".avatar",
                {
                    rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
                    duration: 0.5,
                },
                0
            );
        };
    }, []);

    return (
        <div ref={component} className={clsx("relative", className)}>
            {/* Responsive sizes: small screens (w-48) and larger screens (w-72) */}
            <div className="avatar relative overflow-hidden rounded-3xl border-2 border-grey-500 group w-48 h-48 md:w-72 md:h-72">
                <PrismicNextImage
                    field={image}
                    className="avatar-image h-full w-full object-fill"
                    imgixParams={{ q: 90 }}
                />
                {/* The sheen will only appear on hover */}
                <div className="highlight absolute inset-0 w-full h-full scale-110 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.3)] to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
            </div>
        </div>
    );
}
