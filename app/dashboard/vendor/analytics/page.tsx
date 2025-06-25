"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  DollarSign,
  Users,
  Eye,
  Heart,
  Share2,
  Star,
  MessageCircle,
  Clock,
  Target,
  Award,
  Zap,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Search,
  Plus,
  ArrowUp,
  ArrowDown,
  Activity,
  Globe,
} from "lucide-react"

export default function VendorAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const analyticsData = {
    revenue: {
      current: 125000,
      previous: 98000,
      change: 27.6,
      trend: "up",
    },
    bookings: {
      current: 24,
      previous: 18,
      change: 33.3,
      trend: "up",
    },
    inquiries: {
      current: 89,
      previous: 76,
      change: 17.1,
      trend: "up",
    },
    conversion: {
      current: 68.5,
      previous: 62.3,
      change: 6.2,
      trend: "up",
    },
  }

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Bookings", href: "/dashboard/vendor/bookings", icon: <Calendar className="w-4 h-4" /> },
    { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: <Eye className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/vendor/analytics", icon: <BarChart3 className="w-4 h-4" />, active: true },
    { label: "Payments", href: "/dashboard/vendor/payments", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Reviews", href: "/dashboard/vendor/reviews", icon: <Star className="w-4 h-4" /> },
    { label: "Profile", href: "/dashboard/vendor/profile", icon: <Users className="w-4 h-4" /> },
  ]

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600"
  }

  const getChangeIcon = (trend: string) => {
    return trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="vendor">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your business performance and insights</p>
          </div>
          <div className="flex gap-2">
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
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold">₹{(analyticsData.revenue.current / 1000).toFixed(0)}K</p>
                      <div
                        className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.revenue.change)}`}
                      >
                        {getChangeIcon(analyticsData.revenue.trend)}
                        <span>{analyticsData.revenue.change}%</span>
                      </div>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Bookings</p>
                      <p className="text-2xl font-bold">{analyticsData.bookings.current}</p>
                      <div
                        className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.bookings.change)}`}
                      >
                        {getChangeIcon(analyticsData.bookings.trend)}
                        <span>{analyticsData.bookings.change}%</span>
                      </div>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Inquiries</p>
                      <p className="text-2xl font-bold">{analyticsData.inquiries.current}</p>
                      <div
                        className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.inquiries.change)}`}
                      >
                        {getChangeIcon(analyticsData.inquiries.trend)}
                        <span>{analyticsData.inquiries.change}%</span>
                      </div>
                    </div>
                    <MessageCircle className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conversion</p>
                      <p className="text-2xl font-bold">{analyticsData.conversion.current}%</p>
                      <div
                        className={`flex items-center gap-1 text-sm ${getChangeColor(analyticsData.conversion.change)}`}
                      >
                        {getChangeIcon(analyticsData.conversion.trend)}
                        <span>{analyticsData.conversion.change}%</span>
                      </div>
                    </div>
                    <Target className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5" />
                    Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <LineChart className="w-12 h-12 mx-auto mb-2" />
                      <p>Revenue trend chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Booking Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Website</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20" />
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Social Media</span>
                      <div className="flex items-center gap-2">
                        <Progress value={30} className="w-20" />
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Referrals</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-20" />
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">2.5h</div>
                    <p className="text-sm text-gray-600">Average response time</p>
                    <div className="mt-4">
                      <Progress value={85} />
                      <p className="text-xs text-gray-500 mt-1">85% within 4 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Customer Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">4.8</div>
                    <p className="text-sm text-gray-600">Average rating</p>
                    <div className="mt-4">
                      <Progress value={96} />
                      <p className="text-xs text-gray-500 mt-1">Based on 127 reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">68%</div>
                    <p className="text-sm text-gray-600">Inquiry to booking</p>
                    <div className="mt-4">
                      <Progress value={68} />
                      <p className="text-xs text-gray-500 mt-1">Industry avg: 45%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Detailed revenue chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Photography</span>
                      <span className="font-medium">₹85K</span>
                    </div>
                    <Progress value={68} />

                    <div className="flex justify-between items-center">
                      <span>Videography</span>
                      <span className="font-medium">₹32K</span>
                    </div>
                    <Progress value={26} />

                    <div className="flex justify-between items-center">
                      <span>Additional</span>
                      <span className="font-medium">₹8K</span>
                    </div>
                    <Progress value={6} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Booking Conversion Rate</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Customer Retention</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Response Rate</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <Progress value={95} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Portfolio Engagement</span>
                        <span className="font-medium">8.5%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Revenue Target</span>
                        <span className="font-medium">₹125K / ₹150K</span>
                      </div>
                      <Progress value={83} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Booking Target</span>
                        <span className="font-medium">24 / 30</span>
                      </div>
                      <Progress value={80} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>New Clients</span>
                        <span className="font-medium">18 / 20</span>
                      </div>
                      <Progress value={90} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Portfolio Updates</span>
                        <span className="font-medium">12 / 15</span>
                      </div>
                      <Progress value={80} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <span>Website Traffic</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">2,450</div>
                        <div className="text-sm text-green-600">+12%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-pink-600" />
                        <span>Social Engagement</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">1,890</div>
                        <div className="text-sm text-green-600">+8%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Share2 className="w-5 h-5 text-purple-600" />
                        <span>Portfolio Shares</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">456</div>
                        <div className="text-sm text-green-600">+15%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lead Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <PieChart className="w-12 h-12 mx-auto mb-2" />
                      <p>Lead sources pie chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Available Reports</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Revenue Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Booking Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Customer Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Activity className="w-4 h-4 mr-2" />
                        Performance Report
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Custom Report</h4>
                    <div className="space-y-3">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revenue">Revenue Analysis</SelectItem>
                          <SelectItem value="booking">Booking Analysis</SelectItem>
                          <SelectItem value="customer">Customer Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="w-full">Generate Report</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 20 Analytics Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <BarChart3 className="w-6 h-6 mb-2" />
                <span className="text-sm">Revenue Chart</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <LineChart className="w-6 h-6 mb-2" />
                <span className="text-sm">Trend Analysis</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <PieChart className="w-6 h-6 mb-2" />
                <span className="text-sm">Source Breakdown</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Target className="w-6 h-6 mb-2" />
                <span className="text-sm">Goal Tracker</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Activity className="w-6 h-6 mb-2" />
                <span className="text-sm">Performance</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Clock className="w-6 h-6 mb-2" />
                <span className="text-sm">Time Tracker</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Users className="w-6 h-6 mb-2" />
                <span className="text-sm">Customer Insights</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Globe className="w-6 h-6 mb-2" />
                <span className="text-sm">Traffic Analysis</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Heart className="w-6 h-6 mb-2" />
                <span className="text-sm">Engagement</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Share2 className="w-6 h-6 mb-2" />
                <span className="text-sm">Social Metrics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Download className="w-6 h-6 mb-2" />
                <span className="text-sm">Export Data</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <RefreshCw className="w-6 h-6 mb-2" />
                <span className="text-sm">Auto Refresh</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Filter className="w-6 h-6 mb-2" />
                <span className="text-sm">Data Filter</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Search className="w-6 h-6 mb-2" />
                <span className="text-sm">Search Data</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Settings className="w-6 h-6 mb-2" />
                <span className="text-sm">Configure</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Award className="w-6 h-6 mb-2" />
                <span className="text-sm">Benchmarks</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Zap className="w-6 h-6 mb-2" />
                <span className="text-sm">Quick Insights</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Plus className="w-6 h-6 mb-2" />
                <span className="text-sm">Custom Widget</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Eye className="w-6 h-6 mb-2" />
                <span className="text-sm">View Builder</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="text-sm">Forecast</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
