import OrderTrackingMain from "@/components/layout/main/OrderTrackingMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";

const OrderTracking = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <OrderTrackingMain />
    </PageWrapper>
  );
};



export default OrderTracking;
