"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedDecorationsProps {
  variant?: "flowers" | "circles" | "lines" | "mixed";
}

export default function AnimatedDecorations({
  variant = "mixed",
}: AnimatedDecorationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll("[data-animate]");

    // Stagger animation dla elementów
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      rotation: -5,
      duration: 1.2,
      stagger: {
        each: 0.1,
        from: "start",
      },
      ease: "back.out",
    });

    // Ciągłe delikatne animacje
    elements.forEach((el) => {
      const floatDuration = 4 + Math.random() * 2;
      const rotateDuration = 8 + Math.random() * 4;
      const yOffset = 10 + Math.random() * 20;

      gsap.to(el, {
        y: yOffset,
        duration: floatDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(el, {
        rotation: 360,
        duration: rotateDuration,
        repeat: -1,
        ease: "none",
      });
    });

    return () => {
      gsap.killTweensOf(elements);
    };
  }, []);

  const FlowerIcon = () => (
    <svg
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="currentColor"
      className="text-primary opacity-30"
    >
      <path d="M12 2C12 2 9 7 9 10c0 1.66 1.34 3 3 3s3-1.34 3-3c0-3-3-8-3-8zm0 20c0 0 3-5 3-8 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 3 3 8 3 8zm10-10c0 0-5-3-8-3 1.66 0 3-1.34 3-3 0-3-8-3-8-3 0 0 5 3 8 3-1.66 0-3 1.34-3 3 0 3 8 3 8 3zM2 12c0 0 5 3 8 3-1.66 0-3 1.34-3 3 0 3 8 3 8 3 0 0-5-3-8-3 1.66 0 3-1.34 3-3 0-3-8-3-8-3z" />
    </svg>
  );

  const LeafIcon = () => (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="currentColor"
      className="text-secondary opacity-25"
    >
      <path d="M17.92 7.02C17.45 4.18 14.97 2 12 2c-2.97 0-5.45 2.18-5.92 5.02C4.97 7.55 3 9.88 3 12.5C3 16.04 5.96 19 9.5 19h8c3.04 0 5.5-2.46 5.5-5.5 0-3.11-2.57-5.64-5.08-5.98zM12 13h-2v2h2v-2zm0-6h-2v2h2V7z" />
    </svg>
  );

  const CircleIcon = () => (
    <div className="w-3 h-3 rounded-full border-2 border-secondary/20" />
  );

  const renderDecorations = () => {
    const positions = [
      { top: "5%", left: "10%", delay: 0 },
      { top: "15%", right: "8%", delay: 0.2 },
      { top: "30%", left: "5%", delay: 0.4 },
      { bottom: "20%", right: "5%", delay: 0.6 },
      { bottom: "10%", left: "8%", delay: 0.8 },
      { top: "40%", right: "12%", delay: 1 },
      { bottom: "30%", left: "12%", delay: 1.2 },
    ];

    if (variant === "flowers") {
      return positions.map((pos, idx) => (
        <div
          key={idx}
          data-animate
          className="absolute pointer-events-none"
          style={{
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            right: pos.right,
          }}
        >
          <FlowerIcon />
        </div>
      ));
    }

    if (variant === "lines") {
      return (
        <>
          <div
            data-animate
            className="absolute w-20 h-0.5 bg-gradient-to-r from-secondary/0 to-secondary/30 pointer-events-none"
            style={{ top: "25%", left: "10%", transform: "rotate(-15deg)" }}
          />
          <div
            data-animate
            className="absolute w-16 h-0.5 bg-gradient-to-r from-secondary/30 to-secondary/0 pointer-events-none"
            style={{ top: "60%", right: "15%", transform: "rotate(25deg)" }}
          />
          <div
            data-animate
            className="absolute w-24 h-0.5 bg-gradient-to-r from-secondary/0 to-secondary/20 pointer-events-none"
            style={{ bottom: "20%", left: "20%", transform: "rotate(-35deg)" }}
          />
        </>
      );
    }

    // Mixed - połączenie elementów
    return positions.map((pos, idx) => (
      <div
        key={idx}
        data-animate
        className="absolute pointer-events-none"
        style={{
          top: pos.top,
          bottom: pos.bottom,
          left: pos.left,
          right: pos.right,
        }}
      >
        {idx % 3 === 0 ? (
          <FlowerIcon />
        ) : idx % 3 === 1 ? (
          <LeafIcon />
        ) : (
          <CircleIcon />
        )}
      </div>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {renderDecorations()}
    </div>
  );
}
