"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import CareerBenefits from "@/components/sections/careers/CareerBenefits";
import CareerGallery from "@/components/sections/careers/CareerGallery";
import CareerHero from "@/components/sections/careers/CareerHero";
import CareerOpenPositions from "@/components/sections/careers/CareerOpenPositions";
import CareerSupport from "@/components/sections/careers/CareerSupport";
import CareerTestimonials from "@/components/sections/careers/CareerTestimonials";
import type { CareerFilters } from "@/components/sections/careers/types";

export default function CareersPage() {
  const [filters, setFilters] = useState<CareerFilters>({
    search: "",
    department: "",
    location: "",
  });

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <CareerHero filters={filters} onChange={setFilters} />
        <CareerBenefits />
        <CareerSupport />
        <CareerOpenPositions filters={filters} onChange={setFilters} />
        <CareerGallery />
        <CareerTestimonials />
      </main>
      <Footer />
    </>
  );
}
