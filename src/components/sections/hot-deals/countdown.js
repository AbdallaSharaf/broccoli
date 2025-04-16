"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from "@/hooks/useTranslate";

const Countdown = ({ date, fullFormat = false }) => {
  const t = useTranslations("common");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  function calculateTimeLeft(endDate) {
    const difference = new Date(endDate) - new Date();
    
    if (difference <= 0) return { expired: true };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      // For full format:
      years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
      months: Math.floor((difference / (1000 * 60 * 60 * 24 * 30)) % 12),
      weeks: Math.floor((difference / (1000 * 60 * 60 * 24 * 7)) % 4),
    };
  }

  if (timeLeft.expired) {
    return <div>{t("Expired")}</div>;
  }

  return (
    <div className="ltn__countdown ltn__countdown-3">
      {fullFormat ? (
        <>
          <div className="single">
            <h1>{timeLeft.years}</h1>
            <p>{t("Years")}</p>
          </div>
          <div className="single">
            <h1>{timeLeft.months}</h1>
            <p>{t("Months")}</p>
          </div>
          <div className="single">
            <h1>{timeLeft.weeks}</h1>
            <p>{t("Weeks")}</p>
          </div>
        </>
      ) : null}
      <div className="single">
        <h1>{timeLeft.days}</h1>
        <p>{t("Days")}</p>
      </div>
      <div className="single">
        <h1>{timeLeft.hours}</h1>
        <p>{t("Hrs")}</p>
      </div>
      <div className="single">
        <h1>{timeLeft.minutes}</h1>
        <p>{t("Mins")}</p>
      </div>
      <div className="single">
        <h1>{timeLeft.seconds}</h1>
        <p>{t("Secs")}</p>
      </div>
    </div>
  );
};

export default Countdown;