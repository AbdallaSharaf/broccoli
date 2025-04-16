import ShopMain from "@/components/layout/main/ShopMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React, { Suspense } from "react";

const ShopLeftSidebar = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ShopMain isSidebar="left" title={"Shop Left Sidebar"} />
    </PageWrapper>
    </Suspense>
  );
};

export default ShopLeftSidebar;
