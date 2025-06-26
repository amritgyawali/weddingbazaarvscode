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
  CreditCard,
  Wallet,
  Receipt,
  PiggyBank,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  Banknote,
  Coins,
  HandCoins,
  CircleDollarSign,
} from "lucide-react"

export default function VendorPaymentsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const paymentStats = [
    {
      title: "Total Revenue",
      value: "₹12,45,000",
      change: "+15%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Payments",
      value: "₹2,85,000",
      change: "-8%",
      icon: <Clock className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "This Month",
      value: "₹1,25,000",
      change: "+12%",
      icon: <Calendar className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Average Deal",
      value: "₹85,000",
      change: "+5%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const recentTransactions = [
    {
      id: "TXN001",
      client: "Anjali & Vikram",
      amount: 80000,
      type: "advance",
      status: "completed",
      date: "2024-08-15",
      method: "Bank Transfer",
      invoice: "INV-2024-001",
    },
    {
      id: "TXN002",
      client: "Sneha & Arjun",
      amount: 35000,
      type: "full_payment",
      status: "pending",
      date: "2024-08-20",
      method: "UPI",
      invoice: "INV-2024-002",
    },
    {
      id: "TXN003",
      client: "Priya & Rahul",
      amount: 120000,
      type: "final_payment",
      status: "completed",
      date: "2024-08-18",
      method: "Cheque",
      invoice: "INV-2024-003",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/vendor", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Bookings", href: "/dashboard/vendor/bookings", icon: <Calendar className="w-4 h-4" /> },
    { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: <Camera className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/vendor/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Payments", href: "/dashboard/vendor/payments", icon: <DollarSign className="w-4 h-4" />, active: true },
    { label: "Reviews", href: "/dashboard/vendor/reviews", icon: <Star className="w-4 h-4" /> },
    { label: "Profile", href: "/dashboard/vendor/profile", icon: <Settings className="w-4 h-4" /> },
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "advance":
        return "bg-blue-100 text-blue-800"
      case "full_payment":
        return "bg-green-100 text-green-800"
      case "final_payment":
        return "bg-purple-100 text-purple-800"
      case "refund":
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
            <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
            <p className="text-gray-600">Track and manage your wedding business payments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment
            </Button>
          </div>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentStats.map((stat, index) => (
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.client}</p>
                            <p className="text-sm text-gray-600">{transaction.method} • {transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">₹{transaction.amount.toLocaleString()}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                            <Badge className={getTypeColor(transaction.type)}>{transaction.type.replace("_", " ")}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Received</span>
                    <span className="font-semibold text-green-600">₹9,60,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="font-semibold text-orange-600">₹2,85,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Overdue</span>
                    <span className="font-semibold text-red-600">₹45,000</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Outstanding</span>
                    <span className="font-bold text-lg">₹3,30,000</span>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Collection Rate</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span>Bank Transfer</span>
                      </div>
                      <span className="font-semibold">65%</span>
                    </div>
                    <Progress value={65} />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-green-600" />
                        <span>UPI</span>
                      </div>
                      <span className="font-semibold">25%</span>
                    </div>
                    <Progress value={25} />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-purple-600" />
                        <span>Cheque</span>
                      </div>
                      <span className="font-semibold">10%</span>
                    </div>
                    <Progress value={10} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>August 2024</span>
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 font-semibold">₹1,25,000</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>July 2024</span>
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 font-semibold">₹1,15,000</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>June 2024</span>
                      <div className="flex items-center gap-2">
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                        <span className="text-red-600 font-semibold">₹95,000</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>May 2024</span>
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 font-semibold">₹1,05,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search transactions..."
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
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
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
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{transaction.client}</h3>
                          <p className="text-sm text-gray-600">Invoice: {transaction.invoice}</p>
                          <p className="text-sm text-gray-500">{transaction.method} • {transaction.date}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₹{transaction.amount.toLocaleString()}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                          <Badge className={getTypeColor(transaction.type)}>{transaction.type.replace("_", " ")}</Badge>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Invoice Management</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Total Invoices</h3>
                  <p className="text-3xl font-bold text-blue-600">156</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Paid Invoices</h3>
                  <p className="text-3xl font-bold text-green-600">142</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Pending Invoices</h3>
                  <p className="text-3xl font-bold text-orange-600">14</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.invoice}</p>
                          <p className="text-sm text-gray-600">{transaction.client}</p>
                          <p className="text-sm text-gray-500">Due: {transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{transaction.amount.toLocaleString()}</p>
                        <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Payment Time</p>
                      <p className="text-2xl font-bold">12 days</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                      <p className="text-2xl font-bold">78%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Late Payments</p>
                      <p className="text-2xl font-bold">8%</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Refund Rate</p>
                      <p className="text-2xl font-bold">2%</p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Service Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Wedding Photography</span>
                      <span className="font-semibold">₹8,50,000</span>
                    </div>
                    <Progress value={68} />

                    <div className="flex justify-between items-center">
                      <span>Pre-wedding Shoots</span>
                      <span className="font-semibold">₹2,50,000</span>
                    </div>
                    <Progress value={20} />

                    <div className="flex justify-between items-center">
                      <span>Event Photography</span>
                      <span className="font-semibold">₹1,45,000</span>
                    </div>
                    <Progress value={12} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Payment analytics chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-gray-600">HDFC Bank - ****1234</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">UPI</p>
                        <p className="text-sm text-gray-600">photographer@upi</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Invoice Prefix</label>
                    <Input defaultValue="INV-2024-" className="mt-1" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Payment Terms (Days)</label>
                    <Input defaultValue="30" type="number" className="mt-1" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Late Fee (%)</label>
                    <Input defaultValue="2" type="number" className="mt-1" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Tax Rate (%)</label>
                    <Input defaultValue="18" type="number" className="mt-1" />
                  </div>

                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Received</p>
                      <p className="text-sm text-gray-600">Get notified when payments are received</p>
                    </div>
                    <Button size="sm" variant="outline">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Overdue</p>
                      <p className="text-sm text-gray-600">Get notified when payments are overdue</p>
                    </div>
                    <Button size="sm" variant="outline">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Invoice Sent</p>
                      <p className="text-sm text-gray-600">Get notified when invoices are sent</p>
                    </div>
                    <Button size="sm" variant="outline">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Payment Management Tools</h2>
              <p className="text-gray-600">Advanced tools to streamline your payment processes</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Payment Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <DollarSign className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Payment Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <FileText className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Invoice Generator</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <Calculator className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Tax Calculator</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Bell className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Payment Reminders</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <AlertCircle className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Overdue Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <Receipt className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Receipt Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <CreditCard className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Payment Gateway</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Banknote className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Cash Flow</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <PiggyBank className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Savings Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <TrendingUp className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Revenue Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Download className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Export Data</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Upload className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Import Payments</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <RefreshCw className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Auto Sync</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Send className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Bulk Invoicing</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Coins className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Currency Converter</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <HandCoins className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Payment Plans</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <CircleDollarSign className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Pricing Calculator</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Archive className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Payment Archive</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Shield className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Fraud Protection</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <BarChart3 className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Financial Reports</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
