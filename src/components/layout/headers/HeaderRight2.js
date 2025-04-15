"use client"
import React from "react";
import HeaderCartShow from "./HeaderCartShow";
import Link from "next/link";
import { useUserContext } from "@/providers/UserContext";
import { useLanguageContext } from "@/providers/LanguageContext";
import { useTranslations } from "@/hooks/useTranslate";

const HeaderRight2 = () => {

const { isRtl, toggleLanguage } = useLanguageContext(); // Get direction state and toggle function
const t = useTranslations("header");
const {locale} = useLanguageContext()
const languages = [
  { code: "en", name: t("english"), flag: "img/flags/en.png" },
  { code: "ar", name: t("arabic"), flag: "img/flags/ar.png" },

];
const { user, logout } = useUserContext();
  // Set active language based on current direction
  const activeLang = isRtl ? languages[1] : languages[0];
  return (
    <div className="col">
      {/* <!-- header-options --> */}
      <div className="ltn__header-options">
        <ul>
          <li className="d-lg-none">
            {/* <!-- header-search-1 --> */}
            <div className="header-search-wrap">
              <div className="header-search-1">
                <div className="search-icon">
                  <i className="icon-search  for-search-show"></i>
                  <i className="icon-cancel  for-search-close"></i>
                </div>
              </div>
              <div className="header-search-1-form">
                <form id="#" method="get" action="#">
                  <input
                    key={locale} // This forces re-render when locale changes
                    type="text"
                    name="search"
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
          </li>{" "}
          <li className="d-none---" style={{...(!isRtl
                              ? { marginLeft: "5px", marginRight: "0px" }
                              : { marginRight: "5px", marginLeft: "0px" })}}>
            <div className="ltn__drop-menu ltn__currency-menu ltn__language-menu">
              <ul>
                <li>
                  <Link href="#" className="flex items-center">
                    <img
                      src={activeLang.flag}
                      alt={activeLang.name}
                      style={{ width: "24px", height: "24px" }}
                    />
                  </Link>
                  <ul>
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleLanguage(lang.code);
                          }}
                        >
                          <img
                            src={lang.flag}
                            alt={lang.name}
                            style={{ width: "20px", height: "14px", ...(isRtl
                              ? { marginLeft: "5px" }
                              : { marginRight: "5px"}), }}
                          />
                          {lang.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </li>{" "}
          <li className="d-none---" style={{...(!isRtl
                              ? { marginLeft: "5px", marginRight: "0px" }
                              : { marginRight: "5px", marginLeft: "0px" })}}>
            {/* <!-- user-menu --> */}
            <div className="ltn__drop-menu user-menu" >
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
          </li>{" "}
          <li style={{ marginRight: 0, marginLeft: 0 }}>
            {/* <!-- mini-cart 2 --> */}
            <HeaderCartShow />
          </li>{" "}
          <li className="d-none">
            {/* <!-- Mobile Menu Button --> */}
            <div className="mobile-menu-toggle d-lg-none d-none">
              <Link
                href="#ltn__utilize-mobile-menu"
                className="ltn__utilize-toggle"
              >
                <svg viewBox="0 0 800 600">
                  <path
                    d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                    id="top"
                  ></path>
                  <path d="M300,320 L540,320" id="middle"></path>
                  <path
                    d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                    id="bottom"
                    transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                  ></path>
                </svg>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderRight2;