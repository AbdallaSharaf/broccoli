/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import countDiscount from "@/libs/countDiscount";
import countTotalPrice from "@/libs/countTotalPrice";
import getTranslatedName from "@/libs/getTranslatedName";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import { useCartContext } from "@/providers/CartContext";
import { useProductContext } from "@/providers/ProductContext";
import { useWishlistContext } from "@/providers/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "@/hooks/useTranslate"; // Use translation hook

const CartProduct = ({
  product,
  setUpdateProducts,
  updateProducts,
  setIsUpdate,
  isWishlist,
}) => {
  const { product: productData, quantity: quantity1 = 1, price } = product;
  const { _id, name, imgCover, priceAfterDiscount, priceAfterExpiresAt } = productData;
  // dom referance
  const inputRef = useRef(null);
  // hooks
  
  const { deleteProductFromCart, addProductToCart } = useCartContext();
  const { deleteProductFromWishlist } = useWishlistContext();
  const [quantity, setQuantity] = useState(Number(quantity1) ?? 1);
  const { setCurrentProduct } = useProductContext();
  const t = useTranslations("common"); // Use translation hook for "common" keys
  // console.log("priceAfterExpiresAt", priceAfterExpiresAt)
  // handle quantity change
  useEffect(() => {
    if (!isWishlist) {
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
          setIsUpdate(true);
          return newVal;
        });
      };
  
      const handleDec = () => {
        setQuantity((prev) => {
          const newVal = prev > 0.25 ? prev - 0.25 : 0.25;
          input.value = newVal;
          setIsUpdate(true);
          return newVal;
        });
      };
  
      increament?.addEventListener("click", handleInc);
      decreament?.addEventListener("click", handleDec);
  
      return () => {
        increament?.removeEventListener("click", handleInc);
        decreament?.removeEventListener("click", handleDec);
      };
    }
  }, [isWishlist, quantity, setIsUpdate]);
  
  // handle updated products
  useEffect(() => {
    if (!isWishlist) {
      const newUptedProducts = [...updateProducts]?.map((product) =>
        _id === product?.product?._id ? { ...product, quantity } : product
      );
      setUpdateProducts(newUptedProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWishlist, quantity]);
  console.log(product)
  return (
    <tr onMouseEnter={() => 
    isWishlist? setCurrentProduct({...productData, "quantity": 1}) : setCurrentProduct(product)}>
      <td
        className="cart-product-remove"
        onClick={() =>
          isWishlist
            ? deleteProductFromWishlist(_id)
            : deleteProductFromCart(_id)
        }
      >
        x
      </td>
      <td className="cart-product-image">
        <Link href={`/products/${_id}`}>
          <Image src={imgCover || "/img/product/1.png"} alt="#" height={1000} width={1000} />
        </Link>
      </td>
      <td className="cart-product-info">
        <h4>
          <Link href={`/products/${_id}`}>{sliceText(getTranslatedName(name), 30)}</Link>
        </h4>
      </td>
      <td className="cart-product-price">
  <span>
    {(
      priceAfterDiscount &&
      !isNaN(Number(priceAfterDiscount)) &&
      Number(priceAfterDiscount) > 0 &&
      (!priceAfterExpiresAt || new Date(priceAfterExpiresAt) > new Date())
        ? Number(priceAfterDiscount)
        : price
    ) * quantity} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg>
  </span>

  {priceAfterDiscount &&
  !isNaN(Number(priceAfterDiscount)) &&
  Number(priceAfterDiscount) > 0 &&
  Number(priceAfterDiscount) !== price &&
  (!priceAfterExpiresAt || new Date(priceAfterExpiresAt) > new Date()) && (
    <del>{price * quantity} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></del>
  )}
</td>

      {isWishlist ? (
        <td className="cart-product-stock">{t("In Stock")}</td>
      ) : (
        <td className="cart-product-quantity">
          <div className="cart-plus-minus" ref={inputRef}>
            <div className="dec qtybutton">-</div>
            <input
              value={quantity}
              type="number"
              name="qtybutton"
              className="cart-plus-minus-box"
              min="0.25"
              step="0.25"
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && val > 0 && (val * 100) % 25 === 0) {
                  setQuantity(val);
                  setIsUpdate(true);
                }
              }}
            />
            <div className="inc qtybutton">+</div>
          </div>
        </td>
      )}

      {isWishlist ? (
        <td
          className="cart-product-add-cart"
          onClick={() =>
            addProductToCart({ ...productData, quantity: 1 })
          }
        >
          <Link
            className="submit-button-1"
            href="#"
            title={t("addToCart")} 
            data-bs-toggle="modal"
            data-bs-target="#add_to_cart_modal"
          >
            {t("addToCart")}  {/* Translated "Add to Cart" */}
          </Link>
        </td>
      ) : (
        <td className="cart-product-subtotal">{quantity * price} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg> </td>
      )}
    </tr>
  );
};

export default CartProduct;
