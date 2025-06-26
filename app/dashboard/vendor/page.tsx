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
} from "lucide-react"

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [monthlyRevenue] = useState(125000)
  const [bookingsThisMonth] = useState(12)
  const [averageRating] = useState(4.8)
  const [responseRate] = useState(95)

  const quickStats = [
    {
      title: "Total Revenue",
      value: `₹${monthlyRevenue.toLocaleString()}`,
      change: "+12%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Bookings",
      value: bookingsThisMonth,
      change: "+8%",
      icon: <Calendar className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Average Rating",
      value: averageRating,
      change: "+0.2",
      icon: <Star className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      change: "+5%",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const recentInquiries = [
    {
      customer: "Priya & Rahul",
      service: "Wedding Photography",
      date: "2024-08-20",
      status: "new",
      budget: "₹80,000",
      location: "Mumbai",
    },
    {
      customer: "Anjali & Vikram",
      service: "Pre-wedding Shoot",
      date: "2024-09-15",
      status: "responded",
      budget: "₹35,000",
      location: "Goa",
    },
    {
      customer: "Sneha & Arjun",
      service: "Wedding Videography",
      date: "2024-10-05",
      status: "quoted",
      budget: "₹1,20,000",
      location: "Delhi",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/vendor", icon: <TrendingUp className="w-4 h-4" />, active: true },
    { label: "Bookings", href: "/dashboard/vendor/bookings", icon: <Calendar className="w-4 h-4" /> },
    { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: <Camera className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/vendor/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Payments", href: "/dashboard/vendor/payments", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Reviews", href: "/dashboard/vendor/reviews", icon: <Star className="w-4 h-4" /> },
    { label: "Profile", href: "/dashboard/vendor/profile", icon: <Settings className="w-4 h-4" /> },
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
                      <div className="text-sm text-gray-600">Avg Response Time</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-semibold">156</div>
                      <div className="text-sm text-gray-600">Total Clients</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Monthly Goal Progress</span>
                        <span className="text-sm text-gray-600">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Client Satisfaction</span>
                        <span className="text-sm text-gray-600">4.8/5</span>
                      </div>
                      <Progress value={96} className="h-2" />
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
                                    ? "bg-green-100 text-green-800"
                                    : inquiry.status === "responded"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {inquiry.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{inquiry.service}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {inquiry.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {inquiry.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {inquiry.budget}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New booking confirmed</p>
                        <p className="text-xs text-gray-500">Anjali & Vikram - Wedding Photography</p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment received</p>
                        <p className="text-xs text-gray-500">₹40,000 advance payment</p>
                        <p className="text-xs text-gray-400">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New review received</p>
                        <p className="text-xs text-gray-500">5-star review from Priya & Rahul</p>
                        <p className="text-xs text-gray-400">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">₹1,25,000</div>
                  <div className="text-sm text-gray-600">+12% from last month</div>
                  <Progress value={75} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Booking Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
                  <div className="text-sm text-gray-600">+8% from last month</div>
                  <Progress value={85} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Client Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">4.8/5</div>
                  <div className="text-sm text-gray-600">+0.2 from last month</div>
                  <Progress value={96} className="mt-4" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Wedding Photography</span>
                      <span className="font-semibold">₹85,000</span>
                    </div>
                    <Progress value={68} />

                    <div className="flex justify-between items-center">
                      <span>Pre-wedding Shoots</span>
                      <span className="font-semibold">₹25,000</span>
                    </div>
                    <Progress value={20} />

                    <div className="flex justify-between items-center">
                      <span>Event Photography</span>
                      <span className="font-semibold">₹15,000</span>
                    </div>
                    <Progress value={12} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Inquiries</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">+15%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Bookings</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">+8%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Revenue</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">+12%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Reviews</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">+5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Vendor Dashboard Tools</h2>
              <p className="text-gray-600">Comprehensive tools to manage your wedding business efficiently</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Advanced Dashboard Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Calendar className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Booking Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <DollarSign className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Revenue Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <MessageCircle className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Inquiry Hub</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <Star className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Review Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Camera className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Portfolio Builder</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <BarChart3 className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Analytics Suite</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Users className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Client Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <FileText className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Contract Builder</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Phone className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Call Scheduler</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Mail className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Email Templates</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <MapPin className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Venue Locator</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-amber-50">
                <Award className="w-6 h-6 mb-2 text-amber-600" />
                <span className="text-sm font-medium">Achievement Hub</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Target className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Goal Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Zap className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Quick Actions</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Shield className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Security Center</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Briefcase className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Business Tools</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Heart className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Client Relations</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Gift className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Loyalty Program</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Sparkles className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Enhancement Suite</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Crown className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Premium Features</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Peak Season Approaching</p>
                        <p className="text-sm text-gray-600">Wedding season starts in 2 months</p>
                      </div>
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">High Demand Service</p>
                        <p className="text-sm text-gray-600">Pre-wedding shoots are trending</p>
                      </div>
                      <Star className="w-5 h-5 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">Pricing Opportunity</p>
                        <p className="text-sm text-gray-600">Consider premium packages</p>
                      </div>
                      <DollarSign className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Update Portfolio</p>
                        <p className="text-sm text-gray-600">Add recent work to attract more clients</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Respond to Inquiries</p>
                        <p className="text-sm text-gray-600">3 inquiries need your attention</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Schedule Follow-ups</p>
                        <p className="text-sm text-gray-600">5 clients need follow-up calls</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Market Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">₹75K</div>
                    <div className="text-sm text-gray-600">Average Market Rate</div>
                    <div className="text-xs text-green-600 mt-1">+5% vs last year</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">4.6</div>
                    <div className="text-sm text-gray-600">Market Average Rating</div>
                    <div className="text-xs text-green-600 mt-1">You're above average!</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-2">72%</div>
                    <div className="text-sm text-gray-600">Market Booking Rate</div>
                    <div className="text-xs text-green-600 mt-1">You're performing better!</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
