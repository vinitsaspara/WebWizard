"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { RootState } from "@/store";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Public routes that don't require authentication
    const publicPaths = ["/login", "/"];
    const isPublicPath = publicPaths.some(
      (path) => pathname === path || pathname.startsWith(path)
    );

    // If on a public path, allow access
    if (isPublicPath) {
      return;
    }

    // If not authenticated and trying to access protected route, redirect to login
    if (!user.token) {
      router.push("/login");
      return;
    }

    // If authenticated and on login page, redirect to dashboard
    if (user.token && pathname === "/login") {
      router.push("/dashboard");
      return;
    }
  }, [user.token, pathname, router]);

  // Don't render anything while redirecting (except for homepage and login)
  if (!user.token && pathname !== "/login" && pathname !== "/") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
