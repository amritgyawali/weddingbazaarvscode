"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  CalendarDays,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  CalendarIcon,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
} from "lucide-react"

export default function CustomerTimelinePage() {
  const [activeTab, setActiveTab] = useState("timeline")
  const [viewMode, setViewMode] = useState("timeline")

  const timelineStats = [
    {
      title: "Total Tasks",
      value: "45",
      change: "+5",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Completed",
      value: "32",
      change: "+8",
      icon: <CheckCircleIcon className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "In Progress",
      value: "8",
      change: "-2",
      icon: <Clock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Overdue",
      value: "5",
      change: "-1",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  const timelineTasks = [
    {
      id: 1,
      title: "Book Wedding Venue",
      description: "Research and book the perfect venue for ceremony and reception",
      category: "Venue",
      priority: "high",
      status: "completed",
      dueDate: "2024-08-15",
      completedDate: "2024-08-10",
      assignedTo: "Priya & Rahul",
      estimatedTime: "2 weeks",
      dependencies: [],
    },
    {
      id: 2,
      title: "Hire Wedding Photographer",
      description: "Find and book professional wedding photographer",
      category: "Photography",
      priority: "high",
      status: "completed",
      dueDate: "2024-08-20",
      completedDate: "2024-08-18",
      assignedTo: "Priya",
      estimatedTime: "1 week",
      dependencies: [1],
    },
    {
      id: 3,
      title: "Finalize Catering Menu",
      description: "Choose menu options and finalize catering arrangements",
      category: "Catering",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-08-25",
      completedDate: null,
      assignedTo: "Rahul",
      estimatedTime: "3 days",
      dependencies: [1],
    },
    {
      id: 4,
      title: "Send Wedding Invitations",
      description: "Design, print, and send wedding invitations to all guests",
      category: "Invitations",
      priority: "medium",
      status: "pending",
      dueDate: "2024-09-01",
      completedDate: null,
      assignedTo: "Priya",
      estimatedTime: "1 week",
      dependencies: [2],
    },
    {
      id: 5,
      title: "Book Makeup Artist",
      description: "Find and book makeup artist for wedding day",
      category: "Beauty",
      priority: "medium",
      status: "pending",
      dueDate: "2024-09-15",
      completedDate: null,
      assignedTo: "Priya",
      estimatedTime: "3 days",
      dependencies: [],
    },
  ]

  const upcomingMilestones = [
    {
      title: "6 Months Before",
      date: "2024-06-15",
      tasks: ["Book venue", "Hire photographer", "Choose catering"],
      status: "completed",
    },
    {
      title: "4 Months Before",
      date: "2024-08-15",
      tasks: ["Send invitations", "Book decorations", "Finalize menu"],
      status: "in-progress",
    },
    {
      title: "2 Months Before",
      date: "2024-10-15",
      tasks: ["Final guest count", "Confirm vendors", "Wedding rehearsal"],
      status: "pending",
    },
    {
      title: "1 Week Before",
      date: "2024-12-08",
      tasks: ["Final preparations", "Confirm timeline", "Pack for honeymoon"],
      status: "pending",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/customer", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/customer/budget", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" />, active: true },
    { label: "Documents", href: "/dashboard/customer/documents", icon: <FileText className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "in-progress":
        return <PlayCircleIcon className="w-5 h-5 text-blue-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "overdue":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wedding Timeline</h1>
            <p className="text-gray-600">Track your wedding planning progress and tasks</p>
          </div>
          <div className="flex gap-3">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timeline">Timeline</SelectItem>
                <SelectItem value="calendar">Calendar</SelectItem>
                <SelectItem value="kanban">Kanban</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-pink-600 hover:bg-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Timeline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineStats.map((stat, index) => (
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="tasks">Task List</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wedding Planning Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-8">
                    {timelineTasks.map((task, index) => (
                      <div key={task.id} className="relative flex items-start gap-6">
                        {/* Timeline Dot */}
                        <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                          task.status === 'completed' ? 'bg-green-100' :
                          task.status === 'in-progress' ? 'bg-blue-100' :
                          task.status === 'overdue' ? 'bg-red-100' : 'bg-yellow-100'
                        }`}>
                          {getStatusIcon(task.status)}
                        </div>
                        
                        {/* Task Content */}
                        <div className="flex-1 min-w-0">
                          <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                                  <p className="text-gray-600 mb-3">{task.description}</p>
                                  
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      Due: {task.dueDate}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Users className="w-4 h-4" />
                                      {task.assignedTo}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {task.estimatedTime}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                    <Badge variant="outline">{task.category}</Badge>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Tasks</h2>
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tasks</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {timelineTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                          {getStatusIcon(task.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <p className="text-gray-600">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Due: {task.dueDate}</span>
                            <span>Assigned: {task.assignedTo}</span>
                            <span>Time: {task.estimatedTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex gap-2 mb-3">
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <div className="grid gap-6">
              {upcomingMilestones.map((milestone, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          milestone.status === 'completed' ? 'bg-green-100' :
                          milestone.status === 'in-progress' ? 'bg-blue-100' : 'bg-yellow-100'
                        }`}>
                          {milestone.status === 'completed' ? (
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          ) : milestone.status === 'in-progress' ? (
                            <PlayCircleIcon className="w-8 h-8 text-blue-600" />
                          ) : (
                            <Clock className="w-8 h-8 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                          <p className="text-gray-600 mb-3">Target Date: {milestone.date}</p>
                          <div className="flex flex-wrap gap-2">
                            {milestone.tasks.map((task, taskIndex) => (
                              <Badge key={taskIndex} variant="outline" className="text-xs">
                                {task}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge className={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
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

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Timeline Management Tools</h2>
              <p className="text-gray-600">Advanced tools to plan and track your wedding timeline</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Timeline Management Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Calendar className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Timeline Planner</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <CheckCircle className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Task Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <Clock className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Milestone Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Plus className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Add Tasks</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <AlertCircle className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Deadline Alerts</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <BarChart3 className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Progress Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <CalendarDays className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Calendar View</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Users className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Task Assignment</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <Bell className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Reminders</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Share2 className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Share Timeline</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Download className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Export Timeline</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Target className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Goal Setting</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <FileText className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Task Templates</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Grid className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Kanban Board</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Search className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Task Search</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Filter className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Task Filters</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Archive className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Task Archive</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Printer className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Print Timeline</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <RefreshCw className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Auto Sync</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Award className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Achievement Tracker</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
