"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HotDeal4 = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(
          "https://fruits-heaven-api.vercel.app/api/v1/siteSettings/slider/offersFirstSlider"
        );
        const data = await res.json();
        setSlides(data || []);
      } catch (err) {
        console.error("Failed to fetch slides:", err);
      }
    };

    fetchSlides();
  }, []); // <-- FIXED: Don't depend on slides!

  return (
    <div className="ltn__banner-area mt-120">
      <div className="container">
        <div className="row justify-content-center">
          {slides.map((slide, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="ltn__banner-item">
                <div className="ltn__banner-img">
                  <Link href={slide.redirectUrl || "/shop"}>
                    <Image
                      src={slide.url || "/img/banner/1.jpg"}
                      width={740}
                      height={500}
                      alt={`Slide ${index + 1}`}
                      className="w-100 h-auto object-cover"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotDeal4;
