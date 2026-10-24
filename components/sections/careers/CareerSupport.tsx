import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import styles from "./Careers.module.css";

const SUPPORT_ITEMS = [
  {
    title: "Medical Cover",
    description: "Cover for you, spouse, children, and parents.",
    left: "-62.93%",
    top: "-8.32%",
  },
  {
    title: "Learning Budget",
    description: "Paid courses, workshops, and global certs.",
    left: "-190.28%",
    top: "-8.32%",
  },
  {
    title: "Flexible Leave",
    description: "Take the time you need comfortably.",
    left: "-335.71%",
    top: "-8.32%",
  },
  {
    title: "Counseling",
    description: "Confidential mental health support, free of cost.",
    left: "-466.27%",
    top: "-8.32%",
  },
  {
    title: "Equity Options",
    description: "Own a stake in the mobility revolution.",
    left: "-57.4%",
    top: "-101.96%",
  },
  {
    title: "Modern Workspace",
    description: "Spacious hubs in Delhi & Bangalore.",
    left: "-177.8%",
    top: "-96.38%",
  },
  {
    title: "Parental Support",
    description: "Helpful paid parent leave systems.",
    left: "-332.54%",
    top: "-103.95%",
  },
  {
    title: "Recognition",
    description: "Quarterly peer-voted awards & spot bonuses.",
    left: "-466.18%",
    top: "-104.68%",
  },
];

export default function CareerSupport() {
  return (
    <section className={styles.support} aria-labelledby="career-support-heading">
      <div className={styles.supportHeading}>
        <Eyebrow label="Our offering" dark icons="white" />
        <h2 id="career-support-heading">Support That Matters</h2>
        <p>
          We focus on complete physical, mental, and professional growth support. No standard
          corporate fluff, just helpful baseline perks.
        </p>
      </div>

      <div className={`${styles.supportCards} snap-row`} aria-label="Employee benefits">
        {SUPPORT_ITEMS.map((item) => (
          <article className={styles.supportCard} key={item.title}>
            <div className={styles.supportIcon}>
              <Image
                src="/assets/careers/support-illustrations.png"
                alt=""
                width={630}
                height={218}
                style={{
                  position: "absolute",
                  width: "629.2%",
                  height: "217.63%",
                  left: item.left,
                  top: item.top,
                  maxWidth: "none",
                }}
              />
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.carouselTrack} aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
