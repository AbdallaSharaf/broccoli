"use client";

import { Suspense } from "react";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import WaitVerificationMain from "@/components/layout/main/WaitVerificationMain";

export default function VerifyUserPage() {

  return (
    <Suspense fallback={<>Loading...</>}>
      <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={true}
      >
        <WaitVerificationMain />
      </PageWrapper>
    </Suspense>
  );
}
