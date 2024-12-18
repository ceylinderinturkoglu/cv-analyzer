import React from "react";
import About from "./About";
import Skills from "./Skills";
import Experiences from "./Experiences";
import Educations from "./Educations";
import Projects from "./Projects";
import Certificates from "./Certificates";
import References from "./References";
import Contact from "./Contact";
import Additional from "./Additional";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Languages from "./Languages";

export default function Body() {
  const {
    about,
    gender,
    militaryStatus,
    skills,
    experiences,
    educations,
    projects,
    certificates,
    languages,
    references,
    contact,
  } = useSelector((state: RootState) => state.resume);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {about && <About />}
        {(gender || militaryStatus) && <Additional />}
      </div>
      {skills.length > 0 && <Skills />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {experiences.length > 0 && <Experiences />}
        {educations.length > 0 && <Educations />}
        {projects.length > 0 && <Projects />}
        {languages.length > 0 && <Languages />}
        {certificates.length > 0 && <Certificates />}
        {references.length > 0 && <References />}
        <Contact />
      </div>
    </div>
  );
}
