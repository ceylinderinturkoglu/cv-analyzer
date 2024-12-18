import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Marker from "./Marker";

export default function Header() {
  const [messages, setMessages] = React.useState<string[]>([]);
  const { name, jobTitle } = useSelector((state: RootState) => state.resume);
  const { matching_percentage } = useSelector(
    (state: RootState) => state.analysis
  );

  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    if (matching_percentage !== null) {
      const difference = Math.abs(matching_percentage - animatedPercentage);
      const increment = Math.max(Math.ceil(difference / 50), 1);
      const direction = matching_percentage > animatedPercentage ? 1 : -1;

      const interval = setInterval(() => {
        setAnimatedPercentage((prev) => {
          const nextValue = prev + increment * direction;
          if (
            (direction === 1 && nextValue >= matching_percentage) ||
            (direction === -1 && nextValue <= matching_percentage)
          ) {
            clearInterval(interval);
            return matching_percentage;
          }
          return nextValue;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [matching_percentage, animatedPercentage]);

  const colorClass = getColorClass(animatedPercentage);

  const { missing_criteria } = useSelector(
    (state: RootState) => state.analysis
  );

  useEffect(() => {
    setMessages([]);
    if (missing_criteria.length > 0) {
      setMessages(
        missing_criteria
          .filter((criteria) => criteria.criteria === "jobTitle")
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
      {matching_percentage !== null && (
        <span
          className={`text-3xl font-semibold subpixel-antialiased tracking-wide ${colorClass}`}
        >
          {animatedPercentage}%
        </span>
      )}
      <div className="flex flex-col gap-2">
        {name && (
          <h1 className="text-5xl font-semibold subpixel-antialiased tracking-wide">
            {name}
          </h1>
        )}
        {jobTitle && (
          <span className="text-3xl font-light text-slate-300 subpixel-antialiased tracking-wide">
            {jobTitle}
            {messages.length > 0 && <Marker messages={messages} />}
          </span>
        )}
      </div>
    </div>
  );
}

function getColorClass(value: number): string {
  if (value >= 90) return "text-green-600";
  if (value >= 80) return "text-green-500";
  if (value >= 70) return "text-green-400";
  if (value >= 60) return "text-yellow-400";
  if (value >= 50) return "text-yellow-500";
  if (value >= 40) return "text-orange-400";
  if (value >= 30) return "text-orange-500";
  if (value >= 20) return "text-red-400";
  return "text-red-500";
}
