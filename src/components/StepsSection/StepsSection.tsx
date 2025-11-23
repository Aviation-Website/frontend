"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import "./StepsSection.css";

export const StepsSection = () => {
  return (
    <section className="steps-section-container">
      <div className="steps-background-elements">
        <div className="grid-overlay"></div>
        <div className="glow-effect"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="steps-header"
      >
        <div className="steps-banner">
          <span>Start Your Journey</span>
        </div>
        <h2 className="steps-title">Flight Process</h2>
        <p className="steps-subtitle">Master the art of aviation communication from pre-flight to landing.</p>
      </motion.div>

      <div className="steps-content">
        {/* Left Column: Steps Image */}
        <motion.div
          className="steps-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="image-wrapper steps-image-wrapper">
            <Image
              src="/Steps/StepByStep.png"
              alt="Flight Steps"
              width={600}
              height={800}
              className="steps-image"
            />
          </div>
        </motion.div>

        {/* Right Column: Airplane Image */}
        <motion.div
          className="steps-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="image-wrapper airplane-image-wrapper">
            <Image
              src="/Steps/AirplaneSteps.png"
              alt="Airplane"
              width={800}
              height={800}
              className="airplane-image"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
