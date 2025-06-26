"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  UserPlus,
  UserCheck,
  UserX,
  UserMinus,
  UsersIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PlusCircleIcon,
} from "lucide-react"

export default function CustomerGuestsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const guestStats = [
    {
      title: "Total Invited",
      value: "250",
      change: "+15",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Confirmed",
      value: "180",
      change: "+25",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending",
      value: "45",
      change: "-10",
      icon: <Clock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Declined",
      value: "25",
      change: "+5",
      icon: <XCircleIcon className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  const guestCategories = [
    { name: "Family", count: 85, percentage: 34 },
    { name: "Friends", count: 95, percentage: 38 },
    { name: "Colleagues", count: 40, percentage: 16 },
    { name: "Relatives", count: 30, percentage: 12 },
  ]

  const recentGuests = [
    {
      id: 1,
      name: "Amit & Sunita Sharma",
      email: "amit.sharma@email.com",
      phone: "+91 98765 43210",
      category: "Family",
      status: "confirmed",
      rsvpDate: "2024-08-15",
      guestCount: 2,
      dietaryRestrictions: "Vegetarian",
      address: "Mumbai, Maharashtra",
    },
    {
      id: 2,
      name: "Ravi & Meera Gupta",
      email: "ravi.gupta@email.com",
      phone: "+91 98765 43211",
      category: "Friends",
      status: "pending",
      rsvpDate: null,
      guestCount: 2,
      dietaryRestrictions: "None",
      address: "Delhi, India",
    },
    {
      id: 3,
      name: "Dr. Rajesh Patel",
      email: "dr.patel@email.com",
      phone: "+91 98765 43212",
      category: "Colleagues",
      status: "confirmed",
      rsvpDate: "2024-08-18",
      guestCount: 1,
      dietaryRestrictions: "Jain",
      address: "Pune, Maharashtra",
    },
    {
      id: 4,
      name: "Kavita & Family",
      email: "kavita.family@email.com",
      phone: "+91 98765 43213",
      category: "Relatives",
      status: "declined",
      rsvpDate: "2024-08-20",
      guestCount: 4,
      dietaryRestrictions: "Vegetarian",
      address: "Bangalore, Karnataka",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/customer", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/customer/budget", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" />, active: true },
    { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/customer/documents", icon: <FileText className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Family":
        return "bg-blue-100 text-blue-800"
      case "Friends":
        return "bg-green-100 text-green-800"
      case "Colleagues":
        return "bg-purple-100 text-purple-800"
      case "Relatives":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Guest List Management</h1>
            <p className="text-gray-600">Manage your wedding guest list and RSVPs</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export List
            </Button>
            <Button className="bg-pink-600 hover:bg-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Guest
            </Button>
          </div>
        </div>

        {/* Guest Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guestStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change} this week</p>
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
            <TabsTrigger value="guest-list">Guest List</TabsTrigger>
            <TabsTrigger value="rsvp">RSVP Tracking</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>RSVP Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Response Rate</span>
                      <span className="text-sm text-gray-600">
                        205 of 250 guests responded (82%)
                      </span>
                    </div>
                    <Progress value={82} className="h-3" />
                    
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="font-semibold">180</div>
                        <div className="text-sm text-gray-600">Confirmed</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <div className="font-semibold">45</div>
                        <div className="text-sm text-gray-600">Pending</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <XCircleIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                        <div className="font-semibold">25</div>
                        <div className="text-sm text-gray-600">Declined</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Guest Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {guestCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-green-500' : 
                          index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                        }`}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold">{category.count}</span>
                        <span className="text-xs text-gray-500 ml-1">({category.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent RSVP Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGuests.slice(0, 3).map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{guest.name}</h4>
                          <p className="text-sm text-gray-600">{guest.category} • {guest.guestCount} guests</p>
                          <p className="text-sm text-gray-500">{guest.rsvpDate ? `RSVP: ${guest.rsvpDate}` : 'No response yet'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(guest.status)}>{guest.status}</Badge>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guest-list" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search guests by name, email, or phone..."
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
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Guest List */}
            <div className="grid gap-4">
              {recentGuests.map((guest) => (
                <Card key={guest.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{guest.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {guest.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {guest.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {guest.address}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getCategoryColor(guest.category)}>{guest.category}</Badge>
                            <Badge variant="outline">{guest.guestCount} guests</Badge>
                            {guest.dietaryRestrictions !== "None" && (
                              <Badge variant="outline">{guest.dietaryRestrictions}</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge className={getStatusColor(guest.status)}>{guest.status}</Badge>
                        {guest.rsvpDate && (
                          <p className="text-sm text-gray-500 mt-1">RSVP: {guest.rsvpDate}</p>
                        )}
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4 mr-1" />
                            Email
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rsvp" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Confirmed</h3>
                  <p className="text-3xl font-bold text-green-600">180</p>
                  <p className="text-sm text-gray-600">72% of invited</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Pending</h3>
                  <p className="text-3xl font-bold text-yellow-600">45</p>
                  <p className="text-sm text-gray-600">18% of invited</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <XCircleIcon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Declined</h3>
                  <p className="text-3xl font-bold text-red-600">25</p>
                  <p className="text-sm text-gray-600">10% of invited</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Total Attending</h3>
                  <p className="text-3xl font-bold text-blue-600">180</p>
                  <p className="text-sm text-gray-600">Expected guests</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>RSVP Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Week 1 (Aug 1-7)</span>
                    <span className="text-sm text-gray-600">45 responses</span>
                  </div>
                  <Progress value={18} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Week 2 (Aug 8-14)</span>
                    <span className="text-sm text-gray-600">65 responses</span>
                  </div>
                  <Progress value={26} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Week 3 (Aug 15-21)</span>
                    <span className="text-sm text-gray-600">95 responses</span>
                  </div>
                  <Progress value={38} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invitations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invitation Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Invitations Sent</span>
                    <span className="font-semibold">250/250</span>
                  </div>
                  <Progress value={100} />

                  <div className="flex justify-between items-center">
                    <span>Email Delivered</span>
                    <span className="font-semibold">245/250</span>
                  </div>
                  <Progress value={98} />

                  <div className="flex justify-between items-center">
                    <span>Email Opened</span>
                    <span className="font-semibold">220/250</span>
                  </div>
                  <Progress value={88} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invitation Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Send className="w-4 h-4 mr-2" />
                    Send Reminder
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Invitation
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Invitation
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Guest Management Tools</h2>
              <p className="text-gray-600">Comprehensive tools to manage your wedding guest list and RSVPs</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Guest Management Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Users className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Guest Directory</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <CheckCircle className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">RSVP Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <Mail className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Invitation Sender</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Plus className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Add Guests</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Upload className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Import Contacts</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <Download className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Export List</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <Search className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Guest Search</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Filter className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Guest Filter</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <BarChart3 className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Guest Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <MapPin className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Seating Chart</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Gift className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Gift Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Phone className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Contact Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Bell className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">RSVP Reminders</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Calendar className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Event Calendar</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <FileText className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Guest Reports</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Share2 className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Share Guest List</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Target className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Guest Goals</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Printer className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Print Lists</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Archive className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Guest Archive</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Award className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">VIP Guests</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
