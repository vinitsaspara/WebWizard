"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  UserCog,
  Crown,
  Building2,
  TrendingUp,
  Calendar,
  Settings,
  Plus,
  Eye,
  BarChart3,
} from "lucide-react";
import axios from "axios";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface DashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalFaculty: number;
  totalDepartments: number;
  recentUsers: number;
  usersByRole: Record<string, number>;
  usersByDepartment: Record<string, number>;
}

export default function DashboardPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.token) {
      router.push("/login");
      return;
    }
    fetchDashboardStats();
  }, [user.token, router]);

  const fetchDashboardStats = async () => {
    try {
      // In a real app, you'd have a dashboard stats API endpoint
      const { data: users } = await api.get("/api/users/list");
      const { data: departments } = await api.get("/api/departments");

      // Calculate stats
      const totalUsers = users.length;
      const totalStudents = users.filter(
        (u: any) => u.role === "STUDENT"
      ).length;
      const totalFaculty = users.filter((u: any) =>
        ["PROFESSOR", "HOD", "DEPARTMENT_COORDINATOR"].includes(u.role)
      ).length;

      // Recent users (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const recentUsers = users.filter(
        (u: any) => new Date(u.createdAt) > weekAgo
      ).length;

      // Users by role
      const usersByRole = users.reduce((acc: any, user: any) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});

      // Users by department
      const usersByDepartment = users.reduce((acc: any, user: any) => {
        const deptName = user.department?.name || "No Department";
        acc[deptName] = (acc[deptName] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalUsers,
        totalStudents,
        totalFaculty,
        totalDepartments: departments.length,
        recentUsers,
        usersByRole,
        usersByDepartment,
      });
    } catch (error: any) {
      toast.error("Error fetching dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  const getRoleBasedActions = () => {
    const actions = [];

    switch (user.role) {
      case "ADMIN":
      case "PRINCIPAL":
        actions.push(
          { label: "Manage Users", icon: Users, href: "/users/list" },
          { label: "Add User", icon: Plus, href: "/users/create" },
          { label: "Departments", icon: Building2, href: "/departments" },
          { label: "System Settings", icon: Settings, href: "/settings" }
        );
        break;
      case "HOD":
        actions.push(
          { label: "Department Users", icon: Users, href: "/users/list" },
          { label: "Add Faculty", icon: Plus, href: "/users/create" },
          { label: "Department Stats", icon: BarChart3, href: "/reports" }
        );
        break;
      case "DEPARTMENT_COORDINATOR":
        actions.push(
          { label: "My Students", icon: GraduationCap, href: "/users/list" },
          { label: "Add Student", icon: Plus, href: "/users/create" }
        );
        break;
      default:
        actions.push(
          { label: "My Profile", icon: Eye, href: "/profile" },
          { label: "View Users", icon: Users, href: "/users/list" }
        );
    }

    return actions;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's your system overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.role === "ADMIN"
                ? "bg-yellow-100 text-yellow-800"
                : user.role === "PRINCIPAL"
                ? "bg-purple-100 text-purple-800"
                : user.role === "HOD"
                ? "bg-blue-100 text-blue-800"
                : user.role === "DEPARTMENT_COORDINATOR"
                ? "bg-green-100 text-green-800"
                : user.role === "PROFESSOR"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {user.role?.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalStudents}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <UserCog className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Faculty</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalFaculty}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Building2 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalDepartments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {getRoleBasedActions().map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => router.push(action.href)}
              >
                <action.icon className="w-5 h-5" />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Plus className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{stats.recentUsers} new users</p>
                  <p className="text-sm text-gray-600">
                    Added in the last 7 days
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Users by Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.usersByRole).map(([role, count]) => (
                <div key={role} className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {role.replace("_", " ")}
                  </span>
                  <span className="text-sm text-gray-600">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
