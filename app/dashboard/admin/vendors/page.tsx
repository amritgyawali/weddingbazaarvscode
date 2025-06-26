"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Users,
  FileText,
  Phone,
  Mail,
  MapPin,
  Award,
  Target,
  Zap,
  Shield,
  Briefcase,
  Heart,
  Gift,
  Sparkles,
  Crown,
  Gem,
  Palette,
  Music,
  Video,
  Image,
  Edit,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Plus,
  Eye,
  AlertCircle,
  Bell,
  Bookmark,
  Archive,
  Trash2,
  Copy,
  ExternalLink,
  Maximize,
  Minimize,
  RotateCcw,
  Save,
  Send,
  Printer,
  Scissors,
  Layers,
  Grid,
  List,
  MoreHorizontal,
  Building,
  UserCheck,
  UserX,
  ThumbsUp,
  ThumbsDown,
  Ban,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Activity,
  Database,
  Server,
  Globe,
  Lock,
  Unlock,
  Key,
  Monitor,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Router,
} from "lucide-react"

export default function AdminVendorsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const vendorStats = [
    {
      title: "Total Vendors",
      value: "2,847",
      change: "+12.5%",
      icon: <Building className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Vendors",
      value: "2,456",
      change: "+8.3%",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Approval",
      value: "156",
      change: "+23",
      icon: <Clock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Suspended",
      value: "45",
      change: "-12",
      icon: <Ban className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  const vendorCategories = [
    { name: "Photography", count: 856, percentage: 30, growth: "+15%" },
    { name: "Venues", count: 623, percentage: 22, growth: "+8%" },
    { name: "Catering", count: 445, percentage: 16, growth: "+12%" },
    { name: "Decorations", count: 398, percentage: 14, growth: "+18%" },
    { name: "Music & DJ", count: 287, percentage: 10, growth: "+6%" },
    { name: "Others", count: 238, percentage: 8, growth: "+10%" },
  ]

  const recentVendors = [
    {
      id: 1,
      name: "Capture Moments Studio",
      category: "Photography",
      location: "Mumbai",
      rating: 4.8,
      reviews: 156,
      status: "pending",
      joinDate: "2024-08-20",
      revenue: "₹2.4L",
      bookings: 45,
    },
    {
      id: 2,
      name: "Royal Banquet Hall",
      category: "Venues",
      location: "Delhi",
      rating: 4.9,
      reviews: 89,
      status: "active",
      joinDate: "2024-08-18",
      revenue: "₹8.7L",
      bookings: 23,
    },
    {
      id: 3,
      name: "Delicious Delights",
      category: "Catering",
      location: "Bangalore",
      rating: 4.7,
      reviews: 234,
      status: "active",
      joinDate: "2024-08-15",
      revenue: "₹5.2L",
      bookings: 67,
    },
    {
      id: 4,
      name: "Elegant Decorators",
      category: "Decorations",
      location: "Pune",
      rating: 4.6,
      reviews: 123,
      status: "suspended",
      joinDate: "2024-08-12",
      revenue: "₹1.8L",
      bookings: 34,
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/admin", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Building className="w-4 h-4" />, active: true },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Support", href: "/dashboard/admin/support", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "System", href: "/dashboard/admin/system", icon: <Server className="w-4 h-4" /> },
    { label: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "suspended":
        return <Ban className="w-4 h-4 text-red-600" />
      case "inactive":
        return <XCircle className="w-4 h-4 text-gray-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
            <p className="text-gray-600">Manage and monitor all vendors on the platform</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Vendor
            </Button>
          </div>
        </div>

        {/* Vendor Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendorStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vendors">All Vendors</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Vendor Categories Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vendorCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{category.count}</span>
                          <Badge variant="outline" className="text-xs">{category.growth}</Badge>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Approve Vendors ({156})
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Review Reports ({23})
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Vendor Support
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Vendor Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentVendors.map((vendor) => (
                    <div key={vendor.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Building className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{vendor.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{vendor.category}</span>
                              <span>{vendor.location}</span>
                              <div className="flex items-center gap-1">
                                <div className="flex">{renderStars(Math.floor(vendor.rating))}</div>
                                <span>{vendor.rating} ({vendor.reviews})</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(vendor.status)}
                            <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            Revenue: {vendor.revenue} • Bookings: {vendor.bookings}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search vendors by name, category, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="venues">Venues</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                      <SelectItem value="decorations">Decorations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Vendors List */}
            <div className="grid gap-4">
              {recentVendors.map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Building className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{vendor.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{vendor.category}</span>
                            <span>{vendor.location}</span>
                            <span>Joined: {vendor.joinDate}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <div className="flex">{renderStars(Math.floor(vendor.rating))}</div>
                              <span className="text-sm">{vendor.rating} ({vendor.reviews} reviews)</span>
                            </div>
                            <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600 mb-1">{vendor.revenue}</div>
                        <div className="text-sm text-gray-600 mb-3">{vendor.bookings} bookings</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Pending Vendor Approvals</h2>
              <Badge variant="secondary">{156} pending</Badge>
            </div>

            <div className="grid gap-4">
              {recentVendors.filter(v => v.status === 'pending').map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <Building className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{vendor.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{vendor.category}</span>
                            <span>{vendor.location}</span>
                            <span>Applied: {vendor.joinDate}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                            <span className="text-sm text-gray-600">Documents submitted</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Growth Rate</h3>
                  <p className="text-3xl font-bold text-blue-600">+12.5%</p>
                  <p className="text-sm text-gray-600">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Total Revenue</h3>
                  <p className="text-3xl font-bold text-green-600">₹45.2L</p>
                  <p className="text-sm text-gray-600">All vendors</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Avg Rating</h3>
                  <p className="text-3xl font-bold text-yellow-600">4.7</p>
                  <p className="text-sm text-gray-600">Platform average</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Activity className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Active Rate</h3>
                  <p className="text-3xl font-bold text-purple-600">86.3%</p>
                  <p className="text-sm text-gray-600">Vendor activity</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Top Performers</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <Progress value={15} />

                  <div className="flex justify-between items-center">
                    <span>Good Performers</span>
                    <span className="font-semibold">65%</span>
                  </div>
                  <Progress value={65} />

                  <div className="flex justify-between items-center">
                    <span>Needs Improvement</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <Progress value={20} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vendorCategories.slice(0, 4).map((category, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="font-semibold">₹{(category.count * 1.5).toFixed(1)}L</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Vendor Management Tools</h2>
              <p className="text-gray-600">Comprehensive tools to manage and monitor vendors on the platform</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Vendor Management Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Building className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Vendor Directory</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <UserCheck className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Approval System</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <BarChart3 className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Performance Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Star className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Rating Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Ban className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Suspension Control</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <DollarSign className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Revenue Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <MessageCircle className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Communication Hub</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <FileText className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Document Verification</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <AlertTriangle className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Dispute Resolution</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Search className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Advanced Search</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Filter className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Smart Filters</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Download className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Data Export</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Bell className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Notification Center</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Shield className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Security Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Activity className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Activity Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Target className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Goal Setting</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Award className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Recognition System</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Calendar className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Booking Calendar</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Archive className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Archive Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <RefreshCw className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Bulk Operations</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
