import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import styles from "./Careers.module.css";

const GALLERY = [
  { src: "/assets/careers/gallery-office.png", alt: "A bright Euler Motors office space" },
  { src: "/assets/careers/gallery-meeting-room.png", alt: "A collaborative meeting space" },
  { src: "/assets/careers/gallery-team.png", alt: "Euler Motors colleagues working together" },
  { src: "/assets/careers/gallery-team-work.png", alt: "A team planning a project together" },
  { src: "/assets/careers/gallery-workspace.png", alt: "Colleagues walking through the office" },
];

export default function CareerGallery() {
  return (
    <section className={styles.gallery} aria-labelledby="career-gallery-heading">
      <div className={styles.galleryHeading}>
        <Eyebrow label="Inside the depots" />
        <h2 id="career-gallery-heading">Life at Euler Motors</h2>
        <p>
          From the assembly lines in New Delhi to real road testing across state lines — see what
          our day-to-day looks like.
        </p>
      </div>

      <div className={styles.galleryImages} aria-label="Life at Euler Motors">
        <div className={styles.galleryPrimary}>
          <Image src={GALLERY[0].src} alt={GALLERY[0].alt} fill sizes="(max-width: 767px) 310px, 400px" />
        </div>
        <div className={styles.galleryMiddle}>
          <div>
            <Image src={GALLERY[1].src} alt={GALLERY[1].alt} fill sizes="(max-width: 767px) 426px, 549px" />
          </div>
          <div>
            <Image src={GALLERY[2].src} alt={GALLERY[2].alt} fill sizes="(max-width: 767px) 426px, 549px" />
          </div>
        </div>
        <div className={styles.gallerySide}>
          <div>
            <Image src={GALLERY[3].src} alt={GALLERY[3].alt} fill sizes="(max-width: 767px) 426px, 296px" />
          </div>
          <div>
            <Image src={GALLERY[4].src} alt={GALLERY[4].alt} fill sizes="(max-width: 767px) 426px, 296px" />
          </div>
        </div>
      </div>
    </section>
  );
}
