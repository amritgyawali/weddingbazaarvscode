"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle,
  Circle,
  CalendarIcon,
  DollarSign,
  Users,
  MapPin,
  Plus,
  Trash2,
  Edit,
  Download,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PlanningToolPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [budget, setBudget] = useState(500000)
  const [guestCount, setGuestCount] = useState(150)

  const [checklist, setChecklist] = useState([
    { id: 1, task: "Book wedding venue", completed: true, category: "Venue", dueDate: "2024-02-15" },
    { id: 2, task: "Hire photographer", completed: true, category: "Photography", dueDate: "2024-02-20" },
    { id: 3, task: "Choose wedding dress", completed: false, category: "Attire", dueDate: "2024-03-01" },
    { id: 4, task: "Send invitations", completed: false, category: "Invitations", dueDate: "2024-03-15" },
    { id: 5, task: "Book catering service", completed: false, category: "Catering", dueDate: "2024-03-10" },
    { id: 6, task: "Arrange transportation", completed: false, category: "Transport", dueDate: "2024-04-01" },
  ])

  const [expenses, setExpenses] = useState([
    { id: 1, category: "Venue", amount: 150000, budgeted: 200000 },
    { id: 2, category: "Photography", amount: 75000, budgeted: 100000 },
    { id: 3, category: "Catering", amount: 0, budgeted: 150000 },
    { id: 4, category: "Decoration", amount: 0, budgeted: 80000 },
    { id: 5, category: "Attire", amount: 0, budgeted: 50000 },
  ])

  const toggleTask = (id: number) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const completedTasks = checklist.filter((item) => item.completed).length
  const totalTasks = checklist.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const totalBudgeted = expenses.reduce((sum, expense) => sum + expense.budgeted, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">WB</span>
                </div>
                <span className="text-xl font-bold text-gray-900">WeddingBazaar</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">Wedding Planner</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Plan
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Wedding Date</p>
                  <p className="text-lg font-semibold">April 15, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget Used</p>
                  <p className="text-lg font-semibold">₹{totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">of ₹{totalBudgeted.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Guest Count</p>
                  <p className="text-lg font-semibold">{guestCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tasks Complete</p>
                  <p className="text-lg font-semibold">
                    {completedTasks}/{totalTasks}
                  </p>
                  <Progress value={progressPercentage} className="w-full mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="checklist" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Wedding Checklist</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {checklist.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <button onClick={() => toggleTask(item.id)} className="flex-shrink-0">
                            {item.completed ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-400" />
                            )}
                          </button>

                          <div className="flex-1">
                            <p
                              className={`font-medium ${item.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                            >
                              {item.task}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {item.category}
                              </Badge>
                              <span className="text-xs text-gray-500">Due: {item.dueDate}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-pink-600 mb-2">{Math.round(progressPercentage)}%</div>
                        <p className="text-gray-600">Complete</p>
                        <Progress value={progressPercentage} className="w-full mt-4" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completed Tasks</span>
                          <span className="font-medium">{completedTasks}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Remaining Tasks</span>
                          <span className="font-medium">{totalTasks - completedTasks}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Tasks</span>
                          <span className="font-medium">{totalTasks}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Budget Tracker</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {expenses.map((expense) => (
                        <div key={expense.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">{expense.category}</h3>
                            <div className="text-right">
                              <p className="text-lg font-bold">₹{expense.amount.toLocaleString()}</p>
                              <p className="text-sm text-gray-500">of ₹{expense.budgeted.toLocaleString()}</p>
                            </div>
                          </div>

                          <Progress value={(expense.amount / expense.budgeted) * 100} className="w-full" />

                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Spent: ₹{expense.amount.toLocaleString()}</span>
                            <span>Remaining: ₹{(expense.budgeted - expense.amount).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          ₹{(totalBudgeted - totalSpent).toLocaleString()}
                        </div>
                        <p className="text-gray-600">Remaining</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Budget</span>
                          <span className="font-medium">₹{totalBudgeted.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Spent</span>
                          <span className="font-medium">₹{totalSpent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Remaining</span>
                          <span className="font-medium">₹{(totalBudgeted - totalSpent).toLocaleString()}</span>
                        </div>
                      </div>

                      <Progress value={(totalSpent / totalBudgeted) * 100} className="w-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Wedding Timeline</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {[
                        {
                          time: "10:00 AM",
                          event: "Bride's Makeup & Hair",
                          duration: "3 hours",
                          location: "Bridal Suite",
                        },
                        {
                          time: "11:00 AM",
                          event: "Groom's Preparation",
                          duration: "2 hours",
                          location: "Groom's Room",
                        },
                        { time: "1:00 PM", event: "Photography Session", duration: "2 hours", location: "Garden Area" },
                        { time: "3:00 PM", event: "Baraat Arrival", duration: "1 hour", location: "Main Entrance" },
                        { time: "4:00 PM", event: "Wedding Ceremony", duration: "2 hours", location: "Mandap" },
                        { time: "6:00 PM", event: "Cocktail Hour", duration: "1 hour", location: "Terrace" },
                        { time: "7:00 PM", event: "Reception Dinner", duration: "3 hours", location: "Banquet Hall" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0 w-20 text-center">
                            <div className="text-sm font-medium text-pink-600">{item.time}</div>
                            <div className="text-xs text-gray-500">{item.duration}</div>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.event}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{item.location}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Vendors</h2>
              <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => router.push("/vendors")}>
                <Plus className="w-4 h-4 mr-2" />
                Find Vendors
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Rajesh Photography",
                  category: "Photographer",
                  status: "Confirmed",
                  contact: "+91 98765 43210",
                },
                { name: "Grand Palace Banquets", category: "Venue", status: "Confirmed", contact: "+91 98765 43211" },
                { name: "Floral Dreams", category: "Decorator", status: "Pending", contact: "+91 98765 43212" },
                { name: "Spice Garden Catering", category: "Catering", status: "Quoted", contact: "+91 98765 43213" },
              ].map((vendor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                        <p className="text-sm text-gray-600">{vendor.category}</p>
                      </div>
                      <Badge
                        variant={vendor.status === "Confirmed" ? "default" : "secondary"}
                        className={vendor.status === "Confirmed" ? "bg-green-500" : ""}
                      >
                        {vendor.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Contact: {vendor.contact}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Guest Management</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Guest
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">150</div>
                  <p className="text-gray-600">Total Invited</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">120</div>
                  <p className="text-gray-600">Confirmed</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">25</div>
                  <p className="text-gray-600">Pending</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">5</div>
                  <p className="text-gray-600">Declined</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Guest List</h3>
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Search guests..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="declined">Declined</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Phone</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "John Doe", email: "john@example.com", phone: "+91 98765 43210", status: "Confirmed" },
                        { name: "Jane Smith", email: "jane@example.com", phone: "+91 98765 43211", status: "Pending" },
                        {
                          name: "Bob Johnson",
                          email: "bob@example.com",
                          phone: "+91 98765 43212",
                          status: "Confirmed",
                        },
                      ].map((guest, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{guest.name}</td>
                          <td className="py-3 px-4 text-gray-600">{guest.email}</td>
                          <td className="py-3 px-4 text-gray-600">{guest.phone}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={guest.status === "Confirmed" ? "default" : "secondary"}
                              className={guest.status === "Confirmed" ? "bg-green-500" : ""}
                            >
                              {guest.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
