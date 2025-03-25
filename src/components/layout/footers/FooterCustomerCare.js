import Link from "next/link";
import React from "react";

const FooterCustomerCare = () => {
  return (
    <div className="col-xl-2 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-menu-widget clearfix">
        <h4 className="footer-title">Customer Care</h4>
        <div className="footer-menu">
          <ul>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/account">My account</Link>
            </li>
            <li>
              <Link href="/wishlist">Wish List</Link>
            </li>
            <li>
              <Link href="/order-tracking">Order tracking</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact">Contact us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterCustomerCare;
