"use client";

import { useTranslations } from "@/hooks/useTranslate";

import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import VerifyUserPrimary from "@/components/sections/verify-user/VerifyUserPrimary";

const OrderPlacedMain = ({ orderID }) => {
  const t = useTranslations("common");

  return (
    <main>
      <HeroPrimary
        title={t("Order Placed")}
        text={t("Order Placed")}
        type={2}
      />

      <VerifyUserPrimary type={"orderPlaced"} orderID={orderID} />
    </main>
  );
};

export default OrderPlacedMain;
