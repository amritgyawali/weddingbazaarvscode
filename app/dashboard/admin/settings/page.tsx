"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
  Sliders,
  ToggleLeft,
  ToggleRight,
  Wrench,
  Cog,
  Tool,
  Hammer,
} from "lucide-react"

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)

  const settingsCategories = [
    { name: "General Settings", count: 12, icon: <Settings className="w-5 h-5" />, color: "bg-blue-100 text-blue-800" },
    { name: "Security", count: 8, icon: <Shield className="w-5 h-5" />, color: "bg-red-100 text-red-800" },
    { name: "Notifications", count: 6, icon: <Bell className="w-5 h-5" />, color: "bg-yellow-100 text-yellow-800" },
    { name: "Payment", count: 10, icon: <CreditCard className="w-5 h-5" />, color: "bg-green-100 text-green-800" },
    { name: "Email", count: 5, icon: <Mail className="w-5 h-5" />, color: "bg-purple-100 text-purple-800" },
    { name: "API", count: 7, icon: <Database className="w-5 h-5" />, color: "bg-orange-100 text-orange-800" },
  ]

  const recentChanges = [
    {
      setting: "Commission Rate",
      oldValue: "12%",
      newValue: "15%",
      changedBy: "Admin",
      timestamp: "2024-08-20 14:30",
    },
    {
      setting: "Email Notifications",
      oldValue: "Disabled",
      newValue: "Enabled",
      changedBy: "System",
      timestamp: "2024-08-20 12:15",
    },
    {
      setting: "Maintenance Mode",
      oldValue: "Enabled",
      newValue: "Disabled",
      changedBy: "Admin",
      timestamp: "2024-08-20 10:45",
    },
    {
      setting: "Auto Backup",
      oldValue: "Daily",
      newValue: "Hourly",
      changedBy: "Admin",
      timestamp: "2024-08-19 16:20",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/admin", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Building className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Support", href: "/dashboard/admin/support", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "System", href: "/dashboard/admin/system", icon: <Server className="w-4 h-4" /> },
    { label: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="w-4 h-4" />, active: true },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
            <p className="text-gray-600">Configure and manage platform-wide settings</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {settingsCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
                <p className="text-xs text-gray-600">{category.count} settings</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Platform Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="platform-name">Platform Name</Label>
                      <Input id="platform-name" defaultValue="Wedding Bazaar" />
                    </div>
                    <div>
                      <Label htmlFor="platform-url">Platform URL</Label>
                      <Input id="platform-url" defaultValue="https://weddingbazaar.com" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="platform-description">Platform Description</Label>
                    <Textarea 
                      id="platform-description" 
                      defaultValue="India's premier wedding planning platform connecting couples with trusted vendors"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                      <Input id="commission-rate" type="number" defaultValue="15" />
                    </div>
                    <div>
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select defaultValue="inr">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                          <SelectItem value="usd">US Dollar ($)</SelectItem>
                          <SelectItem value="eur">Euro (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <p className="text-sm text-gray-600">Enable to put the platform in maintenance mode</p>
                      </div>
                      <Switch 
                        id="maintenance-mode" 
                        checked={maintenanceMode}
                        onCheckedChange={setMaintenanceMode}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-backup">Auto Backup</Label>
                        <p className="text-sm text-gray-600">Automatically backup data daily</p>
                      </div>
                      <Switch 
                        id="auto-backup" 
                        checked={autoBackup}
                        onCheckedChange={setAutoBackup}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentChanges.map((change, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm">{change.setting}</h4>
                        <div className="text-xs text-gray-600 mt-1">
                          <span className="line-through">{change.oldValue}</span> → <span className="font-medium">{change.newValue}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                          <span>By {change.changedBy}</span>
                          <span>{change.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                  <div>
                    <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                    <Input id="max-login-attempts" type="number" defaultValue="5" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Password Complexity</Label>
                      <p className="text-sm text-gray-600">Enforce strong password requirements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>IP Whitelist</Label>
                      <p className="text-sm text-gray-600">Restrict admin access to specific IPs</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SSL Enforcement</Label>
                      <p className="text-sm text-gray-600">Force HTTPS for all connections</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div>
                  <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                  <Textarea
                    id="allowed-ips"
                    placeholder="Enter IP addresses, one per line"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Send notifications via email</p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Send notifications via SMS</p>
                    </div>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-600">Send browser push notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Alerts</Label>
                      <p className="text-sm text-gray-600">Critical system notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp-server">SMTP Server</Label>
                    <Input id="smtp-server" defaultValue="smtp.gmail.com" />
                  </div>
                  <div>
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input id="smtp-port" type="number" defaultValue="587" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input id="smtp-username" defaultValue="noreply@weddingbazaar.com" />
                  </div>
                  <div>
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input id="smtp-password" type="password" defaultValue="••••••••" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Payment Gateway</h3>
                  <p className="text-sm text-gray-600 mb-4">Razorpay, Stripe, PayPal integration</p>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">Configure</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email Service</h3>
                  <p className="text-sm text-gray-600 mb-4">SendGrid, Mailgun integration</p>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">Configure</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">SMS Service</h3>
                  <p className="text-sm text-gray-600 mb-4">Twilio, AWS SNS integration</p>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">Setup</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Cloud className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Cloud Storage</h3>
                  <p className="text-sm text-gray-600 mb-4">AWS S3, Google Cloud integration</p>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">Configure</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600 mb-4">Google Analytics, Mixpanel</p>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">Configure</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Share2 className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Social Media</h3>
                  <p className="text-sm text-gray-600 mb-4">Facebook, Instagram, WhatsApp</p>
                  <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">Setup</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Settings Management Tools</h2>
              <p className="text-gray-600">Comprehensive tools for platform configuration and management</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Settings Management Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Settings className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">General Settings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <Shield className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Security Config</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <Bell className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Notifications</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <CreditCard className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Payment Settings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Mail className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Email Config</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <Database className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">API Settings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <Users className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">User Preferences</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Palette className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Theme Settings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <Globe className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Localization</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Archive className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Backup Settings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Key className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">API Keys</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Sliders className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Advanced Config</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Monitor className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Display Settings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Clock className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Time Zone</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Share2 className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Integration Hub</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <FileText className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Terms & Policies</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <RefreshCw className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Reset Options</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Download className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Export Settings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Upload className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Import Settings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Wrench className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">System Tools</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
