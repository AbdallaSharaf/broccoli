"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslations } from "@/hooks/useTranslate";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/providers/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NewPasswordPrimary = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const { assignNewPassword } = useUserContext();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const email = localStorage.getItem("resetEmail");

    if (!email) {
      return setError(t("No email found. Please start from the beginning."));
    }

    if (!password || !confirmPassword) {
      return setError(t("All fields are required."));
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return setError(
        t("Password must be at least 8 characters long and include uppercase, lowercase, and a number.")
      );
    }

    if (password !== confirmPassword) {
      return setError(t("Passwords do not match."));
    }

    setLoading(true);

    const result = await assignNewPassword(email, password);

    if (result.success) {
      localStorage.removeItem("resetEmail");
      router.push("/login");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-title-area text-center">
              <h1 className="section-title">{t("Set a New Password")}</h1>
              <p>{t("Enter and confirm your new password.")}</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="account-login-inner">
              <form onSubmit={handleSubmit} className="ltn__form-box contact-form-box">
                
                {/* Password Field */}
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t("New Password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer"
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {/* Confirm Password Field */}
                <div style={{ position: "relative", marginTop: "20px" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder={t("Confirm Password")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer"
                    }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {/* Error */}
                {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

                {/* Submit */}
                <div className="btn-wrapper mt-20">
                  <button className="theme-btn-1 btn reverse-color btn-block" type="submit" disabled={loading}>
                    {loading ? t("Saving...") : t("Save New Password")}
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

export default NewPasswordPrimary;
