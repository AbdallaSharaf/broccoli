"use client";
import React from "react";
import CategoryItem from "./CategoryItem";
import { useCategoryContext } from "@/providers/CategoryContext";

const HeroSidebar = ({ type }) => {
  const { categories } = useCategoryContext();

  const items = categories?.slice(0, 9); // First 9 items
  const moreItems = categories?.slice(9); // Items after index 8
  
  return (
    <div className="ltn__category-menu-wrap">
      <div className="ltn__category-menu-title">
        <h2
          className={
            type === 2
              ? ` section-bg-2 ltn__secondary-bg text-color-white`
              : "section-bg-1"
          }
        >
          categories
        </h2>
      </div>
      <div className="ltn__category-menu-toggle ltn__one-line-active">
        <ul>
          {/* <!-- Submenu Column - unlimited --> */}

          {items?.map((item, idx) => (
            <CategoryItem key={idx} item={item} />
          ))}

          {/* <!-- Show more menu --> */}
          {moreItems?.map((item, idx) => (
            <CategoryItem key={idx + 10} item={item} isMore={true} />
          ))}

          {/* show more controllers */}
          <li className="ltn__category-menu-more-item-parent">
            <a className="rx-default">
              More categories <span className="cat-thumb  icon-plus"></span>
            </a>
            <a className="rx-show">
              close menu <span className="cat-thumb  icon-remove"></span>
            </a>
          </li>
          {/* <!-- Single menu end --> */}
        </ul>
      </div>
    </div>
  );
};

export default HeroSidebar;
