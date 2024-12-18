import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Marker from "./Marker";

export default function Certificates() {
  const [messages, setMessages] = React.useState<string[]>([]);
  const { certificates } = useSelector((state: RootState) => state.resume);

  const { missing_criteria } = useSelector(
    (state: RootState) => state.analysis
  );

  useEffect(() => {
    setMessages([]);
    if (missing_criteria.length > 0) {
      setMessages(
        missing_criteria
          .filter((criteria) => criteria.criteria === "certificates")
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
        Sertifikalar
        {messages.length > 0 && <Marker messages={messages} />}
      </h2>
      <div className="flex flex-col gap-4">
        {certificates.map((certificate, index) => (
          <div className="flex flex-col" key={index}>
            <span className="font-light text-sm">{certificate.source}</span>
            <span>{certificate.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
