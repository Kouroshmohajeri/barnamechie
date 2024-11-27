import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./Carousel.module.css";
import Link from "next/link";

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 1500 }),
  ]);

  return (
    <div
      className="embla mx-auto mt-12 h-56 max-w-lg border-r-2"
      ref={emblaRef}
    >
      <div className="embla__container h-full">
        {/* Slide 1 */}
        <div className="embla__slide flex items-center justify-center">
          <Link
            href="https://barnamechie.com/torshoshirin"
            className={styles.link}
          >
            <img
              src="/images/test/torshoshirin.jpg"
              alt="Torshoshirin - A traditional Iranian dish"
              className={styles.image}
            />
          </Link>
        </div>

        {/* Slide 2 */}
        <div className="embla__slide flex items-center justify-center">
          <Link href="https://barnamechie.com/nails" className={styles.link}>
            <img
              src="/images/test/nails.jpg"
              alt="Nails - Nail services and care"
              className={styles.image}
            />
          </Link>
        </div>

        {/* Slide 3 */}
        <div className="embla__slide flex items-center justify-center">
          <Link href="https://barnamechie.com/helpton" className={styles.link}>
            <img
              src="/images/test/helpton.jpg"
              alt="Helpton - Innovative event services"
              className={styles.image}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
