"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/userSlice";
import api from "@/lib/api";
import toast from "react-hot-toast";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      dispatch(clearUser());
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("persist:user");

      // Clear token cookie
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      // Even if the API call fails, clear local data
      dispatch(clearUser());
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("persist:user");

      // Clear token cookie
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      router.push("/login");
    }
  };

  return { logout };
};
