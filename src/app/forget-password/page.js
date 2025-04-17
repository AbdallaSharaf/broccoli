import ForgetPasswordMain from "@/components/layout/main/ForgetPasswordMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
import { Suspense } from "react";

const ForgetPassword = () => {
  return (

    <Suspense fallback={<>Loading...</>}>
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
      >
      <ForgetPasswordMain />
    </PageWrapper>
    </Suspense>
  );
};

export default ForgetPassword;
