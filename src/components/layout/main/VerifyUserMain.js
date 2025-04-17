"use client";

import { useTranslations } from "@/hooks/useTranslate";

import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import VerifyUserPrimary from "@/components/sections/verify-user/VerifyUserPrimary";

const VerifyUserMain = ({ loading, success, error }) => {
  const t = useTranslations("common");

  return (
    <main>
      <HeroPrimary
        title={t("Verification")}
        text={t("Verification")}
        type={2}
      />

      <VerifyUserPrimary
        type={
          loading
            ? "loading"
            : success
            ? "success"
            : error
            ? "error"
            : "checkMail"
        }
      />
    </main>
  );
};

export default VerifyUserMain;
