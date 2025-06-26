"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
  Headphones,
  MessageSquare,
  HelpCircle,
  LifeBuoy,
  Ticket,
  Reply,
  Forward,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
} from "lucide-react"

export default function AdminSupportPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const supportStats = [
    {
      title: "Open Tickets",
      value: "156",
      change: "+12",
      icon: <Ticket className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Resolved Today",
      value: "89",
      change: "+23",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-0.5h",
      icon: <Clock className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Customer Satisfaction",
      value: "94.5%",
      change: "+2.1%",
      icon: <ThumbsUp className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const ticketCategories = [
    { name: "Technical Issues", count: 45, percentage: 29, priority: "high" },
    { name: "Payment Problems", count: 38, percentage: 24, priority: "high" },
    { name: "Account Issues", count: 32, percentage: 21, priority: "medium" },
    { name: "Feature Requests", count: 25, percentage: 16, priority: "low" },
    { name: "General Inquiries", count: 16, percentage: 10, priority: "low" },
  ]

  const recentTickets = [
    {
      id: "TKT-001",
      title: "Payment gateway not working",
      customer: "Priya Sharma",
      category: "Payment Problems",
      priority: "high",
      status: "open",
      created: "2024-08-20 10:30",
      lastUpdate: "2024-08-20 14:15",
      assignedTo: "Support Agent 1",
    },
    {
      id: "TKT-002",
      title: "Unable to upload portfolio images",
      customer: "Capture Moments Studio",
      category: "Technical Issues",
      priority: "medium",
      status: "in-progress",
      created: "2024-08-20 09:15",
      lastUpdate: "2024-08-20 13:45",
      assignedTo: "Support Agent 2",
    },
    {
      id: "TKT-003",
      title: "Account verification pending",
      customer: "Royal Palace Hotel",
      category: "Account Issues",
      priority: "medium",
      status: "resolved",
      created: "2024-08-19 16:20",
      lastUpdate: "2024-08-20 11:30",
      assignedTo: "Support Agent 3",
    },
    {
      id: "TKT-004",
      title: "Request for mobile app feature",
      customer: "Rahul Gupta",
      category: "Feature Requests",
      priority: "low",
      status: "open",
      created: "2024-08-19 14:45",
      lastUpdate: "2024-08-19 14:45",
      assignedTo: "Unassigned",
    },
  ]

  const supportAgents = [
    { name: "Sarah Wilson", tickets: 23, resolved: 18, rating: 4.8, status: "online" },
    { name: "Mike Johnson", tickets: 19, resolved: 15, rating: 4.6, status: "online" },
    { name: "Lisa Chen", tickets: 21, resolved: 17, rating: 4.9, status: "away" },
    { name: "David Brown", tickets: 16, resolved: 14, rating: 4.7, status: "offline" },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/admin", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Building className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Support", href: "/dashboard/admin/support", icon: <MessageCircle className="w-4 h-4" />, active: true },
    { label: "System", href: "/dashboard/admin/system", icon: <Server className="w-4 h-4" /> },
    { label: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Support Management</h1>
            <p className="text-gray-600">Manage customer support tickets and team performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </div>
        </div>

        {/* Support Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportStats.map((stat, index) => (
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
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Ticket Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ticketCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{category.count}</span>
                          <Badge className={getPriorityColor(category.priority)}>{category.priority}</Badge>
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
                    <Ticket className="w-4 h-4 mr-2" />
                    View All Tickets
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    High Priority ({ticketCategories.filter(c => c.priority === 'high').reduce((sum, c) => sum + c.count, 0)})
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Agents
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Support Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Ticket className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{ticket.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>ID: {ticket.id}</span>
                              <span>Customer: {ticket.customer}</span>
                              <span>Created: {ticket.created}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                              <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                              <Badge variant="outline">{ticket.category}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-2">
                            Assigned: {ticket.assignedTo}
                          </div>
                          <div className="text-sm text-gray-500">
                            Updated: {ticket.lastUpdate}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search tickets by ID, customer, or title..."
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
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tickets List */}
            <div className="grid gap-4">
              {recentTickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Ticket className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{ticket.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>ID: {ticket.id}</span>
                            <span>Customer: {ticket.customer}</span>
                            <span>Category: {ticket.category}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                            <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                            <Badge variant="outline">Assigned: {ticket.assignedTo}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-2">
                          Created: {ticket.created}
                        </div>
                        <div className="text-sm text-gray-500 mb-3">
                          Updated: {ticket.lastUpdate}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Reply className="w-4 h-4 mr-1" />
                            Reply
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

          <TabsContent value="agents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Support Team</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Agent
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportAgents.map((agent, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAgentStatusColor(agent.status)}`}></div>
                      </div>
                      <h3 className="font-semibold mb-2">{agent.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Active Tickets:</span>
                          <span className="font-semibold">{agent.tickets}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Resolved:</span>
                          <span className="font-semibold">{agent.resolved}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{agent.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Badge className={`${agent.status === 'online' ? 'bg-green-100 text-green-800' :
                          agent.status === 'away' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average Response Time</span>
                  <span className="font-semibold">2.4 hours</span>
                </div>
                <Progress value={75} />

                <div className="flex justify-between items-center">
                  <span>Resolution Rate</span>
                  <span className="font-semibold">89.2%</span>
                </div>
                <Progress value={89} />

                <div className="flex justify-between items-center">
                  <span>Customer Satisfaction</span>
                  <span className="font-semibold">94.5%</span>
                </div>
                <Progress value={95} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Knowledge Base</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Article
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <HelpCircle className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Getting Started</h3>
                      <p className="text-sm text-gray-600">15 articles</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Basic platform navigation and setup guides</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Popular</Badge>
                    <span className="text-sm text-gray-500">Updated 2 days ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Payment Issues</h3>
                      <p className="text-sm text-gray-600">12 articles</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Common payment problems and solutions</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Trending</Badge>
                    <span className="text-sm text-gray-500">Updated 1 week ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-8 h-8 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Account Settings</h3>
                      <p className="text-sm text-gray-600">8 articles</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Profile management and security settings</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">New</Badge>
                    <span className="text-sm text-gray-500">Updated yesterday</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building className="w-8 h-8 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">Vendor Guide</h3>
                      <p className="text-sm text-gray-600">20 articles</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Complete guide for vendors and service providers</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Essential</Badge>
                    <span className="text-sm text-gray-500">Updated 3 days ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    <div>
                      <h3 className="font-semibold">Troubleshooting</h3>
                      <p className="text-sm text-gray-600">18 articles</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Technical issues and error resolution</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Critical</Badge>
                    <span className="text-sm text-gray-500">Updated 5 days ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageCircle className="w-8 h-8 text-teal-600" />
                    <div>
                      <h3 className="font-semibold">FAQ</h3>
                      <p className="text-sm text-gray-600">25 articles</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Frequently asked questions and answers</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">Most Viewed</Badge>
                    <span className="text-sm text-gray-500">Updated 1 week ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Support Management Tools</h2>
              <p className="text-gray-600">Comprehensive tools for customer support and team management</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Support Management Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Ticket className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Ticket Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <MessageCircle className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Live Chat</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <HelpCircle className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Knowledge Base</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Users className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Agent Management</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <AlertTriangle className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Priority Queue</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <BarChart3 className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Support Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <Clock className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Response Timer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Bell className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Alert System</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <ThumbsUp className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Satisfaction Survey</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Reply className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Auto Responder</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Search className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Ticket Search</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Archive className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Ticket Archive</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Forward className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Ticket Routing</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Flag className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Escalation Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <FileText className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Report Generator</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Headphones className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Call Center</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <MessageSquare className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Canned Responses</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Target className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">SLA Management</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <LifeBuoy className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Help Desk</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Settings className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Support Settings</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
