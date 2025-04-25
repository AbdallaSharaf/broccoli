"use client"

import { useTranslations } from "@/hooks/useTranslate";
import OrderPrimary from "@/components/sections/order/OrderPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import { useEffect, useState } from "react";

const OrderMain = (id) => {
    const [order, setOrder] = useState([]);
    useEffect(() => {
        const getOrderById = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Fetching order with ID:", id);
                const res = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/order/${id.order}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                });
            
                if (!res.ok) throw new Error(`Failed to fetch order: ${res.status}`);
            
                const data = await res.json();
                const order = data.data;
                setOrder(order);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };
        getOrderById()
    }, [order])
  const t = useTranslations("common");
  return (
    <main>
      <HeroPrimary title={t("orderDetails")} text={t("orderDetails")} />
      <OrderPrimary order={order} />
      <Features4 />
    </main>
  );
};

export default OrderMain;
