"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearUser } from "@/store/userSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Menu,
  X,
  Home,
  Users,
  Building2,
  Settings,
  LogOut,
  User,
  GraduationCap,
  UserCog,
  Crown,
  BarChart3,
  FileText,
  Plus,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[];
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: [
      "ADMIN",
      "PRINCIPAL",
      "HOD",
      "DEPARTMENT_COORDINATOR",
      "PROFESSOR",
      "STUDENT",
    ],
  },
  {
    label: "User Management",
    href: "/users",
    icon: Users,
    roles: ["ADMIN", "PRINCIPAL", "HOD", "DEPARTMENT_COORDINATOR"],
    children: [
      {
        label: "All Users",
        href: "/users/list",
        icon: Users,
        roles: ["ADMIN", "PRINCIPAL", "HOD", "DEPARTMENT_COORDINATOR"],
      },
      {
        label: "Add User",
        href: "/users/create",
        icon: Plus,
        roles: ["ADMIN", "PRINCIPAL", "HOD", "DEPARTMENT_COORDINATOR"],
      },
    ],
  },
  {
    label: "Departments",
    href: "/departments",
    icon: Building2,
    roles: ["ADMIN", "PRINCIPAL"],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BarChart3,
    roles: ["ADMIN", "PRINCIPAL", "HOD"],
  },
  {
    label: "My Profile",
    href: "/profile",
    icon: User,
    roles: [
      "ADMIN",
      "PRINCIPAL",
      "HOD",
      "DEPARTMENT_COORDINATOR",
      "PROFESSOR",
      "STUDENT",
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["ADMIN", "PRINCIPAL"],
  },
];

interface NavLayoutProps {
  children: React.ReactNode;
}

export function NavLayout({ children }: NavLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  // Don't show navigation on login page or homepage
  if (pathname === "/login" || pathname === "/") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case "ADMIN":
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case "PRINCIPAL":
        return <Crown className="w-4 h-4 text-purple-600" />;
      case "HOD":
        return <UserCog className="w-4 h-4 text-blue-600" />;
      case "DEPARTMENT_COORDINATOR":
        return <Users className="w-4 h-4 text-green-600" />;
      case "PROFESSOR":
        return <GraduationCap className="w-4 h-4 text-indigo-600" />;
      case "STUDENT":
        return <Users className="w-4 h-4 text-gray-600" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const filteredNavigationItems = navigationItems.filter(
    (item) => !item.roles || item.roles.includes(user.role || "")
  );

  const NavigationLink = ({
    item,
    isChild = false,
  }: {
    item: NavigationItem;
    isChild?: boolean;
  }) => {
    const isActive =
      pathname === item.href ||
      (item.children && item.children.some((child) => pathname === child.href));

    return (
      <div>
        <button
          onClick={() => {
            router.push(item.href);
            setSidebarOpen(false);
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
            isChild ? "ml-6 pl-6" : "",
            isActive
              ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </button>

        {item.children && (
          <div className="mt-1 space-y-1">
            {item.children
              .filter(
                (child) => !child.roles || child.roles.includes(user.role || "")
              )
              .map((child) => (
                <NavigationLink key={child.href} item={child} isChild />
              ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r">
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo */}
          <div className="flex items-center px-4 py-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  WebWizard
                </h1>
                <p className="text-xs text-gray-600">Student Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {filteredNavigationItems.map((item) => (
              <NavigationLink key={item.href} item={item} />
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <Card className="p-3">
              <div className="flex items-center gap-3 mb-3">
                {getRoleIcon(user.role)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.id || "User"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {user.role?.replace("_", " ") || "Role"}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    WebWizard
                  </h1>
                  <p className="text-xs text-gray-600">Student Portal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="px-4 py-4 space-y-2">
              {filteredNavigationItems.map((item) => (
                <NavigationLink key={item.href} item={item} />
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <Card className="p-3">
                <div className="flex items-center gap-3 mb-3">
                  {getRoleIcon(user.role)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.id || "User"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {user.role?.replace("_", " ") || "Role"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">WebWizard</h1>
          </div>
          <div className="w-8" /> {/* Spacer for alignment */}
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
