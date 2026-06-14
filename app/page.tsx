import type { Metadata } from "next";
import { readContent } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <main dangerouslySetInnerHTML={{ __html: readContent("home") }} />;
}
