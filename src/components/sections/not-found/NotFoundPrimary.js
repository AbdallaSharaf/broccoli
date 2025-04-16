"use client";
import Link from "next/link";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";

const NotFoundPrimary = ({ title }) => {
  const t = useTranslations("common");

  const isError = title === "Error Page";

  return (
    <div className="ltn__404-area ltn__404-area-1 mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="error-404-inner text-center">
              <h1 className="error-404-title">{isError ? "500" : "404"}</h1>
              <h2>
                {isError
                  ? t("Internal Server Error!")
                  : t("Page Not Found!")}
              </h2>
              {!isError && (
                <p>
                  {t(
                    "Oops! The page you are looking for does not exist. It might have been moved or deleted."
                  )}
                </p>
              )}
              <div className="btn-wrapper">
                <Link href="/" className="btn btn-transparent">
                  <i className="fas fa-long-arrow-alt-left"></i> {t("BACK TO HOME")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPrimary;
