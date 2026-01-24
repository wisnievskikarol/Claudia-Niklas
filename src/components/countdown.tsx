import React, { useEffect, useState, useRef, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { LanguageContext } from "@/app/provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CountdownLocale = "pl" | "de";

type CountdownCopy = {
  title: string;
  subtitle: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const COPY: Record<CountdownLocale, CountdownCopy> = {
  pl: {
    title: "Odliczanie do ślubu",
    subtitle: "Już niedługo",
    days: "dni",
    hours: "godz",
    minutes: "min",
    seconds: "sek",
  },
  de: {
    title: "Countdown bis zur Hochzeit",
    subtitle: "Bald ist es soweit",
    days: "Tage",
    hours: "Std",
    minutes: "Min",
    seconds: "Sek",
  },
};

interface CountdownProps {
  weddingDate: string; // Format: YYYY-MM-DD
  lang?: CountdownLocale;
  copyOverride?: Partial<CountdownCopy>;
}

const Countdown: React.FC<CountdownProps> = ({
  weddingDate,
  lang = "pl",
  copyOverride,
}) => {
  const { lang: contextLang } = useContext(LanguageContext);
  const activeLang = lang ?? (contextLang as CountdownLocale) ?? "pl";
  const copy = { ...(COPY[activeLang] ?? COPY.pl), ...copyOverride };

  const calculateTimeLeft = () => {
    const difference = +new Date(weddingDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    if (!sectionRef.current || !mounted) return;

    const ctx = gsap.context(() => {
      // Title elegant reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Number counters entrance
      const numbers = gsap.utils.toArray(".countdown-number");
      numbers.forEach((num, index) => {
        gsap.fromTo(
          num as HTMLElement,
          {
            opacity: 0,
            scale: 0.5,
            rotateY: 90,
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: numbersRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Subtle floating animation for numbers
      gsap.to(".countdown-number", {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "start",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20 px-3 sm:px-4 md:px-6"
    >
      <div className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20 max-w-5xl w-full relative">
        {/* Decorative elements */}
        <motion.div
          className="absolute -top-10 left-1/4 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "100px" }}
        />
        <motion.div
          className="absolute -bottom-10 right-1/4 w-32 h-32 rounded-full bg-secondary/5 blur-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true, margin: "100px" }}
        />

        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-Bellefair text-secondary mb-1 sm:mb-2 tracking-tight text-center font-light relative z-10"
        >
          {copy.title}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-secondary/60 mb-8 sm:mb-12 text-center font-light relative z-10">
          {copy.subtitle}
        </p>
        <div
          ref={numbersRef}
          className="flex gap-4 sm:gap-6 md:gap-8 text-center justify-center flex-wrap relative z-10"
          suppressHydrationWarning
        >
          {[
            { value: timeLeft.days, label: copy.days },
            { value: timeLeft.hours, label: copy.hours },
            { value: timeLeft.minutes, label: copy.minutes },
            { value: timeLeft.seconds, label: copy.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="countdown-number flex flex-col items-center min-w-[70px] sm:min-w-[90px]"
              style={{ perspective: "1000px" }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-Bellefair text-secondary font-normal px-3 py-2 rounded-lg bg-primary/20 backdrop-blur-sm border border-secondary/10">
                {mounted ? String(item.value).padStart(2, "0") : "00"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
