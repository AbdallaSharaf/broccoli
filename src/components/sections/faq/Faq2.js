"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";

const Faq2 = () => {
  const t = useTranslations("faqSection");
  return (
    <div className="ltn__faq-area pt-115 pb-40">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h1 className="section-title white-color---">
                {t("sectionTitle")}
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12"> {/* Changed to full width */}
            <div className="ltn__faq-inner ltn__faq-inner-2">
              <div id="accordion_2">
                {/* FAQ Items */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div className="card" key={num}>
                    <h6
                      className="collapsed ltn__card-title"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-item-2-${num}`}
                      aria-expanded="false"
                    >
                      {t(`question${num}`)}
                    </h6>
                    <div
                      id={`faq-item-2-${num}`}
                      className="collapse"
                      data-bs-parent="#accordion_2"
                    >
                      <div className="card-body">
                        <p>{t(`answer${num}`)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="need-support text-center mt-40">
        <h2>{t("supportTitle")}</h2>
        <div className="btn-wrapper">
          {/* Optional Contact Button (commented out) */}
          {/* <Link href="/contact" className="theme-btn-1 btn">
            {t("contactButton")}
          </Link> */}
        </div>
        <h3>
          <i className="fas fa-phone"></i> 966-0566-249-353
        </h3>
      </div>
    </div>
  );
};

export default Faq2;