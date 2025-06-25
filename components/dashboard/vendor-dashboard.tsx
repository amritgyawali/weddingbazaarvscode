"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  MessageCircle,
  Camera,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
} from "lucide-react"

export function VendorDashboard() {
  const [monthlyRevenue] = useState(125000)
  const [bookingsThisMonth] = useState(12)
  const [averageRating] = useState(4.8)
  const [responseRate] = useState(95)

  const quickStats = [
    {
      title: "Monthly Revenue",
      value: `₹${(monthlyRevenue / 1000).toFixed(0)}K`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+12%",
    },
    {
      title: "Bookings",
      value: bookingsThisMonth.toString(),
      icon: <Calendar className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+8%",
    },
    {
      title: "Average Rating",
      value: averageRating.toString(),
      icon: <Star className="w-5 h-5" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "+0.2",
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      icon: <MessageCircle className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+3%",
    },
  ]

  const recentInquiries = [
    {
      customer: "Anjali & Vikram",
      event: "Wedding Photography",
      date: "Aug 15, 2024",
      budget: "₹80,000",
      status: "new",
      time: "2 hours ago",
    },
    {
      customer: "Sneha & Arjun",
      event: "Pre-wedding Shoot",
      date: "Sep 22, 2024",
      budget: "₹35,000",
      status: "responded",
      time: "5 hours ago",
    },
    {
      customer: "Kavya & Rohit",
      event: "Wedding + Reception",
      date: "Oct 10, 2024",
      budget: "₹1,20,000",
      status: "quoted",
      time: "1 day ago",
    },
  ]

  const upcomingBookings = [
    {
      customer: "Priya & Rahul",
      event: "Wedding Photography",
      date: "July 28, 2024",
      time: "10:00 AM",
      venue: "Royal Banquet Hall",
      status: "confirmed",
      payment: "Paid",
    },
    {
      customer: "Meera & Karan",
      event: "Engagement Shoot",
      date: "Aug 5, 2024",
      time: "4:00 PM",
      venue: "Sunset Gardens",
      status: "confirmed",
      payment: "Pending",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" />, active: true },
    { label: "Bookings", href: "/dashboard/bookings", icon: <Calendar className="w-4 h-4" /> },
    { label: "Inquiries", href: "/dashboard/inquiries", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "Portfolio", href: "/dashboard/portfolio", icon: <Camera className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Payments", href: "/dashboard/payments", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Reviews", href: "/dashboard/reviews", icon: <Star className="w-4 h-4" /> },
    { label: "Profile", href: "/dashboard/profile", icon: <Settings className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="vendor">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Capture Moments Studio! 📸</h1>
              <p className="text-blue-100 text-lg">
                You have {recentInquiries.filter((i) => i.status === "new").length} new inquiries waiting for your
                response
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{bookingsThisMonth}</div>
              <div className="text-blue-200">This Month</div>
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
          {/* Performance Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">85%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">2.5 hrs</div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold">4.8/5</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Monthly Progress</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Bookings Target</span>
                      <span>12/15</span>
                    </div>
                    <Progress value={80} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Revenue Target</span>
                      <span>₹125K/₹150K</span>
                    </div>
                    <Progress value={83} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Respond to Inquiries
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Update Calendar
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Upload Portfolio
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Inquiries</CardTitle>
                <Badge variant="secondary">{recentInquiries.filter((i) => i.status === "new").length} New</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInquiries.map((inquiry, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{inquiry.customer}</h4>
                          <Badge
                            variant={inquiry.status === "new" ? "default" : "secondary"}
                            className={
                              inquiry.status === "new"
                                ? "bg-red-100 text-red-800"
                                : inquiry.status === "responded"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{inquiry.event}</p>
                        <p className="text-sm text-gray-500">
                          {inquiry.date} • Budget: {inquiry.budget}
                        </p>
                        <p className="text-xs text-gray-400">{inquiry.time}</p>
                      </div>
                      <Button size="sm" variant={inquiry.status === "new" ? "default" : "outline"}>
                        {inquiry.status === "new" ? "Respond" : "View"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBookings.map((booking, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{booking.customer}</h4>
                          <Badge
                            variant={booking.status === "confirmed" ? "default" : "secondary"}
                            className="bg-green-100 text-green-800"
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{booking.event}</p>
                        <p className="text-sm text-gray-500">
                          {booking.date} at {booking.time}
                        </p>
                        <p className="text-sm text-gray-500">{booking.venue}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={booking.payment === "Paid" ? "default" : "secondary"}
                            className={
                              booking.payment === "Paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }
                          >
                            {booking.payment}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <p>Revenue chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
