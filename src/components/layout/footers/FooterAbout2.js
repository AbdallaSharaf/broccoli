"use client";
import Image from "next/image";
const logoImage = "/img/logo.png";
const logoImage2 = "/img/logo-2.png";
import Link from "next/link";
import { useFooterContex } from "@/providers/FooterContext";

const FooterAbout2 = () => {
  const { footerStyle, footerBg } = useFooterContex();
  return (
    <div className="col-xl-3 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-about-widget">
        <div className="footer-logo mb-10">
          <div className="site-logo">
            <Image
              src={footerBg === "dark" ? logoImage2 : logoImage}
              alt="Logo" width={154} height={42}
            />
          </div>
        </div>
        {/* <p>
          Lorem Ipsum is simply dummy text of the and typesetting industry.
          Lorem Ipsum is dummy text of the printing.
        </p> */}
        <div className="footer-address">
          <ul>
            {/* <li>
              <div className="footer-address-icon">
                <i className="icon-placeholder"></i>
              </div>
              <div className="footer-address-info">
                <p>Brooklyn, New York, United States</p>
              </div>
            </li> */}
            <li>
            متجر فواكه وخضروات إلكتروني متخصص في تقديم أجود المنتجات الطازجة، المحلية والمستوردة، المختارة بعناية من مصادر موثوقة، مع توصيل سريع داخل الرياض.
            </li>
            <li>
              <div className="footer-address-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-whatsapp"
              >
                <path d="M21 12.05c0-5.05-4.1-9.15-9.15-9.15-2.45 0-4.68.95-6.36 2.63A8.962 8.962 0 0 0 3 12.05c0 1.47.37 2.89 1.08 4.15L3 21l4.8-1.27c1.24.68 2.64 1.04 4.05 1.04 5.05 0 9.15-4.1 9.15-9.15z"></path>
                <path d="M16.25 13.25l-1.5-.5c-.4-.15-.85.03-1.1.35l-.5.7a7.958 7.958 0 0 1-3.1-3.1l.7-.5c.32-.25.5-.7.35-1.1l-.5-1.5a.889.889 0 0 0-1-.6c-1 .3-2.05 1.8-1.8 3.3a9.052 9.052 0 0 0 5.3 5.3c1.5.25 3-0.8 3.3-1.8.1-.4-.2-.8-.6-1z"></path>
              </svg>
              </div>
              <div className="footer-address-info">
                <p>
                  <a 
                  href="https://wa.me/+9660566249353" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  >
                    966-0566-249-353
                  </a>
                </p>
              </div>
            </li>
            <li>
            </li>
          </ul>
        </div>
        <div className="ltn__social-media mt-20">
          <ul>
          {" "}
         {" "}
            <li>
              {/* <Link href="https://www.snapchat.com/add/fruitsheaven.sa" title="snapchat">
                <i className="fab fa-snapchat"></i>
              </Link> */}
            </li>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterAbout2;
