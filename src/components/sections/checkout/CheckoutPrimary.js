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
import { useRouter } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslate";

const CheckoutPrimary = () => {
  const t = useTranslations("common");
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const creteAlert = useSweetAlert();
  const router = useRouter();
  const { cartProducts: products, updateCart, applyCoupon, setCartProducts } = useCartContext();
  const [couponCode, setCouponCode] = useState(products?.coupon?.code || ""); // coupon input
  const [couponResponse, setCouponResponse] = useState(null); // coupon result
  const { login, user } = useUserContext(); // Get login function from context
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // State to track errors
  const [firstName = "", lastName = ""] = user?.name?.split(" ") || [];
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email: user?.email || "",
    phone: "",
    houseNumber: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(null); // Reset previous errors
  
    try {
      const result = await login(loginData.email, loginData.password); // Call login function
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
  const handlePlaceOrder = async () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "houseNumber",
      "city",
      "state",
    ];
  
    const missingFields = requiredFields.filter(
      (field) => !formData[field]?.trim()
    );
  
    if (missingFields.length > 0) {
      creteAlert("error", "Please fill in all required fields.");
      return;
    }
  
    // 🔁 Format the main payload
    const formattedPayload = {
      address: {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        email: formData.email,
        country: formData.state,
        city: formData.city,
        street: formData.houseNumber,
        zipCode: formData.zip,
      },
    };
  
    try {
      const token = localStorage.getItem("token");
      const guest = localStorage.getItem("guest");

      if (formData.notes?.trim()) {
        const responseNote = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/cart/note`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(!token && guest && { tempId: guest }),     
          },
          body: JSON.stringify({
            note: formData.notes.trim(),
          }),
        });
        if (!responseNote.ok) {
          throw new Error(data.message || "Something went wrong");
        }
      }

      // ✅ 1. Place the order
      const response = await fetch(
        `https://fruits-heaven-api.vercel.app/api/v1/order/${products._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(!token && guest && { tempId: guest }),    
          },
          body: JSON.stringify(formattedPayload),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      // ✅ 2. Send the note in a separate API call (if exists)


  
      creteAlert("success", "Order placed successfully!");
      setCartProducts({_id: "" ,items: [] });
      setIsPlaceOrder(false);
      router.push("/"); // 👈 Route to home
    } catch (error) {
      creteAlert("error", error.message || "Failed to place order");
    }
  };
  
  
  

  useEffect(() => {
    if (isProducts) {
      setIsPlaceOrder(true);
    }
  }, [isProducts]);

  useEffect(() => {
    if (products) {
      setCouponCode(products.coupon?.code || "");
    }
  }, [products]);

  useEffect(() => {
    if (user) {
      const [firstName = "", lastName = ""] = user.name?.split(" ") || [];
  
      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: user.email || "",
      }));
    }
  }, [user]);

  return (
    <div className="ltn__checkout-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__checkout-inner">
              {/* login */}
              {!user && <div className="ltn__checkout-single-content ltn__returning-customer-wrap">
                <h5>
                {t("Returning customer?")}{" "}
                  <Link
                    className="ltn__secondary-color"
                    href="#ltn__returning-customer-login"
                    data-bs-toggle="collapse"
                  >
                    {t("Click here to login")}
                  </Link>
                </h5>
                <div
                  id="ltn__returning-customer-login"
                  className="collapse ltn__checkout-single-content-info"
                >
                  <div className="ltn_coupon-code-form ltn__form-box">
                    <p>
                    {t("Please login your account.")}
                    </p>
                    <form onSubmit={handleLogin}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-item input-item-name ltn__custom-icon">
                            <input
                              type="email"
                              name="email"
                              placeholder={t("enter email address")}
                              value={loginData.email}
                              onChange={handleLoginChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-item input-item-email ltn__custom-icon">
                            <input
                              type="password"
                              name="password"
                              placeholder={t("password*")}
                              value={loginData.password}
                              onChange={handleLoginChange}
                            />
                          </div>
                        </div>
                      </div>
                      {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
                      <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">
                        {t("Sign In")}
                      </button>
                      {/* 
                      <label className="input-info-save mb-0">
                        <input type="checkbox" name="agree" /> {t("Remember me")}
                      </label> 
                      */}
                      <p className="mt-30">
                        <Link href="/register">{t("lost your password")}</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>}
              {/* coupon */}
              <div className="ltn__checkout-single-content ltn__coupon-code-wrap">
    {products.coupon ? (
      <h5>
        {t('Coupon')} "{products?.coupon?.code}" {t('applied')}{" "}
        <Link
          className="ltn__secondary-color"
          href="#ltn__coupon-code"
          data-bs-toggle="collapse"
        >
          {t("Do you want to change/remove it?")}
        </Link>
      </h5>
    ) : (
      <h5>
        {t("Have a coupon?")}{" "}
        <Link
          className="ltn__secondary-color"
          href="#ltn__coupon-code"
          data-bs-toggle="collapse"
        >
          {t("Click here to enter your code")}
        </Link>
      </h5>
    )}
    <div
      id="ltn__coupon-code"
      className="collapse ltn__checkout-single-content-info"
    >
      <div className="ltn__coupon-code-form">
        <p>{t("If you have a coupon...")}</p>
        <form onSubmit={handleApplyCoupon}>
          <input
            type="text"
            name="cart-coupon"
            placeholder={t("Coupon code")}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          {couponResponse && (
            <p
              className="mt-2"
              style={{ color: couponResponse.status ? "#28a745" : "#dc3545" }}
            >
              {couponResponse.message}
            </p>
          )}
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="btn theme-btn-2 btn-effect-2"
          >
            {t("Apply coupon")}
          </button>
        </form>
      </div>
    </div>
  </div>
              {/* buyer info */}
              <div className="ltn__checkout-single-content mt-50">
    <h4 className="title-2">{t("Billing Details")}</h4>
    <div className="ltn__checkout-single-content-info">
      <form>
        <h6>{t("Personal Information")}</h6>
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-item-name ltn__custom-icon">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t("first name")}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-item-name ltn__custom-icon">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t("last name")}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-item-email ltn__custom-icon">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("email address")}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-item-phone ltn__custom-icon">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("phone number")}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h6>{t("Street and House")}</h6>
                <div className="input-item">
                  <input
                    type="text"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    placeholder={t("House number and street name")}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h6>{t("Town / City")}</h6>
                <div className="input-item">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder={t("city")}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6>{t("state")}</h6>
            <div className="input-item">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder={t("state")}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <h6>{t("zip")}</h6>
            <div className="input-item">
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder={t("zip")}
              />
            </div>
          </div>
        </div>

        {/* <p>
          <label className="input-info-save mb-0">
            <input type="checkbox" name="agree" /> {t("Create an account?")}
          </label>
        </p> */}

        <h6>{t("Order Notes (optional)")}</h6>
        <div className="input-item input-item-textarea ltn__custom-icon">
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder={t("notes about your order...")}
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
        <h4 className="title-2">{t("Payment Method")}</h4>

        <div id="checkoutAccordion" className="accordion">
          {/* Cash on Delivery */}
          <div className="card">
            <h5
              className="ltn__card-title"
              data-bs-toggle="collapse"
              data-bs-target="#chechoutCollapseTwo"
              aria-expanded="true"
            >
              {t("Cash on delivery")}{" "}
              <Image src="/img/icons/cash.png" alt="#" width={131} height={110} />
            </h5>
            <div
              id="chechoutCollapseTwo"
              className="accordion-collapse collapse show"
              data-bs-parent="#checkoutAccordion"
            >
              <div className="card-body">
                <p>{t("Pay with cash upon delivery.")}</p>
              </div>
            </div>
          </div>

          {/* PayPal */}
          <div className="card">
            <h5
              className="collapsed ltn__card-title"
              data-bs-toggle="collapse"
              data-bs-target="#chechoutCollapseFour"
              aria-expanded="false"
            >
              {t("PayPal")}{" "}
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
                <p>{t("Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ltn__payment-note mt-30 mb-30">
          <p>
            {t(
              "Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy."
            )}
          </p>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="btn theme-btn-1 btn-effect-1 text-uppercase"
          type="submit"
          disabled={!isPlaceOrder}
        >
          {t("place order")}
        </button>
      </div>
    </div>

  {/* product to buy */}
  <div className="col-lg-6">
      {!isProducts ? (
        <Nodata text={t("No Product!")} />
      ) : (
        <div className="shoping-cart-total mt-50">
          <h4 className="title-2">{t("Cart Totals")}</h4>
          <table className="table">
            <tbody>
              {products?.items?.map((product, idx) => (
                <CheckoutProduct key={idx} product={product} />
              ))}

              {products.shipping && (
                <tr>
                  <td>{t("Shipping and Handling")}</td>
                  <td>${modifyAmount(products.shipping)}</td>
                </tr>
              )}

              <tr>
                <td>
                  <strong>{t("Order Total")}</strong>
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
