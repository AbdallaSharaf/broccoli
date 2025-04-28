"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import OrderPrimary from "@/components/sections/order/OrderPrimary";
import { useTranslations } from "@/hooks/useTranslate";
import CommonContext from "@/providers/CommonContext";


const OrderDetailsMain = ({ title, text, type, isNotSidebar, order }) => {
  const t = useTranslations("common");
  return (
    <main>
      <HeroPrimary
        title={title ? title : t("orderDetails")}
        text={text ? text : t("orderDetails")}
        type={3}
      />
      <OrderPrimary order={order} />
      <Features4 />
    </main>
  );
};

export default OrderDetailsMain;
