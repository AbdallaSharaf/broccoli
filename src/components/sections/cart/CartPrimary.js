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
  const { cartProducts: currentProducts, applyCoupon, cartLoading } = useCartContext();
  const [couponCode, setCouponCode] = useState(currentProducts?.coupon?.code || "");
  const [couponResponse, setCouponResponse] = useState(null);
  const cartProducts = currentProducts?.items ?? [];

  const [updateProducts, setUpdateProducts] = useState(cartProducts);
  const [isUpdate, setIsUpdate] = useState(false);

  const t = useTranslations("common"); // use "common" namespace

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
                        <td>{modifyAmount(currentProducts?.subTotal)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></td>
                      </tr>
                      {currentProducts?.discount && (
                        <tr>
                          <td>{t("Discount")}</td>
                          <td>{modifyAmount(currentProducts?.discount)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></td>
                        </tr>
                      )}
                      <tr>
                        <td>
                          <strong>{t("Net Total")}</strong>
                        </td>
                        <td>
                          <strong>{Number(currentProducts?.totalPrice).toFixed(2)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></strong>
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
