"use client";

import { useMemo, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import {
  CAREER_DEPARTMENTS,
  CAREER_LOCATIONS,
  CAREER_OPENINGS,
  type CareerFilters,
  type CareerOpening,
} from "./types";
import styles from "./Careers.module.css";

type CareerOpenPositionsProps = {
  filters: CareerFilters;
  onChange: (filters: CareerFilters) => void;
};

function CareerCard({
  opening,
  onApply,
}: {
  opening: CareerOpening;
  onApply: (opening: CareerOpening) => void;
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
    <article className={styles.openingCard}>
      <div className={styles.openingTags}>
        {[opening.department, opening.location, "Full time", opening.experience].map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <h3>{opening.title}</h3>
      <p className={styles.openingDescription}>{opening.description}</p>
      <div className={styles.openingActions}>
        <button type="button" className={styles.applyButton} onClick={() => onApply(opening)}>
          Apply now
          <span aria-hidden="true">↗</span>
        </button>
        <button
          type="button"
          className={styles.shareButton}
          onClick={shareOpening}
          aria-label={`Share ${opening.title}`}
          title="Share this opening"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16">
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
      <span className={styles.srOnly} aria-live="polite">
        {shareMessage}
      </span>
    </article>
  );
}

export default function CareerOpenPositions({ filters, onChange }: CareerOpenPositionsProps) {
  const [applicationRole, setApplicationRole] = useState<CareerOpening | null>(null);

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

  return (
    <section id="open-positions" className={styles.positions} aria-labelledby="positions-heading">
      <div className={styles.positionsInner}>
        <div className={styles.positionsIntro}>
          <div className={styles.positionsHeading}>
            <Eyebrow label="Open positions" />
            <h2 id="positions-heading">Build Your Career with Us</h2>
            <p>Take the next step with a role where your ideas and work can make a real impact.</p>
          </div>

          <div className={styles.filters}>
            <label className={styles.positionsSearch}>
              <svg aria-hidden="true" viewBox="0 0 20 20">
                <circle cx="8.5" cy="8.5" r="5.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="m13 13 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className={styles.srOnly}>Search open positions</span>
              <input
                type="search"
                value={filters.search}
                onChange={(event) => onChange({ ...filters, search: event.target.value })}
                placeholder="Search here..."
              />
            </label>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Team</span>
              <div className={styles.chips}>
                <button
                  type="button"
                  className={!filters.department ? styles.activeChip : styles.chip}
                  aria-pressed={!filters.department}
                  onClick={() => onChange({ ...filters, department: "" })}
                >
                  All
                </button>
                {CAREER_DEPARTMENTS.filter((department) => department !== "Sales").map((department) => (
                  <button
                    type="button"
                    key={department}
                    className={filters.department === department ? styles.activeChip : styles.chip}
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
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Where</span>
              <div className={styles.chips}>
                <button
                  type="button"
                  className={!filters.location ? styles.activeChip : styles.chip}
                  aria-pressed={!filters.location}
                  onClick={() => onChange({ ...filters, location: "" })}
                >
                  All
                </button>
                {CAREER_LOCATIONS.map((location) => (
                  <button
                    type="button"
                    key={location}
                    className={filters.location === location ? styles.activeChip : styles.chip}
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
            </div>
          </div>
        </div>

        <div className={styles.openingsHeader}>
          <h3>
            {filteredOpenings.length} open {filteredOpenings.length === 1 ? "role" : "roles"}
          </h3>
          <p>
            {filters.department || "All Teams"}
            <span aria-hidden="true" />
            {filters.location || "All locations"}
          </p>
        </div>

        {filteredOpenings.length ? (
          <div className={styles.openingsGrid}>
            {filteredOpenings.map((opening) => (
              <CareerCard key={opening.title} opening={opening} onApply={setApplicationRole} />
            ))}
          </div>
        ) : (
          <p className={styles.noResults} role="status">
            No roles match those filters. Try a different team, location, or search term.
          </p>
        )}
      </div>

      {applicationRole && (
        <div className={styles.dialogBackdrop} onMouseDown={() => setApplicationRole(null)}>
          <section
            aria-labelledby="application-dialog-title"
            aria-modal="true"
            className={styles.applicationDialog}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <h2 id="application-dialog-title">Apply for {applicationRole.title}</h2>
            <p>
              Applications are not connected to this website yet. No application has been sent.
              Please use Euler Motors&apos; official recruitment channels to apply.
            </p>
            <button type="button" onClick={() => setApplicationRole(null)}>
              Close
            </button>
          </section>
        </div>
      )}
    </section>
  );
}
