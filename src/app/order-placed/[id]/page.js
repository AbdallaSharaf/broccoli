"use client";

import { Suspense } from "react";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import OrderPlacedMain from "@/components/layout/main/OrderPlacedMain";

export default function OrderPlacedPage({ params }) {
  const { id } = params;
  if (!id) {
    notFound();
  }

  
  return (
    <Suspense fallback={<>Loading...</>}>
      <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={true}
      >
        <OrderPlacedMain orderID={id}/>
      </PageWrapper>
    </Suspense>
  );
}
