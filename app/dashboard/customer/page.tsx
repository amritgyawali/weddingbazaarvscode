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

export default function CustomerDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [monthlyBudget] = useState(500000)
  const [spentAmount] = useState(325000)
  const [remainingBudget] = useState(175000)
  const [daysToWedding] = useState(45)

  const quickStats = [
    {
      title: "Total Budget",
      value: `₹${monthlyBudget.toLocaleString()}`,
      change: "Set",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Amount Spent",
      value: `₹${spentAmount.toLocaleString()}`,
      change: "65%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Remaining",
      value: `₹${remainingBudget.toLocaleString()}`,
      change: "35%",
      icon: <Calendar className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Days to Wedding",
      value: daysToWedding,
      change: "Countdown",
      icon: <Heart className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  const recentActivities = [
    {
      action: "Booked venue",
      vendor: "Royal Palace Hotel",
      amount: "₹2,50,000",
      date: "2 days ago",
      status: "confirmed",
    },
    {
      action: "Photographer inquiry",
      vendor: "Capture Moments Studio",
      amount: "₹80,000",
      date: "3 days ago",
      status: "pending",
    },
    {
      action: "Catering quote",
      vendor: "Delicious Delights",
      amount: "₹1,20,000",
      date: "5 days ago",
      status: "reviewing",
    },
  ]

  const upcomingTasks = [
    {
      task: "Finalize menu with caterer",
      dueDate: "Tomorrow",
      priority: "high",
      category: "Catering",
    },
    {
      task: "Send invitations",
      dueDate: "In 3 days",
      priority: "high",
      category: "Invitations",
    },
    {
      task: "Book makeup artist",
      dueDate: "Next week",
      priority: "medium",
      category: "Beauty",
    },
    {
      task: "Confirm transportation",
      dueDate: "In 2 weeks",
      priority: "medium",
      category: "Transport",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/customer", icon: <TrendingUp className="w-4 h-4" />, active: true },
    { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/customer/budget", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/customer/documents", icon: <FileText className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
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
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Priya! 💕</h1>
              <p className="text-pink-100 text-lg">
                Your dream wedding is just {daysToWedding} days away! Let's make it perfect.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{daysToWedding}</div>
              <div className="text-pink-200">Days to go</div>
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
                    <p className="text-sm text-gray-500">{stat.change}</p>
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
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Budget Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Budget Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Budget Utilization</span>
                      <span className="text-sm text-gray-600">
                        ₹{spentAmount.toLocaleString()} of ₹{monthlyBudget.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(spentAmount / monthlyBudget) * 100} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>65% Used</span>
                      <span>35% Remaining</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold">₹2.5L</div>
                      <div className="text-sm text-gray-600">Venue</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold">₹1.2L</div>
                      <div className="text-sm text-gray-600">Catering</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Camera className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-semibold">₹80K</div>
                      <div className="text-sm text-gray-600">Photography</div>
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
                    <Users className="w-4 h-4 mr-2" />
                    Find Vendors
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Update Timeline
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Track Expenses
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Vendors
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
                          <div className="flex-1">
                            <h4 className="font-medium">{activity.action}</h4>
                            <p className="text-sm text-gray-600">{activity.vendor}</p>
                            <p className="text-sm text-gray-500">{activity.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">{activity.amount}</p>
                            <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.map((task, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{task.task}</h4>
                            <p className="text-sm text-gray-600">{task.category}</p>
                            <p className="text-sm text-gray-500">{task.dueDate}</p>
                          </div>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wedding Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{daysToWedding} Days</div>
                  <div className="text-sm text-gray-600">Until your big day</div>
                  <Progress value={((365 - daysToWedding) / 365) * 100} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Planning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
                  <div className="text-sm text-gray-600">Tasks completed</div>
                  <Progress value={78} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Vendor Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">6/12</div>
                  <div className="text-sm text-gray-600">Vendors confirmed</div>
                  <Progress value={50} className="mt-4" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Wedding Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Venue Booking</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Photography</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Catering</span>
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Decorations</span>
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Music & DJ</span>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Venue & Catering</span>
                      <span className="font-semibold">₹3,70,000</span>
                    </div>
                    <Progress value={74} />

                    <div className="flex justify-between items-center">
                      <span>Photography & Video</span>
                      <span className="font-semibold">₹80,000</span>
                    </div>
                    <Progress value={16} />

                    <div className="flex justify-between items-center">
                      <span>Decorations & Flowers</span>
                      <span className="font-semibold">₹50,000</span>
                    </div>
                    <Progress value={10} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Camera className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Photography</h3>
                  <p className="text-sm text-gray-600 mb-4">Capture Moments Studio</p>
                  <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Venue</h3>
                  <p className="text-sm text-gray-600 mb-4">Royal Palace Hotel</p>
                  <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Catering</h3>
                  <p className="text-sm text-gray-600 mb-4">Delicious Delights</p>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Music className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Music & DJ</h3>
                  <p className="text-sm text-gray-600 mb-4">Not selected</p>
                  <Badge className="bg-red-100 text-red-800">Needed</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Decorations</h3>
                  <p className="text-sm text-gray-600 mb-4">Not selected</p>
                  <Badge className="bg-red-100 text-red-800">Needed</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Palette className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Makeup Artist</h3>
                  <p className="text-sm text-gray-600 mb-4">Not selected</p>
                  <Badge className="bg-red-100 text-red-800">Needed</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Wedding Planning Tools</h2>
              <p className="text-gray-600">Comprehensive tools to plan your perfect wedding</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Customer Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Heart className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Wedding Planner</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <DollarSign className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Budget Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <Users className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Vendor Finder</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <Calendar className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Timeline Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Users className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Guest List</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <MessageCircle className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Vendor Chat</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <FileText className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Document Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <CheckCircle className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Task Checklist</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <MapPin className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Venue Finder</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Camera className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Photo Gallery</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Gift className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Registry Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Mail className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Invitation Designer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Music className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Music Playlist</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Sparkles className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Decoration Ideas</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Palette className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Color Palette</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <TrendingUp className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Expense Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Clock className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Countdown Timer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Share2 className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Social Sharing</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Bell className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Reminders</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Award className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Wedding Website</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
