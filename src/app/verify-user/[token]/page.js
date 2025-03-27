"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyUserPage({ params }) {
  const router = useRouter();
  const { token } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/"); // Redirect if token is missing
      return;
    }

    const verifyUser = async () => {
      try {
        const response = await fetch(`/api/auth/verify-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          router.push("/"); // Redirect to home on success
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
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <>
          <h1 className="text-2xl font-bold">Verifying Your Account...</h1>
          <p>Please wait while we verify your account.</p>
        </>
      ) : error ? (
        <>
          <h1 className="text-2xl font-bold text-red-500">Verification Failed</h1>
          <p>{error}</p>
        </>
      ) : null}
    </div>
  );
}
