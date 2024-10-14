import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

// Load the Urbanist font from Google Fonts
const urbanist = Urbanist({ subsets: ["latin"] });

// Correctly named metadata generation function
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-100 text-[#191919]"> {/* Light Gray Background */}
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        {/* Header component */}
        <Header />
        
        {/* Main content (children passed as props) */}
        {children}
        
        {/* Footer component */}
        <Footer />

        {/* Background gradient elements */}
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/olga-thelavart-vS3idIiYxX0-unsplash.jpg')] opacity-10 mix"></div>

       
      </body>
      {/* Prismic Preview inside the body */}
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
