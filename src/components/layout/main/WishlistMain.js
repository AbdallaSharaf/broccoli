"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import WishlistPrimary from "@/components/sections/wishlist/WishlistPrimary";
import { useTranslations } from "@/hooks/useTranslate"; // Import translation hook
import React from "react";

const WishlistMain = () => {
  const t = useTranslations("common"); // Use the translations hook

  return (
    <main>
      <HeroPrimary title={t("wishlist")} text={t("wishlist")} /> {/* Keep the original key */}
      <WishlistPrimary />
      <Features4 />
    </main>
  );
};

export default WishlistMain;
