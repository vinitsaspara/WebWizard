"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface User {
  name: string;
  email: string;
  role:
    | "ADMIN"
    | "PRINCIPAL"
    | "HOD"
    | "DEPARTMENT_COORDINATOR"
    | "PROFESSOR"
    | "STUDENT";
  departmentId?: number;
}

interface Department {
  id: number;
  name: string;
}

export default function EditUser() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    role: "STUDENT",
    departmentId: undefined,
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user and departments
  useEffect(() => {
    async function fetchData() {
      try {
        const [{ data: userData }, { data: deptData }] = await Promise.all([
          api.get(`/api/users/${id}/get`),
          api.get(`/api/departments`),
        ]);
        setUser(userData);
        setDepartments(deptData);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/api/users/${id}/update`, user);
      toast.success("User updated successfully");
      router.push("/users/list");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error updating user");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <Input
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <Select
            value={user.role}
            onValueChange={(val) =>
              setUser({ ...user, role: val as User["role"] })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="PRINCIPAL">Principal</SelectItem>
              <SelectItem value="HOD">HOD</SelectItem>
              <SelectItem value="DEPARTMENT_COORDINATOR">
                Coordinator
              </SelectItem>
              <SelectItem value="PROFESSOR">Professor</SelectItem>
              <SelectItem value="STUDENT">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(user.role === "HOD" ||
          user.role === "DEPARTMENT_COORDINATOR" ||
          user.role === "PROFESSOR" ||
          user.role === "STUDENT") && (
          <div>
            <label className="block mb-1 font-medium">Department</label>
            <Select
              value={user.departmentId?.toString() || ""}
              onValueChange={(val) =>
                setUser({ ...user, departmentId: parseInt(val) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d.id} value={d.id.toString()}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button type="submit">Update User</Button>
      </form>
    </div>
  );
}
