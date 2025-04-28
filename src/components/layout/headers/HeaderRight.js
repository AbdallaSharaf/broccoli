"use client";
import ButtonOpenMobileMenu from "@/components/shared/buttons/ButtonOpenMobileMenu";
import { useCartContext } from "@/providers/CartContext";
import { useHeaderContex } from "@/providers/HeaderContex";
import Link from "next/link";
import React, { useState } from "react";
import HeaderCurrency from "./HeaderCurrency";
import countTotalPrice from "@/libs/countTotalPrice";
import HeaderCartShow from "./HeaderCartShow";
import { useUserContext } from "@/providers/UserContext";
import { useTranslations } from "@/hooks/useTranslate";
import { useLanguageContext } from "@/providers/LanguageContext";
import { useRouter } from "next/navigation";

const HeaderRight = () => {
  const { headerStyle } = useHeaderContex();
  const { user, logout } = useUserContext();
  const t = useTranslations("header");
  const { locale, toggleLanguage } = useLanguageContext();
  const nextLocale = locale === "ar" ? "en" : "ar";
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleLanguageChange = (e) => {
    e.preventDefault();
    toggleLanguage(nextLocale);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };


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
        <form onSubmit={handleSearchSubmit}>
          <input
            key={locale}
            type="text"
            name="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t("searchHere")}
          />
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
      <div className="mini-cart-icon">

      <Link href="#" onClick={handleLanguageChange} title={t("switchLanguage")}>
                <span className="utilize-btn-icon">
                <i className="fas fa-globe"></i>{" "}
                </span>
              </Link>
      </div>
      {/* <!-- mini-cart --> */}
      {/* <!-- Mobile Menu Button --> */}
      <ButtonOpenMobileMenu />
    </div>
  );
};

export default HeaderRight;
