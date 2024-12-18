import React from "react";
import ResultHeader from "./Header";
import ResultBody from "./Body";
import ScrollButton from "../ScrollButton";

export default function ResultSection() {
  return (
    <div
      className="relative min-h-screen flex flex-col justify-center gap-10 p-4 pt-28"
      id="resume"
    >
      <ResultHeader />
      <ResultBody />
      <ScrollButton
        direction="up"
        text="Kriterleri Düzenle"
        id="criteria"
        position="center-top"
      />
    </div>
  );
}
