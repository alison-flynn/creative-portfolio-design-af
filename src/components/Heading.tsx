import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
};

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-bold leading-tight tracking-tight text-[#B0A0C4]", // Use Soft Gold for the Heading
        size === "xl" && "text-6xl md:text-8xl", // Adjust size for better balance
        size === "lg" && "text-5xl md:text-6xl", // Change for better readability
        size === "md" && "text-4xl md:text-5xl",
        size === "sm" && "text-3xl md:text-4xl",
        className
      )}
    >
      {children}
    </Comp>
  );
}
