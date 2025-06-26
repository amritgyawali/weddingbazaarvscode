"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdvancedCard, AdvancedCardHeader, AdvancedCardContent, AdvancedCardTitle } from "@/components/ui/advanced-card"
import { AdvancedChart } from "@/components/ui/advanced-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { EnhancedDashboardLayout } from "@/components/dashboard/enhanced-dashboard-layout"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  MessageCircle,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  Users,
  Target,
  Zap,
  Shield,
  Activity,
  Database,
  Server,
  Building,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Plus,
  RefreshCw,
  Download,
  Upload,
  Bell,
  Globe,
  Monitor,
  Cpu,
  MemoryStick,
  HardDrive,
  Network
} from "lucide-react"

export default function EnhancedAdminDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1247,
    revenue: 452000,
    orders: 89,
    systemLoad: 68
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        revenue: prev.revenue + Math.floor(Math.random() * 1000 - 500),
        orders: prev.orders + Math.floor(Math.random() * 3 - 1),
        systemLoad: Math.max(0, Math.min(100, prev.systemLoad + Math.floor(Math.random() * 6 - 3)))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/admin/enhanced", icon: <TrendingUp className="w-4 h-4" />, active: true },
    { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" />, badge: "156" },
    { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Building className="w-4 h-4" />, badge: "89" },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Support", href: "/dashboard/admin/support", icon: <MessageCircle className="w-4 h-4" />, badge: "12" },
    { label: "System", href: "/dashboard/admin/system", icon: <Server className="w-4 h-4" /> },
    { label: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ]

  const kpiData = [
    {
      title: "Total Revenue",
      value: `₹${(realTimeData.revenue / 1000).toFixed(1)}K`,
      change: "+18.5%",
      trend: "up",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Monthly recurring revenue"
    },
    {
      title: "Active Users",
      value: realTimeData.activeUsers.toLocaleString(),
      change: "+12.3%",
      trend: "up",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Currently online users"
    },
    {
      title: "New Orders",
      value: realTimeData.orders.toString(),
      change: "+8.7%",
      trend: "up",
      icon: <Calendar className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Orders in last 24h"
    },
    {
      title: "System Load",
      value: `${realTimeData.systemLoad}%`,
      change: "-2.1%",
      trend: "down",
      icon: <Activity className="w-6 h-6" />,
      color: realTimeData.systemLoad > 80 ? "text-red-600" : "text-orange-600",
      bgColor: realTimeData.systemLoad > 80 ? "bg-red-100" : "bg-orange-100",
      description: "Current server utilization"
    },
  ]

  const revenueChartData = [
    { label: "Jan", value: 285000, trend: 12 },
    { label: "Feb", value: 320000, trend: 15 },
    { label: "Mar", value: 375000, trend: 18 },
    { label: "Apr", value: 420000, trend: 22 },
    { label: "May", value: 485000, trend: 25 },
    { label: "Jun", value: 520000, trend: 28 },
  ]

  const userGrowthData = [
    { label: "Week 1", value: 1200 },
    { label: "Week 2", value: 1350 },
    { label: "Week 3", value: 1480 },
    { label: "Week 4", value: 1620 },
  ]

  const categoryData = [
    { label: "Photography", value: 35, color: "#3B82F6" },
    { label: "Venues", value: 28, color: "#10B981" },
    { label: "Catering", value: 22, color: "#F59E0B" },
    { label: "Decorations", value: 15, color: "#EF4444" },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="w-4 h-4 text-green-600" />
      case "down":
        return <ArrowDownRight className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <EnhancedDashboardLayout menuItems={menuItems} userRole="admin">
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's what's happening with your platform today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2">
              <Plus className="w-4 h-4" />
              Quick Action
            </Button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {kpiData.map((kpi, index) => (
            <AdvancedCard
              key={index}
              variant="elevated"
              interactive
              className="group hover:shadow-xl transition-all duration-300"
            >
              <AdvancedCardContent padding="lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="flex items-center gap-1"
                      >
                        {getTrendIcon(kpi.trend)}
                        <span className={`text-sm font-medium ${
                          kpi.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}>
                          {kpi.change}
                        </span>
                      </motion.div>
                    </div>
                    <p className="text-xs text-gray-500">{kpi.description}</p>
                  </div>
                  <motion.div 
                    className={`p-4 rounded-2xl ${kpi.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <div className={kpi.color}>{kpi.icon}</div>
                  </motion.div>
                </div>
              </AdvancedCardContent>
            </AdvancedCard>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AdvancedChart
              data={revenueChartData}
              type="area"
              title="Revenue Trends"
              subtitle="Monthly revenue growth over time"
              height={350}
              animated
              gradient
              interactive
              className="shadow-lg"
            />
          </div>
          
          <AdvancedChart
            data={categoryData}
            type="donut"
            title="Service Categories"
            subtitle="Distribution by booking volume"
            height={350}
            animated
            interactive
            className="shadow-lg"
          />
        </motion.div>

        {/* Additional Charts */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdvancedChart
            data={userGrowthData}
            type="line"
            title="User Growth"
            subtitle="Weekly active user growth"
            height={300}
            animated
            interactive
            showGrid
            className="shadow-lg"
          />
          
          <AdvancedCard variant="glass" className="p-6">
            <AdvancedCardHeader>
              <AdvancedCardTitle>System Health</AdvancedCardTitle>
            </AdvancedCardHeader>
            <AdvancedCardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">CPU Usage</span>
                  </div>
                  <span className="text-sm text-gray-600">45%</span>
                </div>
                <Progress value={45} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MemoryStick className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Memory</span>
                  </div>
                  <span className="text-sm text-gray-600">68%</span>
                </div>
                <Progress value={68} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">Storage</span>
                  </div>
                  <span className="text-sm text-gray-600">34%</span>
                </div>
                <Progress value={34} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Network</span>
                  </div>
                  <span className="text-sm text-gray-600">28%</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
            </AdvancedCardContent>
          </AdvancedCard>
        </motion.div>
      </motion.div>
    </EnhancedDashboardLayout>
  )
}
