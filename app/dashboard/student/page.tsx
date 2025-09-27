// dashboard/student/page.tsx

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function StudentDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center space-x-2">
        <span className="text-yellow-500 text-2xl">🎓</span>
        <span>Student Dashboard</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Pending assignments</p>
          </CardContent>
        </Card>

        {/* Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">88%</p>
            <p className="text-sm text-muted-foreground">
              Attendance percentage
            </p>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">New updates</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Area */}
      <Card className="col-span-1 md:col-span-3">
        <CardHeader>
          <CardTitle>Progress Overview</CardTitle>
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
