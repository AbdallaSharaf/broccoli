"use client"
import { useTranslations } from "@/hooks/useTranslate";
import countTotalPrice from "@/libs/countTotalPrice";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import { useHeaderContex } from "@/providers/HeaderContex";
import Link from "next/link";
import React from "react";

const HeaderCartShow = () => {
  const { headerStyle } = useHeaderContex();
  const { cartProducts } = useCartContext();
  const totalProduct = cartProducts?.items?.length;
  // console.log(totalProduct)
  const t = useTranslations("header");

  if(!cartProducts?.items) return
  return (
    <>
        <div
          className={`mini-cart-icon   ${
            headerStyle === 5 ? "mini-cart-icon-2" : ""
          }`}
        >
          <Link href="#ltn__utilize-cart-menu" className="ltn__utilize-toggle">
            <span className={headerStyle === 5 ? "mini-cart-icon" : ""}>
              <i className="icon-shopping-cart"></i> <sup>{totalProduct || 0}</sup>
            </span>
            {headerStyle === 5 ? (
              <h6>
                <span>{t("yourCart")}</span>{" "}
                <span className="ltn__secondary-color">
                  {cartProducts?.totalPrice && modifyAmount(cartProducts?.totalPrice)} {t("SAR")}
                </span>
              </h6>
            ) : (
              ""
            )}
          </Link>
        </div>
    </>
  );
};

export default HeaderCartShow;
