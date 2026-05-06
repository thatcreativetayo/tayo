import type { Metadata } from "next";
import projectsData from "@/data/projects.json";

const BASE_URL = "https://tayoeyitayo.com";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = projectsData.projects.find((p) => p.id === params.id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const url = `${BASE_URL}/projects/${project.id}`;

  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.description,
    keywords: project.tags,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
      creator: "@_that_creative_",
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
