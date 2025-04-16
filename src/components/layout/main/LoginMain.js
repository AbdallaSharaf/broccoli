"use client"

import { useTranslations } from "@/hooks/useTranslate";


import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import LoginPrimary from "@/components/sections/login/LoginPrimary";

const LoginMain = () => {
  
  const t = useTranslations("common");
  return (
    <main>
      <HeroPrimary title={t("Sign In")} text={t("Sign In")} />
      <LoginPrimary />
      <Features4 />
    </main>
  );
};

export default LoginMain;
