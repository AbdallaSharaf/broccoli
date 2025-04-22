"use client";
import HeroSidebar from "@/components/shared/sidebars/HeroSidebar";
import { useTranslations } from "@/hooks/useTranslate";
import main from "@/libs/main";
import { useEffect, useState } from "react";

const Hero15 = ({ type }) => {
  const t = useTranslations("common");
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("https://fruits-heaven-api.vercel.app/api/v1/siteSettings/slider/homeSlider");
        const data = await res.json();
        setSlides(data || []);
      } catch (err) {
        console.error("Failed to fetch slides:", err);
      }
    };
    // main()
    fetchSlides();
  }, [slides]);

  return (
    <div className="ltn__slider-area mt-30">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <HeroSidebar type={type} />
          </div>
          <div className="col-lg-9">
            <div className="ltn__slide-active-2 slick-slide-arrow-1 slick-slide-dots-1">
              {slides.length > 0 && slides.map((slide, index) => (
                <div
                  key={slide.id || index}
                  className="ltn__slide-item ltn__slide-item-10 bg-image"
                  style={{ backgroundImage: `url(${slide.url})` }}
                >
                  <div className="ltn__slide-item-inner">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-7 col-md-7 col-sm-7 align-self-center">
                          <div className="slide-item-info" style={{ position: "relative" }}>
                            <div className="slide-item-info-inner ltn__slide-animation" >
                              <div className="btn-wrapper animated" style={{ position: "absolute", top: "120px" }}>
                                <a
                                  href={slide.redirectUrl || "/shop"}
                                  className="theme-btn-1 btn btn-effect-1 text-uppercase"
                                >
                                  {t("shopNow")}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5 align-self-center">
                          <div className="slide-item-img">
                            <a href={slide.redirectUrl || "/shop"}></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero15;
