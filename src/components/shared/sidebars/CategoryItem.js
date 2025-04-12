"use client"
import getTranslatedName from "@/libs/getTranslatedName";
import { useLanguageContext } from "@/providers/LanguageContext";
import Link from "next/link";
import React from "react";

const CategoryItem = ({ item, isMore }) => {
  const { name, _id } = item;
  return (
    <li
      className={`${
        isMore
          ? "ltn__category-menu-more-item-child"
          : "ltn__category-menu-item ltn__category-menu-drop"
      }`}
    >
      <Link href={`/shop?category=${_id}`}>

        {getTranslatedName(name)}{" "}
      </Link>
      {/* dropdown */}
      {/* {dropdown ? (
        <ul
          className={`ltn__category-submenu ltn__category-column-${totalSections}`}
        >
          {dropdown?.map(({ title, path, items }, idx) => (
            <li
              key={idx}
              className="ltn__category-submenu-title ltn__category-menu-drop"
            >
              <Link href={path}>{title}</Link>
              <ul className="ltn__category-submenu-children">
                {items?.map(({ name, path }, idx1) => (
                  <li key={idx1}>
                    <Link href={path}>{name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )} */}
    </li>
  );
};

export default CategoryItem;
