"use client";

import { useMemo, useState } from "react";
import CareerBenefits from "@/components/sections/careers/CareerBenefits";
import CareerGallery from "@/components/sections/careers/CareerGallery";
import CareerHero from "@/components/sections/careers/CareerHero";
import CareerOpenPositions from "@/components/sections/careers/CareerOpenPositions";
import CareerSupport from "@/components/sections/careers/CareerSupport";
import CareerTestimonials from "@/components/sections/careers/CareerTestimonials";
import type { CareerFilters } from "@/components/sections/careers/types";
import type { StrapiCareersPageData, StrapiCareerPosition } from "@/types/strapi";

interface CareersClientViewProps {
  data?: StrapiCareersPageData;
  positions?: StrapiCareerPosition[];
}

export default function CareersClientView({ data, positions: initialPositions }: CareersClientViewProps) {
  const [filters, setFilters] = useState<CareerFilters>({
    search: "",
    department: "",
    location: "",
  });

  const positions = useMemo(() => {
    if (data?.positionsSection?.positions && data.positionsSection.positions.length > 0) {
      return data.positionsSection.positions;
    }
    return initialPositions || [];
  }, [data?.positionsSection?.positions, initialPositions]);

  const departments = useMemo(() => {
    if (!positions?.length) return undefined;
    return Array.from(new Set(positions.map((p) => p.department).filter(Boolean)));
  }, [positions]);

  const locations = useMemo(() => {
    if (!positions?.length) return undefined;
    return Array.from(new Set(positions.map((p) => p.location).filter(Boolean)));
  }, [positions]);

  return (
    <>
      <CareerHero
        filters={filters}
        onChange={setFilters}
        data={data?.hero}
        departments={departments}
        locations={locations}
      />
      <CareerBenefits data={data?.benefitsSection} />
      <CareerSupport data={data?.supportSection} />
      <CareerOpenPositions
        filters={filters}
        onChange={setFilters}
        positions={positions}
        sectionData={data?.positionsSection}
      />
      <CareerGallery data={data?.gallerySection} />
      <CareerTestimonials data={data?.testimonialsSection} />
    </>
  );
}

