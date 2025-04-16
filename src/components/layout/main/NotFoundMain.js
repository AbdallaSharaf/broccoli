"use client";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import NotFoundPrimary from "@/components/sections/not-found/NotFoundPrimary";
import { useTranslations } from "@/hooks/useTranslate";

const NotFoundMain = ({ title, pathName }) => {
  const t = useTranslations("common");

  return (
    <main>
      <HeroPrimary
        title={title ? t(title) : t("404 Page")}
        text={pathName ? pathName : "404"}
      />
      <NotFoundPrimary title={title} />
    </main>
  );
};

export default NotFoundMain;
