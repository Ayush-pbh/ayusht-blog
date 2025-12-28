import type { Metadata } from "next";
// import Link from "next/link";
// import Image from "next/image";
import { H1 } from "@/components/Headings";
// import InlineLink from "@/components/InlineLink";
// import { Ul, Li } from "@/components/List";
// import {
//   Assignar,
//   Celest,
//   Jobsite,
//   Jordyhelps,
//   Kojo,
//   Procore,
//   Silo,
// } from "@/icons";
// import cd5 from "@/public/images/cd5.png";
// import pacifica from "@/public/images/pacifica.png";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The projects I've had the pleasure of working on over the years.",
};

export default function Projects() {
  return (
    <div className="space-y-4">
      <H1>Projects</H1>

      <p>Coming Soon.</p>
    </div>
  );
}
