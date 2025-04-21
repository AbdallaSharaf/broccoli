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
                const { _id, name, images, imgCover } = product
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
                        {quantity} x ${modifyAmount(price)}
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
              {t("Subtotal")}: <span>{cartProducts?.totalPrice?.toFixed(2)} {t("SAR")}</span>
            </h5>
          </div>
          <div className="btn-wrapper">
            <ButtonPrimary text={t("viewCart")} path={"/cart"} />
            <ButtonSecondary text={t("checkout")} path={"/checkout"} />
          </div>
          </div>
          <p>{t("Free Shipping on All Orders Over")}{" "}{threshold} {t("SAR")}!</p>
          </>}
        </div>
    </div>
  );
};

export default HeaderCart;
