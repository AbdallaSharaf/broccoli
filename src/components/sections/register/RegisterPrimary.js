"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslations } from "@/hooks/useTranslate";
import { useUserContext } from "@/providers/UserContext";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Add icons

const RegisterPrimary = () => {
  const t = useTranslations("common");
  const { register } = useUserContext();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    confirmpassword: "",
    marketingConsent: false,
    privacyConsent: false,
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { firstname, lastname, email, password, confirmpassword, privacyConsent, phone } = formData;

    if (!firstname || !lastname || !email || !password || !confirmpassword || !phone) {
      return setError(t("Please fill in all required fields."));
    }
  
    // Phone number validation: digits only and minimum length (e.g., 10 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return setError(t("Please enter a valid phone number."));
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return setError(t("Password must be at least 8 characters long and include a letter and a number."));
    }

    if (password !== confirmpassword) {
      return setError(t("Passwords do not match."));
    }

    if (!privacyConsent) {
      return setError(t("You must accept the privacy policy."));
    }

    const result = await register({ firstname, lastname, email, password, phone });

    if (result.status) {
      router.push("/wait-verification");
    } else {
      setError(result.message || t("Registration failed. Please try again."));
    }
  };

  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">{t("Register Your Account")}</h1>
              <p>{t("Join our community and unlock a world of benefits!")}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="account-login-inner">
              <form onSubmit={handleSubmit} className="ltn__form-box contact-form-box">
                <input
                  type="text"
                  name="firstname"
                  placeholder={t("First Name")}
                  value={formData.firstname}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder={t("Last Name")}
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder={t("phone number")}
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="email"
                  placeholder={t("Email")}
                  value={formData.email}
                  onChange={handleChange}
                />

                {/* Password Field with Toggle */}
                <div className="password-field-wrapper" style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t("Password*")}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {/* Confirm Password Field with Toggle */}
                <div className="password-field-wrapper" style={{ position: "relative" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmpassword"
                    placeholder={t("Confirm Password*")}
                    value={formData.confirmpassword}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleChange}
                  />{" "}
                  {t("I consent to marketing terms")}
                </label>
                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleChange}
                  />{" "}
                  {t("I consent to privacy policy")}
                </label>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="btn-wrapper">
                  <button className="theme-btn-1 btn reverse-color btn-block" type="submit">
                    {t("Create account")}
                  </button>
                </div>
              </form>

              <div className="by-agree text-center">
                <p>{t("By creating an account, you agree to our")}:</p>
                <p>
                  <Link href="#">
                    {t("TERMS OF CONDITIONS")} &nbsp; &nbsp; | &nbsp; &nbsp; {t("PRIVACY POLICY")}
                  </Link>
                </p>
                <div className="go-to-btn mt-50">
                  <Link href="/login">{t("ALREADY HAVE AN ACCOUNT?")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPrimary;
