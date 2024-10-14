"use client";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({ slice }: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");

  const contentType = slice.primary.content_type || "Blog";
  const items = contentType === "Blog" ? blogPosts : projects;
  const urlPrefix = contentType === "Blog" ? "/blog" : "/projects";

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      {/* Heading with Dark Gray Text */}
      <Heading size="xl" className="mb-8 text-[#191919]">
        {slice.primary.heading}
      </Heading>

      {/* Rich Text Description with Dark Gray Text */}
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10 text-[#191919]">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      {/* Pass content to ContentList */}
      <ContentList
        items={items}
        contentType={contentType}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image} // Only pass the image field
      />
    </Bounded>
  );
};

export default ContentIndex;
