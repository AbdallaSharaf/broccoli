import ShopMain from "@/components/layout/main/ShopMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { Suspense } from "react";
import React from "react";

const ShopRightSidebar = () => {
  return (

    <Suspense fallback={<>Loading...</>}>
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
      >
      <ShopMain title={"Shop Right Sidebar"} />
    </PageWrapper>
    </Suspense>
  );
};

export default ShopRightSidebar;
