"use client";

import Image from "next/image";
import FloatingWidget from "@/components/FloatingWidget";
import Eyebrow from "@/components/ui/Eyebrow";
import type { CareerFilters } from "./types";
import styles from "./Careers.module.css";

type CareerHeroProps = {
  filters: CareerFilters;
  onChange: (filters: CareerFilters) => void;
};

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={styles.searchIcon}>
      <circle cx="6.9" cy="6.9" r="4.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="m10.5 10.5 3.2 3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 22 14" className={styles.arrowIcon}>
      <path d="M1 7h19M14 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function CareerHero({ filters, onChange }: CareerHeroProps) {
  const findJobs = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} aria-labelledby="careers-heading">
      <div className={styles.heroBackdrop} aria-hidden="true">
        <div className={styles.heroTexture} />
        <div className={styles.heroImageFrame}>
          <Image
            src="/assets/careers/hero-desktop.png"
            alt=""
            width={1440}
            height={1394}
            priority
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroGradient} />
      </div>

      <div className={styles.heroControls}>
        <form className={styles.searchForm} onSubmit={findJobs}>
          <label className={styles.keywordSearch}>
            <SearchIcon />
            <span className={styles.srOnly}>Search open roles</span>
            <input
              type="search"
              value={filters.search}
              onChange={(event) => onChange({ ...filters, search: event.target.value })}
              placeholder="Search for the question"
            />
          </label>

          <label className={styles.selectField}>
            <span>Department</span>
            <select
              value={filters.department}
              onChange={(event) => onChange({ ...filters, department: event.target.value })}
              aria-label="Department"
            >
              <option value="">Human Resource</option>
              <option value="Engineering">Engineering</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Sales">Sales</option>
              <option value="Software">Software</option>
              <option value="Service">Service</option>
              <option value="Warranty">Warranty</option>
            </select>
          </label>

          <label className={styles.selectField}>
            <span>Location</span>
            <select
              value={filters.location}
              onChange={(event) => onChange({ ...filters, location: event.target.value })}
              aria-label="Location"
            >
              <option value="">Not sure, please suggest one</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </label>

          <button type="submit" className={styles.findJobsButton}>
            Find Jobs
            <ArrowIcon />
          </button>
        </form>
      </div>

      <div className={styles.heroCopy}>
        <Eyebrow label="Grow with us" dark icons="white" className={styles.heroEyebrow} />
        <h1 id="careers-heading">Shape the Future of Electric Mobility</h1>
        <p>
          Be part of a collaborative, focused team solving real infrastructure and engineering
          challenges to clean commercial transport across India.
        </p>
      </div>

      <div className={styles.desktopWidget}>
        <FloatingWidget desktopClassName="lg:top-[400px]" />
      </div>
    </section>
  );
}
