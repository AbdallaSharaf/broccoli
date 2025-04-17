import ResetCodeMain from "@/components/layout/main/ResetCodeMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
import { Suspense } from "react";

const ResetCode = () => {
  return (

    <Suspense fallback={<>Loading...</>}>
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
      >
      <ResetCodeMain />
    </PageWrapper>
    </Suspense>
  );
};

export default ResetCode;
