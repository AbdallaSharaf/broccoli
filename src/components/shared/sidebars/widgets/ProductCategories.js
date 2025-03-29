"use client";
import makePath from "@/libs/makePath";
import CategoryContext, { useCategoryContext } from "@/providers/CategoryContext";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React from "react";

const ProductCategories = () => {
  const { currentPath, category: currentCategory } = useCommonContext();
  const { categories } = useCategoryContext();
  const filteredCategories = categories;

  return (
    <div className="widget ltn__menu-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Product categories
      </h4>
      <ul>
        {filteredCategories?.map((category, idx) => (
          <li key={idx}>
            <Link
              href={`${currentPath ? currentPath : "/shop"}?category=${makePath(
                category.name["en"] ?? category.name["ar"] ??'N/A'
              )}`}
              className={currentCategory === makePath(category.name["en"]  ?? category.name["ar"] ??'N/A' ) ? "active" : ""}
            >
              {category.name["en"] ?? category.name["ar"] ??'N/A'}{" "}
              <span>
                <i className="fas fa-long-arrow-alt-right"></i>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategories;
