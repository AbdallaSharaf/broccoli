"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslations } from "@/hooks/useTranslate";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/providers/UserContext";

const ForgetPasswordPrimary = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const { forgotPassword } = useUserContext();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!email) {
      return setError(t("Please enter your email."));
    }
  
    setLoading(true);
  
    const result = await forgotPassword(email);
  console.log("result",result)
    if (result.success) {
      localStorage.setItem("resetEmail", email);
      router.push("/reset-code");
    } else {
      setError(t(result.error.message));
    }
  
    setLoading(false);
  };

  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-title-area text-center">
              <h1 className="section-title">{t("FORGOTTEN YOUR PASSWORD?")}</h1>
              <p>{t("Enter your email to reset your password")}</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="account-login-inner">
              <form onSubmit={handleSubmit} className="ltn__form-box contact-form-box">
                <input
                  type="email"
                  name="email"
                  placeholder={t("Email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="btn-wrapper">
                  <button className="theme-btn-1 btn reverse-color btn-block" type="submit" disabled={loading}>
                    {loading ? t("Processing...") : t("Send Reset Link")}
                  </button>
                </div>
              </form>
              <div className="go-to-btn mt-30 text-center">
                <Link href="/login">{t("Back to login")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPrimary;
