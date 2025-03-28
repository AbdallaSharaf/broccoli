"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import NavItem from "@/components/layout/headers/NavItem";
import Link from "next/link";

export default function VerifyUserPage({ params }) {
  const router = useRouter();
  const { token } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      notFound();
    }

    const verifyUser = async () => {
      try {
        const response = await fetch(`https://fruits-heaven-api.vercel.app/api/v1/auth/verify/${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true); // Show success message and button
        } else {
          setError(data.message || "Verification failed.");
        }
      } catch (err) {
        setError("An error occurred while verifying.");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <HeroPrimary
        title={
          loading
            ? "Verifying Your Account..."
            : success
            ? "Account Verified!"
            : "Verification Failed"
        }
        text={
          loading
            ? "Please wait while we verify your account."
            : success
            ? "Your account has been successfully verified. You can now proceed."
            : error || "Something went wrong. Please try again later."
        }
        type={2}
      />

      {!loading && success && (
        <div className="special-link text-uppercase">
          <Link className="special-link" href="/">Go to homepage</Link>
        </div>
      )}
    </PageWrapper>
  );
}
