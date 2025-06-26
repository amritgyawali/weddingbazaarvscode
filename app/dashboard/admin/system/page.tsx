"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Power,
  PowerOff,
  Play,
  Pause,
  Stop,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Thermometer,
  Gauge,
  CloudOff,
  Cloud,
  CloudRain,
  Sun,
  Moon,
} from "lucide-react"

export default function AdminSystemPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [refreshInterval, setRefreshInterval] = useState("30s")

  const systemStats = [
    {
      title: "Server Uptime",
      value: "99.98%",
      change: "+0.02%",
      icon: <Server className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "CPU Usage",
      value: "45.2%",
      change: "-2.1%",
      icon: <Cpu className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Memory Usage",
      value: "68.4%",
      change: "+1.5%",
      icon: <MemoryStick className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Disk Usage",
      value: "34.7%",
      change: "+0.8%",
      icon: <HardDrive className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const serverMetrics = [
    { name: "Web Server", status: "online", cpu: 42, memory: 65, uptime: "15d 8h" },
    { name: "Database Server", status: "online", cpu: 38, memory: 72, uptime: "15d 8h" },
    { name: "Cache Server", status: "online", cpu: 25, memory: 45, uptime: "15d 8h" },
    { name: "File Server", status: "maintenance", cpu: 0, memory: 0, uptime: "0h" },
  ]

  const systemLogs = [
    {
      timestamp: "2024-08-20 14:30:25",
      level: "info",
      service: "Web Server",
      message: "Application started successfully",
      details: "All services initialized",
    },
    {
      timestamp: "2024-08-20 14:25:18",
      level: "warning",
      service: "Database",
      message: "High connection count detected",
      details: "Current connections: 485/500",
    },
    {
      timestamp: "2024-08-20 14:20:12",
      level: "error",
      service: "Payment Gateway",
      message: "API timeout occurred",
      details: "Request timeout after 30 seconds",
    },
    {
      timestamp: "2024-08-20 14:15:05",
      level: "info",
      service: "Cache Server",
      message: "Cache cleared successfully",
      details: "Memory usage reduced to 45%",
    },
  ]

  const backupStatus = [
    { name: "Database Backup", lastRun: "2024-08-20 02:00", status: "success", size: "2.4 GB" },
    { name: "File Backup", lastRun: "2024-08-20 03:00", status: "success", size: "8.7 GB" },
    { name: "Config Backup", lastRun: "2024-08-20 01:00", status: "success", size: "45 MB" },
    { name: "Log Backup", lastRun: "2024-08-19 23:00", status: "failed", size: "0 MB" },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/admin", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Building className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Support", href: "/dashboard/admin/support", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "System", href: "/dashboard/admin/system", icon: <Server className="w-4 h-4" />, active: true },
    { label: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "offline":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "warning":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "bg-blue-100 text-blue-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "debug":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getBackupStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Management</h1>
            <p className="text-gray-600">Monitor and manage system infrastructure and performance</p>
          </div>
          <div className="flex gap-3">
            <Select value={refreshInterval} onValueChange={setRefreshInterval}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10s">10 seconds</SelectItem>
                <SelectItem value="30s">30 seconds</SelectItem>
                <SelectItem value="1m">1 minute</SelectItem>
                <SelectItem value="5m">5 minutes</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
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
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>CPU Usage</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-32" />
                      <span className="text-sm font-semibold">45.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Memory Usage</span>
                    <div className="flex items-center gap-2">
                      <Progress value={68} className="w-32" />
                      <span className="text-sm font-semibold">68.4%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Disk Usage</span>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="w-32" />
                      <span className="text-sm font-semibold">34.7%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Network I/O</span>
                    <div className="flex items-center gap-2">
                      <Progress value={28} className="w-32" />
                      <span className="text-sm font-semibold">28.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Server className="w-4 h-4 mr-2" />
                    Restart Services
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    Database Backup
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Monitor className="w-4 h-4 mr-2" />
                    System Monitor
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Server Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {serverMetrics.map((server, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Server className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{server.name}</h4>
                            <p className="text-sm text-gray-600">Uptime: {server.uptime}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(server.status)}>{server.status}</Badge>
                          <div className="text-sm text-gray-600 mt-1">
                            CPU: {server.cpu}% | RAM: {server.memory}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent System Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemLogs.slice(0, 4).map((log, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getLogLevelColor(log.level)}>{log.level}</Badge>
                          <span className="text-sm text-gray-500">{log.timestamp}</span>
                        </div>
                        <h4 className="font-medium text-sm">{log.service}: {log.message}</h4>
                        <p className="text-sm text-gray-600">{log.details}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="servers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Server Infrastructure</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Server
              </Button>
            </div>

            <div className="grid gap-6">
              {serverMetrics.map((server, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Server className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{server.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>Uptime: {server.uptime}</span>
                            <span>CPU: {server.cpu}%</span>
                            <span>Memory: {server.memory}%</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getStatusColor(server.status)}>{server.status}</Badge>
                            {server.status === 'online' && (
                              <Badge variant="outline">Healthy</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Monitor className="w-4 h-4 mr-1" />
                            Monitor
                          </Button>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Restart
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4 mr-1" />
                            Configure
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">CPU</span>
                            <Progress value={server.cpu} className="h-2 mt-1" />
                          </div>
                          <div>
                            <span className="text-gray-600">Memory</span>
                            <Progress value={server.memory} className="h-2 mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">System Logs</h2>
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Log Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {systemLogs.map((log, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge className={getLogLevelColor(log.level)}>{log.level.toUpperCase()}</Badge>
                          <span className="font-medium">{log.service}</span>
                        </div>
                        <span className="text-sm text-gray-500">{log.timestamp}</span>
                      </div>
                      <h4 className="font-medium mb-1">{log.message}</h4>
                      <p className="text-sm text-gray-600">{log.details}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Backup Management</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Run Backup
              </Button>
            </div>

            <div className="grid gap-4">
              {backupStatus.map((backup, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Database className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{backup.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Last Run: {backup.lastRun}</span>
                            <span>Size: {backup.size}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge className={getBackupStatusColor(backup.status)}>{backup.status}</Badge>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-1" />
                            Run
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4 mr-1" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Backup Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Database Backup</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Daily at 2:00 AM</Badge>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>File Backup</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Daily at 3:00 AM</Badge>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Config Backup</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Daily at 1:00 AM</Badge>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">System Administration Tools</h2>
              <p className="text-gray-600">Comprehensive tools for system monitoring and management</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 System Administration Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Server className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Server Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <Database className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Database Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <Monitor className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Performance Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <HardDrive className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Disk Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Cpu className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">CPU Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <MemoryStick className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Memory Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <Network className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Network Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <FileText className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Log Analyzer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <Archive className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Backup Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <RefreshCw className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Service Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Shield className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Security Scanner</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <AlertTriangle className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Alert Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Activity className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">System Health</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Power className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Power Management</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Thermometer className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Temperature Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Gauge className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Load Balancer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Cloud className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Cloud Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Router className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Network Config</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Key className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Access Control</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Settings className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">System Settings</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
