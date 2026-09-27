import type { Metadata } from "next";
import { getAllProjects, projectHref } from "@/lib/projects";
import IndexList from "@/components/IndexList";

const promise =
  "The projects I've had the pleasure of working on over the years.";

export const metadata: Metadata = {
  title: "Projects",
  description: promise,
};

export default function Projects() {
  const projects = getAllProjects();

  return (
    <div>
      <header className="rise mb-10">
        <h1 className="text-title font-serif text-neutral-900">Projects</h1>
        <p className="text-lede mt-4 max-w-[46ch] font-serif text-neutral-500">
          {promise}
        </p>
      </header>

      <IndexList
        entries={projects.map((project) => ({
          key: project.slug,
          href: projectHref(project),
          title: project.title,
          description: project.description,
          date: project.date,
          badges: project.waitlist ? ["waitlist"] : [],
        }))}
      />
    </div>
  );
}
