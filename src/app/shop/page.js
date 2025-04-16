import ShopMain from "@/components/layout/main/ShopMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
import { Suspense } from "react";

const ShopLeftSidebar = () => {
  return (

    <Suspense fallback={<>Loading...</>}>


    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
      >
      <ShopMain isSidebar="left" />
    </PageWrapper>
    </Suspense>
  );
};

export default ShopLeftSidebar;
