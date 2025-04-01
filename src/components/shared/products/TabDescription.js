"use client";
import { useProductContext } from "@/providers/ProductContext";
import React from "react";

const TabDescription = () => {
  const { product } = useProductContext();
  return (
    <div className="ltn__shop-details-tab-content-inner">
      {/* <h4 className="title-2">Lorem ipsum dolor sit amet elit.</h4> */}
      <p>
        {product?.description["en"] || product?.description["ar"] || "N/A"}
      </p>
    </div>
  );
};

export default TabDescription;
