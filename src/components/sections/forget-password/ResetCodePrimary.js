"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslate";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/providers/UserContext";

const VerifyResetCodePrimary = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const { forgotPassword, verifyResetCode } = useUserContext();

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      setError(t("No email found. Please start from the beginning."));
    } else {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleResend = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);
    const result = await forgotPassword(email);
    if (!result.success) {
      setError(result.message);
    } else {
      setResendCooldown(60);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!otp || !email) {
      return setError(t("OTP and email are required."));
    }

    setLoading(true);
    const result = await verifyResetCode(email, otp);

    if (result.success) {
      router.push("/new-password");
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
              <h1 className="section-title">{t("Verify Reset Code")}</h1>
              <p>{t("Enter the code sent to your email")}</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="account-login-inner">
              <form onSubmit={handleSubmit} className="ltn__form-box contact-form-box">
                <input
                  type="text"
                  name="otp"
                  placeholder={t("Enter OTP")}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="btn-wrapper">
                  <button className="theme-btn-1 btn reverse-color btn-block" type="submit" disabled={loading}>
                    {loading ? t("Verifying...") : t("Verify Code")}
                  </button>
                </div>
              </form>
              <div style={{ display: "flex", justifyContent: "center"}}>
              <div className="go-to-btn mt-30 text-center">
                <Link href="/login">{t("Back to login")}</Link>
              </div>
              <div className="mt-3 text-center">
                <button
                  className="btn btn-link"
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || loading}
                  >
                  {resendCooldown > 0
                    ? `${t("Resend in")} ${resendCooldown}s`
                    : t("Resend Code")}
                </button>
              </div>

            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetCodePrimary;
