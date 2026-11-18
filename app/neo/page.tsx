import type { Metadata } from "next";
import NeoHome from "./NeoHome";

export const metadata: Metadata = {
  title: "NEO by Euler | More trips. Less kharcha.",
  description:
    "Meet NEO by Euler. Electric three-wheelers designed around real drives, lower running costs and everyday work.",
};

export default function NeoPage() {
  return <NeoHome />;
}
