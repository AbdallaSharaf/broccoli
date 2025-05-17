"use client";

import countDiscount from "@/libs/countDiscount";
import getTranslatedName from "@/libs/getTranslatedName";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import { useCartContext } from "@/providers/CartContext";
import { useProductContext } from "@/providers/ProductContext";
import { useWishlistContext } from "@/providers/WshlistContext";

import Image from "next/image";
import { useTranslations } from "../../../hooks/useTranslate.js";
import Link from "next/link.js";


const ProductCardPrimary2 = ({ product, isShowDisc }) => {
  const t = useTranslations("common"); 
  const {
    name,
    description,
    price,
    images,
    imgCover,
    _id,
    priceAfterDiscount,
    priceAfterExpiresAt
  } = product;
  const { setCurrentProduct } = useProductContext();
  const { netPrice } = countDiscount(price, 0);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);
  const { addProductToCart } = useCartContext();
  const { addProductToWishlist } = useWishlistContext();
  return (
    <div
      className="ltn__product-item ltn__product-item-3"
      
      onMouseEnter={() => setCurrentProduct(product)}
    >
      <div className="product-img">
        <Link href={`/products/${_id}`}>
          <Image src={imgCover || '/img/product/1.png'} alt="#" width={1000} height={1000} />
        </Link>
        {isShowDisc ? (
          <div className="product-badge">
            <ul>
              {isShowDisc ? (
                <li className="sale-badge">-{0}%</li>
              ) : status === "sale" ? (
                <li className="new-badge">{status}</li>
              ) : (
                <li className="sale-badge">{status}</li>
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="product-info">
        <h2 className="product-title">
          <Link href={`/products/${_id}`}>{getTranslatedName(name)}</Link>
        </h2>
        {/* <div className="product-ratting">
          <ul>
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fas fa-star"></i>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fas fa-star-half-alt"></i>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="far fa-star"></i>
              </Link>
            </li>
          </ul>
        </div> */}
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

        <div className="product-brief">
          <h6>{sliceText(getTranslatedName(description), 140)}</h6>
        </div>
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
            </li>
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  addProductToCart({
                    ...product,
                    quantity: 1,
                    color: color,
                  });
                }}
                href="#"
                title="Add to Cart"
                data-bs-toggle="modal"
                data-bs-target="#add_to_cart_modal"
              >
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
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
    </div>
  );
};

export default ProductCardPrimary2;