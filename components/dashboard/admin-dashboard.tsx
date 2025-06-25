"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Users,
  DollarSign,
  TrendingUp,
  Shield,
  Settings,
  BarChart3,
  FileText,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
} from "lucide-react"

export function AdminDashboard() {
  const [totalUsers] = useState(15420)
  const [totalVendors] = useState(2850)
  const [monthlyRevenue] = useState(2450000)
  const [activeBookings] = useState(1240)

  const quickStats = [
    {
      title: "Total Users",
      value: `${(totalUsers / 1000).toFixed(1)}K`,
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
    },
    {
      title: "Active Vendors",
      value: `${(totalVendors / 1000).toFixed(1)}K`,
      icon: <Shield className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8%",
    },
    {
      title: "Monthly Revenue",
      value: `₹${(monthlyRevenue / 100000).toFixed(1)}L`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+15%",
    },
    {
      title: "Active Bookings",
      value: `${(activeBookings / 1000).toFixed(1)}K`,
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+5%",
    },
  ]

  const systemAlerts = [
    {
      type: "warning",
      title: "High Server Load",
      message: "Server CPU usage is at 85%",
      time: "5 minutes ago",
      priority: "high",
    },
    {
      type: "info",
      title: "Vendor Verification Pending",
      message: "25 vendors awaiting verification",
      time: "1 hour ago",
      priority: "medium",
    },
    {
      type: "success",
      title: "Backup Completed",
      message: "Daily backup completed successfully",
      time: "2 hours ago",
      priority: "low",
    },
  ]

  const recentActivity = [
    {
      type: "user",
      action: "New user registration",
      details: "Kavya Sharma joined as customer",
      time: "10 minutes ago",
    },
    {
      type: "vendor",
      action: "Vendor verification completed",
      details: "Dream Decorations approved",
      time: "25 minutes ago",
    },
    {
      type: "booking",
      action: "High-value booking",
      details: "₹2.5L booking confirmed",
      time: "1 hour ago",
    },
    {
      type: "payment",
      action: "Payment processed",
      details: "₹45,000 commission received",
      time: "2 hours ago",
    },
  ]

  const pendingApprovals = [
    {
      type: "vendor",
      title: "Vendor Verification",
      count: 25,
      description: "New vendor applications",
    },
    {
      type: "content",
      title: "Content Review",
      count: 12,
      description: "Blog posts and portfolios",
    },
    {
      type: "dispute",
      title: "Dispute Resolution",
      count: 3,
      description: "Customer-vendor disputes",
    },
    {
      type: "refund",
      title: "Refund Requests",
      count: 8,
      description: "Payment refund requests",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" />, active: true },
    { label: "Users", href: "/dashboard/users", icon: <Users className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/vendors", icon: <Shield className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Payments", href: "/dashboard/payments", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Content", href: "/dashboard/content", icon: <FileText className="w-4 h-4" /> },
    { label: "Support", href: "/dashboard/support", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🛡️</h1>
              <p className="text-purple-100 text-lg">Platform overview and management controls</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{systemAlerts.filter((a) => a.priority === "high").length}</div>
              <div className="text-purple-200">High Priority</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Health */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                System Health & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">1.2s</div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="font-semibold">{systemAlerts.length}</div>
                  <div className="text-sm text-gray-600">Active Alerts</div>
                </div>
              </div>

              <div className="space-y-3">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div
                      className={`p-1 rounded-full ${
                        alert.priority === "high"
                          ? "bg-red-100"
                          : alert.priority === "medium"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                      }`}
                    >
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          alert.priority === "high"
                            ? "text-red-600"
                            : alert.priority === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                    <Badge
                      variant={
                        alert.priority === "high"
                          ? "destructive"
                          : alert.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApprovals.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{item.count}</div>
                    <Button size="sm" variant="outline" className="mt-1">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Platform Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <div className="text-blue-600">
                        {activity.type === "user" && <Users className="w-4 h-4" />}
                        {activity.type === "vendor" && <Shield className="w-4 h-4" />}
                        {activity.type === "booking" && <BarChart3 className="w-4 h-4" />}
                        {activity.type === "payment" && <DollarSign className="w-4 h-4" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>User Growth Target</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Vendor Onboarding</span>
                  <span>72%</span>
                </div>
                <Progress value={72} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Revenue Target</span>
                  <span>91%</span>
                </div>
                <Progress value={91} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Customer Satisfaction</span>
                  <span>96%</span>
                </div>
                <Progress value={96} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Users className="w-6 h-6" />
                Manage Users
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Shield className="w-6 h-6" />
                Verify Vendors
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <BarChart3 className="w-6 h-6" />
                View Analytics
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Settings className="w-6 h-6" />
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
