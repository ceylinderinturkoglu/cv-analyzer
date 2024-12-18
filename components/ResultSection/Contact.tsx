import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function Contact() {
  const { contact } = useSelector((state: RootState) => state.resume);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-lg tracking-widest text-primary-500">
        İletişim
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="font-light text-sm text-slate-300">Email</span>
          <Link
            href={`mailto:${contact.email}`}
            className="hover:text-primary-500 transition-colors"
          >
            {contact.email}
          </Link>
        </div>
        <div className="flex flex-col">
          <span className="font-light text-sm text-slate-300">Phone</span>
          <Link
            href={`tel:${contact.phone}`}
            className="hover:text-primary-500 transition-colors"
          >
            {contact.phone}
          </Link>
        </div>
        <div className="flex flex-col">
          <span className="font-light text-sm text-slate-300">Address</span>
          <span>{contact.address}</span>
        </div>
        {contact.links.map((link, index) => (
          <div className="flex flex-col" key={index}>
            <span className="font-light text-sm text-slate-300">
              {link.name}
            </span>
            <Link
              target="_blank"
              href={`http://${link.url}`}
              className="hover:text-primary-500 transition-colors"
            >
              {link.url}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
