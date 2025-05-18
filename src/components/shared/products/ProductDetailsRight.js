"use client";
import controlModal from "@/libs/controlModal";

import { useCartContext } from "@/providers/CartContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCommonContext } from "@/providers/CommonContext";

import countCommentLength from "@/libs/countCommentLength";
import modifyNumber from "@/libs/modifyNumber";
import getTranslatedName from "@/libs/getTranslatedName";
import { useTranslations } from "@/hooks/useTranslate";
import modifyAmount from "@/libs/modifyAmount";
const ProductDetailsRight = ({ product }) => {
  // destructure current product
  // console.log(product.category)
  const {
    name,
    price,
    priceAfterDiscount,
    description,
    priceAfterExpiresAt,
    reviews = [],
    category = []
  } = product || {};  // current Date

  // hooks
  const value = useCommonContext();
  const t = useTranslations("common");
  const { addProductToCart } = useCartContext();
  const { addProductToWishlist } = useWishlistContext();
  // dom referance
  const inputRef = useRef(null);
  // states
  const [quantity, setQuantity] = useState(1);
  // varriables
  const { type } = value ? value : {};
  // const netPriceModified = modifyAmount(netPrice);
  // const priceModified = modifyAmount(price);
  const reviewsLength = countCommentLength(reviews);
  const productToSave = {
    ...product,
    quantity,
  };
  useEffect(() => {
      const inputParent = inputRef.current;
      if (!inputParent) return;
  
      const input = inputParent.querySelector("input");
      const increament = inputParent.querySelector(".inc");
      const decreament = inputParent.querySelector(".dec");
  
      input.value = quantity;
  
      const handleInc = () => {
        setQuantity((prev) => {
          const newVal = prev + 0.25;
          input.value = newVal;
          return newVal;
        });
      };
  
      const handleDec = () => {
        setQuantity((prev) => {
          const newVal = prev > 0.25 ? prev - 0.25 : 0.25;
          input.value = newVal;
          return newVal;
        });
      };
  
      increament?.addEventListener("click", handleInc);
      decreament?.addEventListener("click", handleDec);

      return () => {
        increament?.removeEventListener("click", handleInc);
        decreament?.removeEventListener("click", handleDec);
      };

  }, [inputRef.current]);

  if (!product) {
    return;
  }
  // console.log("description", description)
  return (
    <div className="modal-product-info shop-details-info pl-0" id="details">
      {/* ratings */}
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
          </li>{" "}
          <li className="review-total">
            <Link href="#"> ( {modifyNumber(reviewsLength)} Reviews )</Link>
          </li>
        </ul>
      </div> */}
      <h3>{getTranslatedName(name)}</h3>
      {(description?.ar || description?.en) && <h4 className="mb-2">{getTranslatedName(description)}</h4>}
      {/* price */}
      <div className="product-price text-nowrap">
        <span>
          {Number((
            priceAfterDiscount &&
            !isNaN(Number(priceAfterDiscount)) &&
            Number(priceAfterDiscount) > 0 &&
            (!priceAfterExpiresAt || new Date(priceAfterExpiresAt) > new Date())
              ? Number(priceAfterDiscount)
              : price
          ) * quantity).toFixed(2)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg>
        </span>

        {priceAfterDiscount &&
        !isNaN(Number(priceAfterDiscount)) &&
        Number(priceAfterDiscount) > 0 &&
        Number(priceAfterDiscount) !== price &&
        (!priceAfterExpiresAt || new Date(priceAfterExpiresAt) > new Date()) && (
          <del>{modifyAmount(price * quantity)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></del>
        )}
      </div>

      {/* description */}

      {/* category, availability */}
      {category && Array.isArray(category) && category?.length > 0 && <div className={`modal-product-meta ltn__product-details-menu-1`}>
        <ul>
          <li
            onClick={() => {
              if (!type) controlModal();
            }}
          >
            <strong>{t("categories")}:</strong>{" "}
            <span>
            {category && Array.isArray(category) && category
              ?.filter(cat => cat.category) // This filters out any items where cat.category is null/undefined
              ?.map((cat) => (
                <Link key={cat.category._id} href={`/shop?category=${cat.category._id}`}>
                  {getTranslatedName(cat.category?.name)}
                </Link>
              ))
            }
            </span>
          </li>
        </ul>
      </div>}
      {/* countdown */}

      {/* add to cart */}
      <div className="ltn__product-details-menu-2">
        <ul>
          <li>
            <div className="cart-plus-minus" ref={inputRef}>
            <div className="dec qtybutton">-</div>
                       <input
              value={quantity}
              type="text"
              name="qtybutton"
              className="cart-plus-minus-box"
              onChange={(e) => {
                const val = parseFloat(e.target.value);

                // Check if it's a number and a multiple of 0.25
                if (!isNaN(val) && val > 0 && (val * 100) % 25 === 0) {
                  setQuantity(val);
                }
              }}
            />
              <div className="inc qtybutton">+</div>
            </div>
          </li>{" "}
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                addProductToCart(productToSave);
              }}
              href="#"
              className="theme-btn-1 btn btn-effect-1"
              title="Add to Cart"
              data-bs-toggle="modal"
              data-bs-target="#add_to_cart_modal"
            >
              <i className="fas fa-shopping-cart"></i> <span>{t("addToCart")}</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* add to wishlist and compare */}
      <div className="ltn__product-details-menu-3">
        <ul>
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                addProductToWishlist(productToSave);
              }}
              href="#"
              className=""
              title="Wishlist"
              data-bs-toggle="modal"
              data-bs-target="#liton_wishlist_modal"
            >
              <i className="far fa-heart"></i> <span>{t("Add to Wishlist")}</span>
            </Link>
          </li>{" "}
          {/* <li>
            <Link
              href="#"
              className=""
              title="Compare"
              data-bs-toggle="modal"
              data-bs-target="#quick_view_modal"
            >
              <i className="fas fa-exchange-alt"></i> <span>Compare</span>
            </Link>
          </li> */}
        </ul>
      </div>
      <hr />
      {/* socials */}
      <div className="ltn__social-media">
        <ul>
          <li>{t("Share")}:</li>{" "}
          <li>
            <Link href="https://www.facebook.com" title="Facebook">
              <i className="fab fa-facebook-f"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="https://x.com" title="Twitter">
              <i className="fab fa-twitter"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="https://www.linkedin.com" title="Linkedin">
              <i className="fab fa-linkedin"></i>
            </Link>
          </li>{" "}
          <li>
            <Link href="https://www.instagram.com" title="Instagram">
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
        </ul>
      </div>
      {/* checkout image */}
      {type ? (
        <>
          <hr />
          <div className="ltn__safe-checkout">
            <h5>{t("Guaranteed Safe Checkout")}</h5>
            <Image
              src="/img/icons/payment-2.png"
              alt="Payment Image"
              height={35}
              width={350}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductDetailsRight;
