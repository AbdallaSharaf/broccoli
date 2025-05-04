"use client"
import { useTranslations } from "@/hooks/useTranslate";
import Image from "next/image";
import React from "react";

const About5 = ({ pt }) => {
  const t = useTranslations("common");
  return (
    <div className={`ltn__about-us-area ${pt ? pt : "pt-120"} pb-120`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="about-us-img-wrap about-img-left">
              <Image
                src="/img/others/6.png"
                alt={t("aboutImageAlt")}
                width={570}
                height={531}
              />
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  {t("subtitle")}
                </h6>
                <h1 className="section-title">
                  {t("titleLine1")}
                </h1>
                <p>{t("welcomeMessage")}</p>
              </div>
              <p>{t("aboutDescription")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About5;