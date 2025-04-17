"use client";

import { useTranslations } from "@/hooks/useTranslate";

import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import VerifyUserPrimary from "@/components/sections/verify-user/VerifyUserPrimary";

const WaitVerificationMain = () => {
  const t = useTranslations("common");
  return (
    <main>
      <HeroPrimary
        title={t("Verification")}
        text={t("Verification")}
        type={2}
      />

      <VerifyUserPrimary type={"checkMail"} />
    </main>
  );
};

export default WaitVerificationMain;
