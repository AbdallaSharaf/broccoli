"use client"
import React from "react";
import { useTranslations } from "@/hooks/useTranslate"; // ✅ import translation hook

const ShopDataShowing = ({ limit, totalItems, firstItem, lastItem }) => {
  const t = useTranslations("common"); // ✅ use translation namespace

  return (
    <div className="showing-product-number text-right">
      <span>
        {t("Showing")}{" "}
        {firstItem === lastItem || totalItems <= limit
          ? lastItem
          : `${firstItem}–${lastItem}`}{" "}
        {t("of")} {totalItems} {t("results")}
      </span>
    </div>
  );
};

export default ShopDataShowing;
