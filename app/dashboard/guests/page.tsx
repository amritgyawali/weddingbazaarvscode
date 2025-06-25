"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Users,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Gift,
  Heart,
  Search,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  MessageCircle,
  Settings,
  Eye,
  Target,
  BarChart3,
} from "lucide-react"

export default function GuestListPage() {
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit@example.com",
      phone: "+91 9876543210",
      category: "Family",
      side: "Bride",
      rsvp: "confirmed",
      plusOne: true,
      address: "Mumbai, Maharashtra",
      dietary: "Vegetarian",
      table: "Table 1",
    },
    {
      id: 2,
      name: "Priya Gupta",
      email: "priya@example.com",
      phone: "+91 9876543211",
      category: "Friends",
      side: "Groom",
      rsvp: "pending",
      plusOne: false,
      address: "Delhi, India",
      dietary: "Non-Vegetarian",
      table: "Table 5",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 9876543212",
      category: "Colleagues",
      side: "Bride",
      rsvp: "declined",
      plusOne: true,
      address: "Bangalore, Karnataka",
      dietary: "Jain",
      table: "Table 8",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterRSVP, setFilterRSVP] = useState("all")

  const guestStats = {
    total: guests.length,
    confirmed: guests.filter((g) => g.rsvp === "confirmed").length,
    pending: guests.filter((g) => g.rsvp === "pending").length,
    declined: guests.filter((g) => g.rsvp === "declined").length,
  }

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "My Wedding", href: "/dashboard/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/budget", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/guests", icon: <Users className="w-4 h-4" />, active: true },
    { label: "Timeline", href: "/dashboard/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/documents", icon: <Gift className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Guest List Management 👥</h1>
          <p className="text-purple-100">Manage invitations, RSVPs, and seating arrangements</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="guests">Guest List</TabsTrigger>
            <TabsTrigger value="rsvp">RSVP Tracking</TabsTrigger>
            <TabsTrigger value="seating">Seating Plan</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Guests</p>
                      <p className="text-2xl font-bold">{guestStats.total}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Confirmed</p>
                      <p className="text-2xl font-bold text-green-600">{guestStats.confirmed}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">{guestStats.pending}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Declined</p>
                      <p className="text-2xl font-bold text-red-600">{guestStats.declined}</p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Guest Management Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Guest Importer",
                "RSVP Tracker",
                "Seating Planner",
                "Invitation Designer",
                "Guest Categories",
                "Contact Manager",
                "Dietary Tracker",
                "Plus One Manager",
                "Address Book",
                "Guest Analytics",
                "RSVP Reminders",
                "Guest Communication",
                "Table Assignments",
                "Guest Preferences",
                "Attendance Tracker",
                "Guest Check-in",
                "Name Tags",
                "Guest Gifts",
                "Thank You Cards",
                "Guest Feedback",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Guest List Tab */}
          <TabsContent value="guests" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search guests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="friends">Friends</SelectItem>
                      <SelectItem value="colleagues">Colleagues</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterRSVP} onValueChange={setFilterRSVP}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="RSVP Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Guest
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Guest List Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Guest List</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">
                          <Checkbox />
                        </th>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Contact</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">RSVP</th>
                        <th className="text-left p-4">Table</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.map((guest) => (
                        <tr key={guest.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <Checkbox />
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{guest.name}</div>
                              <div className="text-sm text-gray-600">{guest.side} Side</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {guest.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {guest.phone}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary">{guest.category}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={
                                guest.rsvp === "confirmed"
                                  ? "default"
                                  : guest.rsvp === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {guest.rsvp}
                            </Badge>
                          </td>
                          <td className="p-4">{guest.table}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Guest Management Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Bulk Actions",
                "Guest Editor",
                "Contact Sync",
                "Duplicate Finder",
                "Guest Merger",
                "Category Manager",
                "Side Assignment",
                "Plus One Tracker",
                "Dietary Manager",
                "Address Validator",
                "Guest Importer",
                "Excel Integration",
                "CSV Export",
                "Guest Templates",
                "Bulk Messaging",
                "Guest Sorter",
                "Advanced Filter",
                "Guest Search",
                "Contact Cards",
                "Guest Backup",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <UserPlus className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* RSVP Tracking Tab */}
          <TabsContent value="rsvp" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>RSVP Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium">Confirmed</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">{guestStats.confirmed}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium">Pending</span>
                      </div>
                      <span className="text-2xl font-bold text-yellow-600">{guestStats.pending}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="font-medium">Declined</span>
                      </div>
                      <span className="text-2xl font-bold text-red-600">{guestStats.declined}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>RSVP Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Send RSVP Reminders
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Follow Up Pending
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export RSVP Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    RSVP Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    RSVP Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* RSVP Management Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "RSVP Tracker",
                "Response Manager",
                "Reminder System",
                "Follow-up Tool",
                "RSVP Analytics",
                "Response Forms",
                "RSVP Website",
                "Mobile RSVP",
                "QR Code RSVP",
                "RSVP Deadlines",
                "Response Tracking",
                "RSVP Reports",
                "Guest Responses",
                "RSVP Automation",
                "Response Alerts",
                "RSVP Dashboard",
                "Response History",
                "RSVP Templates",
                "Response Validation",
                "RSVP Integration",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Seating Plan Tab */}
          <TabsContent value="seating" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Seating Arrangement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Interactive Seating Chart</p>
                      <p className="text-sm text-gray-500">Drag and drop guests to arrange tables</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Table Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { table: "Table 1", seats: 8, assigned: 6 },
                    { table: "Table 2", seats: 8, assigned: 8 },
                    { table: "Table 3", seats: 10, assigned: 7 },
                    { table: "Table 4", seats: 8, assigned: 5 },
                    { table: "Table 5", seats: 8, assigned: 8 },
                  ].map((table, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{table.table}</div>
                        <div className="text-sm text-gray-600">
                          {table.assigned}/{table.seats} seats
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Table
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Seating Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Seating Planner",
                "Table Designer",
                "Seat Assignments",
                "Seating Chart",
                "Table Layout",
                "Guest Placement",
                "Seating Rules",
                "Table Optimizer",
                "Seating Analytics",
                "Chart Generator",
                "Seating Templates",
                "Table Manager",
                "Seat Tracker",
                "Seating Validator",
                "Chart Printer",
                "Seating Export",
                "Table Cards",
                "Seat Labels",
                "Seating Report",
                "Chart Backup",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Target className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Invitations Tab */}
          <TabsContent value="invitations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invitation Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                      >
                        <Mail className="w-8 h-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Custom Invitation
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invitation Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Sent</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">45</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Pending</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-600">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Viewed</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">38</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Invitation Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Invitation Designer",
                "Template Library",
                "Custom Creator",
                "Invitation Sender",
                "Delivery Tracker",
                "RSVP Integration",
                "Digital Invites",
                "Print Manager",
                "Invitation Analytics",
                "Response Tracking",
                "Invitation Templates",
                "Design Tools",
                "Text Editor",
                "Image Upload",
                "Color Schemes",
                "Font Selection",
                "Layout Designer",
                "Preview Mode",
                "Batch Sending",
                "Invitation Backup",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Mail className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Guest Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>RSVP Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Guest Analytics",
                "RSVP Insights",
                "Attendance Trends",
                "Response Patterns",
                "Guest Demographics",
                "Category Analysis",
                "Geographic Distribution",
                "Response Timeline",
                "Invitation Performance",
                "Engagement Metrics",
                "Guest Behavior",
                "Response Rates",
                "Attendance Forecast",
                "Guest Insights",
                "RSVP Analytics",
                "Performance Dashboard",
                "Guest Reports",
                "Analytics Export",
                "Trend Analysis",
                "Data Visualization",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <BarChart3 className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
