"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  DollarSign,
  Camera,
  FileText,
  Download,
  Upload,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Plus,
  RefreshCw,
  Send,
  Eye,
  Star,
  TrendingUp,
} from "lucide-react"

export default function VendorBookingsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const bookings = [
    {
      id: "BK001",
      customer: "Anjali & Vikram",
      event: "Wedding Photography",
      date: "2024-08-15",
      time: "10:00 AM",
      venue: "Royal Palace Hotel",
      status: "confirmed",
      payment: "paid",
      amount: 80000,
      advance: 40000,
      balance: 40000,
      phone: "+91 98765 43210",
      email: "anjali@example.com",
      notes: "Outdoor ceremony, indoor reception",
      services: ["Photography", "Videography", "Drone"],
      timeline: "8 hours coverage",
    },
    {
      id: "BK002",
      customer: "Sneha & Arjun",
      event: "Pre-wedding Shoot",
      date: "2024-09-22",
      time: "4:00 PM",
      venue: "Sunset Gardens",
      status: "pending",
      payment: "advance_paid",
      amount: 35000,
      advance: 15000,
      balance: 20000,
      phone: "+91 87654 32109",
      email: "sneha@example.com",
      notes: "Beach theme preferred",
      services: ["Photography"],
      timeline: "4 hours coverage",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Bookings", href: "/dashboard/vendor/bookings", icon: <Calendar className="w-4 h-4" />, active: true },
    { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: <Mail className="w-4 h-4" /> },
    { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: <Camera className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/vendor/analytics", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Payments", href: "/dashboard/vendor/payments", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Reviews", href: "/dashboard/vendor/reviews", icon: <Star className="w-4 h-4" /> },
    { label: "Profile", href: "/dashboard/vendor/profile", icon: <User className="w-4 h-4" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "advance_paid":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="vendor">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
            <p className="text-gray-600">Manage your wedding bookings and schedules</p>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Booking
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Confirmed</p>
                      <p className="text-2xl font-bold">18</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold">₹12.5L</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bookings List */}
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{booking.customer}</h3>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          <Badge className={getPaymentColor(booking.payment)}>
                            {booking.payment.replace("_", " ")}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Camera className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{booking.event}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              {booking.date} at {booking.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{booking.venue}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{booking.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{booking.email}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-sm">
                            <span className="font-medium">Amount: </span>
                            <span className="text-green-600">₹{booking.amount.toLocaleString()}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Advance: </span>
                            <span>₹{booking.advance.toLocaleString()}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Balance: </span>
                            <span className="text-red-600">₹{booking.balance.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {booking.services.map((service, index) => (
                            <Badge key={index} variant="outline">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive calendar view will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Morning Shoot - Anjali & Vikram</h4>
                      <p className="text-sm text-gray-600">10:00 AM - 2:00 PM</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Evening Reception - Sneha & Arjun</h4>
                      <p className="text-sm text-gray-600">6:00 PM - 11:00 PM</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Contract Template
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Signed Contract
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Contract PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Monthly Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Booking Rate</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Customer Satisfaction</span>
                        <span>4.8/5</span>
                      </div>
                      <Progress value={96} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Revenue Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Photography</span>
                        <span>₹8.5L</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Videography</span>
                        <span>₹3.2L</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Additional Services</span>
                        <span>₹0.8L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 20 Booking Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Calendar className="w-6 h-6 mb-2" />
                <span className="text-sm">Schedule Booking</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Clock className="w-6 h-6 mb-2" />
                <span className="text-sm">Time Tracker</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Send className="w-6 h-6 mb-2" />
                <span className="text-sm">Send Reminder</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <FileText className="w-6 h-6 mb-2" />
                <span className="text-sm">Generate Invoice</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Download className="w-6 h-6 mb-2" />
                <span className="text-sm">Export Data</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-sm">Import Bookings</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <RefreshCw className="w-6 h-6 mb-2" />
                <span className="text-sm">Sync Calendar</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <AlertCircle className="w-6 h-6 mb-2" />
                <span className="text-sm">Conflict Checker</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <DollarSign className="w-6 h-6 mb-2" />
                <span className="text-sm">Payment Tracker</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <User className="w-6 h-6 mb-2" />
                <span className="text-sm">Client Manager</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <MapPin className="w-6 h-6 mb-2" />
                <span className="text-sm">Venue Locator</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Camera className="w-6 h-6 mb-2" />
                <span className="text-sm">Equipment List</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <CheckCircle className="w-6 h-6 mb-2" />
                <span className="text-sm">Checklist</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Mail className="w-6 h-6 mb-2" />
                <span className="text-sm">Email Templates</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Phone className="w-6 h-6 mb-2" />
                <span className="text-sm">Call Scheduler</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Star className="w-6 h-6 mb-2" />
                <span className="text-sm">Review Request</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="text-sm">Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Edit className="w-6 h-6 mb-2" />
                <span className="text-sm">Quick Edit</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Trash2 className="w-6 h-6 mb-2" />
                <span className="text-sm">Bulk Delete</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Filter className="w-6 h-6 mb-2" />
                <span className="text-sm">Advanced Filter</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
