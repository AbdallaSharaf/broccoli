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
import axiosInstance from "@/libs/axiosInstance";

const CheckoutPrimary = () => {
  const t = useTranslations("common");
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const creteAlert = useSweetAlert();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('cash'); // default to cash on delivery
  const { cartProducts: products, updateCart, applyCoupon, setCartProducts } = useCartContext();
  const [couponCode, setCouponCode] = useState(products?.coupon?.code || ""); // coupon input
  const [couponResponse, setCouponResponse] = useState(null); // coupon result
  const { login, userData } = useUserContext(); // Get login function from context
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // State to track errors
  const [fieldErrors, setFieldErrors] = useState({});
  const [firstName = "", lastName = ""] = userData?.name?.split(" ") || [];
  console.log(products)
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email: userData?.email || "",
    phone: "",
    landmark: "",
    houseNumber: "",
    street: "",
    district: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
const [locationError, setLocationError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error("Geolocation error:", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationError(t("Permission denied. Please enable location access in Settings."));
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError(t("Position unavailable."));
              break;
            case error.TIMEOUT:
              setLocationError(t("Request timed out."));
              break;
            default:
              setLocationError("An unknown error occurred.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  };
  
  console.log(selectedPayment)
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(null); // Reset previous errors
  
    try {
      const result = await login(loginData.email, loginData.password); // Call login function
      if (result.status) {
        updateCart(products.items);
        setCartProducts(result.cart);
        // setCartProducts(result.cart); // update UI cart from merged version
          // maybe navigate to /dashboard or /cart
        // router.push("/"); // Redirect only if login is successful
      } else {
        setError(t(result.error)); // Show error if login fails
      }
    } catch (err) {
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
  setLoading(true);
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "district",
    "street",
  ];

  // Validate required fields
  const missingFields = requiredFields.filter(
    (field) => !formData[field]?.trim()
  );

    // Validate phone number format
  const phoneRegex = /^966\d{9}$/;
  if (formData.phone && !phoneRegex.test(formData.phone.trim())) {
    setFieldErrors({
      ...fieldErrors,
      phone: t("Phone must start with 966 followed by 9 digits (e.g., 966512345678)")
    });
    setLoading(false);
    creteAlert("error", t("Invalid phone number format"));
    return;
  }
  
  // Validate district and street are not the same
  if (formData.district?.trim() && formData.street?.trim() && 
      formData.district.trim().toLowerCase() === formData.street.trim().toLowerCase()) {
    setFieldErrors({
      ...fieldErrors,
      district: t("District and street cannot be the same"),
      street: t("District and street cannot be the same")
    });
    setLoading(false);
    creteAlert("error", t("District and street cannot be the same"));
    return;
  }

  if (missingFields.length > 0) {
    const newErrors = {};
    missingFields.forEach(field => {
      newErrors[field] = t("This field is required");
    });
    setFieldErrors(newErrors);
    setLoading(false);
    creteAlert("error", t("Please fill in all required fields"));
    return;
  } else {
    setFieldErrors({}); // Clear errors if all fields are valid
  }

  // Format the main payload with concatenated address fields
  const formattedPayload = {
    address: {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: formData.phone,
      email: formData.email,
      country: formData.state,
      city: formData.city,
      street: [
        formData.houseNumber,
        formData.street,
        formData.district,
        formData.landmark
      ].filter(Boolean).join(', '), // Concatenate and remove empty parts
      location: `https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`,
    },
  };

  try {
    const token = localStorage.getItem("token");
    const guest = localStorage.getItem("guest");
    
    // Set up common headers
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(!token && guest && { tempId: guest }),
    };

    // Submit note if exists (for both payment methods)
    if (formData.notes?.trim()) {
      await axiosInstance.post("/cart/note", {
        note: formData.notes.trim(),
      }, { headers });
    }

    // Determine API endpoint based on payment method
    const endpoint = selectedPayment === 'paypal' 
      ? `/order/cardOrder/${products._id}`
      : `/order/${products._id}`;

    // Place the order
    const { data } = await axiosInstance.post(endpoint, formattedPayload, { headers });

    // Handle PayPal redirect
    if (selectedPayment === 'paypal' && data.invoiceURL) {
      window.location.href = data.invoiceURL;
      setLoading(false);
      return; // Exit function as we're redirecting
    }

    // For cash on delivery, proceed with success flow
    const productIds = products.items.map((item) => item.productId);
    
    creteAlert("success", "Order placed successfully!");
    setCartProducts({ _id: "", items: [] });
    setIsPlaceOrder(false);
    
    // Track purchase events
    fbq("track", "Purchase", {
      value: data.order.totalPrice,
      currency: "SAR",
    });
    
    snaptr('track', 'PURCHASE', {
      'price': data.order.totalPrice,
      'currency': 'SAR',
      'transaction_id': data.order.invoiceId,
      'item_ids': productIds,
      'number_items': data.order.totalQuantity,
      'payment_info_available': selectedPayment === 'paypal' ? 1 : 0,
      'success': 1,
      'user_email': data.order.shippingAddress.email,
      'user_phone_number': data.order.shippingAddress.phone || data.order.user?.phone,
      'firstname': data.order.shippingAddress.name.split(' ')[0] || data.order.user?.name.split(' ')[0],
      'lastname': data.order.shippingAddress.name.split(' ')[1] || data.order.user?.name.split(' ')[1],
      'geo_state': data.order.shippingAddress.street,
      'geo_city': data.order.shippingAddress.city,
      'geo_country': data.order.shippingAddress.country,
      'geo_postal_code': data.order.shippingAddress.zipCode
    });
    setLoading(false);
    router.push(`/order-placed/${data.order.invoiceId}`);

  } catch (error) {
    creteAlert("error", error.response?.data?.message || error.message || error || "Failed to place order");
    setLoading(false);
  }
};
  
  
  //   useEffect(() => {
  //   fbq("track", "Purchase", {
  //     value: totalPrice,
  //     currency: "USD",
  //     contents: cart.map((item) => ({
  //       id: item._id,
  //       quantity: item.quantity,
  //     })),
  //     content_type: "product",
  //   });
  // }, []);

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
  if (userData) {
    const [firstName = "", lastName = ""] = userData.name?.split(" ") || [];
    
    // Split address.street by comma and trim whitespace
    const addressParts = userData.address?.[0]?.street?.split(",").map(part => part.trim()) || [];
    
    setFormData((prev) => ({
      ...prev,
      firstName,
      lastName,
      email: userData.email || "",
      houseNumber: addressParts[0] || "",       // First part before comma
      street: addressParts[1] || "",           // Second part
      district: addressParts[2] || "",         // Third part
      landmark: addressParts[3] || "",         // Fourth part
      city: userData.address?.[0]?.city || "الرياض",
      state: userData.address?.[0]?.country || "",
    }));
  }
}, [userData]);

  return (
    <div className="ltn__checkout-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__checkout-inner">
              {/* login */}
              {!userData && <div className="ltn__checkout-single-content ltn__returning-customer-wrap">
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
                        <Link href="/forget-password">{t("lost your password")}</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>}
              {/* coupon */}
              <div className="ltn__checkout-single-content ltn__coupon-code-wrap">
    {products.coupon ? (
      <h5>
        {t('Coupon')} {products?.coupon?.code} {t('applied')}{" "}
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
                className={fieldErrors.firstName ? "input-error" : ""}

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
                className={fieldErrors.lastName ? "input-error" : ""}

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
                className={fieldErrors.email ? "input-error" : ""}
              />
            </div>
          </div>
<div className="col-md-6">
  <div className="input-item input-item-phone ltn__custom-icon">
    <input
      type="text"
      name="phone"
      value={formData.phone}
      onChange={(e) => {
        // Allow only numbers
        const value = e.target.value.replace(/\D/g, '');
        // Auto-insert 966 if not present
        let formattedValue = value;
        if (!value.startsWith('966') && value.length > 0) {
          formattedValue = '966' + value;
        }
        // Limit to 12 characters (966 + 9 digits)
        if (formattedValue.length <= 12) {
          handleChange({
            target: {
              name: 'phone',
              value: formattedValue
            }
          });
        }
      }}
      placeholder={t("966512345678")}
      required
      className={fieldErrors.phone ? "input-error" : ""}
      maxLength={12} // 966 + 9 digits
    />
    {fieldErrors.phone && (
      <div className="error-message">{fieldErrors.phone}</div>
    )}
  </div>
</div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12 col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h6>{t("House Number")}</h6>
                <div className="input-item">
                  <input
                    type="text"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    placeholder={t("House number")}
                    required
                    className={fieldErrors.houseNumber ? "input-error" : ""}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h6>{t("District")}</h6>
                <div className="input-item">
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder={t("District")}
                    required
                    className={fieldErrors.district ? "input-error" : ""}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h6>{t("Street")}</h6>
                <div className="input-item">
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder={t("Street name")}
                    required
                    className={fieldErrors.street ? "input-error" : ""}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h6>{t("Landmark")}</h6>
                <div className="input-item">
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder={t("landmark")}
                    required
                    className={fieldErrors.landmark ? "input-error" : ""}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h6>{t("Town / City")}</h6>
                <div className="input-item">
                  <input
                    type="text"
                    name="city"
                    value='الرياض'
                    disabled
                    onChange={handleChange}
                    placeholder={t("city")}
                    required
                    className={fieldErrors.city ? "input-error" : ""}

                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
          <button
  type="button"
  onClick={getUserLocation}
  className="btn theme-btn-1 btn-effect-1 text-uppercase mt-2"
>
  {t("Share Current Location")}
</button>
          </div>
          <div className="col-md-6">
          {userLocation.latitude && userLocation.longitude && (
  <p style={{ marginTop: "10px" }}>
    📍 {t("Location captured")}: ({userLocation.latitude.toFixed(5)}, {userLocation.longitude.toFixed(5)})
  </p>
)}
{locationError && <p style={{ color: "red" }}>{locationError}</p>}
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
            className={fieldErrors.notes ? "input-error" : ""}
          ></textarea>
        </div>
      </form>
    </div>
  </div>

            </div>
          </div>
          {/* payment methods */}
          <div className="col-lg-6 order-lg-1 order-2">
      <div className="ltn__checkout-payment-method mt-50">
        <h4 className="title-2">{t("Payment Method")}</h4>

        <div id="checkoutAccordion" className="accordion">
          {/* Cash on Delivery */}
          <div className="card">
            <h5
              className={`ltn__card-title ${selectedPayment === 'cash' ? '' : 'collapsed'}`}
              data-bs-toggle="collapse"
              data-bs-target="#chechoutCollapseTwo"
              aria-expanded={selectedPayment === 'cash'}
              onClick={() => setSelectedPayment('cash')}
            >
              {t("Cash on delivery")}{" "}
              <Image src="/img/icons/cash.png" alt="#" width={131} height={110} />
            </h5>
            <div
              id="chechoutCollapseTwo"
              className={`accordion-collapse collapse ${selectedPayment === 'cash' ? 'show' : ''}`}
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
              className={`ltn__card-title ${selectedPayment === 'paypal' ? '' : 'collapsed'}`}
              data-bs-toggle="collapse"
              data-bs-target="#chechoutCollapseFour"
              aria-expanded={selectedPayment === 'paypal'}
              onClick={() => setSelectedPayment('paypal')}
            >
              {t("Card Payment")}{" "}
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
              className={`accordion-collapse collapse ${selectedPayment === 'paypal' ? 'show' : ''}`}
              data-bs-parent="#checkoutAccordion"
            >
              <div className="card-body">
                <p>{t("Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden input to store the selected payment method (optional) */}
        <input type="hidden" name="paymentMethod" value={selectedPayment} />
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
          disabled={!isPlaceOrder || loading}
        >
          {loading ? t("Loading...") : t("place order")}
        </button>
      </div>
    </div>

  {/* product to buy */}
  <div className="col-lg-6 order-lg-2 order-1">
      {!isProducts ? (
        <Nodata text={t("No Product!")} />
      ) : (
        <div className="shoping-cart-total float-inline-end mt-50">
          <h4 className="title-2">{t("Cart Totals")}</h4>
          <table className="table">
                <tbody>
                  {products?.items?.map((product, idx) => (
                    <CheckoutProduct key={idx} product={product} />
                  ))}
                  <tr>
                    <td>
                      <strong>{t("Order Subtotal")}</strong>
                    </td>
                    <td>
                      <strong>{Number(products.subTotal).toFixed(2)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></strong>
                    </td>
                  </tr>
                  {products.discount > 0 && (
                    <tr>
                      <td><strong>{t("Discount")}</strong></td>
                      <td><strong>-{Number(products.discount).toFixed(2)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></strong></td>
                    </tr>
                  )}
                  {products.shippingFee > 0 && (
                    <tr>
                      <td><strong>{t("Shipping and Handling")}</strong></td>
                      <td><strong>{Number(products.shippingFee).toFixed(2)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></strong></td>
                    </tr>
                  )}
                  {products.shippingDiscount > 0 && (
                    <tr>
                      <td><strong>{t("Shipping Discount")}</strong></td>
                      <td><strong>-{Number(products.shippingDiscount).toFixed(2)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></strong></td>
                    </tr>
                  )}
                  <tr>
                    <td>
                      <strong>{t("VAT")}</strong>
                    </td>
                    <td>
                      <strong>
                        {/* {((products.totalPrice) *0.15).toFixed(2)}  */}
                        0 <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{t("Order Total")}</strong>
                    </td>
                    <td>
                      <strong>{(products.totalPrice + products.shippingFee - (products?.shippingDiscount? products?.shippingDiscount:0) - (products?.discount? products?.discount:0) ).toFixed(2)} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></strong>
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
