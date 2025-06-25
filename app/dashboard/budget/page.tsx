"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  Calculator,
  Receipt,
  Wallet,
  Target,
  AlertTriangle,
  CheckCircle,
  Download,
  Edit,
  Trash2,
  Plus,
  Heart,
  Users,
  Calendar,
  MessageCircle,
  Gift,
} from "lucide-react"

export default function BudgetPage() {
  const [totalBudget, setTotalBudget] = useState(500000)
  const [spentAmount, setSpentAmount] = useState(340000)

  const budgetCategories = [
    { name: "Venue", allocated: 200000, spent: 150000, color: "bg-blue-500" },
    { name: "Photography", allocated: 100000, spent: 80000, color: "bg-green-500" },
    { name: "Catering", allocated: 80000, spent: 60000, color: "bg-yellow-500" },
    { name: "Decoration", allocated: 60000, spent: 50000, color: "bg-purple-500" },
    { name: "Music & Entertainment", allocated: 40000, spent: 0, color: "bg-pink-500" },
    { name: "Transportation", allocated: 20000, spent: 0, color: "bg-indigo-500" },
  ]

  const recentTransactions = [
    { id: 1, vendor: "Royal Banquet Hall", amount: 50000, type: "payment", date: "2024-01-15", category: "Venue" },
    {
      id: 2,
      vendor: "Capture Moments Studio",
      amount: 25000,
      type: "advance",
      date: "2024-01-12",
      category: "Photography",
    },
    { id: 3, vendor: "Dream Decorations", amount: 15000, type: "booking", date: "2024-01-10", category: "Decoration" },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "My Wedding", href: "/dashboard/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/budget", icon: <DollarSign className="w-4 h-4" />, active: true },
    { label: "Guest List", href: "/dashboard/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/documents", icon: <Gift className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Budget Management 💰</h1>
          <p className="text-green-100">Track expenses and manage your wedding budget efficiently</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Budget Summary */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Budget Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">
                      ₹{((totalBudget - spentAmount) / 1000).toFixed(0)}K
                    </div>
                    <div className="text-gray-600">Remaining Budget</div>
                    <Progress value={(spentAmount / totalBudget) * 100} className="mt-4" />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>Spent: ₹{(spentAmount / 1000).toFixed(0)}K</span>
                      <span>Total: ₹{(totalBudget / 1000).toFixed(0)}K</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {((spentAmount / totalBudget) * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-600">Budget Used</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">6</div>
                      <div className="text-sm text-gray-600">Categories</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">23</div>
                      <div className="text-sm text-gray-600">Transactions</div>
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
                  <Button className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Expense
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calculator className="w-4 h-4 mr-2" />
                    Budget Calculator
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Receipt className="w-4 h-4 mr-2" />
                    Upload Receipt
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Set Goals
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Budget Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Expense Tracker",
                "Budget Planner",
                "Cost Calculator",
                "Payment Scheduler",
                "Receipt Manager",
                "Vendor Payments",
                "Tax Calculator",
                "Currency Converter",
                "Budget Alerts",
                "Spending Analysis",
                "Cost Comparison",
                "Budget Templates",
                "Financial Reports",
                "Payment Reminders",
                "Budget Goals",
                "Expense Categories",
                "Budget Forecasting",
                "Cost Optimization",
                "Payment History",
                "Budget Backup",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {budgetCategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Allocated: ₹{(category.allocated / 1000).toFixed(0)}K</span>
                      <span>Spent: ₹{(category.spent / 1000).toFixed(0)}K</span>
                    </div>
                    <Progress value={(category.spent / category.allocated) * 100} />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Remaining: ₹{((category.allocated - category.spent) / 1000).toFixed(0)}K</span>
                      <span>{((category.spent / category.allocated) * 100).toFixed(0)}% used</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Expense
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Category Management Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Category Creator",
                "Budget Allocator",
                "Spending Limits",
                "Category Analytics",
                "Cost Breakdown",
                "Category Comparison",
                "Budget Reallocation",
                "Category Tracking",
                "Expense Categorization",
                "Budget Distribution",
                "Category Reports",
                "Spending Patterns",
                "Category Optimization",
                "Budget Balancing",
                "Category Alerts",
                "Custom Categories",
                "Category Templates",
                "Budget Splitting",
                "Category Insights",
                "Allocation Planner",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <PieChart className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Transactions</span>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{transaction.vendor}</h4>
                          <p className="text-sm text-gray-600">
                            {transaction.category} • {transaction.type}
                          </p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">₹{(transaction.amount / 1000).toFixed(0)}K</div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transaction Management Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Transaction Logger",
                "Receipt Scanner",
                "Payment Tracker",
                "Expense Recorder",
                "Bill Manager",
                "Payment History",
                "Transaction Search",
                "Expense Filter",
                "Payment Calendar",
                "Transaction Export",
                "Receipt Storage",
                "Payment Reminders",
                "Transaction Categories",
                "Expense Approval",
                "Payment Verification",
                "Transaction Analytics",
                "Spending Insights",
                "Payment Trends",
                "Transaction Backup",
                "Expense Audit",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Receipt className="w-6 h-6 text-purple-500 mx-auto mb-2" />
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
                  <CardTitle>Spending Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Distribution</CardTitle>
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
                "Spending Analytics",
                "Budget Forecasting",
                "Trend Analysis",
                "Cost Insights",
                "Financial Dashboard",
                "Expense Patterns",
                "Budget Variance",
                "ROI Calculator",
                "Cost Efficiency",
                "Spending Heatmap",
                "Budget Performance",
                "Financial Metrics",
                "Cost Analysis",
                "Budget Optimization",
                "Spending Alerts",
                "Financial Reports",
                "Budget Comparison",
                "Cost Tracking",
                "Expense Visualization",
                "Budget Intelligence",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <BarChart3 className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Planning Tab */}
          <TabsContent value="planning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Planning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Total Wedding Budget</Label>
                    <Input
                      type="number"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Wedding Date</Label>
                    <Input type="date" defaultValue="2024-08-15" />
                  </div>
                  <div>
                    <Label>Guest Count</Label>
                    <Input type="number" defaultValue="250" />
                  </div>
                  <div>
                    <Label>Priority Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Budget</SelectItem>
                        <SelectItem value="medium">Medium Budget</SelectItem>
                        <SelectItem value="low">Budget Conscious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Venue Budget</span>
                    </div>
                    <p className="text-sm text-gray-600">Allocate 40-50% of total budget to venue and catering</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Photography Budget</span>
                    </div>
                    <p className="text-sm text-gray-600">Reserve 10-15% for photography and videography</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">Emergency Fund</span>
                    </div>
                    <p className="text-sm text-gray-600">Keep 10% buffer for unexpected expenses</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Planning Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Budget Planner",
                "Cost Estimator",
                "Budget Templates",
                "Planning Calculator",
                "Budget Advisor",
                "Cost Breakdown",
                "Budget Simulator",
                "Planning Guide",
                "Budget Optimizer",
                "Cost Planner",
                "Budget Wizard",
                "Planning Tools",
                "Budget Assistant",
                "Cost Calculator",
                "Budget Helper",
                "Planning Dashboard",
                "Budget Tracker",
                "Cost Manager",
                "Budget Organizer",
                "Planning Suite",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Target className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline">Venue</Button>
                      <Button variant="outline">Photography</Button>
                      <Button variant="outline">Catering</Button>
                      <Button variant="outline">Decoration</Button>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">₹0</div>
                      <div className="text-sm text-gray-600">Calculated Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Scheduler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { vendor: "Venue", amount: "₹50K", due: "Jan 30" },
                      { vendor: "Photography", amount: "₹25K", due: "Feb 15" },
                      { vendor: "Catering", amount: "₹30K", due: "Mar 01" },
                    ].map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium text-sm">{payment.vendor}</div>
                          <div className="text-xs text-gray-600">{payment.due}</div>
                        </div>
                        <div className="font-semibold">{payment.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input placeholder="Vendor name" />
                    <Input placeholder="Amount" type="number" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="venue">Venue</SelectItem>
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="catering">Catering</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full">Add Expense</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Advanced Calculator",
                "Budget Simulator",
                "Cost Optimizer",
                "Payment Planner",
                "Expense Analyzer",
                "Budget Forecaster",
                "Cost Comparer",
                "Payment Tracker",
                "Budget Monitor",
                "Expense Manager",
                "Financial Planner",
                "Budget Advisor",
                "Cost Controller",
                "Payment Organizer",
                "Budget Dashboard",
                "Expense Reporter",
                "Budget Optimizer",
                "Cost Tracker",
                "Payment Manager",
                "Budget Intelligence",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Calculator className="w-6 h-6 text-red-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
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
