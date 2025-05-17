import countDiscount from "@/libs/countDiscount";
import getTranslatedName from "@/libs/getTranslatedName";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate"; // Assuming useTranslations hook

const TopRatedProductCard = ({ product, isShowDisc }) => {
  const t = useTranslations("common");  // Access translations for common terms
  const { name, price,priceAfterDiscount,priceAfterExpiresAt, images, imgCover, _id, discount } = product;
  // Calculate the discounted price if applicable
  const { netPrice } = countDiscount(price, discount);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);

  // Check if discount exists and is greater than 0
  const hasDiscount = discount && discount > 0;

  return (
    <div className="top-rated-product-item clearfix">
      <div className="top-rated-product-img">
        <Link href={`/products/${_id}`}>
          <Image 
            src={imgCover || '/img/product/1.png'}
            alt={getTranslatedName(name)}
            width={1000} 
            height={1000}
          />
        </Link>
      </div>
      <div className="top-rated-product-info">
        {/* <div className="product-ratting">
          <ul>
            <li><Link href="#"><i className="fas fa-star"></i></Link></li>
            <li><Link href="#"><i className="fas fa-star"></i></Link></li>
            <li><Link href="#"><i className="fas fa-star"></i></Link></li>
            <li><Link href="#"><i className="fas fa-star"></i></Link></li>
            <li><Link href="#"><i className="fas fa-star"></i></Link></li>
          </ul>
        </div> */}
        <h6>
          <Link href={`/products/${_id}`}>{sliceText(getTranslatedName(name), 25)}</Link>
        </h6>
        <div className="product-price">
  <span>
    {(
      priceAfterDiscount &&
      !isNaN(Number(priceAfterDiscount)) &&
      Number(priceAfterDiscount) > 0 &&
      (!priceAfterExpiresAt || new Date(priceAfterExpiresAt) > new Date())
        ? Number(priceAfterDiscount)
        : price
    )} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg>
  </span>

  {priceAfterDiscount &&
  !isNaN(Number(priceAfterDiscount)) &&
  Number(priceAfterDiscount) > 0 &&
  Number(priceAfterDiscount) !== price &&
  (!priceAfterExpiresAt || new Date(priceAfterExpiresAt) > new Date()) && (
    <del>{price} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></del>
  )}
</div>

      </div>
    </div>
  );
};

export default TopRatedProductCard;
