"use client";
import { useUserContext } from "@/providers/UserContext";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslate";
import React from "react";

const FooterServices2 = () => {
  const { user } = useUserContext();
  const t = useTranslations("footer");

  return (
    <div className="col-xl-2 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-menu-widget clearfix">
        <h4 className="footer-title">{t("My Account")}</h4>
        <div className="footer-menu">
          <ul>
            {!user?.name ? (
              <>
                <li>
                  <Link href="/login">{t("Login")}</Link>
                </li>
                <li>
                  <Link href="/register">{t("Register")}</Link>
                </li>
              </>
            ) : (
              <li>
                <Link href="/account">{t("My account")}</Link>
              </li>
            )}
            <li>
              <Link href="/order-tracking">{t("Order tracking")}</Link>
            </li>
            <li>
              <Link href="/wishlist">{t("Wish List")}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterServices2;
