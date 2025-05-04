import TermsConditionsMain from "@/components/layout/main/TermsConditionsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const TermsConditions = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <TermsConditionsMain />
    </PageWrapper>
  );
};

export default TermsConditions;
