"use client";
import ButtonOpenMobileMenu from "@/components/shared/buttons/ButtonOpenMobileMenu";
import { useCartContext } from "@/providers/CartContext";
import { useHeaderContex } from "@/providers/HeaderContex";
import Link from "next/link";
import React from "react";
import HeaderCurrency from "./HeaderCurrency";
import countTotalPrice from "@/libs/countTotalPrice";
import HeaderCartShow from "./HeaderCartShow";
import { useUserContext } from "@/providers/UserContext";

const HeaderRight = () => {
  const { headerStyle } = useHeaderContex();
  const { user, logout } = useUserContext();
  const t = useTranslations("header");

  return (
    <div
      className={`ltn__header-options  ${
        headerStyle === 3 ? "col" : "ltn__header-options-2"
      }`}
    >
      {headerStyle === 3 ? <HeaderCurrency /> : ""}
      {/* <!-- header-search-1 --> */}{" "}
      <div className="header-search-wrap">
        <div className="header-search-1">
          <div className="search-icon">
            <i className="icon-search for-search-show"></i>
            <i className="icon-cancel  for-search-close"></i>
          </div>
        </div>
        <div className="header-search-1-form">
          <form id="#" method="get" action="#">
            <input type="text" name="search" placeholder={t("searchHere")} />
            <button type="submit">
              <span>
                <i className="icon-search"></i>
              </span>
            </button>
          </form>
        </div>
      </div>
      {/* <!-- user-menu --> */}
      <div className="ltn__drop-menu user-menu">
        <ul>
          <li>
            <Link href="#">
              <i className="icon-user"></i>
            </Link>
            <ul>
              {user?.name ?
              <li>
                <Link href="/account">{t("myAccount")}</Link>
              </li>
              :
              <>
              <li>
                <Link href="/login">{t("signIn")}</Link>
              </li>
              <li>
                <Link href="/register">{t("register")}</Link>
              </li>
              </>
              }
              <li>
                <Link href="/wishlist">{t("wishlist")}</Link>
              </li>
              {user?.name &&
                <li>
                  <Link href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                  {t("logOut")}</Link>
                </li>
              }
            </ul>
          </li>
        </ul>
      </div>
      {/* <!-- mini-cart --> */}
      {<HeaderCartShow />}
      {/* <!-- mini-cart --> */}
      {/* <!-- Mobile Menu Button --> */}
      <ButtonOpenMobileMenu />
    </div>
  );
};

export default HeaderRight;
