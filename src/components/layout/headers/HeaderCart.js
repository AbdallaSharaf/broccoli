"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/shared/buttons/ButtonSecondary";
import Nodata from "@/components/shared/no-data/Nodata";
import { useTranslations } from "@/hooks/useTranslate";
import getTranslatedName from "@/libs/getTranslatedName";
import modifyAmount from "@/libs/modifyAmount";

import { useCartContext } from "@/providers/CartContext";
import Image from "next/image";
import Link from "next/link";

const HeaderCart = () => {
  const { cartProducts, deleteProductFromCart } = useCartContext();
  const t = useTranslations("common");
  const threshold = "100";
  if (!cartProducts?.items) return
  return (
    <div
      id="ltn__utilize-cart-menu"
      className="ltn__utilize ltn__utilize-cart-menu"
    >
      <div className="ltn__utilize-menu-inner ltn__scrollbar">
        <div className="ltn__utilize-menu-head">
          <span className="ltn__utilize-menu-title">{t("Cart")}</span>
          <button className="ltn__utilize-close">×</button>
        </div>
        <div className="mini-cart-product-area ltn__scrollbar">
        {cartProducts?.items?.length === 0 ? (
             <Nodata text={t("Empty Cart!")} />
                      ) : (
                        <>
            {cartProducts?.items?.map(
              ({ product, quantity, price }, idx) => {
                const { _id, name, imgCover } = product || {}
                return (
                  <div key={idx} className="mini-cart-item clearfix">
                    <div className="mini-cart-img">
                      <Link href={`/products/${_id}`}>
                        <Image
                          src={imgCover || "/img/product/1.png"}
                          alt="Image"
                          width={1000}
                          height={1000}
                          />
                      </Link>
                      <span
                        onClick={() => deleteProductFromCart(_id, name)}
                        className="mini-cart-item-delete"
                        >
                        <i className="icon-cancel"></i>
                      </span>
                    </div>
                    <div className="mini-cart-info">
                      <h6>
                        <Link href={`/products/${_id}`}>
                          {" "}
                          {getTranslatedName(name)?.length > 22
                          ? getTranslatedName(name).slice(0, 22)
                          : getTranslatedName(name)}
                        </Link>
                      </h6>
                      <span className="mini-cart-quantity">
                        {quantity} x {modifyAmount(price)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg>
                      </span>
                    </div>
                  </div>
                );
              }
            )}
            </>
          )}
      </div>
        {cartProducts?.items?.length > 0 && <>
        <div className="mini-cart-footer">
          <div className="mini-cart-sub-total">
            <h5>
              {t("Subtotal")}: <span>{cartProducts?.totalPrice?.toFixed(2)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></span>
            </h5>
          </div>
          <div className="btn-wrapper">
            <ButtonPrimary text={t("viewCart")} path={"/cart"} />
            <ButtonSecondary text={t("checkout")} path={"/checkout"} />
          </div>
          </div>
          <p>{t("Free Shipping on All Orders Over")}{" "}{threshold} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg>!</p>
          </>}
        </div>
    </div>
  );
};

export default HeaderCart;
