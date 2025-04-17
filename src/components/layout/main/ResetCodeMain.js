"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";
import VerifyResetCodePrimary from "@/components/sections/forget-password/ResetCodePrimary";

const ResetCodeMain = () => {
  const t = useTranslations("common");
  
  return (
    <main>
      <HeroPrimary title={t("Reset Password")} text={t("Reset Password")} />
      <VerifyResetCodePrimary />
    </main>
  );
};

export default ResetCodeMain;
