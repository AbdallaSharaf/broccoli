import FaqMain from "@/components/layout/main/FaqMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { TranslationWrapper } from "@/components/shared/wrappers/translationWrapper";
import React from "react";

const Faq = ({translations }) => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <TranslationWrapper scope="faq" serverTranslations={translations}>  
      {({ t }) => <FaqMain t={t} />}
      </TranslationWrapper>
    </PageWrapper>
  );
};

export default Faq;
