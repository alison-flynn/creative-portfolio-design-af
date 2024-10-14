import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Avatar from "./Avatar";
import { Content } from "@prismicio/client";

/**
 * Props for Biography.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        {/* Heading with Dark Gray/Black */}
        <Heading as="h1" size="xl" className="col-start-1 text-[#191919]">
          {slice.primary.heading}
        </Heading>

        {/* Adjusted Description Section to match Date/Institution padding from Experience */}
        <div className="prose prose-xl prose-neutral prose-invert col-start-1 mt-4 ml-12 text-[#191919]">
          <PrismicRichText field={slice.primary.description} />
        </div>

        {/* Button with the same left margin (ml-12) */}
        <Button
          linkField={slice.primary.button_link}
          label={slice.primary.button_text}
          className="ml-12 hover:bg-yellow-400"  // Added ml-12 here for left margin
        />

        {/* Avatar with Sunset-Inspired Border */}
        <Avatar
          image={slice.primary.avatar}
          className="row-start-1 max-w-sm md:col-start-2 md:row-end-3 border-orange-400"
        />
      </div>
    </Bounded>
  );
};

export default Biography;
