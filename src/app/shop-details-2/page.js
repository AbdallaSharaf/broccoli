import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
import { Suspense } from "react";

const ProductDetails2 = () => {
  return (

    <Suspense fallback={<>Loading...</>}>
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
      >
      <ProductDetailsMain isNotSidebar={true} type={2} />
    </PageWrapper>
      </Suspense>
  );
};

export default ProductDetails2;
