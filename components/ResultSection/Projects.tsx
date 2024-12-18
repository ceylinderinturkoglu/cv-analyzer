import React from "react";
import { Chip } from "@nextui-org/react";
import { MdOutlineSource } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function Projects() {
  const { projects } = useSelector((state: RootState) => state.resume);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-lg tracking-widest text-primary-500">
        Projeler
      </h2>
      <div className="flex flex-col gap-4">
        {projects.map((project, index) => (
          <div className="flex flex-col gap-2" key={index}>
            <span>{project.title}</span>
            {(project.source || project.website) && (
              <div className="flex gap-2">
                {project.source && (
                  <Link
                    target="_blank"
                    href={`http://${project.source}`}
                    className="text-lg hover:text-primary-500 transition-colors"
                  >
                    <MdOutlineSource />
                  </Link>
                )}
                {project.website && (
                  <Link
                    target="_blank"
                    href={`http://${project.website}`}
                    className="text-lg hover:text-primary-500 transition-colors"
                  >
                    <IoEyeOutline />
                  </Link>
                )}
              </div>
            )}
            {project.description && project.description.length > 0 && (
              <div className="text-slate-300 text-sm">
                {project.description}
              </div>
            )}
            {project.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <Chip size="sm" variant="flat" key={index}>
                    {skill}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
