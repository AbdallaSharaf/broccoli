"use client"
import About5 from "@/components/sections/about/About5";
import Blogs2 from "@/components/sections/blogs/Blogs2";
import CallToAction1 from "@/components/sections/call-to-action/CallToAction1";
import Faq2 from "@/components/sections/faq/Faq2";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import Services4 from "@/components/sections/services/Services4";
import TermsConditionsPrimary from "@/components/sections/terms-conditions/TermsConditionsPrimary";
import { useTranslations } from "@/hooks/useTranslate";

const AboutMain = () => {
  const t = useTranslations("common");

  return (
    <main>
      <HeroPrimary title={t("about us")} text={t("about us")} bg="/img/bg/5.jpg" />
      <TermsConditionsPrimary />
    </main>
  );
};

export default AboutMain;
