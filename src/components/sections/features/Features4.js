"use client";
import Image from "next/image";
import { useTranslations } from "@/hooks/useTranslate";

const Features4 = ({ type, mb }) => {
  const t = useTranslations("common");

  return (
    <div
      className={`ltn__feature-area  ${type === 2 ? "" : ""}  ${
        mb ? mb : "before-bg-bottom-2"
      } plr--5`}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__feature-item-box-wrap ltn__border-between-column white-bg">
              <div className="row">
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/11.png"}
                        width={51}
                        height={50}
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>{t("Curated Products")}</h4>
                      <p>{t("Provide free home delivery for all product over")} 100 {t("SAR")}</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/12.png"}
                        width={51}
                        height={50}
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>{t("Handmade")}</h4>
                      <p>{t("We ensure the product quality that is our main goal")}</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/13.png"}
                        width={51}
                        height={50}
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>{t("Natural Food")}</h4>
                      <p>{t("Return product within 3 days for any product you buy")}</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/14.png"}
                        width={51}
                        height={50}
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>{t("Free home delivery")}</h4>
                      <p>{t("We ensure the product quality that you can trust easily")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features4;
