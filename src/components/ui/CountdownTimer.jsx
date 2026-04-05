import { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-xl font-bold text-white sm:h-14 sm:w-14 sm:text-2xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-neutral-500 sm:text-xs">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <TimeBox value={timeLeft.days} label="Ngày" />
      <span className="mt-6 text-xl font-bold text-neutral-400">:</span>
      <TimeBox value={timeLeft.hours} label="Giờ" />
      <span className="mt-6 text-xl font-bold text-neutral-400">:</span>
      <TimeBox value={timeLeft.minutes} label="Phút" />
      <span className="mt-6 text-xl font-bold text-neutral-400">:</span>
      <TimeBox value={timeLeft.seconds} label="Giây" />
    </div>
  );
}
