import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Marker from "./Marker";

export default function Additional() {
  const [messages, setMessages] = React.useState<string[]>([]);
  const { gender, militaryStatus } = useSelector(
    (state: RootState) => state.resume
  );

  const { missing_criteria } = useSelector(
    (state: RootState) => state.analysis
  );

  useEffect(() => {
    setMessages([]);
    if (missing_criteria.length > 0) {
      setMessages(
        missing_criteria
          .filter(
            (criteria) =>
              criteria.criteria === "gender" ||
              criteria.criteria === "militaryStatus"
          )
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
        Eklemeler
        {messages.length > 0 && <Marker messages={messages} />}
      </h2>
      <div className="flex gap-4">
        {gender && (
          <div className="flex flex-col">
            <span className="font-light text-sm text-slate-300">Cinsiyet</span>
            <span>{gender}</span>
          </div>
        )}
        {militaryStatus && (
          <div className="flex flex-col">
            <span className="font-light text-sm text-slate-300">
              Askerlik Durumu
            </span>
            <span>{militaryStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
}
