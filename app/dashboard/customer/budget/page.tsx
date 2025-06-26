"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Calculator,
} from "lucide-react"

export default function CustomerBudgetPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [totalBudget] = useState(500000)
  const [spentAmount] = useState(325000)

  const budgetCategories = [
    { name: "Venue", allocated: 200000, spent: 180000, color: "bg-blue-500" },
    { name: "Catering", allocated: 150000, spent: 120000, color: "bg-green-500" },
    { name: "Photography", allocated: 80000, spent: 75000, color: "bg-purple-500" },
    { name: "Decorations", allocated: 50000, spent: 30000, color: "bg-pink-500" },
    { name: "Music & DJ", allocated: 30000, spent: 0, color: "bg-orange-500" },
    { name: "Transportation", allocated: 20000, spent: 15000, color: "bg-teal-500" },
    { name: "Miscellaneous", allocated: 20000, spent: 5000, color: "bg-indigo-500" },
  ]

  const recentExpenses = [
    { item: "Venue Booking", amount: 180000, date: "2024-08-15", category: "Venue", status: "paid" },
    { item: "Photography Advance", amount: 40000, date: "2024-08-18", category: "Photography", status: "paid" },
    { item: "Catering Advance", amount: 60000, date: "2024-08-20", category: "Catering", status: "paid" },
    { item: "Decoration Consultation", amount: 5000, date: "2024-08-22", category: "Decorations", status: "paid" },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/customer", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/customer/budget", icon: <DollarSign className="w-4 h-4" />, active: true },
    { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/customer/documents", icon: <FileText className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
            <p className="text-gray-600">Track and manage your wedding expenses</p>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalBudget.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Amount Spent</p>
                  <p className="text-2xl font-bold text-gray-900">₹{spentAmount.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Remaining</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(totalBudget - spentAmount).toLocaleString()}</p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Overall Progress</span>
                      <span className="text-sm text-gray-600">
                        ₹{spentAmount.toLocaleString()} of ₹{totalBudget.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(spentAmount / totalBudget) * 100} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{Math.round((spentAmount / totalBudget) * 100)}% Used</span>
                      <span>{Math.round(((totalBudget - spentAmount) / totalBudget) * 100)}% Remaining</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {budgetCategories.slice(0, 5).map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          ₹{category.spent.toLocaleString()}/₹{category.allocated.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExpenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{expense.item}</h4>
                        <p className="text-sm text-gray-600">{expense.category} • {expense.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">₹{expense.amount.toLocaleString()}</p>
                        <Badge className="bg-green-100 text-green-800">{expense.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid gap-6">
              {budgetCategories.map((category, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">₹{category.spent.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">of ₹{category.allocated.toLocaleString()}</p>
                      </div>
                    </div>
                    <Progress value={(category.spent / category.allocated) * 100} className="h-2" />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>{Math.round((category.spent / category.allocated) * 100)}% used</span>
                      <span>₹{(category.allocated - category.spent).toLocaleString()} remaining</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Expenses</h2>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {recentExpenses.map((expense, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{expense.item}</h3>
                        <p className="text-gray-600">{expense.category}</p>
                        <p className="text-sm text-gray-500">{expense.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₹{expense.amount.toLocaleString()}</p>
                        <Badge className="bg-green-100 text-green-800">{expense.status}</Badge>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
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
              <h2 className="text-2xl font-bold mb-2">Budget Management Tools</h2>
              <p className="text-gray-600">Tools to help you manage your wedding budget effectively</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Budget Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <DollarSign className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Budget Tracker</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <TrendingUp className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Expense Analytics</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <Target className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Budget Goals</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Calculator className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Cost Calculator</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <AlertCircle className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Budget Alerts</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
