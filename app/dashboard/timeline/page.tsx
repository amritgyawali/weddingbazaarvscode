"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  CalendarIcon,
  Clock,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Timer,
  Target,
  TrendingUp,
  Users,
  Gift,
  Heart,
  Settings,
  Bell,
  Download,
  Upload,
  Search,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"

export default function TimelinePage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Book Wedding Venue",
      description: "Research and book the main wedding venue",
      dueDate: "2024-02-15",
      category: "Venue",
      priority: "High",
      status: "completed",
      assignedTo: "Priya",
      estimatedHours: 8,
      actualHours: 6,
    },
    {
      id: 2,
      title: "Send Save the Dates",
      description: "Design and send save the date cards to all guests",
      dueDate: "2024-03-01",
      category: "Invitations",
      priority: "High",
      status: "in-progress",
      assignedTo: "Rahul",
      estimatedHours: 4,
      actualHours: 2,
    },
    {
      id: 3,
      title: "Book Photographer",
      description: "Research and book wedding photographer",
      dueDate: "2024-03-15",
      category: "Photography",
      priority: "Medium",
      status: "pending",
      assignedTo: "Priya",
      estimatedHours: 6,
      actualHours: 0,
    },
    {
      id: 4,
      title: "Choose Wedding Dress",
      description: "Visit bridal shops and select wedding dress",
      dueDate: "2024-04-01",
      category: "Attire",
      priority: "High",
      status: "pending",
      assignedTo: "Priya",
      estimatedHours: 12,
      actualHours: 0,
    },
  ])

  const [milestones, setMilestones] = useState([
    { name: "12 Months Before", date: "2023-08-15", tasks: 8, completed: 8, status: "completed" },
    { name: "9 Months Before", date: "2023-11-15", tasks: 12, completed: 10, status: "in-progress" },
    { name: "6 Months Before", date: "2024-02-15", tasks: 15, completed: 5, status: "pending" },
    { name: "3 Months Before", date: "2024-05-15", tasks: 20, completed: 0, status: "pending" },
    { name: "1 Month Before", date: "2024-07-15", tasks: 25, completed: 0, status: "pending" },
    { name: "1 Week Before", date: "2024-08-08", tasks: 10, completed: 0, status: "pending" },
  ])

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "My Wedding", href: "/dashboard/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/budget", icon: <Gift className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/timeline", icon: <CalendarIcon className="w-4 h-4" />, active: true },
    { label: "Documents", href: "/dashboard/documents", icon: <Settings className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/messages", icon: <Settings className="w-4 h-4" /> },
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
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Wedding Timeline & Tasks 📅</h1>
          <p className="text-blue-100">Plan, track, and manage your wedding preparation timeline</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Progress Stats */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">68%</div>
                  <Progress value={68} className="mt-2" />
                  <p className="text-xs text-gray-600 mt-1">127 days remaining</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">23/90</div>
                  <p className="text-xs text-gray-600">67 tasks remaining</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <p className="text-xs text-gray-600">Need immediate attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <p className="text-xs text-gray-600">Tasks due this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Tasks</span>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.slice(0, 4).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Checkbox checked={task.status === "completed"} />
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                            <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { name: "Task Creator", icon: <Plus className="w-5 h-5" />, color: "bg-blue-100 text-blue-600" },
                {
                  name: "Milestone Tracker",
                  icon: <Target className="w-5 h-5" />,
                  color: "bg-green-100 text-green-600",
                },
                { name: "Deadline Alerts", icon: <Bell className="w-5 h-5" />, color: "bg-red-100 text-red-600" },
                {
                  name: "Progress Reports",
                  icon: <BarChart3 className="w-5 h-5" />,
                  color: "bg-purple-100 text-purple-600",
                },
                { name: "Time Tracker", icon: <Timer className="w-5 h-5" />, color: "bg-orange-100 text-orange-600" },
                { name: "Calendar Sync", icon: <Calendar className="w-5 h-5" />, color: "bg-teal-100 text-teal-600" },
                {
                  name: "Task Templates",
                  icon: <Settings className="w-5 h-5" />,
                  color: "bg-indigo-100 text-indigo-600",
                },
                { name: "Team Collaboration", icon: <Users className="w-5 h-5" />, color: "bg-pink-100 text-pink-600" },
                { name: "Export Timeline", icon: <Download className="w-5 h-5" />, color: "bg-gray-100 text-gray-600" },
                { name: "Import Tasks", icon: <Upload className="w-5 h-5" />, color: "bg-yellow-100 text-yellow-600" },
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center mx-auto mb-2`}
                    >
                      {tool.icon}
                    </div>
                    <p className="text-sm font-medium">{tool.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Wedding Planning Milestones</span>
                  <Button>Add Milestone</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      {index !== milestones.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                      )}
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            milestone.status === "completed"
                              ? "bg-green-500 text-white"
                              : milestone.status === "in-progress"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {milestone.status === "completed" ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Clock className="w-6 h-6" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{milestone.name}</h3>
                            <span className="text-sm text-gray-500">{milestone.date}</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>
                                {milestone.completed}/{milestone.tasks} tasks completed
                              </span>
                              <div className="flex-1 max-w-xs">
                                <Progress value={(milestone.completed / milestone.tasks) * 100} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Milestone Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Milestone Creator",
                "Progress Tracker",
                "Deadline Calculator",
                "Milestone Templates",
                "Achievement Badges",
                "Progress Reports",
                "Timeline Visualization",
                "Milestone Alerts",
                "Completion Certificates",
                "Milestone Sharing",
                "Custom Milestones",
                "Milestone Analytics",
                "Progress Photos",
                "Milestone Calendar",
                "Achievement Gallery",
                "Progress Comparison",
                "Milestone Reminders",
                "Success Metrics",
                "Milestone Export",
                "Progress Dashboard",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search tasks..." className="pl-10 w-64" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-priority">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-priority">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Task</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Priority</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Due Date</th>
                        <th className="text-left p-4">Assigned To</th>
                        <th className="text-left p-4">Progress</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <h4 className="font-medium">{task.title}</h4>
                              <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{task.category}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          </td>
                          <td className="p-4 text-sm">{task.dueDate}</td>
                          <td className="p-4 text-sm">{task.assignedTo}</td>
                          <td className="p-4">
                            <div className="w-20">
                              <Progress value={(task.actualHours / task.estimatedHours) * 100} />
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Task Management Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Task Creator",
                "Bulk Task Import",
                "Task Templates",
                "Recurring Tasks",
                "Task Dependencies",
                "Time Tracking",
                "Task Comments",
                "File Attachments",
                "Task Reminders",
                "Task Delegation",
                "Task Prioritization",
                "Task Categories",
                "Task Labels",
                "Task Filters",
                "Task Search",
                "Task Export",
                "Task Reports",
                "Task Analytics",
                "Task Automation",
                "Task Integration",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <CheckCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wedding Planning Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center font-medium p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => (
                    <div key={i} className="aspect-square border rounded p-1 text-sm hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">{((i % 31) + 1).toString()}</div>
                      {i % 7 === 0 && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                      {i % 5 === 0 && <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Calendar Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Event Scheduler",
                "Appointment Booking",
                "Calendar Sync",
                "Recurring Events",
                "Event Reminders",
                "Calendar Sharing",
                "Time Blocking",
                "Availability Checker",
                "Event Templates",
                "Calendar Export",
                "Multi-Calendar View",
                "Event Categories",
                "Calendar Widgets",
                "Event Notifications",
                "Calendar Integration",
                "Event Analytics",
                "Calendar Backup",
                "Event Conflicts",
                "Calendar Themes",
                "Event Invitations",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <PieChart className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Progress Charts",
                "Task Analytics",
                "Time Analysis",
                "Performance Metrics",
                "Completion Rates",
                "Productivity Reports",
                "Trend Analysis",
                "Milestone Analytics",
                "Resource Utilization",
                "Efficiency Tracking",
                "Custom Reports",
                "Data Visualization",
                "Export Analytics",
                "Comparative Analysis",
                "Predictive Analytics",
                "Real-time Dashboards",
                "KPI Tracking",
                "Performance Alerts",
                "Analytics Automation",
                "Data Integration",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Activity className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Timeline Generator",
                "Task Automation",
                "Workflow Builder",
                "Template Library",
                "Integration Hub",
                "Mobile App Sync",
                "Offline Mode",
                "Backup & Restore",
                "Data Import/Export",
                "API Access",
                "Custom Fields",
                "Advanced Filters",
                "Bulk Operations",
                "Team Collaboration",
                "Permission Management",
                "Audit Trail",
                "Version Control",
                "Change History",
                "Notification Center",
                "Help & Support",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Settings className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
