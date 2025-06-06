import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Released", value: 60, color: "#22C55E" },
  { name: "Remaining", value: 40, color: "#E5E7EB" },
];

const JobDetails = () => {
  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Project Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">E-commerce Platform Redesign</h1>
          <p className="text-sm text-muted-foreground">
            Posted on Jan 20, 2025 • Fixed-price • Intermediate
          </p>
        </div>
        <Button>Edit Project</Button>
      </div>

      {/* Project Overview */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <p>
            This project involves a complete redesign of an e-commerce platform,
            including the UI update, new user flows, and improved performance.
            Deliverables include wireframes, high-fidelity prototypes, and
            responsive code.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <strong>Total Budget:</strong> $4,500
            </div>
            <div>
              <strong>Paid:</strong> $2,220
            </div>
            <div>
              <strong>Remaining:</strong> $2,280
            </div>
          </div>
          <Progress value={50} className="w-full" />
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Milestones & Deliverables</h2>
          <ul className="space-y-2">
            <li>✅ Project Requirements & Wireframes - Jan 10, 2025</li>
            <li>🟡 Frontend Development - In Progress</li>
            <li>⬜ Testing & Deployment - Upcoming</li>
          </ul>
        </CardContent>
      </Card>

      {/* Communication Section */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold">Conversation</h2>
          <div className="space-y-2">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p>
                <strong>Daniel:</strong> Hey! Just completed the wireframes for
                the homepage.
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg self-end">
              <p>
                <strong>You:</strong> Great job! Please go ahead with the
                frontend implementation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side Panel */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Project Files</h2>
            <ul className="text-sm space-y-1">
              <li>✅ wireframes.pdf</li>
              <li>📁 homepage_sketch.fig</li>
              <li>📁 redesign_notes.docx</li>
              <li>⬇️ assets.zip</li>
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Freelancer Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Daniel Kofi</p>
                  <p className="text-xs text-muted-foreground">
                    Frontend Developer
                  </p>
                </div>
              </div>
              <Button className="mt-3 w-full">Message</Button>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h2 className="font-semibold">Payment Summary</h2>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={40}
                    outerRadius={60}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Button className="w-full">Release Payment</Button>
            </CardContent>
          </Card>

          {/* Project Timeline */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="font-semibold">Project Timeline</h2>
              <ul className="text-sm">
                <li>Started: Dec 22, 2024</li>
                <li>Delivery: Feb 15, 2025</li>
              </ul>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="font-semibold">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div className="bg-gray-100 p-2 rounded">Contract</div>
                <div className="bg-gray-100 p-2 rounded">Files</div>
                <div className="bg-gray-100 p-2 rounded">Messages</div>
                <div className="bg-gray-100 p-2 rounded">Consultation</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
