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
  CreditCard,
  Wallet,
  Receipt,
  Calculator,
  PiggyBank,
  Banknote,
  Coins,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react"

export default function AdminFinancePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState("30d")
  const [filterType, setFilterType] = useState("all")

  const financeStats = [
    {
      title: "Total Revenue",
      value: "₹45.2L",
      change: "+18.5%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Commission Earned",
      value: "₹6.8L",
      change: "+22.3%",
      icon: <Wallet className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Payments",
      value: "₹2.4L",
      change: "-12.1%",
      icon: <Clock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Refunds Processed",
      value: "₹85K",
      change: "+5.2%",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  const revenueStreams = [
    { name: "Vendor Commissions", amount: 2850000, percentage: 63, growth: "+18%" },
    { name: "Premium Subscriptions", amount: 980000, percentage: 22, growth: "+25%" },
    { name: "Advertisement Revenue", amount: 450000, percentage: 10, growth: "+12%" },
    { name: "Service Fees", amount: 220000, percentage: 5, growth: "+8%" },
  ]

  const recentTransactions = [
    {
      id: "TXN001",
      type: "commission",
      vendor: "Capture Moments Studio",
      amount: 15000,
      status: "completed",
      date: "2024-08-20",
      method: "Bank Transfer",
    },
    {
      id: "TXN002",
      type: "subscription",
      vendor: "Royal Palace Hotel",
      amount: 5000,
      status: "completed",
      date: "2024-08-20",
      method: "Credit Card",
    },
    {
      id: "TXN003",
      type: "refund",
      vendor: "Elegant Decorators",
      amount: -8500,
      status: "pending",
      date: "2024-08-19",
      method: "Bank Transfer",
    },
    {
      id: "TXN004",
      type: "commission",
      vendor: "Delicious Delights",
      amount: 12000,
      status: "completed",
      date: "2024-08-19",
      method: "UPI",
    },
  ]

  const monthlyData = [
    { month: "Jan", revenue: 2850000, commission: 427500, expenses: 180000 },
    { month: "Feb", revenue: 3200000, commission: 480000, expenses: 195000 },
    { month: "Mar", revenue: 3750000, commission: 562500, expenses: 210000 },
    { month: "Apr", revenue: 4200000, commission: 630000, expenses: 225000 },
    { month: "May", revenue: 4850000, commission: 727500, expenses: 240000 },
    { month: "Jun", revenue: 5200000, commission: 780000, expenses: 255000 },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/admin", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Building className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" />, active: true },
    { label: "Support", href: "/dashboard/admin/support", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "System", href: "/dashboard/admin/system", icon: <Server className="w-4 h-4" /> },
    { label: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "commission":
        return <DollarSign className="w-4 h-4 text-green-600" />
      case "subscription":
        return <CreditCard className="w-4 h-4 text-blue-600" />
      case "refund":
        return <RefreshCw className="w-4 h-4 text-red-600" />
      case "fee":
        return <Receipt className="w-4 h-4 text-purple-600" />
      default:
        return <Wallet className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Finance Management</h1>
            <p className="text-gray-600">Monitor revenue, payments, and financial analytics</p>
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

        {/* Finance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financeStats.map((stat, index) => (
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
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Streams</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {revenueStreams.map((stream, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{stream.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">₹{(stream.amount / 1000).toFixed(0)}K</span>
                          <Badge variant="outline" className="text-xs">{stream.growth}</Badge>
                        </div>
                      </div>
                      <Progress value={stream.percentage} className="h-2" />
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
                    <DollarSign className="w-4 h-4 mr-2" />
                    Process Payments
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Receipt className="w-4 h-4 mr-2" />
                    Generate Invoice
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Process Refunds
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Financial Reports
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{transaction.vendor}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>ID: {transaction.id}</span>
                              <span>{transaction.date}</span>
                              <span>{transaction.method}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search transactions by ID, vendor, or amount..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="commission">Commission</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="refund">Refund</SelectItem>
                      <SelectItem value="fee">Service Fee</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transactions List */}
            <div className="grid gap-4">
              {recentTransactions.map((transaction) => (
                <Card key={transaction.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{transaction.vendor}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>Transaction ID: {transaction.id}</span>
                            <span>Date: {transaction.date}</span>
                            <span>Method: {transaction.method}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{transaction.type}</Badge>
                            <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-2xl font-bold mb-2 ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Receipt
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Monthly Revenue</h3>
                  <p className="text-3xl font-bold text-green-600">₹52L</p>
                  <p className="text-sm text-gray-600">+18.5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Growth Rate</h3>
                  <p className="text-3xl font-bold text-blue-600">+22.3%</p>
                  <p className="text-sm text-gray-600">Year over year</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Wallet className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Commission Rate</h3>
                  <p className="text-3xl font-bold text-purple-600">15%</p>
                  <p className="text-sm text-gray-600">Average commission</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <PiggyBank className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Profit Margin</h3>
                  <p className="text-3xl font-bold text-orange-600">68.4%</p>
                  <p className="text-sm text-gray-600">Net profit margin</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {monthlyData.slice(-3).map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{data.month} 2024</span>
                        <span className="text-sm text-gray-600">₹{(data.revenue / 1000).toFixed(0)}K</span>
                      </div>
                      <Progress value={(data.revenue / 5200000) * 100} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Commission: ₹{(data.commission / 1000).toFixed(0)}K</span>
                        <span>Expenses: ₹{(data.expenses / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Gross Revenue</span>
                    <span className="font-bold text-green-600">₹52,00,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Platform Fees</span>
                    <span className="font-bold text-blue-600">₹7,80,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Operating Expenses</span>
                    <span className="font-bold text-red-600">₹2,55,000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Net Revenue</span>
                    <span className="font-bold text-green-600">₹41,65,000</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Financial Reports</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Revenue Report</h3>
                  <p className="text-sm text-gray-600 mb-4">Comprehensive revenue analysis</p>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Receipt className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Transaction Report</h3>
                  <p className="text-sm text-gray-600 mb-4">Detailed transaction history</p>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <PieChart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Commission Report</h3>
                  <p className="text-sm text-gray-600 mb-4">Vendor commission breakdown</p>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Growth Report</h3>
                  <p className="text-sm text-gray-600 mb-4">Platform growth metrics</p>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calculator className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Tax Report</h3>
                  <p className="text-sm text-gray-600 mb-4">Tax calculations and filings</p>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Custom Report</h3>
                  <p className="text-sm text-gray-600 mb-4">Build your own report</p>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Financial Management Tools</h2>
              <p className="text-gray-600">Comprehensive tools for financial operations and analysis</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Financial Management Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <DollarSign className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Payment Processor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <Receipt className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Invoice Generator</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <BarChart3 className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Revenue Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Calculator className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Tax Calculator</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <RefreshCw className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Refund Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <Wallet className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Wallet Management</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <CreditCard className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Payment Gateway</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <PiggyBank className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Savings Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <TrendingUp className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Growth Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <FileText className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Financial Reports</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Banknote className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Currency Exchange</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Coins className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Commission Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <PieChart className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Expense Analyzer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Target className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Budget Planner</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Clock className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Payment Scheduler</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Shield className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Fraud Detection</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Bell className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Payment Alerts</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Download className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Data Export</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Archive className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Transaction Archive</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Settings className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Financial Settings</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
