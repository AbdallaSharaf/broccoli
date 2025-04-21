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
const ProductDetailsRight = ({ product }) => {
  // destructure current product
  
  const {
    name,
    price,
    priceAfterDiscount,
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
  // console.log("quantity", quantity)
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
      {/* price */}
      <div className="product-price text-nowrap">
        <span>{(priceAfterDiscount && !isNaN(priceAfterDiscount) ? priceAfterDiscount : price) * quantity} {t("SAR")}</span>
        {!isNaN(priceAfterDiscount) && priceAfterDiscount !== price && (
          <del>{price * quantity} {t("SAR")}</del>
        )}
      </div>
      {/* description */}

      {/* category, availability */}
      {Array.isArray(category) && category?.length > 0 && <div className={`modal-product-meta ltn__product-details-menu-1`}>
        <ul>
          <li
            onClick={() => {
              if (!type) controlModal();
            }}
          >
            <strong>{t("categories")}:</strong>{" "}
            <span>
              {Array.isArray(category) && category?.map((cat) => (
                <Link key={cat.category._id} href={`/shop?category=${cat.category._id}`}>
                  {getTranslatedName(cat.category?.name)}
                </Link>
              ))}
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
                onChange={(e) =>{
                  setQuantity(
                    !Number(e.target.value) ? 0.25 : Number(e.target.value)
                  )
                }
              }
                type="text"
                value={quantity}
                name="qtybutton"
                className="cart-plus-minus-box"
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
