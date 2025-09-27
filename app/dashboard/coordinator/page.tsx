// dashboard/coordinator/page.tsx

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function CoordinatorDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center space-x-2">
        <span className="text-purple-500 text-2xl">📋</span>
        <span>Coordinator Dashboard</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Assigned Students */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">178</p>
            <p className="text-sm text-muted-foreground">Students under your supervision</p>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">9</p>
            <p className="text-sm text-muted-foreground">Tasks awaiting your action</p>
          </CardContent>
        </Card>

        {/* Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">New requests from students</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Area */}
      <Card className="col-span-1 md:col-span-3">
        <CardHeader>
          <CardTitle>Coordinator Activity</CardTitle>
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
