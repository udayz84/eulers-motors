"use client";

import { useEffect, useMemo, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import {
  CAREER_DEPARTMENTS,
  CAREER_LOCATIONS,
  CAREER_OPENINGS,
  type CareerFilters,
  type CareerOpening,
} from "./types";

type CareerOpenPositionsProps = {
  filters: CareerFilters;
  onChange: (filters: CareerFilters) => void;
};

const PAGE_SIZE = 3;

function CareerCard({
  opening,
  onApply,
  mobileHidden = false,
}: {
  opening: CareerOpening;
  onApply: (opening: CareerOpening) => void;
  mobileHidden?: boolean;
}) {
  const [shareMessage, setShareMessage] = useState("");

  const shareOpening = async () => {
    const url = `${window.location.origin}/careers#open-positions`;
    const shareData = { title: opening.title, text: `Explore this Euler Motors role: ${opening.title}`, url };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage("Opening shared.");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareData.text} ${url}`);
        setShareMessage("Role link copied.");
      } else {
        setShareMessage("Sharing is not supported by this browser.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setShareMessage("Could not share this role. Please try again.");
    }
  };

  return (
    <article className={`${mobileHidden ? "hidden lg:flex" : "flex"} min-w-0 flex-col items-start justify-center gap-3 self-stretch rounded-xl bg-[#f3f4f5] p-4 lg:min-h-[204px] lg:w-full lg:justify-start lg:gap-5`}>
      <div className="flex flex-col items-start gap-3 lg:self-stretch">
        <div className="flex flex-wrap items-center gap-2.5">
          {[opening.department, opening.location, "Full time", opening.experience].map((tag) => (
            <span className="flex flex-col items-start gap-2.5 rounded-[50px] bg-[#d4dbec] px-2.5 py-1 font-sans text-xs font-bold leading-[1.3] text-ink" key={tag}>{tag}</span>
          ))}
        </div>
        <h3 className="m-0 font-display text-base font-semibold leading-[1.4] text-[#121212] lg:self-stretch lg:text-xl lg:leading-[1.4]">{opening.title}</h3>
        <p className="m-0 h-[34.926px] w-[279.543px] max-w-full truncate font-sans text-xs font-normal leading-[1.4] text-[#121212] lg:h-auto lg:w-auto lg:max-w-none lg:self-stretch lg:overflow-visible lg:whitespace-normal lg:text-sm lg:leading-[1.4] lg:[text-overflow:clip]">{opening.description}</p>
      </div>
      <div className="mt-auto flex items-start gap-2.5 self-stretch lg:mt-0 lg:self-stretch">
        <button type="button" className="flex h-11 min-w-0 flex-[1_0_0] items-center justify-center gap-2 rounded bg-ink px-5 font-display text-xs font-bold text-white transition-colors duration-[160ms] hover:bg-navy" onClick={() => onApply(opening)}>
          Apply now
          <span aria-hidden="true">↗</span>
        </button>
        <button
          type="button"
          className="flex size-11 aspect-square shrink-0 items-center justify-center gap-2.5 rounded border border-ink/50 bg-white p-[11px_12px] text-ink hover:bg-mist"
          onClick={shareOpening}
          aria-label={`Share ${opening.title}`}
          title="Share this opening"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-[14px]">
            <path
              d="M9.5 2h4.5v4.5M14 2 7.5 8.5M12 8v5.5H2.5V4h5.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {shareMessage}
      </span>
    </article>
  );
}

export default function CareerOpenPositions({ filters, onChange }: CareerOpenPositionsProps) {
  const [applicationRole, setApplicationRole] = useState<CareerOpening | null>(null);
  const [page, setPage] = useState(1);

  const filteredOpenings = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return CAREER_OPENINGS.filter((opening) => {
      const matchesDepartment = !filters.department || opening.department === filters.department;
      const matchesLocation = !filters.location || opening.location === filters.location;
      const matchesSearch =
        !query ||
        `${opening.title} ${opening.department} ${opening.location} ${opening.description}`
          .toLowerCase()
          .includes(query);
      return matchesDepartment && matchesLocation && matchesSearch;
    });
  }, [filters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredOpenings.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;

  return (
    <section id="open-positions" className="relative flex min-h-[760px] scroll-mt-[88px] flex-col items-center justify-center gap-6 bg-white px-5 py-8 lg:flex lg:min-h-0 lg:w-full lg:flex-col lg:items-start lg:justify-start lg:gap-[10px] lg:px-[max(80px,calc((100vw-1440px)/2+80px))] lg:py-[62px]" aria-labelledby="positions-heading">
      <div className="flex w-full flex-col gap-6 lg:items-start lg:gap-[42px] lg:self-stretch">
        <div className="flex self-stretch flex-col gap-6 lg:w-full lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex flex-col items-start justify-center self-stretch gap-3 lg:w-[646.448px] lg:shrink-0 lg:justify-start lg:gap-4">
            <Eyebrow label="Open positions" />
            <h2 id="positions-heading" className="m-0 w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:w-[646.448px] lg:text-[42px] lg:tracking-[-0.84px]">Build Your Career with Us</h2>
            <p className="m-0 font-sans text-xs font-normal leading-normal text-ink lg:w-[474.189px] lg:text-base">Take the next step with a role where your ideas and work can make a real impact.</p>
          </div>

          <div className="flex min-w-0 flex-col gap-4 lg:relative lg:w-[587px] lg:shrink-0 lg:items-start lg:gap-[19px]">
            <label className="flex h-[46px] items-center gap-3 rounded-[500px] border border-black/[0.04] bg-[#f3f4f5] px-4 text-ink/80 shadow-[0_2px_2px_rgb(0_0_0_/_10%)] focus-within:outline-2 focus-within:outline-brand focus-within:outline-offset-2 lg:justify-between lg:self-stretch lg:py-[3px] lg:pr-[3px] lg:pl-4 lg:shadow-[0_2px_4px_0_rgba(0,0,0,0.10)]">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 shrink-0">
                <circle cx="8.5" cy="8.5" r="5.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="m13 13 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="sr-only">Search open positions</span>
              <input
                className="w-full min-w-0 border-0 bg-transparent font-sans text-sm font-semibold text-ink outline-0 placeholder:text-ink/80 placeholder:opacity-100 lg:text-base"
                type="search"
                value={filters.search}
                onChange={(event) => onChange({ ...filters, search: event.target.value })}
                placeholder="Search here..."
              />
            </label>
            <div className="contents lg:flex lg:flex-col lg:items-start lg:gap-[21px] lg:self-stretch">
            <div className="flex min-w-0 items-start gap-2 overflow-hidden lg:w-full">
              <span className="shrink-0 pt-[11px] font-sans text-sm font-semibold leading-5 text-ink lg:pt-[13px] lg:text-base lg:leading-4">Team</span>
              <div className="relative min-w-0 flex-1 lg:contents">
              <div className="no-scrollbar flex min-w-0 items-center gap-2 overflow-x-auto py-0.5 pb-1.5 lg:py-0 lg:pr-[93px] lg:pb-0">
                <button
                  type="button"
                  className={`h-9 shrink-0 whitespace-nowrap rounded-[400px] border-[0.4px] px-[14px] font-sans text-xs font-semibold transition-colors duration-[160ms] lg:h-auto lg:gap-[6.4px] lg:px-4 lg:py-[13px] lg:text-[16px] lg:leading-4 ${!filters.department ? "border-white bg-[#121212] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%)] text-white" : "border-transparent bg-[#ccc]/[0.32] text-ink hover:bg-[#d4dbec]"}`}
                  aria-pressed={!filters.department}
                  onClick={() => onChange({ ...filters, department: "" })}
                >
                  All
                </button>
                {CAREER_DEPARTMENTS.filter((department) => department !== "Sales").map((department) => (
                  <button
                    type="button"
                    key={department}
                    className={`h-9 shrink-0 whitespace-nowrap rounded-[400px] border-[0.4px] px-[14px] font-sans text-xs font-semibold transition-colors duration-[160ms] lg:h-auto lg:gap-[6.4px] lg:px-4 lg:py-[13px] lg:text-[16px] lg:leading-4 ${filters.department === department ? "border-white bg-[#121212] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%)] text-white" : "border-transparent bg-[#ccc]/[0.32] text-ink hover:bg-[#d4dbec]"}`}
                    aria-pressed={filters.department === department}
                    onClick={() =>
                      onChange({
                        ...filters,
                        department: filters.department === department ? "" : department,
                      })
                    }
                  >
                    {department}
                  </button>
                ))}
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0)_100%)] lg:hidden" />
              </div>
            </div>
            <div className="flex min-w-0 items-start gap-2 overflow-hidden lg:w-full">
              <span className="shrink-0 pt-[11px] font-sans text-sm font-semibold leading-5 text-ink lg:pt-[13px] lg:text-base lg:leading-4">Where</span>
              <div className="relative min-w-0 flex-1 lg:contents">
              <div className="no-scrollbar flex min-w-0 items-center gap-2 overflow-x-auto py-0.5 pb-1.5 lg:py-0 lg:pr-[93px] lg:pb-0">
                <button
                  type="button"
                  className={`h-9 shrink-0 whitespace-nowrap rounded-[400px] border-[0.4px] px-[14px] font-sans text-xs font-semibold transition-colors duration-[160ms] lg:h-auto lg:gap-[6.4px] lg:px-4 lg:py-[13px] lg:text-[16px] lg:leading-4 ${!filters.location ? "border-white bg-[#121212] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%)] text-white" : "border-transparent bg-[#ccc]/[0.32] text-ink hover:bg-[#d4dbec]"}`}
                  aria-pressed={!filters.location}
                  onClick={() => onChange({ ...filters, location: "" })}
                >
                  All
                </button>
                {CAREER_LOCATIONS.map((location) => (
                  <button
                    type="button"
                    key={location}
                    className={`h-9 shrink-0 whitespace-nowrap rounded-[400px] border-[0.4px] px-[14px] font-sans text-xs font-semibold transition-colors duration-[160ms] lg:h-auto lg:gap-[6.4px] lg:px-4 lg:py-[13px] lg:text-[16px] lg:leading-4 ${filters.location === location ? "border-white bg-[#121212] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%)] text-white" : "border-transparent bg-[#ccc]/[0.32] text-ink hover:bg-[#d4dbec]"}`}
                    aria-pressed={filters.location === location}
                    onClick={() =>
                      onChange({
                        ...filters,
                        location: filters.location === location ? "" : location,
                      })
                    }
                  >
                    {location}
                  </button>
                ))}
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0)_100%)] lg:hidden" />
              </div>
            </div>
            </div>
            <div aria-hidden="true" className="pointer-events-none hidden lg:absolute lg:right-0 lg:bottom-0 lg:block lg:h-[105px] lg:w-[93px] lg:bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0)_100%)]" />
          </div>
        </div>

        <div className="flex self-stretch items-center justify-center gap-2.5 lg:w-full lg:justify-between">
          <h3 className="m-0 flex-[1_0_0] font-display text-base font-semibold leading-[1.15] tracking-[-0.32px] text-[#121212] lg:flex-none lg:text-2xl lg:leading-[1.15] lg:tracking-[-0.48px]">
            {filteredOpenings.length} open {filteredOpenings.length === 1 ? "role" : "roles"}
          </h3>
          <p className="m-0 flex items-center gap-2 font-sans text-[10px] font-normal leading-none text-[#121212] lg:text-base lg:font-medium lg:leading-normal lg:text-ink/60">
            {filters.department || "All Teams"}
            <span className="size-1 rounded-full bg-ink/30" aria-hidden="true" />
            {filters.location || "All locations"}
          </p>
        </div>

        {filteredOpenings.length ? (
          <div className="flex flex-col items-start justify-center gap-3 self-stretch lg:grid lg:w-full lg:grid-cols-3 lg:items-stretch lg:gap-5">
            {filteredOpenings.map((opening, index) => (
              <CareerCard
                key={opening.id}
                opening={opening}
                onApply={setApplicationRole}
                mobileHidden={index < pageStart || index >= pageStart + PAGE_SIZE}
              />
            ))}
          </div>
        ) : (
          <p className="m-0 rounded-xl bg-[#f3f4f5] px-4 py-6 font-sans text-sm leading-6 text-ink lg:w-full" role="status">
            No roles match those filters. Try a different team, location, or search term.
          </p>
        )}

        {totalPages > 1 && (
          <nav className="flex self-stretch items-center justify-center gap-2 lg:hidden" aria-label="Open positions pagination">
            <button
              type="button"
              className="flex size-8 aspect-square shrink-0 items-center justify-center rounded-[4.655px] bg-[#212121] p-[13.964px] text-white transition-opacity disabled:opacity-40"
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg aria-hidden="true" viewBox="0 0 4 4" className="size-1 -scale-x-100">
                <path d="M1 .5 3 2 1 3.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="flex w-[38px] items-center justify-center gap-0.5 font-display text-[#121212]" aria-live="polite">
              <span className="text-base font-bold leading-[1.15] tracking-[-0.32px]">{currentPage}</span>
              <span className="text-xs font-normal leading-[1.15] tracking-[-0.24px]">/ {totalPages}</span>
            </span>
            <button
              type="button"
              className="flex size-8 aspect-square shrink-0 items-center justify-center rounded-[4.655px] bg-[#212121] p-[13.964px] text-white transition-opacity disabled:opacity-40"
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <svg aria-hidden="true" viewBox="0 0 4 4" className="size-1">
                <path d="M1 .5 3 2 1 3.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </nav>
        )}
      </div>

      {applicationRole && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/[0.56] p-5" onMouseDown={() => setApplicationRole(null)}>
          <section
            aria-labelledby="application-dialog-title"
            aria-modal="true"
            className="w-full max-w-[480px] rounded-xl bg-white p-7 shadow-[0_20px_60px_rgb(0_0_0_/_20%)]"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <h2 id="application-dialog-title" className="mb-3 mt-0 font-display text-2xl leading-[1.2] text-ink">Apply for {applicationRole.title}</h2>
            <p className="mb-6 mt-0 font-sans text-sm leading-[1.5] text-ink-3">
              Applications are not connected to this website yet. No application has been sent.
              Please use Euler Motors&apos; official recruitment channels to apply.
            </p>
            <button type="button" className="min-h-[42px] rounded bg-ink px-5 font-sans text-sm font-bold text-white" onClick={() => setApplicationRole(null)}>
              Close
            </button>
          </section>
        </div>
      )}
    </section>
  );
}
