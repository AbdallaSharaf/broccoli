import ShopMain from "@/components/layout/main/ShopMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
import { Suspense } from "react";

const ShopGrid = () => {
  return (

    <Suspense fallback={<>Loading...</>}>


    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
      >
      <ShopMain isSidebar={false} title={"Shop Grid"} />
    </PageWrapper>
    </Suspense>
  );
};

export default ShopGrid;
