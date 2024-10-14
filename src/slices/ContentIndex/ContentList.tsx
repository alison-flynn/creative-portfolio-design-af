import { asImageSrc, Content, isFilled } from "@prismicio/client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[] | undefined;
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
};

export default function ContentList({
  items = [], // Default to an empty array if items is undefined
  contentType,
  fallbackItemImage,
  viewMoreText = "Read More",
}: ContentListProps) {
  const component = useRef<HTMLDivElement | null>(null);
  const [currentItem, setCurrentItem] = useState<null | number>(null);

  const urlPrefix = contentType === "Blog" ? "/blog_post" : "/project";

  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.3,
              ease: "elastic.out(1,0.3)",
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=100px",
                end: "bottom center",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
      return () => ctx.revert();
    }, component);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      let ctx = gsap.context(() => {
        if (currentItem !== null && revealRef.current) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: "back.out(2)",
            duration: 1.3,
          });
          gsap.to(revealRef.current, {
            opacity: hovering ? 1 : 0,
            visibility: "visible",
            ease: "power3.out",
            duration: 0.4,
          });
        }
        lastMousePos.current = mousePos;
      }, component);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hovering, currentItem]);

  const onMouseEnter = (index: number) => {
    setCurrentItem(index);
    if (!hovering) setHovering(true);
  };

  const onMouseLeave = () => {
    setHovering(false);
    setCurrentItem(null);
  };

  const contentImages = items.map((item) => {
    const image = isFilled.image(item.data.hover_image)
      ? item.data.hover_image
      : fallbackItemImage;

    return asImageSrc(image, {
      fit: "crop",
      w: 220,
      h: 320,
      exp: -10,
    });
  });

  useEffect(() => {
    contentImages.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  }, [contentImages]);

  return (
    <div ref={component} className="w-full">
      {/* Set a border under each list item */}
      <ul className="w-full grid border-b border-b-gray-400" onMouseLeave={onMouseLeave}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <React.Fragment key={item.uid || index}>
              {isFilled.keyText(item.data.title) && (
                <li
                  className="list-item opacity-0 w-full border-b border-gray-400 last:border-b-0" // Add border for each item
                  onMouseEnter={() => onMouseEnter(index)}
                  ref={(el: HTMLLIElement | null) => {
                    itemsRef.current[index] = el;
                  }}
                >
                  <Link
                    href={`${urlPrefix}/${item.uid}`}
                    className="flex flex-col justify-between w-full py-10 text-[#191919] md:flex-row"
                    aria-label={item.data.title}
                  >
                    <div className="flex gap-3 flex-col">
                      <span className="text-3xl font-bold">{item.data.title}</span>
                      <div className="flex gap-3 text-yellow-400 text-lg font-bold">
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
                      {viewMoreText} <MdArrowOutward />
                    </span>
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </ul>
      <div
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-over bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage: currentItem !== null ? `url(${contentImages[currentItem]})` : "",
        }}
        ref={revealRef}
      />
    </div>
  );
}
