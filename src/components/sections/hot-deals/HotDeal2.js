"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslate";
import Countdown from "./countdown";
import { useEffect, useState } from "react";
import { useLanguageContext } from "@/providers/LanguageContext";

const HotDeal2 = ({ type }) => {
  const t = useTranslations("common");
  const id = '67dc69372d9f897557d7f023'; // Static ID
  const [data, setData] = useState({en: "", ar: ""});
  const [loading, setLoading] = useState(true);
  const { locale } = useLanguageContext();
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://fruits-heaven-api.onrender.com/api/v1/siteSettings/${id}`, {
          method: "GET",
        });
  
        const json = await res.json(); // Important!
  
        const data = json.SiteSettings?.offersParagraph; // Use optional chaining to avoid crash if missing
        setData(data);
      } catch (error) {
        console.error('Error fetching offer paragraphs:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) { // make sure id exists
      fetchSettings();
    }
  }, []); // <-- add id to dependencies
  
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={`ltn__call-to-action-area ltn__call-to-action-4 ltn__call-to-action-4-2  ${
        type === 2 ? "section-bg-1 " : "bg-overlay-black-50 bg-image"
      }  pt-110 pb-120`}
      data-bs-bg={type === 2 ? "" : "/img/bg/6.jpg"}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className={`call-to-action-inner call-to-action-inner-4 ${
                type === 2 ? "" : "text-color-white "
              } text-center`}
            >
              <h2 className="ltn__secondary-color">{t("Hurry Up!")}</h2>
              <h1 className="h1">
                {data[locale]}
              </h1>
              <Countdown date="2025-12-01" fullFormat={false} />
              <div className="btn-wrapper animated">
                <Link
                  href="/shop"
                  className="theme-btn-1 btn btn-effect-1 text-uppercase"
                >
                  {t("shopNow")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__call-to-4-img-1" dir="ltr">
        <Image src="/img/bg/12.png" alt="#" width={631} height={1000} />
      </div>
      <div className="ltn__call-to-4-img-2" dir="ltr">
        <Image src="/img/bg/11.png" alt="#" width={514} height={1000} />
      </div>
    </div>
  );
};

export default HotDeal2;