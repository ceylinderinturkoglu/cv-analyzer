import { Chip, Tooltip } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Marker from "./Marker";

export default function Skills() {
  const [messages, setMessages] = React.useState<string[]>([]);
  const { skills } = useSelector((state: RootState) => state.resume);

  const { missing_criteria } = useSelector(
    (state: RootState) => state.analysis
  );

  useEffect(() => {
    setMessages([]);
    if (missing_criteria.length > 0) {
      setMessages(
        missing_criteria
          .filter((criteria) => criteria.criteria === "skills")
          .flatMap((criteria) => {
            return criteria.missing.map((missing) => {
              return `${missing.label} ${missing.description}`;
            });
          })
      );
    }
  }, [missing_criteria]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-lg tracking-widest text-primary-500">
        Beceriler
        {messages.length > 0 && <Marker messages={messages} />}
      </h2>
      <div className="flex gap-2 flex-wrap">
        {skills.map((skill, index) => (
          <Chip variant="flat" key={index}>
            <span className="font-semibold">{skill.skill}</span>
            {skill.experience && <span> | {skill.experience} Yıl</span>}
          </Chip>
        ))}
      </div>
    </div>
  );
}
