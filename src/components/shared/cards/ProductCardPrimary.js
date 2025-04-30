"use client";
import countDiscount from "@/libs/countDiscount";
import getTranslatedName from "@/libs/getTranslatedName";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import { useProductContext } from "@/providers/ProductContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslations } from "../../../hooks/useTranslate.js";

const ProductCardPrimary = ({ product, isShowDisc }) => {
  const t = useTranslations("common"); 
  const { name, price, images, imgCover, _id, status, color,priceAfterDiscount,priceAfterExpiresAt } = product
    ? product
    : {};
  const { setCurrentProduct } = useProductContext();
  const { addProductToCart } = useCartContext();
  const { addProductToWishlist } = useWishlistContext();
  return (
    <div
      className="ltn__product-item ltn__product-item-3 text-center"
      onMouseEnter={() => setCurrentProduct(product)}
    >
      <div className="product-img" style={{ aspectRatio: "1 / 1", width: "100%" }}>
        <Link href={`/products/${_id}`}>
        <Image
          src={imgCover || "/img/product/1.png"}
          alt="#"
          width={1000}
          height={1000}
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
        />
        </Link>
        {/* {status || isShowDisc ? (
          <div className="product-badge">
            <ul>
              {isShowDisc ? (
                <li className="sale-badge">-{disc}%</li>
              ) : status === "sale" ? (
                <li className="new-badge">{status}</li>
              ) : (
                <li className="sale-badge">{status}</li>
              )}
            </ul>
          </div>
        ) : (
          ""
        )} */}
        <div className="product-hover-action">
          <ul>
            <li>
              <Link
                href="#"
                title="Quick View"
                data-bs-toggle="modal"
                data-bs-target="#quick_view_modal"
              >
                <i className="far fa-eye"></i>
              </Link>
            </li>{" "}
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  addProductToCart({
                    ...product,
                    quantity: 1,
                    color: color ? color : "",
                  });
                }}
                href="#"
                title="Add to Cart"
                data-bs-toggle="modal"
                data-bs-target="#add_to_cart_modal"
              >
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>{" "}
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  addProductToWishlist({ ...product, quantity: 1 });
                }}
                href="#"
                title="Wishlist"
                data-bs-toggle="modal"
                data-bs-target="#liton_wishlist_modal"
              >
                <i className="far fa-heart"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="product-info">
        {/* <div className="product-ratting">
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
                <i className="fas fa-star-half-alt"></i>
              </Link>
            </li>{" "}
            <li>
              <Link href="#">
                <i className="far fa-star"></i>
              </Link>
            </li>
          </ul>
        </div> */}
        <h2 className="product-title">
          <Link href={`/products/${_id}`}>{getTranslatedName(name)}</Link>
        </h2>
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

export default ProductCardPrimary;
