import Eyebrow from "@/components/ui/Eyebrow";
import styles from "./Careers.module.css";

const BENEFITS = [
  {
    number: "01",
    title: "Impact & Purpose",
    description:
      "Every vehicle we ship directly helps an independent business operator run better. Real-world physical impact you can witness on the streets.",
    illustration: "impactOne" as const,
  },
  {
    number: "02",
    title: "Growth & Learning",
    description:
      "Work in a fast-evolving domain alongside seasoned leads across battery chemistry, commercial vehicle chassis design, and IoT firmware layers.",
    illustration: "impactTwo" as const,
  },
  {
    number: "03",
    title: "Innovation & Tech",
    description:
      "We build for Indian weather, roads, and high payloads. There was no textbook for what we do — we invent the infrastructure as we scale.",
    illustration: "impactThree" as const,
  },
];

export default function CareerBenefits() {
  return (
    <section className={styles.benefits} aria-labelledby="career-impact-heading">
      <div className={styles.benefitsIntro}>
        <div>
          <Eyebrow label="Why work with us" />
          <h2 id="career-impact-heading">Engineering Impact, Every Day</h2>
        </div>
        <p>
          At Euler Motors, we build commercial vehicles that drive micro-economies forward. Our
          team integrates engineering, software, and real operations to deliver reliability where
          it matters most.
        </p>
      </div>

      <div className={`${styles.impactCards} snap-row`}>
        {BENEFITS.map((benefit) => (
          <article className={styles.impactCard} key={benefit.number}>
            <span className={styles.impactNumber}>{benefit.number}</span>
            <div className={styles.impactImage} data-illustration={benefit.illustration} />
            <div className={styles.impactText}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
