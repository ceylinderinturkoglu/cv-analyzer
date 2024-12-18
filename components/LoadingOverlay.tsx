import Image from "next/image";
import React from "react";

export default function LoadingOverlay({ status }: { status: string | null }) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-zinc-950/40 backdrop-blur">
      <div className="w-full max-w-[300px] aspect-square relative">
        <Image
          fill
          src="/analyze.gif"
          alt="Loading"
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-contain"
        />
      </div>
      <span className="mt-4 text-slate-300">{status}</span>
    </div>
  );
}
