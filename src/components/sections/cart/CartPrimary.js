/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CartProduct from "@/components/shared/cart/CartProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "@/hooks/useTranslate"; // import translation hook

const CartPrimary = () => {
  const { cartProducts: currentProducts, updateCart, applyCoupon, cartLoading } = useCartContext();
  const [couponCode, setCouponCode] = useState(currentProducts?.coupon?.code || "");
  const [couponResponse, setCouponResponse] = useState(null);
  const cartProducts = currentProducts?.items ?? [];

  const [updateProducts, setUpdateProducts] = useState(cartProducts);
  const [isUpdate, setIsUpdate] = useState(false);

  const t = useTranslations("common"); // use "common" namespace

  const handleUpdateCart = () => {
    updateCart(updateProducts);
    setIsUpdate(false);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    const result = await applyCoupon(couponCode);
    setCouponResponse(result);
  };

  useEffect(() => {
    setUpdateProducts([...cartProducts]);
  }, [cartProducts]);

  useEffect(() => {
    setCouponCode(currentProducts?.coupon?.code || "");
  }, [cartProducts]);

  if (cartLoading) return (    
  <div className="error-404-inner text-center">
  <h1 className="error-404-title">{"⏳"}</h1>
  <h2>{t("Fetching Your Cart")}</h2>
  </div>)
  return (
    <div className="liton__shoping-cart-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping-cart-inner">
              <div className="shoping-cart-table table-responsive">
                <table className="table">
                  <tbody>
                    {cartProducts.length === 0 ? (
                      <tr>
                        <td>
                          <Nodata text={t("Empty Cart!")} />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {cartProducts.map((product, idx) => (
                          <CartProduct
                            key={idx}
                            product={product}
                            updateProducts={updateProducts}
                            setUpdateProducts={setUpdateProducts}
                            setIsUpdate={setIsUpdate}
                          />
                        ))}
                        <tr className="cart-coupon-row">
                          <td colSpan="6">
                            <div className="cart-coupon">
                              <input
                                type="text"
                                name="cart-coupon"
                                placeholder={t("Coupon code")}
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                style={{ height: "65px", marginInlineEnd: "20px" }}
                              />
                              <button
                                type="button"
                                onClick={handleApplyCoupon}
                                className="btn theme-btn-2 btn-effect-2"
                                style={{ height: "65px" }}
                              >
                                {t("Apply coupon")}
                              </button>
                              {(couponResponse || currentProducts?.coupon) && (
                                <p
                                  className="mt-2"
                                  style={{
                                    color:
                                      couponResponse?.success === false
                                        ? "#dc3545"
                                        : "#28a745",
                                  }}
                                >
                                  {couponResponse?.message || t("Coupon already applied")}
                                </p>
                              )}
                            </div>
                          </td>
                          <td>
                            <button
                              onClick={handleUpdateCart}
                              type="button"
                              className={`btn theme-btn-2 ${isUpdate ? "" : "disabled"}`}
                              disabled={!isUpdate}
                            >
                              {t("update cart")}
                            </button>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {cartProducts.length > 0 && (
                <div className="shoping-cart-total mt-50">
                  <h4>{t("Cart Totals")}</h4>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>{t("Items Price")}</td>
                        <td>{modifyAmount(currentProducts?.subTotal)} {t("SAR")}</td>
                      </tr>
                      {currentProducts?.discount && (
                        <tr>
                          <td>{t("Discount")}</td>
                          <td>{modifyAmount(currentProducts?.discount)} {t("SAR")}</td>
                        </tr>
                      )}
                      <tr>
                        <td>
                          <strong>{t("Net Total")}</strong>
                        </td>
                        <td>
                          <strong>{currentProducts?.totalPrice} {t("SAR")}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="btn-wrapper text-right">
                    <Link
                      href="/checkout"
                      className="theme-btn-1 btn btn-effect-1"
                      disabled={isUpdate}
                    >
                      {t("Proceed to checkout")}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPrimary;
