"use client";
import makePath from "@/libs/makePath";
import CategoryContext, { useCategoryContext } from "@/providers/CategoryContext";
import { useCommonContext } from "@/providers/CommonContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";

const ProductCategories = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category"); // Get category from URL
  const { currentPath } = useCommonContext();
  const { categories } = useCategoryContext();

  return (
    <div className="widget ltn__menu-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Product categories
      </h4>
      <ul>
        {categories?.map((category, idx) => {
          const isActive = selectedCategory === category._id; // Compare with category._id
          return (
            <li key={idx}>
              <Link
                href={`${currentPath || "/shop"}?category=${category._id}`}
                className={isActive ? "active" : ""}
              >
                {category?.name?.["en"] ?? category?.name?.["ar"] ?? "N/A"}{" "}
                <span>
                  <i className="fas fa-long-arrow-alt-right"></i>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductCategories;
