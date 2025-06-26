"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Database,
  Server,
  Activity,
  UserCheck,
  UserX,
  Building,
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
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Headphones,
  Mic,
  Speaker,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Radio,
  Tv,
  Camera as CameraIcon,
  Webcam,
  Gamepad2,
  Joystick,
  Mouse,
  Keyboard,
  Printer as PrinterIcon,
  Scanner,
  Fax,
  Phone as PhoneIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Watch,
  Clock as ClockIcon,
  Timer,
  Stopwatch,
  Alarm,
  Calendar as CalendarIcon,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarClock,
  CalendarHeart,
  CalendarRange,
  CalendarSearch,
} from "lucide-react"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const systemStats = [
    {
      title: "Total Users",
      value: "12,456",
      change: "+8.2%",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Vendors",
      value: "2,847",
      change: "+12.5%",
      icon: <Building className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Revenue",
      value: "₹45.2L",
      change: "+15.3%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "System Health",
      value: "99.8%",
      change: "Excellent",
      icon: <Activity className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  const recentActivities = [
    {
      action: "New vendor registration",
      user: "Capture Moments Studio",
      time: "2 minutes ago",
      type: "vendor",
      status: "pending",
    },
    {
      action: "Payment processed",
      user: "Priya & Rahul",
      time: "5 minutes ago",
      type: "payment",
      status: "completed",
    },
    {
      action: "Review reported",
      user: "Anonymous User",
      time: "10 minutes ago",
      type: "report",
      status: "investigating",
    },
    {
      action: "System backup completed",
      user: "System",
      time: "1 hour ago",
      type: "system",
      status: "completed",
    },
  ]

  const pendingActions = [
    {
      task: "Review vendor applications",
      count: 15,
      priority: "high",
      category: "Vendors",
    },
    {
      task: "Resolve customer complaints",
      count: 8,
      priority: "high",
      category: "Support",
    },
    {
      task: "Approve payment disputes",
      count: 3,
      priority: "medium",
      category: "Finance",
    },
    {
      task: "Update system policies",
      count: 2,
      priority: "low",
      category: "Legal",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/admin", icon: <TrendingUp className="w-4 h-4" />, active: true },
    { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Building className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Support", href: "/dashboard/admin/support", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "System", href: "/dashboard/admin/system", icon: <Server className="w-4 h-4" /> },
    { label: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "investigating":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vendor":
        return <Building className="w-4 h-4" />
      case "payment":
        return <DollarSign className="w-4 h-4" />
      case "report":
        return <AlertCircle className="w-4 h-4" />
      case "system":
        return <Server className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🛡️</h1>
              <p className="text-blue-100 text-lg">
                Monitor and manage the WeddingBazaar platform
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">99.8%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* System Health */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    System Health Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Server className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold">Online</div>
                      <div className="text-sm text-gray-600">All Servers</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold">Healthy</div>
                      <div className="text-sm text-gray-600">Database</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-semibold">Fast</div>
                      <div className="text-sm text-gray-600">CDN</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">CPU Usage</span>
                        <span className="text-sm text-gray-600">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Memory Usage</span>
                        <span className="text-sm text-gray-600">62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Storage Usage</span>
                        <span className="text-sm text-gray-600">38%</span>
                      </div>
                      <Progress value={38} className="h-2" />
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
                    <UserCheck className="w-4 h-4 mr-2" />
                    Approve Vendors
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Review Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Activities</CardTitle>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              {getTypeIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{activity.action}</h4>
                              <p className="text-sm text-gray-600">{activity.user}</p>
                              <p className="text-sm text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Actions */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pending Actions</CardTitle>
                    <Badge variant="secondary">{pendingActions.reduce((sum, action) => sum + action.count, 0)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingActions.map((action, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{action.task}</h4>
                            <p className="text-sm text-gray-600">{action.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{action.count}</Badge>
                            <Badge className={getPriorityColor(action.priority)}>{action.priority}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Daily Active Users</p>
                      <p className="text-2xl font-bold">8,456</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New Registrations</p>
                      <p className="text-2xl font-bold">234</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue Today</p>
                      <p className="text-2xl font-bold">₹2.4L</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <MessageCircle className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>User growth chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Commission Revenue</span>
                      <span className="font-semibold">₹32.5L</span>
                    </div>
                    <Progress value={72} />

                    <div className="flex justify-between items-center">
                      <span>Subscription Revenue</span>
                      <span className="font-semibold">₹8.2L</span>
                    </div>
                    <Progress value={18} />

                    <div className="flex justify-between items-center">
                      <span>Advertisement Revenue</span>
                      <span className="font-semibold">₹4.5L</span>
                    </div>
                    <Progress value={10} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">User Management</h3>
                  <p className="text-sm text-gray-600 mb-4">12,456 total users</p>
                  <Button className="w-full">Manage Users</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Building className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Vendor Management</h3>
                  <p className="text-sm text-gray-600 mb-4">2,847 active vendors</p>
                  <Button className="w-full">Manage Vendors</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Support Tickets</h3>
                  <p className="text-sm text-gray-600 mb-4">12 open tickets</p>
                  <Button className="w-full">View Tickets</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Financial Management</h3>
                  <p className="text-sm text-gray-600 mb-4">₹45.2L total revenue</p>
                  <Button className="w-full">View Finance</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Security Center</h3>
                  <p className="text-sm text-gray-600 mb-4">All systems secure</p>
                  <Button className="w-full">Security Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Analytics & Reports</h3>
                  <p className="text-sm text-gray-600 mb-4">Detailed insights</p>
                  <Button className="w-full">View Analytics</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Admin Management Tools</h2>
              <p className="text-gray-600">Comprehensive tools to manage the WeddingBazaar platform</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Admin Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Users className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">User Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <Building className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Vendor Control</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <BarChart3 className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Analytics Hub</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <DollarSign className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Finance Center</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Shield className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Security Panel</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <Server className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">System Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <Database className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Database Admin</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <MessageCircle className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Support Desk</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <Settings className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">System Config</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Activity className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Activity Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Globe className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">CDN Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Lock className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Access Control</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Bell className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Alert System</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Archive className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Backup Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Monitor className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Performance</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <FileText className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Log Viewer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Key className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">API Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Wifi className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Network Tools</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <HardDrive className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Storage Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Target className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">System Health</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
