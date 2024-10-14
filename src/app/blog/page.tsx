import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  try {
    const page = await client.getByUID("blog_post", params.uid);

    if (!page || !page.data) {
      console.error(`Blog post not found with UID: ${params.uid}`);
      return notFound();
    }

    return <SliceZone slices={page.data.slices} components={components} />;
  } catch (error) {
    console.error(`Error fetching blog post with UID ${params.uid}:`, error);
    return notFound();
  }
}

// Generate metadata for SEO purposes
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();

  try {
    const page = await client.getByUID("blog_post", params.uid);

    if (!page || !page.data) {
      console.error(`Blog post metadata not found with UID: ${params.uid}`);
      return {
        title: "Default Blog Title",
        description: "Default Blog Description",
      };
    }

    return {
      title: page.data.meta_title || "Default Blog Title",
      description: page.data.meta_description || "Default Blog Description",
    };
  } catch (error) {
    console.error(`Error fetching blog post metadata with UID ${params.uid}:`, error);
    return {
      title: "Error",
      description: "Error fetching metadata",
    };
  }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const client = createClient();

  try {
    const pages = await client.getAllByType("blog_post");

    if (!pages || pages.length === 0) {
      console.error("No blog posts found");
      return [];
    }

    return pages.map((page) => ({
      uid: page.uid,
    }));
  } catch (error) {
    console.error("Error fetching blog posts for static params:", error);
    return [];
  }
}
