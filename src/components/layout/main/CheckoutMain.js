"use client"

import { useTranslations } from "@/hooks/useTranslate";
import CheckoutPrimary from "@/components/sections/checkout/CheckoutPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";

const CheckoutMain = () => {
  const t = useTranslations("common");
  return (
    <main>
      <HeroPrimary title={t("checkout")} text={t("checkout")} />
      <CheckoutPrimary />
      <Features4 />
    </main>
  );
};

export default CheckoutMain;
