"use client";

import { useEffect, useMemo, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import {
  type CareerFilters,
  type CareerOpening,
} from "./types";
import type { StrapiCareerPosition, StrapiCareerPositionsSection } from "@/types/strapi";

type ExtendedCareerOpening = CareerOpening & {
  applyUrl?: string;
  employmentType?: string;
};

type CareerOpenPositionsProps = {
  filters: CareerFilters;
  onChange: (filters: CareerFilters) => void;
  positions?: StrapiCareerPosition[];
  sectionData?: StrapiCareerPositionsSection;
};

const PAGE_SIZE = 3;

function CareerCard({
  opening,
  onApply,
  mobileHidden = false,
}: {
  opening: ExtendedCareerOpening;
  onApply: (opening: ExtendedCareerOpening) => void;
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

  const handleApplyClick = () => {
    if (opening.applyUrl) {
      window.open(opening.applyUrl, "_blank", "noopener,noreferrer");
    } else {
      onApply(opening);
    }
  };

  return (
    <article
      className={`${
        mobileHidden ? "hidden lg:flex" : "flex"
      } min-w-0 flex-col items-start justify-between self-stretch rounded-[12px] bg-[#f3f4f5] p-4 lg:min-h-[204px] lg:h-full lg:w-full lg:gap-[12px]`}
    >
      <div className="flex w-full flex-col items-start gap-2.5 lg:gap-[12px]">
        <div className="flex flex-wrap items-center gap-1.5 lg:gap-2 xl:gap-[10px]">
          {[opening.department, opening.location, opening.employmentType, opening.experience].filter(Boolean).map((tag) => (
            <span
              className="flex h-[24px] items-center rounded-[50px] bg-[#d4dbec] px-[10px] text-xs font-bold leading-4 text-black"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="m-0 w-full truncate font-display text-base font-semibold leading-[1.4] text-[#121212] lg:min-h-[28px] lg:h-auto lg:text-xl lg:leading-[1.4]">
          {opening.title}
        </h3>
        <p className="m-0 line-clamp-2 w-full font-sans text-xs font-normal leading-[1.4] text-[#121212] lg:min-h-[40px] lg:h-auto lg:text-sm lg:leading-[1.4]">
          {opening.description}
        </p>
      </div>
      <div className="flex w-full items-center gap-[10px] pt-1 lg:pt-0">
        <button
          type="button"
          className="flex h-[44px] min-w-0 flex-[1_0_0] items-center justify-center gap-2 rounded-[4px] bg-[#121212] px-5 font-display text-xs font-bold text-white transition-colors duration-[160ms] hover:bg-navy"
          onClick={handleApplyClick}
        >
          Apply now
          <span aria-hidden="true">↗</span>
        </button>
        <button
          type="button"
          className="flex size-[44px] aspect-square shrink-0 items-center justify-center rounded-[4px] border border-black/50 bg-white text-ink hover:bg-mist"
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

export default function CareerOpenPositions({
  filters,
  onChange,
  positions,
  sectionData,
}: CareerOpenPositionsProps) {
  const [applicationRole, setApplicationRole] = useState<ExtendedCareerOpening | null>(null);
  const [page, setPage] = useState(1);

  const eyebrow = sectionData?.eyebrow || "";
  const title = sectionData?.title || "";
  const subtitle = sectionData?.subtitle || "";

  const openingsList: ExtendedCareerOpening[] = useMemo(() => {
    return (positions || []).map((p) => ({
      id: p.slug || String(p.id),
      title: p.title,
      department: p.department,
      location: p.location,
      employmentType: p.employmentType,
      experience: p.experience || "",
      description: p.description,
      applyUrl: p.applyUrl,
    }));
  }, [positions]);

  const departments = useMemo(() => {
    return Array.from(new Set(openingsList.map((o) => o.department))).filter(Boolean);
  }, [openingsList]);

  const locations = useMemo(() => {
    return Array.from(new Set(openingsList.map((o) => o.location))).filter(Boolean);
  }, [openingsList]);

  const filteredOpenings = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return openingsList.filter((opening) => {
      const matchesDepartment = !filters.department || opening.department === filters.department;
      const matchesLocation = !filters.location || opening.location === filters.location;
      const matchesSearch =
        !query ||
        `${opening.title} ${opening.department} ${opening.location} ${opening.description}`
          .toLowerCase()
          .includes(query);
      return matchesDepartment && matchesLocation && matchesSearch;
    });
  }, [filters, openingsList]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredOpenings.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;

  return (
    <section
      id="open-positions"
      className="relative flex scroll-mt-[88px] flex-col items-start justify-start gap-6 bg-white px-5 py-8 lg:w-full lg:gap-[10px] lg:px-[max(40px,calc((100vw-1440px)/2+80px))] xl:px-[max(80px,calc((100vw-1440px)/2+80px))] lg:py-[62px]"
      aria-labelledby="positions-heading"
    >
      <div className="flex w-full flex-col gap-6 lg:items-start lg:gap-[42px] lg:self-stretch">
        <div className="flex w-full flex-col gap-6 self-stretch lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex flex-col items-start justify-center self-stretch gap-3 lg:self-auto lg:flex-1 lg:min-w-0 lg:max-w-[646.448px] lg:justify-end lg:gap-4">
            <Eyebrow label={eyebrow} />
            <h2
              id="positions-heading"
              className="m-0 w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:text-[42px] lg:tracking-[-0.84px]"
            >
              {title}
            </h2>
            <p className="m-0 font-sans text-xs font-normal leading-normal text-ink lg:max-w-[474.189px] lg:text-base">
              {subtitle}
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-4 lg:relative lg:w-full lg:max-w-[587px] lg:shrink-0 lg:items-start lg:gap-[19px]">
            <label className="flex h-[42px] w-full items-center gap-3 rounded-[500px] border border-black/[0.04] bg-[#f3f4f5] px-4 text-ink/80 shadow-[0_2px_2px_rgb(0_0_0_/_10%)] focus-within:outline-2 focus-within:outline-brand focus-within:outline-offset-2 lg:h-[42px] lg:justify-between lg:self-stretch lg:pr-[3px] lg:pl-4 lg:shadow-[0_2px_4px_0_rgba(0,0,0,0.10)]">
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
            <div className="flex flex-col items-start self-stretch gap-[12px] lg:flex lg:flex-col lg:items-start lg:gap-[21px] lg:self-stretch">
              <div className="flex w-full min-w-0 items-center gap-2 overflow-hidden lg:w-full lg:overflow-hidden">
                <span className="w-[52px] shrink-0 font-sans text-sm font-semibold leading-none text-ink lg:text-base">
                  Team
                </span>
                <div className="relative min-w-0 max-w-full flex-1 overflow-hidden">
                  <div
                    className="no-scrollbar flex items-center gap-2 overflow-x-auto py-0.5 pb-1.5 pr-5 lg:py-0 lg:pr-[93px] lg:pb-0"
                    style={{
                      overscrollBehaviorX: "contain",
                      WebkitOverflowScrolling: "touch",
                      touchAction: "pan-x pan-y",
                    }}
                  >
                    <button
                      type="button"
                      className={`h-9 shrink-0 whitespace-nowrap rounded-[400px] border-[0.4px] px-[14px] font-sans text-xs font-semibold transition-colors duration-[160ms] lg:h-[42px] lg:inline-flex lg:items-center lg:justify-center lg:gap-[6.4px] lg:px-4 lg:py-0 lg:text-[16px] lg:leading-none ${
                        !filters.department
                          ? "border-white bg-[#121212] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%)] text-white"
                          : "border-transparent bg-[#ccc]/[0.32] text-ink hover:bg-[#d4dbec]"
                      }`}
                      aria-pressed={!filters.department}
                      onClick={() => onChange({ ...filters, department: "" })}
                    >
                      All
                    </button>
                    {departments.map((department) => (
                      <button
                        type="button"
                        key={department}
                        className={`h-9 shrink-0 whitespace-nowrap rounded-[400px] border-[0.4px] px-[14px] font-sans text-xs font-semibold transition-colors duration-[160ms] lg:h-[42px] lg:inline-flex lg:items-center lg:justify-center lg:gap-[6.4px] lg:px-4 lg:py-0 lg:text-[16px] lg:leading-none ${
                          filters.department === department
                            ? "border-white bg-[#121212] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%)] text-white"
                            : "border-transparent bg-[#ccc]/[0.32] text-ink hover:bg-[#d4dbec]"
                        }`}
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
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute lg:hidden"
                    style={{
                      width: "54.598px",
                      height: "84.271px",
                      right: "-5px",
                      bottom: "0",
                      background:
                        "linear-gradient(270deg, #FFF 13.62%, rgba(255, 255, 255, 0.00) 100%)",
                      zIndex: 10,
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full min-w-0 items-center gap-2 overflow-hidden lg:w-full lg:overflow-hidden">
                <span className="w-[52px] shrink-0 font-sans text-sm font-semibold leading-none text-ink lg:text-base">
                  Where
                </span>
                <div className="relative min-w-0 max-w-full flex-1 overflow-hidden">
                  <div
                    className="no-scrollbar flex items-center gap-2 overflow-x-auto py-0.5 pb-1.5 pr-5 lg:py-0 lg:pr-[93px] lg:pb-0"
                    style={{
                      overscrollBehaviorX: "contain",
                      WebkitOverflowScrolling: "touch",
                      touchAction: "pan-x pan-y",
                    }}
                  >
                    <button
                      type="button"
                      className={`h-9 shrink-0 whitespace-nowrap rounded-[400px] border-[0.4px] px-[14px] font-sans text-xs font-semibold transition-colors duration-[160ms] lg:h-[42px] lg:inline-flex lg:items-center lg:justify-center lg:gap-[6.4px] lg:px-4 lg:py-0 lg:text-[16px] lg:leading-none ${
                        !filters.location
                          ? "border-white bg-[#121212] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%)] text-white"
                          : "border-transparent bg-[#ccc]/[0.32] text-ink hover:bg-[#d4dbec]"
                      }`}
                      aria-pressed={!filters.location}
                      onClick={() => onChange({ ...filters, location: "" })}
                    >
                      All
                    </button>
                    {locations.map((location) => (
                      <button
                        type="button"
                        key={location}
                        className={`h-9 shrink-0 whitespace-nowrap rounded-[400px] border-[0.4px] px-[14px] font-sans text-xs font-semibold transition-colors duration-[160ms] lg:h-[42px] lg:inline-flex lg:items-center lg:justify-center lg:gap-[6.4px] lg:px-4 lg:py-0 lg:text-[16px] lg:leading-none ${
                          filters.location === location
                            ? "border-white bg-[#121212] bg-[linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%),linear-gradient(258deg,#0E2F6D_-138.16%,#1D6FFF_87.02%)] text-white"
                            : "border-transparent bg-[#ccc]/[0.32] text-ink hover:bg-[#d4dbec]"
                        }`}
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
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute lg:hidden"
                    style={{
                      width: "54.598px",
                      height: "84.271px",
                      right: "-5px",
                      bottom: "0",
                      background:
                        "linear-gradient(270deg, #FFF 13.62%, rgba(255, 255, 255, 0.00) 100%)",
                      zIndex: 10,
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none hidden lg:absolute lg:right-0 lg:bottom-0 lg:block lg:h-[105px] lg:w-[93px] lg:bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0)_100%)]"
            />
          </div>
        </div>

        {/* Separation line matching Figma Line 110 (node 3568:24234) */}
        <div className="h-px w-full bg-[#D4DBEC]" aria-hidden="true" />

        <div className="flex self-stretch items-center justify-center gap-2.5 lg:w-full lg:justify-between">
          <h3 className="m-0 flex-[1_0_0] font-display text-base font-semibold leading-[1.15] tracking-[-0.32px] text-[#121212] lg:flex-none lg:text-2xl lg:leading-[1.15] lg:tracking-[-0.48px]">
            {filteredOpenings.length} open {filteredOpenings.length === 1 ? "role" : "roles"}
          </h3>
          <p className="m-0 flex items-center gap-2 font-sans text-[10px] font-normal leading-none text-[#121212] lg:text-base lg:font-medium lg:leading-none lg:text-ink/60">
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
          <div
            className="flex w-full flex-col items-center justify-center rounded-2xl border border-[#e4e7ec] bg-[#f8f9fb] px-6 py-12 text-center lg:py-16"
            role="status"
          >
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#e8eefb] text-brand shadow-sm">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-7 stroke-[1.6]"
                fill="none"
                stroke="currentColor"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h4 className="m-0 font-display text-lg font-semibold text-ink lg:text-2xl">
              No Open Positions Currently Available
            </h4>
            <p className="mt-2.5 max-w-[540px] font-sans text-xs leading-relaxed text-ink/70 lg:text-sm">
              {filters.department || filters.location || filters.search ? (
                <>
                  We don&apos;t have any active openings matching your selection
                  {filters.department ? (
                    <>
                      {" "}
                      in <strong className="font-semibold text-ink">{filters.department}</strong>
                    </>
                  ) : null}
                  {filters.location ? (
                    <>
                      {" "}
                      located in <strong className="font-semibold text-ink">{filters.location}</strong>
                    </>
                  ) : null}
                  {filters.search ? (
                    <>
                      {" "}
                      for &ldquo;<span className="font-semibold text-ink">{filters.search}</span>&rdquo;
                    </>
                  ) : null}
                  . We are continuously expanding our teams—check back soon or browse all open roles.
                </>
              ) : (
                "There are currently no open positions listed in this section. Our teams are growing rapidly across technology, manufacturing, and operations, so check back regularly."
              )}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {(filters.department || filters.location || filters.search) && (
                <button
                  type="button"
                  onClick={() => onChange({ search: "", department: "", location: "" })}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded bg-ink px-5 font-display text-xs font-bold text-white transition-colors duration-150 hover:bg-navy"
                >
                  View all positions
                  <span aria-hidden="true">→</span>
                </button>
              )}
              <a
                href="mailto:careers@eulermotors.com?subject=Euler%20Motors%20Career%20Inquiry%20-%20General%20Application"
                className="inline-flex h-11 items-center justify-center gap-2 rounded border border-ink/30 bg-white px-5 font-display text-xs font-bold text-ink transition-colors duration-150 hover:bg-mist"
              >
                Send open application
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <p className="mt-5 font-sans text-[11px] text-ink/50 lg:text-xs">
              Can&apos;t find what you&apos;re looking for? Reach out directly at{" "}
              <a
                href="mailto:careers@eulermotors.com"
                className="font-semibold text-brand underline decoration-brand/40 underline-offset-2 hover:decoration-brand"
              >
                careers@eulermotors.com
              </a>
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <nav
            className="flex self-stretch items-center justify-center gap-[8px] lg:hidden"
            aria-label="Open positions pagination"
          >
            <button
              type="button"
              className={`flex size-[32px] shrink-0 items-center justify-center rounded-[8px] text-white transition-all ${
                currentPage === 1
                  ? "bg-[#A6A6A6] cursor-not-allowed"
                  : "bg-[#212121] hover:bg-black active:scale-95 cursor-pointer"
              }`}
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 5 9"
                className="h-[9px] w-[5px] -scale-x-100 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
              >
                <path d="m1 1 3 3.5-3 3.5" />
              </svg>
            </button>
            <span
              className="flex w-[42px] items-baseline justify-center font-display text-[#121212] tracking-[-0.54px]"
              aria-live="polite"
            >
              <span className="text-[16px] font-bold leading-none">
                {String(currentPage).padStart(2, "0")}
              </span>
              <span className="text-[12px] font-normal leading-none">
                /{String(totalPages).padStart(2, "0")}
              </span>
            </span>
            <button
              type="button"
              className={`flex size-[32px] shrink-0 items-center justify-center rounded-[8px] text-white transition-all ${
                currentPage === totalPages
                  ? "bg-[#A6A6A6] cursor-not-allowed"
                  : "bg-[#212121] hover:bg-black active:scale-95 cursor-pointer"
              }`}
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 5 9"
                className="h-[9px] w-[5px] fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
              >
                <path d="m1 1 3 3.5-3 3.5" />
              </svg>
            </button>
          </nav>
        )}
      </div>

      {applicationRole && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/[0.56] p-5"
          onMouseDown={() => setApplicationRole(null)}
        >
          <section
            aria-labelledby="application-dialog-title"
            aria-modal="true"
            className="w-full max-w-[480px] rounded-xl bg-white p-7 shadow-[0_20px_60px_rgb(0_0_0_/_20%)]"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <h2 id="application-dialog-title" className="mb-3 mt-0 font-display text-2xl leading-[1.2] text-ink">
              Apply for {applicationRole.title}
            </h2>
            <p className="mb-6 mt-0 font-sans text-sm leading-[1.5] text-ink-3">
              Applications are managed directly by Euler Motors Recruitment. Please email your resume to{" "}
              <a
                href={`mailto:careers@eulermotors.com?subject=Application:%20${encodeURIComponent(
                  applicationRole.title
                )}`}
                className="font-semibold text-brand underline"
              >
                careers@eulermotors.com
              </a>
              .
            </p>
            <div className="flex gap-3">
              <a
                href={`mailto:careers@eulermotors.com?subject=Application:%20${encodeURIComponent(
                  applicationRole.title
                )}`}
                className="inline-flex min-h-[42px] items-center justify-center rounded bg-brand px-5 font-sans text-sm font-bold text-white hover:bg-navy"
              >
                Open Email
              </a>
              <button
                type="button"
                className="min-h-[42px] rounded border border-black/20 bg-white px-5 font-sans text-sm font-bold text-ink hover:bg-mist"
                onClick={() => setApplicationRole(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
