"use client";
import React, { useEffect, useState } from "react";
import type { ElementType } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import "./StepsSection.css";

export const StepsSection = () => {
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      setIsMobileWidth(width >= 300 && width <= 700);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const disableScrollAnimation = isMobileWidth;

  const HeaderWrapper: ElementType = disableScrollAnimation ? "div" : motion.div;
  const LeftWrapper: ElementType = disableScrollAnimation ? "div" : motion.div;
  const RightWrapper: ElementType = disableScrollAnimation ? "div" : motion.div;

  const headerMotionProps = disableScrollAnimation
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
        viewport: { once: true },
      };

  const leftMotionProps = disableScrollAnimation
    ? {}
    : {
        initial: { opacity: 0, x: -30 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8, delay: 0.2 },
        viewport: { once: true },
      };

  const rightMotionProps = disableScrollAnimation
    ? {}
    : {
        initial: { opacity: 0, x: 30 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8, delay: 0.4 },
        viewport: { once: true },
      };

  return (
    <section className="steps-section-container">
      <div className="steps-background-elements">
        <div className="grid-overlay"></div>
        <div className="glow-effect"></div>
      </div>
      
      <HeaderWrapper
        {...headerMotionProps}
        className="steps-header"
      >
        <div className="steps-banner">
          <span>Start Your Journey</span>
        </div>
        <h2 className="steps-title">Flight Process</h2>
        <p className="steps-subtitle">Master the art of aviation communication from pre-flight to landing.</p>
      </HeaderWrapper>

      <div className="steps-content">
        {/* Left Column: Steps Image */}
        <LeftWrapper
          {...leftMotionProps}
          className="steps-left"
        >
          <div className="image-wrapper steps-image-wrapper">
            <Image
              src="/Home/AviationSteps.png"
              alt="Flight Steps"
              width={600}
              height={800}
              className="steps-image"
            />
          </div>
        </LeftWrapper>

        {/* Right Column: Airplane Image */}
        <RightWrapper
          {...rightMotionProps}
          className="steps-right"
        >
          <div className="image-wrapper airplane-image-wrapper">
            <Image
              src="/Home/AirplaneSteps.png"
              alt="Airplane"
              width={800}
              height={800}
              className="airplane-image"
            />
          </div>
        </RightWrapper>
      </div>
    </section>
  );
};
