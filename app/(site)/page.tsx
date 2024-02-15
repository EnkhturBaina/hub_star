import { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Hub star",
  description: "Hub star",
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
