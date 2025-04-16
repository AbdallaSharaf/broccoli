import RegisterMain from "@/components/layout/main/RegisterMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
import { Suspense } from "react";

const Register = () => {
  return (

    <Suspense fallback={<>Loading...</>}>


    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
      >
      <RegisterMain />
    </PageWrapper>
    </Suspense>
  );
};

export default Register;
