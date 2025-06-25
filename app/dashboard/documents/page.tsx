"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  FileText,
  Upload,
  Download,
  Share,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  Folder,
  File,
  ImageIcon,
  Video,
  Archive,
  Clock,
  Users,
  Settings,
  TrendingUp,
  Gift,
  Heart,
  CalendarIcon,
  Shield,
} from "lucide-react"

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Wedding Venue Contract.pdf",
      type: "contract",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      category: "Contracts",
      status: "signed",
      sharedWith: ["Rahul", "Wedding Planner"],
      tags: ["venue", "contract", "important"],
      version: "v2.1",
    },
    {
      id: 2,
      name: "Photographer Agreement.pdf",
      type: "contract",
      size: "1.8 MB",
      uploadDate: "2024-01-20",
      category: "Contracts",
      status: "pending",
      sharedWith: ["Photographer"],
      tags: ["photography", "contract"],
      version: "v1.0",
    },
    {
      id: 3,
      name: "Guest List.xlsx",
      type: "spreadsheet",
      size: "156 KB",
      uploadDate: "2024-02-01",
      category: "Planning",
      status: "active",
      sharedWith: ["Family"],
      tags: ["guests", "planning"],
      version: "v3.2",
    },
    {
      id: 4,
      name: "Wedding Budget.xlsx",
      type: "spreadsheet",
      size: "89 KB",
      uploadDate: "2024-01-10",
      category: "Financial",
      status: "active",
      sharedWith: ["Rahul"],
      tags: ["budget", "financial"],
      version: "v2.5",
    },
  ])

  const [folders, setFolders] = useState([
    { name: "Contracts", count: 8, size: "15.2 MB", color: "bg-blue-100 text-blue-600" },
    { name: "Invoices", count: 12, size: "8.7 MB", color: "bg-green-100 text-green-600" },
    { name: "Photos", count: 156, size: "2.1 GB", color: "bg-purple-100 text-purple-600" },
    { name: "Planning Documents", count: 24, size: "45.8 MB", color: "bg-orange-100 text-orange-600" },
    { name: "Legal Documents", count: 6, size: "12.3 MB", color: "bg-red-100 text-red-600" },
    { name: "Vendor Information", count: 18, size: "28.9 MB", color: "bg-teal-100 text-teal-600" },
  ])

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "My Wedding", href: "/dashboard/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/budget", icon: <Gift className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/timeline", icon: <CalendarIcon className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/documents", icon: <Settings className="w-4 h-4" />, active: true },
    { label: "Messages", href: "/dashboard/messages", icon: <Settings className="w-4 h-4" /> },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "contract":
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />
      case "spreadsheet":
        return <File className="w-5 h-5 text-green-500" />
      case "image":
        return <ImageIcon className="w-5 h-5 text-purple-500" />
      case "video":
        return <Video className="w-5 h-5 text-blue-500" />
      default:
        return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "active":
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
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Document Management 📄</h1>
          <p className="text-green-100">Organize, store, and manage all your wedding documents securely</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="sharing">Sharing</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Storage Stats */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">2.8 GB</div>
                  <Progress value={56} className="mt-2" />
                  <p className="text-xs text-gray-600 mt-1">2.2 GB remaining</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">224</div>
                  <p className="text-xs text-gray-600">Across 6 categories</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Shared Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">18</div>
                  <p className="text-xs text-gray-600">With 8 people</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending Signatures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <p className="text-xs text-gray-600">Contracts awaiting</p>
                </CardContent>
              </Card>
            </div>

            {/* Folders Grid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Document Folders</span>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Folder
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {folders.map((folder, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg ${folder.color} flex items-center justify-center`}>
                            <Folder className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-medium">{folder.name}</h4>
                            <p className="text-sm text-gray-600">
                              {folder.count} files • {folder.size}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.slice(0, 4).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getFileIcon(doc.type)}
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                            <span className="text-xs text-gray-500">{doc.size}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{doc.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Document Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { name: "Upload Files", icon: <Upload className="w-5 h-5" />, color: "bg-blue-100 text-blue-600" },
                { name: "Create Folder", icon: <Folder className="w-5 h-5" />, color: "bg-green-100 text-green-600" },
                {
                  name: "Bulk Download",
                  icon: <Download className="w-5 h-5" />,
                  color: "bg-purple-100 text-purple-600",
                },
                {
                  name: "Share Documents",
                  icon: <Share className="w-5 h-5" />,
                  color: "bg-orange-100 text-orange-600",
                },
                { name: "Document Scanner", icon: <Eye className="w-5 h-5" />, color: "bg-red-100 text-red-600" },
                { name: "PDF Editor", icon: <Edit className="w-5 h-5" />, color: "bg-teal-100 text-teal-600" },
                {
                  name: "Version Control",
                  icon: <Clock className="w-5 h-5" />,
                  color: "bg-indigo-100 text-indigo-600",
                },
                {
                  name: "Digital Signatures",
                  icon: <Shield className="w-5 h-5" />,
                  color: "bg-pink-100 text-pink-600",
                },
                { name: "Backup & Sync", icon: <Archive className="w-5 h-5" />, color: "bg-gray-100 text-gray-600" },
                {
                  name: "Search Documents",
                  icon: <Search className="w-5 h-5" />,
                  color: "bg-yellow-100 text-yellow-600",
                },
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

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search documents..." className="pl-10 w-64" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="contracts">Contracts</SelectItem>
                    <SelectItem value="invoices">Invoices</SelectItem>
                    <SelectItem value="photos">Photos</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Size</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Upload Date</th>
                        <th className="text-left p-4">Shared With</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr key={doc.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {getFileIcon(doc.type)}
                              <div>
                                <h4 className="font-medium">{doc.name}</h4>
                                <p className="text-sm text-gray-600">{doc.version}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{doc.category}</Badge>
                          </td>
                          <td className="p-4 text-sm">{doc.size}</td>
                          <td className="p-4">
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                          </td>
                          <td className="p-4 text-sm">{doc.uploadDate}</td>
                          <td className="p-4 text-sm">{doc.sharedWith.length} people</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share className="w-4 h-4" />
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

            {/* Document Management Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "File Organizer",
                "Batch Upload",
                "Auto Categorization",
                "Duplicate Finder",
                "File Converter",
                "OCR Scanner",
                "Metadata Editor",
                "File Compression",
                "Watermark Tool",
                "File Encryption",
                "Bulk Rename",
                "File Recovery",
                "Storage Optimizer",
                "File Merger",
                "Document Templates",
                "File Validator",
                "Thumbnail Generator",
                "File Indexing",
                "Smart Search",
                "File Analytics",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <FileText className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Contract Management</span>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Contract
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents
                    .filter((doc) => doc.type === "contract")
                    .map((contract) => (
                      <div key={contract.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{contract.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
                                <span className="text-sm text-gray-600">{contract.uploadDate}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-2">
                                {contract.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Shield className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Contract Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Contract Builder",
                "Template Library",
                "Digital Signatures",
                "Contract Review",
                "Amendment Tracker",
                "Renewal Alerts",
                "Compliance Check",
                "Contract Analytics",
                "Negotiation Tools",
                "Legal Templates",
                "Clause Library",
                "Risk Assessment",
                "Contract Comparison",
                "Approval Workflow",
                "Contract Archive",
                "Performance Tracking",
                "Payment Terms",
                "Milestone Tracking",
                "Contract Reports",
                "Legal Compliance",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Shield className="w-6 h-6 text-red-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Storage Tab */}
          <TabsContent value="storage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Storage Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Photos & Videos</span>
                      <span className="font-medium">2.1 GB</span>
                    </div>
                    <Progress value={70} />
                    <div className="flex items-center justify-between">
                      <span>Documents</span>
                      <span className="font-medium">456 MB</span>
                    </div>
                    <Progress value={30} />
                    <div className="flex items-center justify-between">
                      <span>Contracts</span>
                      <span className="font-medium">234 MB</span>
                    </div>
                    <Progress value={20} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Storage Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Auto Backup</Label>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Cloud Sync</Label>
                    <Button variant="outline" size="sm">
                      Active
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>File Compression</Label>
                    <Button variant="outline" size="sm">
                      On
                    </Button>
                  </div>
                  <Button className="w-full">Upgrade Storage</Button>
                </CardContent>
              </Card>
            </div>

            {/* Storage Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Storage Analyzer",
                "File Cleanup",
                "Duplicate Remover",
                "Compression Tool",
                "Backup Manager",
                "Cloud Sync",
                "Storage Optimizer",
                "Archive Manager",
                "File Recovery",
                "Storage Monitor",
                "Quota Manager",
                "Auto Cleanup",
                "Storage Reports",
                "File Migration",
                "Storage Alerts",
                "Backup Scheduler",
                "Version Control",
                "Storage Security",
                "Access Control",
                "Storage Analytics",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Archive className="w-6 h-6 text-teal-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sharing Tab */}
          <TabsContent value="sharing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shared Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents
                    .filter((doc) => doc.sharedWith.length > 0)
                    .map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          {getFileIcon(doc.type)}
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-gray-600">Shared with: {doc.sharedWith.join(", ")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Users className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Sharing Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Share Manager",
                "Permission Control",
                "Link Sharing",
                "Access Logs",
                "Share Analytics",
                "Collaboration Tools",
                "Comment System",
                "Review Workflow",
                "Approval Process",
                "Share Notifications",
                "Guest Access",
                "Team Sharing",
                "Public Links",
                "Password Protection",
                "Expiry Settings",
                "Download Tracking",
                "Share Reports",
                "Access Control",
                "Share Templates",
                "Bulk Sharing",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Share className="w-6 h-6 text-purple-500 mx-auto mb-2" />
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
                "Document Creator",
                "PDF Generator",
                "File Converter",
                "OCR Scanner",
                "Digital Signatures",
                "Watermark Tool",
                "Document Merger",
                "Page Splitter",
                "Form Builder",
                "Template Designer",
                "Batch Processor",
                "File Validator",
                "Metadata Editor",
                "Document Viewer",
                "Annotation Tool",
                "Version Compare",
                "Document Search",
                "Auto Categorizer",
                "Workflow Builder",
                "Integration Hub",
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
