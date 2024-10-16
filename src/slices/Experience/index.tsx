import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Heading with Dark Gray Text */}
      <Heading as="h1" size="xl" className="text-[#191919]">
        {slice.primary.heading}
      </Heading>

      {slice.primary.exp.map((item, index) => (
        <div key={index} className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
          {/* Subheading with Dark Gray Text */}
          <Heading as="h1" size="sm" className="text-[#191919]">
            {item.title}
          </Heading>

          {/* Time Period / Institution in Lighter Gray */}
          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-gray-500">
            <span>{item.time_period}</span>{" "}
            <span className="text-3xl font-extralight">/</span>{" "}
            <span>{item.institution}</span>
          </div>

          {/* Rich Text with Dark Gray Text */}
          <div className="prose prose-lg prose-invert mt-4 text-[#191919]">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;
