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
  File,
  FileCheck,
  FileX,
  FolderOpen,
  FolderPlus,
  CloudUpload,
  HardDrive,
  Lock,
  Unlock,
  Link,
} from "lucide-react"

export default function CustomerDocumentsPage() {
  const [activeTab, setActiveTab] = useState("all-documents")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const documentStats = [
    {
      title: "Total Documents",
      value: "24",
      change: "+6",
      icon: <FileText className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Contracts",
      value: "8",
      change: "+2",
      icon: <FileCheck className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Photos",
      value: "12",
      change: "+4",
      icon: <Image className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Storage Used",
      value: "2.4 GB",
      change: "+0.8 GB",
      icon: <HardDrive className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const documentCategories = [
    { name: "Contracts", count: 8, icon: <FileCheck className="w-5 h-5" />, color: "bg-green-100 text-green-800" },
    { name: "Invoices", count: 6, icon: <FileText className="w-5 h-5" />, color: "bg-blue-100 text-blue-800" },
    { name: "Photos", count: 12, icon: <Image className="w-5 h-5" />, color: "bg-purple-100 text-purple-800" },
    { name: "Videos", count: 3, icon: <Video className="w-5 h-5" />, color: "bg-red-100 text-red-800" },
    { name: "Spreadsheets", count: 4, icon: <BarChart3 className="w-5 h-5" />, color: "bg-yellow-100 text-yellow-800" },
    { name: "Other", count: 5, icon: <File className="w-5 h-5" />, color: "bg-gray-100 text-gray-800" },
  ]

  const recentDocuments = [
    {
      id: 1,
      name: "Wedding Venue Contract - Royal Palace Hotel.pdf",
      type: "contract",
      size: "2.4 MB",
      uploadDate: "2024-08-15",
      category: "Contracts",
      status: "signed",
      sharedWith: ["Rahul", "Wedding Planner"],
      tags: ["venue", "contract", "important"],
    },
    {
      id: 2,
      name: "Photography Package Invoice.pdf",
      type: "invoice",
      size: "1.2 MB",
      uploadDate: "2024-08-18",
      category: "Invoices",
      status: "paid",
      sharedWith: ["Accountant"],
      tags: ["photography", "invoice", "paid"],
    },
    {
      id: 3,
      name: "Engagement Photos - Album 1.zip",
      type: "photos",
      size: "45.6 MB",
      uploadDate: "2024-08-20",
      category: "Photos",
      status: "processed",
      sharedWith: ["Family", "Friends"],
      tags: ["engagement", "photos", "memories"],
    },
    {
      id: 4,
      name: "Guest List Spreadsheet.xlsx",
      type: "spreadsheet",
      size: "856 KB",
      uploadDate: "2024-08-22",
      category: "Spreadsheets",
      status: "updated",
      sharedWith: ["Rahul", "Parents"],
      tags: ["guests", "rsvp", "planning"],
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/customer", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/customer/budget", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/customer/documents", icon: <FileText className="w-4 h-4" />, active: true },
    { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "contract":
      case "pdf":
        return <FileText className="w-8 h-8 text-red-600" />
      case "photos":
      case "image":
        return <Image className="w-8 h-8 text-purple-600" />
      case "video":
        return <Video className="w-8 h-8 text-blue-600" />
      case "spreadsheet":
        return <BarChart3 className="w-8 h-8 text-green-600" />
      case "invoice":
        return <FileText className="w-8 h-8 text-orange-600" />
      default:
        return <File className="w-8 h-8 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed":
      case "paid":
      case "processed":
        return "bg-green-100 text-green-800"
      case "pending":
      case "review":
        return "bg-yellow-100 text-yellow-800"
      case "updated":
        return "bg-blue-100 text-blue-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
            <p className="text-gray-600">Organize and manage your wedding documents</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FolderPlus className="w-4 h-4 mr-2" />
              New Folder
            </Button>
            <Button className="bg-pink-600 hover:bg-pink-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Documents
            </Button>
          </div>
        </div>

        {/* Document Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documentStats.map((stat, index) => (
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

        {/* Document Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {documentCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
                <p className="text-xs text-gray-600">{category.count} files</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-documents">All Documents</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="all-documents" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search documents by name, type, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="contracts">Contracts</SelectItem>
                      <SelectItem value="invoices">Invoices</SelectItem>
                      <SelectItem value="photos">Photos</SelectItem>
                      <SelectItem value="videos">Videos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <div className="grid gap-4">
              {recentDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                          {getFileIcon(doc.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{doc.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>{doc.size}</span>
                            <span>Uploaded: {doc.uploadDate}</span>
                            <span>Category: {doc.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                            <span className="text-sm text-gray-500">
                              Shared with: {doc.sharedWith.join(", ")}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {doc.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Wedding Contracts</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Contract
              </Button>
            </div>

            <div className="grid gap-4">
              {recentDocuments.filter(doc => doc.type === 'contract').map((contract) => (
                <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center">
                          <FileCheck className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{contract.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>Size: {contract.size}</span>
                            <span>Signed: {contract.uploadDate}</span>
                            <span>Vendor: Royal Palace Hotel</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">Signed</Badge>
                            <Badge variant="outline">Active</Badge>
                            <Badge variant="outline">Important</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600 mb-2">₹3,50,000</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download
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
                <CardTitle>Contract Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <FileCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">6</div>
                    <div className="text-sm text-gray-600">Signed Contracts</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="font-semibold">2</div>
                    <div className="text-sm text-gray-600">Pending Review</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">₹6.5L</div>
                    <div className="text-sm text-gray-600">Total Contract Value</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shared" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Shared Documents</h2>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share New Document
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Shared with Rahul</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Venue Contract</span>
                      <Badge className="bg-green-100 text-green-800">Viewed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Guest List</span>
                      <Badge className="bg-blue-100 text-blue-800">Editing</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Budget Spreadsheet</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Shared with Family</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Engagement Photos</span>
                      <Badge className="bg-green-100 text-green-800">Downloaded</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Wedding Invitation</span>
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Venue Details</span>
                      <Badge className="bg-blue-100 text-blue-800">Viewed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Shared with Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Event Timeline</span>
                      <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Guest Count</span>
                      <Badge className="bg-blue-100 text-blue-800">Updated</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Special Requirements</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Document Management Tools</h2>
              <p className="text-gray-600">Comprehensive tools to organize and manage your wedding documents</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Document Management Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <FileText className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Document Viewer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <Upload className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">File Upload</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <FolderOpen className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Folder Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Share2 className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Document Sharing</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Download className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Bulk Download</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <Search className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Document Search</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <Filter className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Smart Filters</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Archive className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Archive Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <Lock className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Security Settings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <CloudUpload className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Cloud Sync</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <FileCheck className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Contract Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Bookmark className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Document Tags</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Copy className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Duplicate Finder</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Printer className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Print Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Link className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Link Generator</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <HardDrive className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Storage Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <RefreshCw className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Auto Backup</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Eye className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Preview Generator</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <BarChart3 className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Usage Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Shield className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Access Control</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
