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
    )} {t("SAR")}
  </span>

  {priceAfterDiscount &&
  !isNaN(Number(priceAfterDiscount)) &&
  Number(priceAfterDiscount) > 0 &&
  Number(priceAfterDiscount) !== price &&
  (!priceAfterExpiresAt || new Date(priceAfterExpiresAt) > new Date()) && (
    <del>{price} {t("SAR")}</del>
  )}
</div>

      </div>
    </div>
  );
};

export default TopRatedProductCard;
