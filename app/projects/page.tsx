import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects, projectHref } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The projects I've had the pleasure of working on over the years.",
};

export default function Projects() {
  const projects = getAllProjects();

  return (
    <div className="space-y-1">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={projectHref(project)}
          className="group relative flex justify-between transition-colors hover:text-neutral-900"
        >
          <div className="absolute top-[10px] left-0 w-full border-t border-neutral-200 transition-colors group-hover:border-neutral-900" />
          <h2 className="relative block bg-neutral-50 pr-2 text-left">
            {project.title}
            {project.waitlist && (
              <span className="text-2xs ml-2 font-mono text-neutral-400 uppercase">
                waitlist
              </span>
            )}
          </h2>
          <time className="relative ml-2 block bg-neutral-50 pl-2 whitespace-nowrap text-neutral-500 transition-colors group-hover:text-neutral-900">
            {project.date}
          </time>
        </Link>
      ))}
    </div>
  );
}
