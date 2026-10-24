"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import styles from "./Careers.module.css";

const TESTIMONIALS = [
  {
    quote:
      "Joined to work on advanced electric powertrains. Stayed because of the collaborative culture and freedom to innovate. The team here genuinely values engineering excellence and new ideas.",
    name: "Rahul Deshmukh",
    role: "Senior Engineer, Euler Motors",
    image: "/assets/careers/testimonial-rahul.png",
  },
  {
    quote:
      "Joined to build cutting-edge battery packs. Stayed because of the high trust and low bureaucracy. The ownership given to engineers here is rare in the EV sector.",
    name: "Jahan Melad",
    role: "Project Manager, Euler Motors",
    image: "/assets/careers/testimonial-jahan.png",
  },
  {
    quote:
      "Came here to solve real-world mobility challenges. Stayed because of the supportive leadership and meaningful work. Every project gives us the opportunity to build technology that makes a difference.",
    name: "Priya Sharma",
    role: "Manufacturing Lead, Euler Motors",
    image: "/assets/careers/testimonial-priya.png",
  },
];

function Arrow({ backwards = false }: { backwards?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 18">
      <path
        d={backwards ? "M10 1 2 9l8 8" : "M2 1l8 8-8 8"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function CareerTestimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const card = carousel.querySelector<HTMLElement>("[data-testimonial]");
    if (card) carousel.scrollLeft = card.offsetWidth + 10;
  }, []);

  const move = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector<HTMLElement>("[data-testimonial]");
    if (carousel && card) carousel.scrollBy({ left: direction * (card.offsetWidth + 10), behavior: "smooth" });
  };

  return (
    <section className={styles.testimonials} aria-labelledby="career-testimonials-heading">
      <div className={styles.testimonialsHeading}>
        <Eyebrow label="Employee voices" />
        <h2 id="career-testimonials-heading">What Our People Say</h2>
        <p>
          Read unfiltered feedback and experiences shared by members of the Euler Motors tech,
          manufacturing, and support divisions.
        </p>
      </div>

      <div className={styles.testimonialCarousel}>
        <button
          type="button"
          aria-label="Previous employee story"
          className={`${styles.carouselArrow} ${styles.previousArrow}`}
          onClick={() => move(-1)}
        >
          <Arrow backwards />
        </button>
        <div ref={carouselRef} className={styles.testimonialTrack} aria-label="Employee testimonials">
          {TESTIMONIALS.map((testimonial) => (
            <article className={styles.testimonialCard} data-testimonial key={testimonial.name}>
              <div className={styles.testimonialTop}>
                <span className={styles.quoteMark} aria-hidden="true">
                  “
                </span>
                <span className={styles.rating}>
                  <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path d="m8 1 1.8 4.2 4.6.4-3.5 3 1.1 4.5L8 10.7 4 13.1l1.1-4.5-3.5-3 4.6-.4L8 1Z" />
                  </svg>
                  4.5
                </span>
              </div>
              <p className={styles.testimonialQuote}>&quot;{testimonial.quote}&quot;</p>
              <div className={styles.testimonialDivider} />
              <div className={styles.testimonialAuthor}>
                <Image src={testimonial.image} alt="" width={62} height={62} />
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next employee story"
          className={`${styles.carouselArrow} ${styles.nextArrow}`}
          onClick={() => move(1)}
        >
          <Arrow />
        </button>
      </div>
      <div className={styles.testimonialProgress} aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
