"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Offer4 = ({ mt, mb }) => {
    const [slides, setSlides] = useState([]);
    console.log(slides)
    useEffect(() => {
      const fetchSlides = async () => {
        try {
          const res = await fetch(
            "https://fruits-heaven-api.vercel.app/api/v1/siteSettings/slider/offersLastSlider"
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
    <div className={`ltn__banner-area ${mb ? mb : ""}  ${mt ? mt : "mt-120"}`}>
      <div className="container">
        <div className="row ltn__custom-gutter--- justify-content-center">
          <div className="col-lg-6 col-md-6">
            <div className="ltn__banner-item">
              <div className="ltn__banner-img">
                <Link href={slides?.[0]?.redirectUrl ||"/shop"}>
                  <Image
                    src={slides[0]?.url || "/img/banner/13.png"}
                    height={1000}
                    width={1000}
                    alt="Banner Image"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="ltn__banner-item">
                  <div className="ltn__banner-img">
                    <Link href={slides?.[1]?.redirectUrl ||"/shop"}>
                      <Image
                        src={slides[1]?.url || "/img/banner/14.png"}
                        height={1000}
                        width={1000}
                        alt="Banner Image"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="ltn__banner-item">
                  <div className="ltn__banner-img">
                    <Link href={slides?.[2]?.redirectUrl ||"/shop"}>
                      <Image
                        src={slides[2]?.url || "/img/banner/15.png"}
                        height={1000}
                        width={1000}
                        alt="Banner Image"
                      />
                    </Link>
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

export default Offer4;
