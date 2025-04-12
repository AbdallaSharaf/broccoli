"use client";
import getTranslatedName from "@/libs/getTranslatedName";
import { useProductContext } from "@/providers/ProductContext";
import React from "react";

const TabDescription = () => {
  const { product } = useProductContext();
  return (
    <div className="ltn__shop-details-tab-content-inner">
      {/* <h4 className="title-2">Lorem ipsum dolor sit amet elit.</h4> */}
      <p>
        {getTranslatedName(product?.description)}
      </p>
    </div>
  );
};

export default TabDescription;
