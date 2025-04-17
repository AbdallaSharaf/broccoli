import NewPasswordMain from "@/components/layout/main/NewPasswordMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";
import { Suspense } from "react";

const NewPassword = () => {
  return (

    <Suspense fallback={<>Loading...</>}>
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
      >
      <NewPasswordMain />
    </PageWrapper>
    </Suspense>
  );
};

export default NewPassword;
