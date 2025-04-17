"use client";

import { useEffect, useState, Suspense } from "react";
import { notFound } from "next/navigation";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { verifyUserToken } from "../../api/auth";
import VerifyUserMain from "@/components/layout/main/VerifyUserMain";

export default function VerifyUserPage({ params }) {
  const { token } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      notFound();
    }

    const verify = async () => {
      const result = await verifyUserToken(token);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error);
      }

      setLoading(false);
    };

    verify();
  }, [token]);

  return (
    <Suspense fallback={<>Loading...</>}>
      <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={true}
      >
        <VerifyUserMain loading={loading} success={success} error={error} />
      </PageWrapper>
    </Suspense>
  );
}
