import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

// Define the content type as a constant
const CONTENT_TYPE = "page"; // Change to "blog" or other types if needed

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  try {
    // Fetch the page by its UID using the specified content type
    const page = await client.getByUID(CONTENT_TYPE, params.uid);

    // Render the page content using SliceZone if the page exists
    if (page && page.data) {
      return <SliceZone slices={page.data.slices} components={components} />;
    } else {
      return notFound(); // Handle 404 if the page is not found
    }
  } catch (error) {
    console.error(`Error fetching page with UID ${params.uid}:`, error);
    return notFound(); // Handle 404 if there's an error
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();

  try {
    // Fetch metadata for the page by its UID using the specified content type
    const page = await client.getByUID(CONTENT_TYPE, params.uid);

    if (page && page.data) {
      return {
        title: page.data.meta_title || "Default Page Title", // Fallback to default title
        description: page.data.meta_description || "Default Page Description", // Fallback to default description
      };
    } else {
      return {
        title: "Page Not Found", // Default title for 404
        description: "The page you are looking for does not exist.", // Default description for 404
      };
    }
  } catch (error) {
    console.error(`Error fetching metadata for page with UID ${params.uid}:`, error);
    return {
      title: "Error",
      description: "Error fetching metadata",
    };
  }
}

export async function generateStaticParams() {
  const client = createClient();

  try {
    // Fetch all pages of the specified content type
    const pages = await client.getAllByType(CONTENT_TYPE);

    // Generate static params based on the UID of each page
    return pages.map((page) => ({
      uid: page.uid,
    }));
  } catch (error) {
    console.error("Error fetching pages for static params:", error);
    return [];
  }
}
