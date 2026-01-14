import React, { useEffect, useState } from "react";

interface CountdownProps {
  weddingDate: string; // Format: YYYY-MM-DD
}

const Countdown: React.FC<CountdownProps> = ({ weddingDate }) => {
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

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="w-full flex justify-center mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20 px-3 sm:px-4 md:px-6">
      <div className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20 max-w-5xl w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-Bellefair text-secondary mb-1 sm:mb-2 tracking-tight text-center font-light">
          Odliczanie do ślubu
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-secondary/60 mb-8 sm:mb-12 text-center font-light">
          Już niedługo
        </p>
        <div className="flex gap-4 sm:gap-6 md:gap-8 text-center justify-center flex-wrap">
          className="flex gap-6 sm:gap-8 text-center justify-center flex-wrap"
          suppressHydrationWarning
        >
          {[
            { value: timeLeft.days, label: "dni" },
            { value: timeLeft.hours, label: "godz" },
            { value: timeLeft.minutes, label: "min" },
            { value: timeLeft.seconds, label: "sek" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1 sm:gap-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-Bellefair text-secondary font-normal">
                {mounted ? String(item.value).padStart(2, "0") : "00"}
              </div>
              <span className="text-xs sm:text-xs md:text-sm text-secondary/50 uppercase tracking-widest font-light">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
