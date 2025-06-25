"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Calendar,
  Heart,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  Camera,
  MessageCircle,
  Star,
  TrendingUp,
  FileText,
  Gift,
} from "lucide-react"

export function CustomerDashboard() {
  const [weddingDate] = useState(new Date("2024-08-15"))
  const [planningProgress] = useState(68)
  const [budget] = useState({ total: 500000, spent: 340000 })

  const daysUntilWedding = Math.ceil((weddingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const quickStats = [
    {
      title: "Days Until Wedding",
      value: daysUntilWedding.toString(),
      icon: <Calendar className="w-5 h-5" />,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Budget Spent",
      value: `₹${(budget.spent / 1000).toFixed(0)}K`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Vendors Booked",
      value: "8",
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Tasks Completed",
      value: "24/35",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const recentActivity = [
    {
      type: "booking",
      title: "Photographer confirmed booking",
      vendor: "Capture Moments Studio",
      time: "2 hours ago",
      icon: <Camera className="w-4 h-4" />,
    },
    {
      type: "message",
      title: "New message from decorator",
      vendor: "Dream Decorations",
      time: "5 hours ago",
      icon: <MessageCircle className="w-4 h-4" />,
    },
    {
      type: "payment",
      title: "Payment reminder",
      vendor: "Royal Banquet Hall",
      time: "1 day ago",
      icon: <DollarSign className="w-4 h-4" />,
    },
  ]

  const bookedVendors = [
    {
      name: "Royal Banquet Hall",
      category: "Venue",
      status: "confirmed",
      rating: 4.8,
      nextPayment: "₹50,000 due in 15 days",
    },
    {
      name: "Capture Moments Studio",
      category: "Photography",
      status: "confirmed",
      rating: 4.9,
      nextPayment: "₹25,000 due in 30 days",
    },
    {
      name: "Dream Decorations",
      category: "Decoration",
      status: "pending",
      rating: 4.7,
      nextPayment: "Awaiting confirmation",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" />, active: true },
    { label: "My Wedding", href: "/dashboard/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/budget", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/documents", icon: <FileText className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Priya! 💕</h1>
              <p className="text-pink-100 text-lg">Your dream wedding is just {daysUntilWedding} days away!</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{daysUntilWedding}</div>
              <div className="text-pink-200">Days to go</div>
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
          {/* Planning Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Wedding Planning Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">{planningProgress}%</div>
                <Progress value={planningProgress} className="w-full h-3" />
                <p className="text-gray-600 mt-2">You're making great progress!</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">24 Completed</div>
                  <div className="text-sm text-gray-600">Tasks done</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="font-semibold">11 Pending</div>
                  <div className="text-sm text-gray-600">Tasks remaining</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Budget Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{(budget.spent / 1000).toFixed(0)}K / ₹{(budget.total / 1000).toFixed(0)}K
                </div>
                <Progress value={(budget.spent / budget.total) * 100} className="mt-2" />
                <p className="text-sm text-gray-600 mt-2">
                  ₹{((budget.total - budget.spent) / 1000).toFixed(0)}K remaining
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Venue</span>
                  <span>₹150K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Photography</span>
                  <span>₹80K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Decoration</span>
                  <span>₹60K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Catering</span>
                  <span>₹50K</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="p-2 bg-pink-100 rounded-full">
                      <div className="text-pink-600">{activity.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.vendor}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Booked Vendors */}
          <Card>
            <CardHeader>
              <CardTitle>My Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookedVendors.map((vendor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{vendor.name}</h4>
                        <Badge
                          variant={vendor.status === "confirmed" ? "default" : "secondary"}
                          className={vendor.status === "confirmed" ? "bg-green-100 text-green-800" : ""}
                        >
                          {vendor.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{vendor.category}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{vendor.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{vendor.nextPayment}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  </div>
                ))}
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
                Find Vendors
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Calendar className="w-6 h-6" />
                Update Timeline
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Gift className="w-6 h-6" />
                Manage Guest List
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <MessageCircle className="w-6 h-6" />
                Messages
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
