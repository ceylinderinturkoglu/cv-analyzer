import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function References() {
  const { references } = useSelector((state: RootState) => state.resume);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-lg tracking-widest text-primary-500">
        Referanslar
      </h2>
      <div className="flex flex-col gap-4">
        {references.map((reference, index) => (
          <div className="flex flex-col gap-2" key={index}>
            <div>
              <span className="font-light text-sm">{reference.jobTitle}</span>
              <div>{reference.fullname}</div>
            </div>
            <div className="text-slate-300 text-sm flex flex-col gap-1">
              <Link
                href={`mailto:${reference.contact.email}`}
                className="hover:text-primary-500 transition-colors"
              >
                {reference.contact.email}
              </Link>
              <Link
                href={`tel:${reference.contact.phone}`}
                className="hover:text-primary-500 transition-colors"
              >
                {reference.contact.phone}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
