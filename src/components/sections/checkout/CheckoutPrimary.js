/* eslint-disable jsx-a11y/role-supports-aria-props */
"use client";
import CheckoutProduct from "@/components/shared/checkout/CheckoutProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import modifyAmount from "@/libs/modifyAmount";
import { useCartContext } from "@/providers/CartContext";
import Image from "next/image";
const paymnetImage3 = "/img/icons/payment-3.png";
import useSweetAlert from "@/hooks/useSweetAlert";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserContext } from "@/providers/UserContext";

const CheckoutPrimary = () => {
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const creteAlert = useSweetAlert();
  const { cartProducts: products, updateCart, applyCoupon } = useCartContext();
  const [couponCode, setCouponCode] = useState(""); // coupon input
  const [couponResponse, setCouponResponse] = useState(null); // coupon result
  const { login, user } = useUserContext(); // Get login function from context
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // State to track errors
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(null); // Reset previous errors
  
    try {
      const result = await login(formData.email, formData.password); // Call login function
      console.log(result)
      if (result) {
        updateCart(products.items);
        // setCartProducts(result.cart); // update UI cart from merged version
          // maybe navigate to /dashboard or /cart
        // router.push("/"); // Redirect only if login is successful
      } else {
        setError("Invalid email or password"); // Show error if login fails
      }
    } catch (err) {
      console.log(err)
      setError("Something went wrong. Please try again."); // Handle unexpected errors
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    const result = await applyCoupon(couponCode);
    setCouponResponse(result); // show success or error
  };

  const isProducts = products.items.length > 0;
  // handle place order
  const handlePlaceOrder = () => {
    creteAlert("error", "Sorry! App is in demo mode.");
    setIsPlaceOrder(false);
  };
  useEffect(() => {
    if (isProducts) {
      setIsPlaceOrder(true);
    }
  }, [isProducts]);
  return (
    <div className="ltn__checkout-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__checkout-inner">
              {/* login */}
              {!user && <div className="ltn__checkout-single-content ltn__returning-customer-wrap">
                <h5>
                  Returning customer?{" "}
                  <Link
                    className="ltn__secondary-color"
                    href="#ltn__returning-customer-login"
                    data-bs-toggle="collapse"
                  >
                    Click here to login
                  </Link>
                </h5>
                <div
                  id="ltn__returning-customer-login"
                  className="collapse ltn__checkout-single-content-info"
                >
                  <div className="ltn_coupon-code-form ltn__form-box">
                    <p>Please login your accont.</p>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-item input-item-email ltn__custom-icon">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password*"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          </div>
                        </div>
                      </div>
                      {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
                      <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">
                        Login
                      </button>
                      {/* <label className="input-info-save mb-0">
                        <input type="checkbox" name="agree" /> Remember me
                      </label> */}
                      <p className="mt-30">
                        <Link href="/register">Lost your password?</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>}
              {/* coupon */}
              <div className="ltn__checkout-single-content ltn__coupon-code-wrap">
                <h5>
                  Have a coupon?{" "}
                  <Link
                    className="ltn__secondary-color"
                    href="#ltn__coupon-code"
                    data-bs-toggle="collapse"
                  >
                    Click here to enter your code
                  </Link>
                </h5>
                <div
                  id="ltn__coupon-code"
                  className="collapse ltn__checkout-single-content-info"
                >
                  <div className="ltn__coupon-code-form">
                    <p>If you have a coupon code, please apply it below.</p>
                    <form onSubmit={handleApplyCoupon}>
                    <input
                        type="text"
                        name="cart-coupon"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      {couponResponse && (
                          <p
                            className="mt-2"
                            style={{ color: couponResponse.status ? "#28a745" : "#dc3545" }} // green if true, red if false
                          >
                            {couponResponse.message}
                          </p>
                        )}
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="btn theme-btn-2 btn-effect-2"
                    >
                      Apply Coupon
                    </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* buyer info */}
              <div className="ltn__checkout-single-content mt-50">
                <h4 className="title-2">Billing Details</h4>
                <div className="ltn__checkout-single-content-info">
                  <form action="#">
                    <h6>Personal Information</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="text"
                            name="ltn__name"
                            placeholder="First name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="text"
                            name="ltn__lastname"
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-email ltn__custom-icon">
                          <input
                            type="email"
                            name="ltn__email"
                            placeholder="email address"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-phone ltn__custom-icon">
                          <input
                            type="text"
                            name="ltn__phone"
                            placeholder="phone number"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-website ltn__custom-icon">
                          <input
                            type="text"
                            name="ltn__company"
                            placeholder="Company name (optional)"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-website ltn__custom-icon">
                          <input
                            type="text"
                            name="ltn__phone"
                            placeholder="Company address (optional)"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <h6>Address</h6>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-item">
                              <input
                                type="text"
                                placeholder="House number and street name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-item">
                              <input
                                type="text"
                                placeholder="Apartment, suite, unit etc. (optional)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <h6>Town / City</h6>
                        <div className="input-item">
                          <input type="text" placeholder="City" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <h6>State </h6>
                        <div className="input-item">
                          <input type="text" placeholder="State" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <h6>Zip</h6>
                        <div className="input-item">
                          <input type="text" placeholder="Zip" />
                        </div>
                      </div>
                    </div>
                    {/* <p>
                      <label className="input-info-save mb-0">
                        <input type="checkbox" name="agree" /> Create an
                        account?
                      </label>
                    </p> */}
                    <h6>Order Notes (optional)</h6>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <textarea
                        name="ltn__message"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* payment methods */}
          <div className="col-lg-6">
            <div className="ltn__checkout-payment-method mt-50">
              <h4 className="title-2">Payment Method</h4>

              <div id="checkoutAccordion" className="accordion">
                {/* <!-- card --> */}
                {/* <div className="card ">
                  <h5
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseOne"
                    aria-expanded="false"
                  >
                    Check payments
                  </h5>
                  <div
                    id="chechoutCollapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>
                        Please send a check to Store Name, Store Street, Store
                        Town, Store State / County, Store Postcode.
                      </p>
                    </div>
                  </div>
                </div> */}
                {/* <!-- card --> */}
                <div className="card">
                  <h5
                    className="ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseTwo"
                    aria-expanded="true"
                  >
                    Cash on delivery{" "}
                    <Image
                      src="/img/icons/cash.png"
                      alt="#"
                      width={131}
                      height={110}
                    />
                  </h5>
                  <div
                    id="chechoutCollapseTwo"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>Pay with cash upon delivery.</p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                {/* <div className="card">
                  <h5
                    className="ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseThree"
                    aria-expanded="false"
                  >
                    ApplePay{" "}
                    <Image
                      src="/img/icons/applepay.png"
                      alt="#"
                      width={131}
                      height={110}
                    />
                  </h5>
                  <div
                    id="chechoutCollapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>Apple Pay is the modern way to pay.</p>
                    </div>
                  </div>
                </div> */}
                {/* <!-- card --> */}
                <div className="card">
                  <h5
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#chechoutCollapseFour"
                    aria-expanded="false"
                  >
                    PayPal{" "}
                    <Image
                      src={paymnetImage3}
                      width={319}
                      height={110}
                      style={{ maxWidth: "131px" }}
                      alt="#"
                    />
                  </h5>
                  <div
                    id="chechoutCollapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#checkoutAccordion"
                  >
                    <div className="card-body">
                      <p>
                        Pay via PayPal; you can pay with your credit card if you
                        don’t have a PayPal account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ltn__payment-note mt-30 mb-30">
                <p>
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                type="submit"
                disabled={isPlaceOrder ? false : true}
              >
                Place order
              </button>
            </div>
          </div>
          {/* product to buy */}
          <div className="col-lg-6">
            {!isProducts ? (
              <Nodata text={"No Product!"} />
            ) : (
              <div className="shoping-cart-total mt-50">
                <h4 className="title-2">Cart Totals</h4>
                <table className="table">
                  <tbody>

                      {products?.items?.map((product, idx) => (
                        <CheckoutProduct key={idx} product={product} />
                      ))
                    }

                    <tr>
                      <td>Shipping and Handing</td>
                      <td>${modifyAmount(products.shipping)}</td>
                    </tr>
                    <tr>
                      <td>Vat</td>
                      <td>$00.00</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Order Total</strong>
                      </td>
                      <td>
                        <strong>${products.totalPrice}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPrimary;
