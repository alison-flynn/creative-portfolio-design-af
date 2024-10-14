import { SliceZone } from "@prismicio/react";
import { components } from "@/slices"; // Keep this import as it was
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, DateField, isFilled } from "@prismicio/client";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  // Date formatting function
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-IE", dateOptions).format(
        new Date(date)
      );
    }
  }

  const formattedDate = formatDate(page.data.date);

  return (
    <Bounded as="article">
      {/* Background set to #191919 */}
      <div className="rounded-2xl border-2 border-neutral-800 bg-neutral-900 px-4 py-10 md:px-6 md:py-16">
        {/* Title centered and styled with white color */}
        <Heading as="h1" className="mb-4 text-white text-center">
          {page.data.title}
        </Heading>

        {/* Tags centered with reduced gap */}
        <div className="mt-2 flex gap-2 justify-left text-[#F5CB00] text-lg font-bold">
          {page.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {/* Date centered with reduced margin and light text */}
        <p className="mt-4 border-b border-[#F5CB00] text-lg font-medium text-[#B0A0C4] pb-4 text-left">
          {formattedDate}
        </p>

        {/* SliceZone with reduced margin */}
        <div className="prose prose-lg prose-invert mt-8 w-full max-w-none text-left">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
