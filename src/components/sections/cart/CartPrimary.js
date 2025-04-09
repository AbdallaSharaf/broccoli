/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CartProduct from "@/components/shared/cart/CartProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartPrimary = () => {
  const { cartProducts: currentProducts, updateCart, applyCoupon } = useCartContext();
  const [couponCode, setCouponCode] = useState(currentProducts?.coupon?.code || ""); // coupon input
  const [couponResponse, setCouponResponse] = useState(null); // coupon result
  const cartProducts = currentProducts?.items ?? [];
  // stats
  const [updateProducts, setUpdateProducts] = useState(cartProducts);
  const [isUpdate, setIsUpdate] = useState(false);
  // update cart
  const handleUpdateCart = () => {
    updateCart(updateProducts);
    setIsUpdate(false);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    const result = await applyCoupon(couponCode);
    setCouponResponse(result); // show success or error
  };

  useEffect(() => {
      setUpdateProducts([...cartProducts]);
      // console.log("called")
  }, [cartProducts]);

  useEffect(() => {
      setCouponCode(currentProducts?.coupon?.code || "");
      // console.log("called")
  }, [cartProducts]);
  // console.log(modifyAmount(currentProducts?.totalPrice))
  
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
                            <Nodata text={"Empty Cart!"} />
                          </td>
                        </tr>
                      ) : (
                        <>
                      {cartProducts?.length > 0 &&
                        cartProducts?.map((product, idx) => (
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
                                placeholder="Coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                              />
                              <button
                                type="button"
                                onClick={handleApplyCoupon}
                                className="btn theme-btn-2 btn-effect-2"
                              >
                                Apply Coupon
                              </button>
                              {(couponResponse || currentProducts?.coupon) && (
                                <p
                                  className="mt-2"
                                  style={{
                                    color:
                                      couponResponse?.status === false
                                        ? "#dc3545" // red if error
                                        : "#28a745", // green if success or already applied
                                  }}
                                >
                                  {couponResponse?.message || "Coupon already applied"}
                                </p>
                              )}
                            </div>
                        </td>
                        <td>
                          <button
                            onClick={handleUpdateCart}
                            type="button"
                            className={`btn theme-btn-2  ${
                              isUpdate ? "" : "disabled"
                            }`}
                            disabled={isUpdate ? false : true}
                            >
                            Update Cart
                          </button>
                        </td>
                      </tr>
                      </>
                    )}
                    </tbody>
                  </table>
              </div>
              {cartProducts.length > 0 && <div className="shoping-cart-total mt-50">
                <h4>Cart Totals</h4>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Items Price</td>
                        <td>{modifyAmount(currentProducts?.subTotal)} SAR</td>
                      </tr>
                      {currentProducts?.discount &&<tr>
                        <td>Discount</td>
                        <td>{modifyAmount(currentProducts?.discount)} SAR</td>
                      </tr>}
                      <tr>
                        <td>
                          <strong>Net Total</strong>
                        </td>
                        <td>
                          <strong>{currentProducts?.totalPrice} SAR</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                <div className="btn-wrapper text-right">
                  <Link
                    href="/checkout"
                    className="theme-btn-1 btn btn-effect-1"
                    disabled={isUpdate ? false : true}
                  >
                    Proceed to checkout
                  </Link>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPrimary;
