import type { Metadata } from "next";
import ProductsPage from "@/app/products/page";

export const metadata: Metadata = {
  title: "Storm EV LR 200 | Euler Motors - Commercial 4-Wheeler EV",
  description:
    "Built for long city and highway runs. 1,200 kg payload, 200 km range, and liquid-cooled battery technology.",
};

export default function Lr200Page() {
  return <ProductsPage />;
}
