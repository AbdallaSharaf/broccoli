"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/providers/UserContext";
import { useCartContext } from "@/providers/CartContext";
import { useTranslations } from "@/hooks/useTranslate";

const LoginPrimary = () => {
  const t = useTranslations("common");
  const { login, loading } = useUserContext();
  const router = useRouter();
  const { setCartProducts, updateCart } = useCartContext();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await login(formData.email, formData.password);
      if (result.status) {
        updateCart(result.cart);
        setCartProducts(result.cart);
        router.push("/");
        console.log(result.status);
      } else {
        setError(t(result.error));
      }
    } catch (err) {
      setError(t("Something went wrong. Please try again."));
    }
  };

  return (
    <div className="ltn__login-area pb-65">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                {t("Sign In")} <br />
                {t("To Your Account")}
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
                  placeholder={`${t("Email")}*`}
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder={`${t("password*")}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
                <div className="btn-wrapper mt-0">
                  <button className="theme-btn-1 btn btn-block w-100" disabled={loading} type="submit">
                    {loading ? t("Loading...") : t("Sign In")}
                  </button>
                </div>
                <div className="go-to-btn mt-20">
                  <Link href="/forget-password">
                    <small>{t("FORGOTTEN YOUR PASSWORD?")}</small>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="account-create text-center pt-50">
              <h4>{t("DON'T HAVE AN ACCOUNT?")}</h4>
              <p>
                {t("Add items to your wishlist, get personalized recommendations,")} <br />
                {t("check out more quickly, and track your orders by registering.")}
              </p>
              <div className="btn-wrapper">
                <Link href="/register" className="theme-btn-1 btn black-btn">
                  {t("Create account")}
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
