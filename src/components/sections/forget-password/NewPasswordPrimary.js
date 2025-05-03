"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslations } from "@/hooks/useTranslate";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/providers/UserContext";

const NewPasswordPrimary = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const { assignNewPassword } = useUserContext();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      return setError(t("Password must be at least 8 characters long and include uppercase, lowercase, and a number."));
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
                <input
                  type="password"
                  name="password"
                  placeholder={t("New Password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder={t("Confirm Password")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="btn-wrapper">
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
