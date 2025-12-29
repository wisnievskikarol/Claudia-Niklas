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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <section className="w-full flex justify-center mt-8">
      <div className="flex flex-col items-center justify-center px-6 py-8 bg-primary bg-opacity-30 rounded-2xl shadow-lg max-w-2xl w-full mx-2 border border-primary/20">
        <h2 className="text-4xl sm:text-5xl font-Bellefair text-secondary mb-2 tracking-tight text-center drop-shadow-sm">
          Odliczanie do ślubu
        </h2>
        <p className="text-base sm:text-lg text-secondary/70 mb-6 text-center">
          Już niedługo ten wyjątkowy dzień!
        </p>
        <div className="flex gap-4 sm:gap-8 text-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-Bellefair text-primary drop-shadow font-normal">
              {timeLeft.days}
            </span>
            <span className="text-xs sm:text-sm text-secondary/70 uppercase tracking-widest">
              dni
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-Bellefair text-primary drop-shadow font-normal">
              {timeLeft.hours}
            </span>
            <span className="text-xs sm:text-sm text-secondary/70 uppercase tracking-widest">
              godz.
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-Bellefair text-primary drop-shadow font-normal">
              {timeLeft.minutes}
            </span>
            <span className="text-xs sm:text-sm text-secondary/70 uppercase tracking-widest">
              min
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-Bellefair text-primary drop-shadow font-normal">
              {timeLeft.seconds}
            </span>
            <span className="text-xs sm:text-sm text-secondary/70 uppercase tracking-widest">
              sek
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
