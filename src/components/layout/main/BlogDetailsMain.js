"use client"
import BlogDetailsPrimary from "@/components/sections/blog-details/BlogDetailsPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";

const BlogDetailsMain = () => {
  const t = useTranslations("common");

  return (
    <main>
      <HeroPrimary title={t("News Details")} text={t("News Details")} />
      <BlogDetailsPrimary />
      <Features4 />
    </main>
  );
};

export default BlogDetailsMain;
