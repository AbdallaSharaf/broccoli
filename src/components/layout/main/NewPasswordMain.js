"use client";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";
import NewPasswordPrimary from "@/components/sections/forget-password/NewPasswordPrimary";

const NewPasswordMain = () => {
  const t = useTranslations("common");
  
  return (
    <main>
      <HeroPrimary title={t("Reset Password")} text={t("Reset Password")} />
      <NewPasswordPrimary />
    </main>
  );
};

export default NewPasswordMain;
