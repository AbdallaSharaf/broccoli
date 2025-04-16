"use client"
import AccountPrimary from "@/components/sections/account/AccountPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";

const AccountMain = () => {

  const t = useTranslations("common");
  return (
    <main>
      <HeroPrimary title={t("My Account")} text={t("My Account")} />
      <AccountPrimary />
      <Features4 />
    </main>
  );
};

export default AccountMain;
