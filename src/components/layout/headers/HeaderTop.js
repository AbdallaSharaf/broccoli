"use client";
import { useHeaderContex } from "@/providers/HeaderContex";
import Link from "next/link";
import React from "react";

const HeaderTop = () => {
  const { headerStyle, headerSize, headerTopBg } = useHeaderContex();
  return (
    <div
      className={`ltn__header-top-area ${
        headerStyle === 2 || headerStyle === 4 || headerTopBg === "dark"
          ? "top-area-color-white "
          : ""
      } ${headerSize === "lg" ? "plr--9" : ""}`}
    >
      <div
        className={` ${headerSize === "lg" ? "container-fluid" : "container"}`}
      >
        <div className="row">
          <div className="col-md-7">
            <div className="ltn__top-bar-menu">
              <ul>
                {" "}
                <li>
                  <Link href="/locations">
                    <i className="icon-placeholder"></i> 15/A, Nest Tower, NYC
                  </Link>
                </li>{" "}
                <li>
                  <Link href="mailto:info@webmail.com?Subject=Flower%20greetings%20to%20you">
                    <i className="icon-mail"></i> info@webmail.com
                  </Link>
                </li>{" "}
              </ul>
            </div>
          </div>
          <div className="col-md-5">
            <div className="top-bar-right text-end">
              <div className="ltn__top-bar-menu">
                <ul>
                  <li>
                    {/* <!-- ltn__language-menu --> */}
                    <div className="ltn__drop-menu ltn__currency-menu ltn__language-menu">
                      <ul>
                        <li>
                          <Link href="#" className="dropdown-toggle">
                            <span className="active-currency">English</span>
                          </Link>
                          <ul>
                            <li>
                              <Link href="#">Arabic</Link>
                            </li>
                            <li>
                              <Link href="#">Bengali</Link>
                            </li>
                            <li>
                              <Link href="#">Chinese</Link>
                            </li>
                            <li>
                              <Link href="#">English</Link>
                            </li>
                            <li>
                              <Link href="#">French</Link>
                            </li>
                            <li>
                              <Link href="#">Hindi</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </li>{" "}
                  <li>
                    {/* <!-- ltn__social-media --> */}
                    <div className="ltn__social-media">
                      <ul>
                        <li>
                          <Link
                            href="https://www.facebook.com"
                            title="Facebook"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                        </li>{" "}
                        <li>
                          <Link href="https://x.com" title="Twitter">
                            <i className="fa-brands fa-x-twitter"></i>
                          </Link>
                        </li>{" "}
                        <li>
                          <Link
                            href="https://www.instagram.com"
                            title="Instagram"
                          >
                            <i className="fab fa-instagram"></i>
                          </Link>
                        </li>{" "}
                        <li>
                          <Link
                            href="https://www.dribbble.com"
                            title="Dribbble"
                          >
                            <i className="fab fa-dribbble"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
