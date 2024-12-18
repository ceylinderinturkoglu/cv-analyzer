import { Head } from "./head";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden">
      <Head />
      <main className="flex flex-col gap-4">{children}</main>
    </div>
  );
}
