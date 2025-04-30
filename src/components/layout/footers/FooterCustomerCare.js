import Link from "next/link";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";

const FooterCustomerCare = () => {
  const t = useTranslations("footer");

  return (
    <div className="col-xl-2 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-menu-widget clearfix">
        <h4 className="footer-title">{t("Customer Care")}</h4>
        <div className="footer-menu">
          <ul>
            {/* <li>
              <Link href="/wishlist">{t("Wish List")}</Link>
            </li> */}
            {/* <li>
              <Link href="/order-tracking">{t("Order tracking")}</Link>
            </li> */}
            <li>
              <Link href="/faq">{t("FAQ")}</Link>
            </li>
            {/* <li>
              <Link href="/contact">{t("Contact us")}</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterCustomerCare;
