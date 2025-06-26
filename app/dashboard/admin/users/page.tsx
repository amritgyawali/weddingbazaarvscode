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
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  Ban,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building,
  Server,
  Database,
  Activity,
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

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const userStats = [
    {
      title: "Total Users",
      value: "12,456",
      change: "+8.2%",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: "8,234",
      change: "+5.1%",
      icon: <UserCheck className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "New Registrations",
      value: "234",
      change: "+15.3%",
      icon: <UserPlus className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Suspended Users",
      value: "89",
      change: "-5.2%",
      icon: <Ban className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  const userTypes = [
    { name: "Customers", count: 8456, percentage: 68, growth: "+12%" },
    { name: "Vendors", count: 2847, percentage: 23, growth: "+18%" },
    { name: "Admins", count: 45, percentage: 0.4, growth: "+2%" },
    { name: "Support", count: 108, percentage: 0.9, growth: "+5%" },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      role: "customer",
      status: "active",
      joinDate: "2024-08-20",
      lastActive: "2 hours ago",
      location: "Mumbai",
      orders: 3,
      spent: "₹2.4L",
    },
    {
      id: 2,
      name: "Rahul Gupta",
      email: "rahul.gupta@email.com",
      role: "customer",
      status: "active",
      joinDate: "2024-08-18",
      lastActive: "1 day ago",
      location: "Delhi",
      orders: 1,
      spent: "₹1.8L",
    },
    {
      id: 3,
      name: "Capture Moments Studio",
      email: "info@capturemoments.com",
      role: "vendor",
      status: "pending",
      joinDate: "2024-08-15",
      lastActive: "5 hours ago",
      location: "Bangalore",
      orders: 0,
      spent: "₹0",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@weddingbazaar.com",
      role: "admin",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "30 minutes ago",
      location: "Mumbai",
      orders: 0,
      spent: "₹0",
    },
    {
      id: 5,
      name: "Anjali Patel",
      email: "anjali.patel@email.com",
      role: "customer",
      status: "suspended",
      joinDate: "2024-08-10",
      lastActive: "3 days ago",
      location: "Pune",
      orders: 2,
      spent: "₹95K",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/admin", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" />, active: true },
    { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Building className="w-4 h-4" /> },
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "customer":
        return "bg-blue-100 text-blue-800"
      case "vendor":
        return "bg-purple-100 text-purple-800"
      case "admin":
        return "bg-red-100 text-red-800"
      case "support":
        return "bg-orange-100 text-orange-800"
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "customer":
        return <Users className="w-4 h-4" />
      case "vendor":
        return <Building className="w-4 h-4" />
      case "admin":
        return <Shield className="w-4 h-4" />
      case "support":
        return <MessageCircle className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage and monitor platform users</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Users
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userStats.map((stat, index) => (
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">All Users</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>User Types Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userTypes.map((type, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{type.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{type.count}</span>
                          <Badge variant="outline" className="text-xs">{type.growth}</Badge>
                        </div>
                      </div>
                      <Progress value={type.percentage} className="h-2" />
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
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Ban className="w-4 h-4 mr-2" />
                    Manage Suspensions
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Role Management
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    User Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            {getRoleIcon(user.role)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{user.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{user.email}</span>
                              <span>{user.location}</span>
                              <span>Last active: {user.lastActive}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-2">
                            {user.role === 'customer' ? `${user.orders} orders • ${user.spent}` : `Joined: ${user.joinDate}`}
                          </div>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(user.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="customer">Customers</SelectItem>
                      <SelectItem value="vendor">Vendors</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            <div className="grid gap-4">
              {recentUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{user.name}</h3>
                          <p className="text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-500">Joined: {user.joinDate} • Last active: {user.lastActive}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex gap-2 mb-3">
                          <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </div>
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
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Role & Permission Management</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Role
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Customer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">View Profile</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Book Services</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Leave Reviews</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Admin Access</span>
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Vendor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Manage Services</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">View Analytics</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Data</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Admin Access</span>
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">View Tickets</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Support</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Basic Reports</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Config</span>
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Admin
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Full Access</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Management</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Config</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">All Reports</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Daily Active Users</h3>
                  <p className="text-3xl font-bold text-blue-600">8,456</p>
                  <p className="text-sm text-gray-600">+12.5% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">User Retention</h3>
                  <p className="text-3xl font-bold text-green-600">85.3%</p>
                  <p className="text-sm text-gray-600">30-day retention rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Avg Session Time</h3>
                  <p className="text-3xl font-bold text-purple-600">24m 32s</p>
                  <p className="text-sm text-gray-600">+8% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Conversion Rate</h3>
                  <p className="text-3xl font-bold text-orange-600">12.5%</p>
                  <p className="text-sm text-gray-600">Visitor to customer</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth Trends</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>New Registrations</span>
                    <span className="font-semibold">+15.3%</span>
                  </div>
                  <Progress value={85} />

                  <div className="flex justify-between items-center">
                    <span>Account Activations</span>
                    <span className="font-semibold">+22.1%</span>
                  </div>
                  <Progress value={75} />

                  <div className="flex justify-between items-center">
                    <span>Profile Completions</span>
                    <span className="font-semibold">+8.7%</span>
                  </div>
                  <Progress value={65} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Daily Logins</span>
                    <span className="font-semibold">68.2%</span>
                  </div>
                  <Progress value={68} />

                  <div className="flex justify-between items-center">
                    <span>Feature Usage</span>
                    <span className="font-semibold">45.8%</span>
                  </div>
                  <Progress value={46} />

                  <div className="flex justify-between items-center">
                    <span>Support Interactions</span>
                    <span className="font-semibold">12.3%</span>
                  </div>
                  <Progress value={12} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">User Management Tools</h2>
              <p className="text-gray-600">Comprehensive tools to manage and monitor all users on the platform</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 User Management Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Users className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">User Directory</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <UserCheck className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">User Verification</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Ban className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">User Suspension</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <BarChart3 className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">User Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <MessageCircle className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Bulk Messaging</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <UserPlus className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Add Users</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <Shield className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Role Management</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Key className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Permission Control</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <Search className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Advanced Search</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Filter className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Smart Filters</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Download className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Data Export</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Upload className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Bulk Import</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Activity className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Activity Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Bell className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Notification Center</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Lock className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Security Settings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Archive className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">User Archive</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <RefreshCw className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Bulk Operations</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Target className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">User Segmentation</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Database className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Data Management</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Globe className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Global Settings</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
