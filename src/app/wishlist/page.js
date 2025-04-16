import WishlistMain from "@/components/layout/main/WishlistMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
import { Suspense } from "react";

const Wishlist = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
      >
      <WishlistMain />
    </PageWrapper>
    </Suspense>
  );
};

export default Wishlist;
