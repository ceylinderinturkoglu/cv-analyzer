import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function About() {
  const { about } = useSelector((state: RootState) => state.resume);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-lg tracking-widest text-primary-500">
        Hakkında
      </h2>
      <p className="text-slate-300">{about}</p>
    </div>
  );
}
