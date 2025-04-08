"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use router to redirect after login
import { useUserContext } from "@/providers/UserContext";
import { useCartContext } from "@/providers/CartContext";

const LoginPrimary = () => {
  const { login } = useUserContext(); // Get login function from context
  const router = useRouter(); // To navigate after successful login
  const { setCartProducts, updateCart } = useCartContext(); // Get login function from context
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // State to track errors

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(null); // Reset previous errors
  
    try {
      const result = await login(formData.email, formData.password); // Call login function
      console.log(result)
      if (result) {
        updateCart(result.cart);
        setCartProducts(result.cart); // update UI cart from merged version
          // maybe navigate to /dashboard or /cart
        router.push("/"); // Redirect only if login is successful
      } else {
        setError("Invalid email or password"); // Show error if login fails
      }
    } catch (err) {
      setError("Something went wrong. Please try again."); // Handle unexpected errors
    }
  };
  

  return (
    <div className="ltn__login-area pb-65">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Sign In <br />
                To Your Account
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="account-login-inner">
              <form onSubmit={handleSubmit} className="ltn__form-box contact-form-box">
                <input
                  type="text"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password*"
                  value={formData.password}
                  onChange={handleChange}
                />
                {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
                <div className="btn-wrapper mt-0">
                  <button className="theme-btn-1 btn btn-block w-100" type="submit">
                    SIGN IN
                  </button>
                </div>
                <div className="go-to-btn mt-20">
                  <Link href="#">
                    <small>FORGOTTEN YOUR PASSWORD?</small>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="account-create text-center pt-50">
              <h4>{"DON'T"} HAVE AN ACCOUNT?</h4>
              <p>
                Add items to your wishlist, get personalized recommendations, <br />
                check out more quickly, and track your orders by registering.
              </p>
              <div className="btn-wrapper">
                <Link href="/register" className="theme-btn-1 btn black-btn">
                  CREATE ACCOUNT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrimary;
