"use client";

import { Suspense, useEffect } from "react";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import OrderPlacedMain from "@/components/layout/main/OrderPlacedMain";
import trackEvent from "@/hooks/usePixel";
export default function OrderPlacedPage({ params }) {
  const { id } = params;
  if (!id) {
    notFound();
  }
  useEffect(() => {
    // Track purchase automatically when landing on success page
    trackEvent('Purchase', {
      // content_ids: order.items.map(item => item.id),
      // content_type: 'product',
      value: 100,
      currency: 'SAR',
    });
  }, [id, trackEvent]);

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
