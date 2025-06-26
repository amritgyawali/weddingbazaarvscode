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
  UserPlus,
  UserMinus,
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
  PieChart,
  LineChart,
  AreaChart,
  Radar,
  ScatterChart,
  TrendingDown,
  MousePointer,
  Smartphone,
  Laptop,
  Tablet,
  Calendar as CalendarIcon,
} from "lucide-react"

export default function AdminAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState("7d")
  const [metricType, setMetricType] = useState("all")

  const analyticsStats = [
    {
      title: "Total Revenue",
      value: "₹45.2L",
      change: "+18.5%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Platform Users",
      value: "12,456",
      change: "+12.3%",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Vendors",
      value: "2,847",
      change: "+8.7%",
      icon: <Building className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Bookings",
      value: "8,934",
      change: "+25.4%",
      icon: <Calendar className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const trafficSources = [
    { name: "Organic Search", value: 45.2, color: "bg-blue-500" },
    { name: "Direct", value: 28.7, color: "bg-green-500" },
    { name: "Social Media", value: 15.3, color: "bg-purple-500" },
    { name: "Referrals", value: 8.1, color: "bg-orange-500" },
    { name: "Email", value: 2.7, color: "bg-red-500" },
  ]

  const deviceStats = [
    { name: "Mobile", percentage: 68.4, count: "8,523", icon: <Smartphone className="w-5 h-5" /> },
    { name: "Desktop", percentage: 24.7, count: "3,078", icon: <Laptop className="w-5 h-5" /> },
    { name: "Tablet", percentage: 6.9, count: "855", icon: <Tablet className="w-5 h-5" /> },
  ]

  const topPages = [
    { page: "/", views: 15420, bounce: "32.4%", time: "3:24" },
    { page: "/vendors", views: 12350, bounce: "28.7%", time: "4:12" },
    { page: "/services", views: 9870, bounce: "35.1%", time: "2:45" },
    { page: "/about", views: 7650, bounce: "42.3%", time: "2:18" },
    { page: "/contact", views: 5430, bounce: "38.9%", time: "1:56" },
  ]

  const revenueData = [
    { month: "Jan", revenue: 285000, bookings: 1240 },
    { month: "Feb", revenue: 320000, bookings: 1380 },
    { month: "Mar", revenue: 375000, bookings: 1520 },
    { month: "Apr", revenue: 420000, bookings: 1680 },
    { month: "May", revenue: 485000, bookings: 1890 },
    { month: "Jun", revenue: 520000, bookings: 2010 },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/admin", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Building className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" />, active: true },
    { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Support", href: "/dashboard/admin/support", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "System", href: "/dashboard/admin/system", icon: <Server className="w-4 h-4" /> },
    { label: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive platform analytics and insights</p>
          </div>
          <div className="flex gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Analytics Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsStats.map((stat, index) => (
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
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{data.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">₹{(data.revenue / 1000).toFixed(0)}K</span>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(data.revenue / 520000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold">{data.bookings}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{source.name}</span>
                        <span className="text-sm text-gray-600">{source.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${source.color} h-2 rounded-full`}
                          style={{ width: `${source.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Device Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deviceStats.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {device.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{device.name}</h4>
                          <p className="text-sm text-gray-600">{device.count} users</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{device.percentage}%</p>
                        <Progress value={device.percentage} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{page.page}</h4>
                          <p className="text-sm text-gray-600">{page.views.toLocaleString()} views</p>
                        </div>
                        <div className="text-right text-sm">
                          <p>Bounce: {page.bounce}</p>
                          <p>Time: {page.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <MousePointer className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Page Views</h3>
                  <p className="text-3xl font-bold text-blue-600">156.2K</p>
                  <p className="text-sm text-gray-600">+12.5% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Unique Visitors</h3>
                  <p className="text-3xl font-bold text-green-600">45.8K</p>
                  <p className="text-sm text-gray-600">+8.3% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Avg Session</h3>
                  <p className="text-3xl font-bold text-purple-600">3m 24s</p>
                  <p className="text-sm text-gray-600">+15.2% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingDown className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Bounce Rate</h3>
                  <p className="text-3xl font-bold text-orange-600">32.4%</p>
                  <p className="text-sm text-gray-600">-5.1% from last week</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Mumbai</span>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="w-20" />
                      <span className="text-sm font-semibold">35%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delhi</span>
                    <div className="flex items-center gap-2">
                      <Progress value={28} className="w-20" />
                      <span className="text-sm font-semibold">28%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bangalore</span>
                    <div className="flex items-center gap-2">
                      <Progress value={18} className="w-20" />
                      <span className="text-sm font-semibold">18%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pune</span>
                    <div className="flex items-center gap-2">
                      <Progress value={12} className="w-20" />
                      <span className="text-sm font-semibold">12%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Others</span>
                    <div className="flex items-center gap-2">
                      <Progress value={7} className="w-20" />
                      <span className="text-sm font-semibold">7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Real-time Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Active Users</span>
                    <span className="font-bold text-green-600">1,247</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm">Current Sessions</span>
                    <span className="font-bold text-blue-600">892</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm">Page Views/min</span>
                    <span className="font-bold text-purple-600">156</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm">New Visitors</span>
                    <span className="font-bold text-orange-600">34</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Total Revenue</h3>
                  <p className="text-3xl font-bold text-green-600">₹45.2L</p>
                  <p className="text-sm text-gray-600">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Growth Rate</h3>
                  <p className="text-3xl font-bold text-blue-600">+18.5%</p>
                  <p className="text-sm text-gray-600">Month over month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Avg Order Value</h3>
                  <p className="text-3xl font-bold text-purple-600">₹50.6K</p>
                  <p className="text-sm text-gray-600">Per booking</p>
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
                  <CardTitle>Revenue by Category</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Photography</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">₹15.2L</span>
                      <Progress value={34} className="w-20" />
                      <span className="text-sm font-semibold">34%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Venues</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">₹12.8L</span>
                      <Progress value={28} className="w-20" />
                      <span className="text-sm font-semibold">28%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Catering</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">₹9.6L</span>
                      <Progress value={21} className="w-20" />
                      <span className="text-sm font-semibold">21%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Decorations</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">₹7.6L</span>
                      <Progress value={17} className="w-20" />
                      <span className="text-sm font-semibold">17%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {revenueData.slice(-3).map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{data.month} 2024</h4>
                        <p className="text-sm text-gray-600">{data.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₹{(data.revenue / 1000).toFixed(0)}K</p>
                        <p className="text-sm text-gray-600">+{Math.round(Math.random() * 20 + 5)}%</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Page Load Time</h3>
                  <p className="text-3xl font-bold text-yellow-600">1.2s</p>
                  <p className="text-sm text-gray-600">Average load time</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Server className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Server Uptime</h3>
                  <p className="text-3xl font-bold text-green-600">99.9%</p>
                  <p className="text-sm text-gray-600">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">API Response</h3>
                  <p className="text-3xl font-bold text-blue-600">245ms</p>
                  <p className="text-sm text-gray-600">Average response</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Error Rate</h3>
                  <p className="text-3xl font-bold text-red-600">0.02%</p>
                  <p className="text-sm text-gray-600">System errors</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>CPU Usage</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm font-semibold">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Memory Usage</span>
                    <div className="flex items-center gap-2">
                      <Progress value={62} className="w-20" />
                      <span className="text-sm font-semibold">62%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Disk Usage</span>
                    <div className="flex items-center gap-2">
                      <Progress value={38} className="w-20" />
                      <span className="text-sm font-semibold">38%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Network I/O</span>
                    <div className="flex items-center gap-2">
                      <Progress value={28} className="w-20" />
                      <span className="text-sm font-semibold">28%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Experience Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Core Web Vitals</span>
                    <Badge className="bg-green-100 text-green-800">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm">First Contentful Paint</span>
                    <span className="font-bold text-blue-600">0.8s</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm">Largest Contentful Paint</span>
                    <span className="font-bold text-purple-600">1.2s</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm">Cumulative Layout Shift</span>
                    <span className="font-bold text-orange-600">0.05</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Analytics Tools</h2>
              <p className="text-gray-600">Advanced analytics and reporting tools for comprehensive insights</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Analytics Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <BarChart3 className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Data Visualization</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <PieChart className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Chart Builder</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <LineChart className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Trend Analysis</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <TrendingUp className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Growth Metrics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Target className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Goal Tracking</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <Users className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">User Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <DollarSign className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Revenue Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Activity className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Real-time Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <FileText className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Custom Reports</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Download className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Data Export</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Calendar className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Date Range Picker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Filter className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Advanced Filters</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Globe className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Geographic Data</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Smartphone className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Device Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <MousePointer className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Behavior Tracking</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Server className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Performance Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <AlertTriangle className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Error Tracking</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Bell className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Alert System</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Database className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Data Warehouse</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <RefreshCw className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Auto Refresh</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
