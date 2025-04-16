"use client"

import { useTranslations } from "@/hooks/useTranslate";
import Blogs2 from "@/components/sections/blogs/Blogs2";
import CounterUp from "@/components/sections/counters/CounterUp";
import CounterUp2 from "@/components/sections/counters/CounterUp2";
import FaqPrimary from "@/components/sections/faq/FaqPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const FaqMain = () => {
  const t = useTranslations("common");
  return (
    <main>
      <HeroPrimary title={t("Frequently asked questions")} text={t("FAQ")} />
      <FaqPrimary />
      <CounterUp2 />
      <Blogs2 type={2} pb="pb-70" />
      <Features4 />
    </main>
  );
};

export default FaqMain;
