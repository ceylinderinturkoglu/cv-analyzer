import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Marker from "./Marker";

export default function Languages() {
  const [messages, setMessages] = React.useState<string[]>([]);
  const { languages } = useSelector((state: RootState) => state.resume);

  const { missing_criteria } = useSelector(
    (state: RootState) => state.analysis
  );

  useEffect(() => {
    setMessages([]);
    if (missing_criteria.length > 0) {
      setMessages(
        missing_criteria
          .filter((criteria) => criteria.criteria === "languages")
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
        Diller
        {messages.length > 0 && <Marker messages={messages} />}
      </h2>
      <div className="flex flex-col gap-2">
        {languages.map((language, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <span>{language.language}</span>
            <span className="font-light text-sm">{language.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
