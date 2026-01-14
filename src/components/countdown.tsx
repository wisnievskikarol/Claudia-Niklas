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
    <section className="w-full flex justify-center mt-16 mb-16 px-2">
      <div className="flex flex-col items-center justify-center px-8 py-16 max-w-5xl w-full">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-Bellefair text-secondary mb-3 tracking-tight text-center font-light">
          Odliczanie do ślubu
        </h2>
        <p className="text-base sm:text-lg text-secondary/60 mb-12 text-center font-light">
          Już niedługo
        </p>
        <div
          className="flex gap-6 sm:gap-8 text-center justify-center flex-wrap"
          suppressHydrationWarning
        >
          {[
            { value: timeLeft.days, label: "dni" },
            { value: timeLeft.hours, label: "godz" },
            { value: timeLeft.minutes, label: "min" },
            { value: timeLeft.seconds, label: "sek" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-Bellefair text-secondary font-normal">
                {mounted ? String(item.value).padStart(2, "0") : "00"}
              </div>
              <span className="text-xs sm:text-sm text-secondary/50 uppercase tracking-widest mt-3 font-light">
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
