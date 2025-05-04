import ServiceCard4 from "@/components/shared/cards/ServiceCard4";
import getAllServices from "@/libs/getAllServices";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";
import Image from "next/image";
import Link from "next/link";
const serviceImage1 = "/img/service/1.jpg";
const serviceImage2 = "/img/service/2.jpg";
const serviceImage3 = "/img/service/3.jpg";
const serviceImageLarge1 = "/img/service/22.jpg";
const serviceImageLarge2 = "/img/service/21.jpg";
const serviceImageLarge3 = "/img/service/22.jpg";
const Services4 = () => {
  const t = useTranslations("servicesSection");
  const services = [
    {
      id: 27,
      title: t("service1title"),
      desc: t("service1desc"),
      imgAlt: "/img/icons/icon-img/21.png",
      image: serviceImage1,
      imageLarge: serviceImageLarge1
    },
    {
      id: 28,
      title: t("service2title"),
      desc: t("service2desc"),
      imgAlt: "/img/icons/icon-img/22.png",
      image: serviceImage2,
      imageLarge: serviceImageLarge2
    },
    {
      id: 29,
      title: t("service3title"),
      desc: t("service3desc"),
      imgAlt: "/img/icons/icon-img/23.png",
      image: serviceImage3,
      imageLarge: serviceImageLarge3
    }
  ];
  

  return (
    <div className="ltn__feature-area section-bg-1 pt-115 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h6 className="section-subtitle ltn__secondary-color">
                {"//"} {t("featuresSubtitle")} {"//"}
              </h6>
              <h1 className="section-title">
                {t("mainTitle")}<span>.</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {services.map((service, idx) => (
            <div key={idx} className="col-lg-4 col-sm-6 col-12">
                <div className="ltn__feature-item ltn__feature-item-7">
                  <div className="ltn__feature-icon-title">
                    <div className="ltn__feature-icon">
                      <Image src={service.imgAlt} alt="#" width={60} height={63} />
                    </div>
                    <h3>
                      <Link href="#">{service.title}</Link>
                    </h3>
                  </div>
                  <div className="ltn__feature-info">
                    <p>{service.desc}</p>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services4;