import Home4Main from "@/components/layout/main/Home4Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import RTLManager from "@/libs/rtlManager";
import React from "react";

export const metadata = {
  title: "Fruits heaven",
  description: "Fruits heaven",
};

const Home4 = () => {
  return (
    <PageWrapper headerStyle={5} footerBg={"light"} navBg={"secondary"}>
      <Home4Main />
      <RTLManager />
    </PageWrapper>
  );
};

export default Home4;
