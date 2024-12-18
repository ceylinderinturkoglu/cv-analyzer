import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Marker from "./Marker";

export default function Educations() {
  const [messages, setMessages] = React.useState<string[]>([]);
  const { educations } = useSelector((state: RootState) => state.resume);

  const { missing_criteria } = useSelector(
    (state: RootState) => state.analysis
  );

  useEffect(() => {
    setMessages([]);
    if (missing_criteria.length > 0) {
      setMessages(
        missing_criteria
          .filter((criteria) => criteria.criteria === "educationStatus")
          .flatMap((criteria) => {
            return criteria.missing.map((missing) => {
              return `${missing.label} ${missing.description}`;
            });
          })
      );
    }
  }, [missing_criteria]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-medium text-lg tracking-widest text-primary-500 flex items-center">
        Eğitim
        {messages.length > 0 && <Marker messages={messages} />}
      </h2>
      <div className="flex flex-col gap-4">
        {educations.map((education, index) => (
          <div className="flex flex-col gap-2" key={index}>
            <div>
              <span className="font-light text-sm">
                {education.institution}
              </span>
              <div>{education.degree}</div>
            </div>
            <div className="text-slate-300 text-sm">
              <span className="font-light">{education.degree}</span> •{" "}
              <span>
                {education.start_date} - {education.end_date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
