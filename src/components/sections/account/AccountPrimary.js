"use client"
import useSweetAlert from "@/hooks/useSweetAlert";
import { useTranslations } from "@/hooks/useTranslate";
import { formatDate } from "@/libs/formatDate";
import { useLanguageContext } from "@/providers/LanguageContext";
import { useUserContext } from "@/providers/UserContext";
import { FaEye, FaTimes, FaStickyNote } from 'react-icons/fa';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AccountPrimary = () => {
  const { logout, userData } = useUserContext(); // Get login function from context
  const t = useTranslations("common");
  const [orders, setOrders] = useState([]);
  const creteAlert = useSweetAlert();
  const { locale } = useLanguageContext();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [addressFormData, setAddressFormData] = useState({
    street: '',
    houseNumber: '',
    district: '',
    landmark: '',
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
    // Concatenate all address parts with commas
    const concatenatedAddress = [
      addressFormData.houseNumber,
      addressFormData.street,
      addressFormData.district,
      addressFormData.landmark
    ].filter(part => part).join(', '); // Only include non-empty parts

    // Check if address has actually changed
    const currentAddress = userData?.address?.[0]?.street || '';
    if (concatenatedAddress !== currentAddress) {
      const res = await fetch('https://fruits-heaven-api.onrender.com/api/v1/user/updateMyData', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: [
            {
              street: concatenatedAddress
            }
          ]
        }),
      });

      const nameEmailData = await res.json();

      if (!res.ok) {
        throw new Error(nameEmailData.message || t('Update failed'));
      }
    }

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
  

  const [loading, setLoading] = useState(false); // Add loading state

const cancelOrder = async (orderId) => {
  const result = await Swal.fire({
    title: t('Are you sure?'),
    text: t('You won\'t be able to revert this!'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: t('Yes, cancel it!'),
    cancelButtonText: t('No, keep it')
  });

  if (result.isConfirmed) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }
  
    try {
      const response = await fetch(`https://fruits-heaven-api.onrender.com/api/v1/order/cancelOrder/${orderId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        creteAlert("error", t(data.message));
      } else {
        creteAlert("success", t("Success! order cancelled."));
        // Optional: refetch orders or update local state
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      creteAlert("error", t(error.message));
    }
  }
};

const openNoteModal = (orderId) => {
  setSelectedOrderId(orderId);
  setNoteModalOpen(true);
};

const handleAddNote = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await fetch(`https://fruits-heaven-api.onrender.com/api/v1/order/${selectedOrderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ note: noteText }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      creteAlert("error", t(data.message));
    } else {
      creteAlert("success", t("Note added successfully!"));
      setNoteModalOpen(false);
      setNoteText('');
      // Optional: refetch orders or update local state
    }
  } catch (error) {
    console.error("Error adding note:", error);
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

      const addressParts = userData.address?.[0]?.street?.split(",").map(part => part.trim()) || [];
      setFormData((prev) => ({
        ...prev,
        name: userData.name || '',
        email: userData.email || ''
      }));
      setAddressFormData({
        houseNumber: addressParts[0] || "",       // First part before comma
        street: addressParts[1] || "",           // Second part
        district: addressParts[2] || "",         // Third part
        landmark: addressParts[3] || "",         // Fourth part
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
          <td>{order.totalPrice} <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" width="16" height="16">
  <path fill="#231f20" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
  <path fill="#231f20" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
</svg></td>
          <td>
            <Link 
                      href={`/order/${order._id}`} 
                      className="text-blue-500 hover:text-blue-700"
                      title={t("View")}
                    >
                      <FaEye size={16} />
                    </Link>
                    
                    {(order.status === "newOrder" || order.status === "accepted") && (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            cancelOrder(order._id);
                          }}
                          className="text-red-500 hover:text-red-700"
                          title={t("Cancel")}
                        >
                          <FaTimes size={16} />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            openNoteModal(order._id);
                          }}
                          className="text-gray-600 hover:text-gray-900"
                          title={t("Add Note")}
                        >
                          <FaStickyNote size={16} />
                        </button>
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
                                        <div className="col-lg-12 col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h6>{t("House Number")}</h6>
                <div className="input-item">
                  <input
                    type="text"
                    name="houseNumber"
                    value={addressFormData.houseNumber}
                    onChange={handleAddressChange}
                    placeholder={t("House number")}
                    
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h6>{t("District")}</h6>
                <div className="input-item">
                  <input
                    type="text"
                    name="district"
                    value={addressFormData.district}
                    onChange={handleAddressChange}
                    placeholder={t("District")}
                    
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
                    value={addressFormData.street}
                    onChange={handleAddressChange}
                    placeholder={t("Street name")}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h6>{t("Landmark")}</h6>
                <div className="input-item">
                  <input
                    type="text"
                    name="landmark"
                    value={addressFormData.landmark}
                    onChange={handleAddressChange}
                    placeholder={t("landmark")}
                  
                  />
                </div>
              </div>
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
                          {/* <p>
                            {t("The following addresses will be used on the checkout page by default.")}
                          </p> */}
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
                                    type="text"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                  />
                                  {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
                                  
                                  <label>{t("Confirm new password")}:</label>
                                  <input
                                    type="text"
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
              {noteModalOpen && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      maxWidth: '448px',
      width: '100%'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 500,
        marginBottom: '16px'
      }}>{t("Add Note to Order")}</h3>
      <textarea
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          marginBottom: '16px',
          minHeight: '100px'
        }}
        rows="4"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder={t("Enter your note here...")}
      />
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px'
      }}>
        <button
          onClick={() => {
            setNoteModalOpen(false);
            setNoteText('');
          }}
          style={{
            padding: '8px 16px',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            background: 'transparent'
          }}
        >
          {t("Cancel")}
        </button>
        <button
          onClick={handleAddNote}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          {t("Save Note")}
        </button>
      </div>
    </div>
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPrimary;
