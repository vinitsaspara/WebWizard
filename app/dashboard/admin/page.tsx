// dashboard/admin/page.tsx

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center space-x-2">
        <span className="text-blue-500 text-2xl">📊</span>
        <span>Admin Dashboard</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,245</p>
            <p className="text-sm text-muted-foreground">All registered users</p>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">324</p>
            <p className="text-sm text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">78</p>
            <p className="text-sm text-muted-foreground">Waiting for approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Area */}
      <Card className="col-span-1 md:col-span-3">
        <CardHeader>
          <CardTitle>Monthly Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 flex items-center justify-center rounded">
            <p className="text-muted-foreground">Chart will go here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
