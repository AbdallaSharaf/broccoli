import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopRatedProductCard = ({ product, isShowDisc }) => {
  const { name, price, images, _id } = product;
  const { netPrice } = countDiscount(price, 0);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);

  return (
    <div className="top-rated-product-item clearfix">
      <div className="top-rated-product-img">
        <Link href={`/products/${_id}`}>
          <Image 
            src={images?.[0] || '/img/product/1.png'}
            alt="#" width={1000} height={1000}
          />
        </Link>
      </div>
      <div className="top-rated-product-info">
        <div className="product-ratting">
          <ul>
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>
          </ul>
        </div>
        <h6>
          <Link href={`/products/${_id}`}>{sliceText(name?.["en"] ?? name?.["ar"], 25)}</Link>
        </h6>
        <div className="product-price">
          <span>${netPriceModified}</span>
          <del>${priceModified}</del>
        </div>
      </div>
    </div>
  );
};

export default TopRatedProductCard;
