"use client"
import useSweetAlert from "@/hooks/useSweetAlert";
import { useTranslations } from "@/hooks/useTranslate";
import { formatDate } from "@/libs/formatDate";
import { useLanguageContext } from "@/providers/LanguageContext";
import { useUserContext } from "@/providers/UserContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AccountPrimary = () => {
  const { logout, userData } = useUserContext(); // Get login function from context
  const t = useTranslations("common");
  const [orders, setOrders] = useState([]);
  const creteAlert = useSweetAlert();
  const { locale } = useLanguageContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [addressFormData, setAddressFormData] = useState({
    street: '',
    country: '',
    city: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (formData.newPassword && formData.newPassword.length < 8) {
      newErrors.newPassword = t('Password must be at least 8 characters');
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t('Passwords do not match');
    }
    
    if (!formData.email) {
      newErrors.email = t('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t('Invalid email address');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) return;
  
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');
  
    const token = localStorage.getItem('token');
  
    try {
      // --- Update Name/Email if changed ---
      if (
        formData.name !== userData?.name ||
        formData.email !== userData?.email
      ) {
        const nameEmailRes = await fetch('https://fruits-heaven-api.onrender.com/api/v1/user/updateMyData', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
          }),
        });
  
        const nameEmailData = await nameEmailRes.json();
  
        if (!nameEmailRes.ok) {
          throw new Error(nameEmailData.message || t('Update failed'));
        }
      }
  
      // --- Update Password if provided ---
      if (formData.newPassword) {
        const passwordRes = await fetch(`https://fruits-heaven-api.onrender.com/api/v1/user/changePassword/${userData?._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: formData.newPassword,
          }),
        });
  
        const passwordData = await passwordRes.json();
  
        if (!passwordRes.ok) {
          throw new Error(passwordData.message || t('Password update failed'));
        }
      }
      setFormData(prev => (({
        ...prev,
        newPassword: '',
        confirmPassword: ''
      })))
      setSuccessMessage(t('Account updated successfully'));
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        serverError: error.message || t('An error occurred. Please try again.'),
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');
  
    const token = localStorage.getItem('token');
  
    try {
      // --- Update Name/Email if changed ---
      if (
        addressFormData.city !== userData?.address?.[0]?.city ||
        addressFormData.street !== userData?.address?.[0]?.street ||
        addressFormData.country !== userData?.address?.[0]?.country
      ) {
        const res = await fetch('https://fruits-heaven-api.onrender.com/api/v1/user/updateMyData', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            address: [
              {
                city: addressFormData.city,
                street: addressFormData.street,
                country: addressFormData.country
              }
            ]
          }),
        });
        console.log(res)
  
        const nameEmailData = await res.json();
  
        if (!res.ok) {
          throw new Error(nameEmailData.message || t('Update failed'));
        }
      }
  
      setSuccessMessage(t('Account updated successfully'));
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.log(error)
      setErrors((prev) => ({
        ...prev,
        serverError: error.message || t('An error occurred. Please try again.'),
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const [loading, setLoading] = useState(false); // Add loading state

  const cancelOrder = async (orderId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }
  
    try {
      const response = await fetch(`https://fruits-heaven-api.onrender.com/api/v1/order/cancelOrder/${orderId}`, {
        method: 'POST', // Or PUT/POST based on your backend
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        creteAlert("error", t(data.message));
      } else {
        creteAlert("success", "Success! order cancelled.");
      }
      // Optional: refetch orders or update local state
    } catch (error) {
      console.error("Error cancelling order:", error);
      creteAlert("error", t(error.message));
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Start loading
      try {
        const token = localStorage.getItem('token');
        if (!token || !userData?._id) {
          console.error("User not found in local storage");
          return;
        }
  
        const response = await fetch(
          `https://fruits-heaven-api.onrender.com/api/v1/order?keyword=${userData?._id}&PageCount=1000`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setOrders(data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
  
    if (userData?._id) {
      fetchOrders();
    }
  }, [userData, logout]);

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name || '',
        email: userData.email || ''
      }));
      setAddressFormData({
        street: userData.address?.[0]?.street || '',
        country: userData.address?.[0]?.country || '',
        city: userData.address?.[0]?.city || ''
      });
    }
  }, [userData]);

  return (
    <div className="liton__wishlist-area pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* <!-- PRODUCT TAB AREA START --> */}
            <div className="ltn__product-tab-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="ltn__tab-menu-list mb-50">
                      <div className="nav">
                        <Link
                          className="active show"
                          data-bs-toggle="tab"
                          href="#liton_tab_1_1"
                        >
                          {t("Dashboard")} <i className="fas fa-home"></i>
                        </Link>
                        <Link data-bs-toggle="tab" href="#liton_tab_1_2">
                          {t("Orders")} <i className="fas fa-file-alt"></i>
                        </Link>
                        <Link data-bs-toggle="tab" href="#liton_tab_1_4">
                          {t("Address")} <i className="fas fa-map-marker-alt"></i>
                        </Link>
                        <Link data-bs-toggle="tab" href="#liton_tab_1_5">
                          {t("Account Details")} <i className="fas fa-user"></i>
                        </Link>
                        <Link href="/" onClick={logout}>
                          {t("Logout")} <i className="fas fa-sign-out-alt"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="liton_tab_1_1"
                      >
                        <div className="ltn__myaccount-tab-content-inner">
                          <p>
                            {t("Hello")} <strong>{userData?.name}</strong> {t("not")}{" "}
                            <strong>{userData?.name}</strong>?{" "}
                            <small>
                              <Link href="/" onClick={logout}>{t("Log out")}</Link>
                            </small>{" "}
                            )
                          </p>
                          <p>
                            {t("From your account dashboard you can view your")}{" "}
                            <span>{t("recent orders")}</span>, {t("manage your")}{" "}
                            <span>{t("shipping and billing addresses")}</span>, {t("and")}{" "}
                            <span>{t("edit your password and account details")}</span>.
                          </p>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="liton_tab_1_2">
                        <div className="ltn__myaccount-tab-content-inner">
                          {!loading ? (<div className="table-responsive">
                            <table className="table">
  <thead>
    <tr>
      <th>{t("Order")}</th>
      <th>{t("Date")}</th>
      <th>{t("Status")}</th>
      <th>{t("Invoice ID")}</th>
      <th>{t("Paid")}</th>
      <th>{t("Delivered")}</th>
      <th>{t("Total")}</th>
      <th>{t("Action")}</th>
    </tr>
  </thead>
  <tbody>
    {orders.length > 0 ? (
      orders.map((order, index) => (
        <tr key={order._id || index}>
          <td>{index + 1}</td>
          <td>{formatDate(order.createdAt, locale)}</td>
          <td>{t(order.status)}</td>
          <td>{order.invoiceId || t("N/A")}</td>
          <td>
            {order.isPaid ? (
              <span className="text-green-500">{t("Yes")}</span>
            ) : (
              <span className="text-red-500">{t("No")}</span>
            )}
          </td>
          <td>
            {order.isDelivered ? (
              <span className="text-green-500">{t("Yes")}</span>
            ) : (
              <span className="text-red-500">{t("No")}</span>
            )}
          </td>
          <td>{order.totalPrice} {t("SAR")}</td>
          <td>
            <Link href={`/order/${order._id}`} className="mx-1">{t("View")}</Link>
            {(order.status === "newOrder" || order.status === "accepted") && (
              <>
                / 
                <Link
                  href={`#`}
                  className="mx-1"
                  onClick={(e) => {e.preventDefault(); cancelOrder(order._id)}}
                >
                  {t("Cancel")}
                </Link>
              </>
            )}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="8" className="text-center">
          {t("No orders found")}
        </td>
      </tr>
    )}
  </tbody>
</table>
                          </div>) : (<div className="text-center">{t("Loading")}</div>)}
                        </div>
                      </div>

                      <div className="tab-pane fade" id="liton_tab_1_4">
                        <div className="ltn__myaccount-tab-content-inner">
                          <p>
                            {t("The following addresses will be used on the checkout page by default.")}
                          </p>
                          <div className="row">
                            <div className=" learts-mb-30">
                            <form onSubmit={handleAddressSubmit}>
                              <h4>
                                {t("Shipping Address")}{" "}
                              </h4>
                              <div className="row">
                              <div className="col-md-12">
                                <label>{t("Street and House")}:</label>
                                <input
                                  type="text"
                                  name="street"
                                  value={addressFormData.street}
                                  onChange={handleAddressChange}
                                  placeholder={t("Street and House")}
                                />
                              </div>
                              
                              <div className="col-md-12">
                                <label>{t("Town / City")}:</label>
                                <input
                                  type="text"
                                  name="city"
                                  value={addressFormData.city}
                                  onChange={handleAddressChange}
                                  placeholder={t("Town / City")}
                                />
                              </div>

                              <div className="col-md-12">
                                <label>{t("state")}:</label>
                                <input
                                  type="text"
                                  name="country"
                                  value={addressFormData.country}
                                  onChange={handleAddressChange}
                                  placeholder={t("state")}
                                />
                              </div>
                            </div>
                            {errors.serverError && (
                              <div className="alert alert-danger">{errors.serverError}</div>
                            )}
                            
                            {successMessage && (
                              <div className="alert alert-success">{successMessage}</div>
                            )}
                            
                            <div className="btn-wrapper">
                              <button
                                type="submit"
                                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? t('Saving...') : t('Save Changes')}
                              </button>
                            </div>
                            </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="liton_tab_1_5">
                        <div className="ltn__myaccount-tab-content-inner">
                          <p>
                            {t("The following addresses will be used on the checkout page by default.")}
                          </p>
                          <div className="ltn__form-box">
                          <form onSubmit={handleSubmit}>
                            <div className="row mb-50">
                              <div className="col-md-6">
                                <label>{t("name")}:</label>
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  placeholder={t("name")}
                                />
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                              </div>
                              
                              <div className="col-md-6">
                                <label>{t("Display Email")}:</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="example@example.com"
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                              </div>
                            </div>
                            
                            <fieldset>
                              <legend>{t("Password change")}</legend>
                              <div className="row">
                                <div className="col-md-12">
                                  
                                  <label>
                                    {t("New password (leave blank to leave unchanged)")}:
                                  </label>
                                  <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                  />
                                  {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
                                  
                                  <label>{t("Confirm new password")}:</label>
                                  <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                  />
                                  {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                                </div>
                              </div>
                            </fieldset>
                            
                            {errors.serverError && (
                              <div className="alert alert-danger">{errors.serverError}</div>
                            )}
                            
                            {successMessage && (
                              <div className="alert alert-success">{successMessage}</div>
                            )}
                            
                            <div className="btn-wrapper">
                              <button
                                type="submit"
                                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? t('Saving...') : t('Save Changes')}
                              </button>
                            </div>
                          </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- PRODUCT TAB AREA END --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPrimary;
