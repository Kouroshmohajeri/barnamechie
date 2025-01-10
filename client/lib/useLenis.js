"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Smoothness duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: "vertical", // Vertical scroll
      smooth: true, // Enable smooth scrolling
      smoothTouch: true, // Enable smooth scrolling on touch devices
    });

    const onAnimationFrame = (time) => {
      lenis.raf(time);
      requestAnimationFrame(onAnimationFrame);
    };

    requestAnimationFrame(onAnimationFrame);

    return () => lenis.destroy(); // Cleanup Lenis on unmount
  }, []);
};

export default useLenis;
