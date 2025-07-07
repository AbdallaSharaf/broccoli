"use client";
import Link from "next/link";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";
import axios from "axios";
import axiosInstance from "../../../libs/axiosInstance.js";
// import trackEvent from "@/hooks/usePixel";


const VerifyUserPrimary = ({ type = "loading", orderID }) => {
  const t = useTranslations("common");

const [totalPrice, setTotalPrice] = React.useState(0);
const getOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/order?keyword=${id}`);
     setTotalPrice(response.data.data[0]?.totalPrice)
    return response.data.order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

  const renderContent = async () => {
    switch (type) {
      case "loading":
        return {
          icon: "⏳",
          title: t("Verifying Your Account..."),
          showButton: false,
        };
      case "success":
        return {
          icon: "✅",
          title: t("Your account has been successfully verified. You can now proceed."),
          showButton: true,
        };
      case "error":
        return {
          icon: "❌",
          title: t("Verification could not be completed."),
          showButton: true,
        };
      case "checkMail":
        return {
          icon: "📩",
          title: t("Please check your email to verify your account."),
          showButton: false,
        };
      case "orderPlaced":
       let order = await getOrderById(orderID);
        return {
          icon: "🎉",
          title: t("Your order has been placed successfully!"),
          showButton: true,
        };
      default:
        return {
          icon: "❓",
          title: t("Unknown status."),
          showButton: true,
        };
    }
  };

  const { icon, title, showButton } = renderContent();

  return (
    <div className="ltn__404-area ltn__404-area-1 mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="error-404-inner text-center">
              <h1 className="error-404-title">{icon}</h1>
              <h2>{title}</h2>

              {/* Order tracking info */}
              {type === "orderPlaced" && orderID && (
                <>
                
                <p className="mt-3">
                  {t("You can track your order using the following ID:")}{" "}
                  <strong>{orderID}</strong>
                </p>
              {  totalPrice !== 0 && <p className="mt-3">
                  {t("Total order value:")}{" "}
                  <strong>{totalPrice}</strong>
                </p>}
                </>
              )}

              {showButton && (
                <div className="btn-wrapper mt-3">
                  <Link href="/" className="btn btn-transparent">
                    <i className="fas fa-long-arrow-alt-left"></i> {t("BACK TO HOME")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUserPrimary;
