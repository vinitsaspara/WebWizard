"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  departmentId?: number;
}

export default function DeleteUser() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Fetch user data
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await api.get(`/api/users/${id}/get`);
        setUser(data);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Error fetching user data"
        );
        router.push("/users/list");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id, router]);

  const handleDelete = async () => {
    if (!user) return;
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return;

    setDeleting(true);
    try {
      await api.delete(`/api/users/${id}/delete`);
      toast.success("User deleted successfully");
      router.push("/users/list");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error deleting user");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Delete User</h1>
      <p className="mb-6">
        Are you sure you want to delete <strong>{user.name}</strong> (
        {user.email})?
      </p>
      <div className="flex justify-center gap-4">
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
        <Button onClick={() => router.push("/users/list")}>Cancel</Button>
      </div>
    </div>
  );
}
