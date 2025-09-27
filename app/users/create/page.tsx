"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserPlus, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface Department {
  id: number;
  name: string;
}

interface FormData {
  userId: string;
  name: string;
  email: string;
  password: string;
  role:
    | "ADMIN"
    | "PRINCIPAL"
    | "HOD"
    | "DEPARTMENT_COORDINATOR"
    | "PROFESSOR"
    | "STUDENT";
  departmentId?: number;
}

export default function CreateUserPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    userId: "",
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    departmentId: undefined,
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const { data } = await api.get("/api/departments");
      setDepartments(data);
    } catch (error: any) {
      toast.error("Error fetching departments");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userId.trim()) {
      toast.error("User ID is required");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.password.trim() || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Check if department is required for certain roles
    const rolesRequiringDepartment = [
      "HOD",
      "DEPARTMENT_COORDINATOR",
      "PROFESSOR",
      "STUDENT",
    ];
    if (
      rolesRequiringDepartment.includes(formData.role) &&
      !formData.departmentId
    ) {
      toast.error("Department is required for this role");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        departmentId: rolesRequiringDepartment.includes(formData.role)
          ? formData.departmentId
          : undefined,
      };

      await api.post("/api/users/create", payload);
      toast.success("User created successfully");
      router.push("/users/list");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error creating user");
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password }));
    toast.success("Password generated");
  };

  const rolesRequiringDepartment = [
    "HOD",
    "DEPARTMENT_COORDINATOR",
    "PROFESSOR",
    "STUDENT",
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/users/list")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
          <p className="text-gray-600 mt-1">Add a new user to the system</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            User Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User ID */}
              <div className="space-y-2">
                <Label htmlFor="userId">User ID *</Label>
                <Input
                  id="userId"
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, userId: e.target.value }))
                  }
                  required
                  placeholder="Enter username/roll no/emp code"
                  className="font-mono"
                />
                <p className="text-xs text-gray-600">
                  Username, roll number, or employee code
                </p>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  placeholder="Enter full name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  placeholder="Enter email address"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                    placeholder="Enter password (min 6 characters)"
                    className="pr-20"
                  />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-7 w-7 p-0"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">
                    Minimum 6 characters required
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generatePassword}
                  >
                    Generate
                  </Button>
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: FormData["role"]) => {
                    setFormData((prev) => ({
                      ...prev,
                      role: value,
                      departmentId: !rolesRequiringDepartment.includes(value)
                        ? undefined
                        : prev.departmentId,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="PRINCIPAL">Principal</SelectItem>
                    <SelectItem value="HOD">
                      Head of Department (HOD)
                    </SelectItem>
                    <SelectItem value="DEPARTMENT_COORDINATOR">
                      Department Coordinator
                    </SelectItem>
                    <SelectItem value="PROFESSOR">Professor</SelectItem>
                    <SelectItem value="STUDENT">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Department - Only show for certain roles */}
              {rolesRequiringDepartment.includes(formData.role) && (
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={formData.departmentId?.toString() || ""}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        departmentId: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600">
                    Required for {formData.role.toLowerCase().replace("_", " ")}{" "}
                    role
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-6 border-t">
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                {loading ? "Creating..." : "Create User"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/users/list")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
