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
  const { _id, name, imgCover } = productData;
  // dom referance
  const inputRef = useRef(null);
  // hooks
  
  const { deleteProductFromCart, addProductToCart } = useCartContext();
  const { deleteProductFromWishlist } = useWishlistContext();
  const [quantity, setQuantity] = useState(Number(quantity1) ?? 1);
  const { setCurrentProduct } = useProductContext();
  const t = useTranslations("common"); // Use translation hook for "common" keys
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
      <td className="cart-product-price">{price} {t("SAR")}</td>
      {isWishlist ? (
        <td className="cart-product-stock">{t("In Stock")}</td>
      ) : (
        <td className="cart-product-quantity">
          <div className="cart-plus-minus" ref={inputRef}>
            <div className="dec qtybutton">-</div>
            <input
              value={quantity}
              type="text"
              name="qtybutton"
              className="cart-plus-minus-box"
              onChange={(e) => {
                const val = Number(e.target.value);
                setQuantity(val > 0 ? val : 0.25);
                setIsUpdate(true);
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
        <td className="cart-product-subtotal">{quantity * price} {t("SAR")} </td>
      )}
    </tr>
  );
};

export default CartProduct;
