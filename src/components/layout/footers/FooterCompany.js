import Link from "next/link";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";

const FooterCompany = () => {
  const t = useTranslations("footer");

  return (
    <div className="col-xl-2 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-menu-widget clearfix">
        <h4 className="footer-title">{t("Company")}</h4>
        <div className="footer-menu">
          <ul>
            <li>
              <Link href="/about">{t("About")}</Link>
            </li>
            {/* <li>
              <Link href="/blogs">{t("Blog")}</Link>
            </li> */}
            <li>
              <Link href="/shop">{t("All Products")}</Link>
            </li>
            {/* <li>
              <Link href="/locations">{t("Locations Map")}</Link>
            </li> */}
            {/* <li>
              <Link href="/faq">{t("FAQ")}</Link>
            </li>
            <li>
              <Link href="/contact">{t("Contact us")}</Link>
            </li> */}
            <li>
              <Link href="/terms-conditions">{t("Terms & Conditions")}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterCompany;
