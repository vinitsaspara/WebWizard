// dashboard/hod/page.tsx

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function HodDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center space-x-2">
        <span className="text-green-500 text-2xl">🏫</span>
        <span>HOD Dashboard</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Students */}
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">512</p>
            <p className="text-sm text-muted-foreground">Registered in your department</p>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">14</p>
            <p className="text-sm text-muted-foreground">Requests awaiting your approval</p>
          </CardContent>
        </Card>

        {/* Department Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Department Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">22</p>
            <p className="text-sm text-muted-foreground">New requests from your department</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Area */}
      <Card className="col-span-1 md:col-span-3">
        <CardHeader>
          <CardTitle>Department Activity</CardTitle>
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
