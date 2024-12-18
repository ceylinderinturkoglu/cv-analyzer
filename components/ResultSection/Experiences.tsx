import { Chip } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function Experiences() {
  const { experiences } = useSelector((state: RootState) => state.resume);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-medium text-lg tracking-widest text-primary-500">
        Deneyimler
      </h2>
      <div className="flex flex-col gap-4">
        {experiences.map((experience, index) => (
          <div className="flex flex-col gap-2" key={index}>
            <div>
              <span className="font-light text-sm">{experience.company}</span>
              <div>{experience.jobTitle}</div>
            </div>
            <div className="text-slate-300 text-sm font-light">
              {experience.start_date} - {experience.end_date}
            </div>
            <div className="text-slate-300 text-sm">
              {experience.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
