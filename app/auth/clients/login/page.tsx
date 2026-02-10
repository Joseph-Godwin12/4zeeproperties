"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Legacy client login route – redirects to the unified login page.
 */
export default function ClientLogin() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, [router]);
 

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to login…</p>
    </div>
  );
}