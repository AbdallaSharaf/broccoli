"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from "@/hooks/useTranslate";

const Countdown = ({ timestamp, fullFormat = false, onExpire }) => {
  const t = useTranslations("common");
  const [timeLeft, setTimeLeft] = useState({ expired: false });

  useEffect(() => {
    if (!timestamp) {
      setTimeLeft({ expired: true });
      return;
    }

    const calculateTimeLeft = () => {
      const endDate = new Date(timestamp);
      const now = new Date();
      const difference = endDate - now;
      
      if (difference <= 0) {
        return { expired: true };
      }

      // Calculate time units
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      return {
        expired: false,
        years: Math.floor(days / 365),
        months: Math.floor(days / 30) % 12,
        weeks: Math.floor(days / 7) % 4,
        days: days % 365,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
      };
    };

    // Initial calculation
    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft);
    if (initialTimeLeft.expired && onExpire) {
      onExpire();
    }

    // Set up interval only if not expired
    if (!initialTimeLeft.expired) {
      const timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft();
        setTimeLeft(newTimeLeft);
        
        if (newTimeLeft.expired && onExpire) {
          onExpire();
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timestamp, onExpire]);

  if (!timestamp) {
    return <div>{t("No time specified")}</div>;
  }

  if (timeLeft.expired) {
    return <div>{t("Expired")}</div>;
  }

  return (
    <div className="ltn__countdown ltn__countdown-3">
      {fullFormat && (
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
      )}
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