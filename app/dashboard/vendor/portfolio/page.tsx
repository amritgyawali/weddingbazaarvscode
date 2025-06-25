"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Camera,
  ImageIcon,
  Video,
  Upload,
  Download,
  Edit,
  Trash2,
  Eye,
  Share2,
  Heart,
  Star,
  Play,
  Maximize,
  Grid,
  List,
  Filter,
  Search,
  Plus,
  Folder,
  Tag,
  Calendar,
  User,
  TrendingUp,
  Settings,
  RefreshCw,
  Copy,
  Move,
} from "lucide-react"

export default function VendorPortfolioPage() {
  const [activeTab, setActiveTab] = useState("gallery")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const portfolioItems = [
    {
      id: "P001",
      title: "Anjali & Vikram Wedding",
      type: "photo",
      category: "wedding",
      date: "2024-07-15",
      venue: "Royal Palace Hotel",
      images: 150,
      views: 1250,
      likes: 89,
      shares: 23,
      featured: true,
      tags: ["wedding", "traditional", "outdoor"],
      thumbnail: "/placeholder.svg?height=300&width=400",
      description: "Beautiful traditional wedding ceremony with stunning outdoor photography",
    },
    {
      id: "P002",
      title: "Sneha & Arjun Pre-wedding",
      type: "photo",
      category: "pre-wedding",
      date: "2024-06-22",
      venue: "Sunset Gardens",
      images: 75,
      views: 890,
      likes: 67,
      shares: 15,
      featured: false,
      tags: ["pre-wedding", "romantic", "sunset"],
      thumbnail: "/placeholder.svg?height=300&width=400",
      description: "Romantic pre-wedding shoot during golden hour",
    },
    {
      id: "P003",
      title: "Meera & Karan Reception",
      type: "video",
      category: "reception",
      date: "2024-05-10",
      venue: "Grand Ballroom",
      duration: "12:30",
      views: 2100,
      likes: 156,
      shares: 45,
      featured: true,
      tags: ["reception", "dance", "celebration"],
      thumbnail: "/placeholder.svg?height=300&width=400",
      description: "Energetic reception celebration with amazing dance performances",
    },
  ]

  const categories = [
    { value: "all", label: "All Categories", count: 45 },
    { value: "wedding", label: "Weddings", count: 25 },
    { value: "pre-wedding", label: "Pre-wedding", count: 12 },
    { value: "reception", label: "Receptions", count: 8 },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Bookings", href: "/dashboard/vendor/bookings", icon: <Calendar className="w-4 h-4" /> },
    { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: <User className="w-4 h-4" /> },
    { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: <Camera className="w-4 h-4" />, active: true },
    { label: "Analytics", href: "/dashboard/vendor/analytics", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Payments", href: "/dashboard/vendor/payments", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Reviews", href: "/dashboard/vendor/reviews", icon: <Star className="w-4 h-4" /> },
    { label: "Profile", href: "/dashboard/vendor/profile", icon: <User className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="vendor">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
            <p className="text-gray-600">Showcase your best work and manage your portfolio</p>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Media
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Photos</p>
                      <p className="text-2xl font-bold">1,247</p>
                    </div>
                    <ImageIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Videos</p>
                      <p className="text-2xl font-bold">89</p>
                    </div>
                    <Video className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold">45.2K</p>
                    </div>
                    <Eye className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Likes</p>
                      <p className="text-2xl font-bold">3.8K</p>
                    </div>
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Controls */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search portfolio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label} ({category.count})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {portfolioItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {item.featured && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">Featured</Badge>
                    )}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-3">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {item.likes}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="albums" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Photo Albums</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Folder className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Wedding Collection</h4>
                        <p className="text-sm text-gray-600">245 photos</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Folder className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-medium">Pre-wedding Shoots</h4>
                        <p className="text-sm text-gray-600">89 photos</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Folder className="w-8 h-8 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Reception Events</h4>
                        <p className="text-sm text-gray-600">156 photos</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <div className="relative mb-3">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Wedding Highlight"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-3">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">Wedding Highlight Reel</h4>
                    <p className="text-sm text-gray-600 mb-2">Duration: 5:30</p>
                    <div className="flex gap-2">
                      <Button size="sm">Play</Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Share
                      </Button>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="relative mb-3">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Ceremony Coverage"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-3">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">Ceremony Coverage</h4>
                    <p className="text-sm text-gray-600 mb-2">Duration: 12:45</p>
                    <div className="flex gap-2">
                      <Button size="sm">Play</Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Share
                      </Button>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Work</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg?height=60&width=80"
                        alt="Featured"
                        className="w-20 h-15 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium">Anjali & Vikram Wedding</h4>
                        <p className="text-sm text-gray-600">1,250 views • 89 likes</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Remove Featured
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg?height=60&width=80"
                        alt="Featured"
                        className="w-20 h-15 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium">Meera & Karan Reception</h4>
                        <p className="text-sm text-gray-600">2,100 views • 156 likes</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Remove Featured
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Views</span>
                        <span className="font-medium">45,230</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Likes</span>
                        <span className="font-medium">3,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Shares</span>
                        <span className="font-medium">892</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Engagement Rate</span>
                        <span className="font-medium">8.5%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Top Performing Content</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Wedding Photography</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pre-wedding Shoots</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reception Videos</span>
                        <span className="font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 20 Portfolio Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-sm">Bulk Upload</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Download className="w-6 h-6 mb-2" />
                <span className="text-sm">Export Gallery</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Edit className="w-6 h-6 mb-2" />
                <span className="text-sm">Batch Edit</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Tag className="w-6 h-6 mb-2" />
                <span className="text-sm">Auto Tag</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Share2 className="w-6 h-6 mb-2" />
                <span className="text-sm">Social Share</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Copy className="w-6 h-6 mb-2" />
                <span className="text-sm">Duplicate</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Move className="w-6 h-6 mb-2" />
                <span className="text-sm">Move to Album</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Star className="w-6 h-6 mb-2" />
                <span className="text-sm">Feature Item</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Filter className="w-6 h-6 mb-2" />
                <span className="text-sm">Apply Filter</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <RefreshCw className="w-6 h-6 mb-2" />
                <span className="text-sm">Sync Cloud</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Settings className="w-6 h-6 mb-2" />
                <span className="text-sm">Watermark</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Maximize className="w-6 h-6 mb-2" />
                <span className="text-sm">Resize Images</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Eye className="w-6 h-6 mb-2" />
                <span className="text-sm">Preview Mode</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Folder className="w-6 h-6 mb-2" />
                <span className="text-sm">Create Album</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="text-sm">Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Heart className="w-6 h-6 mb-2" />
                <span className="text-sm">Like Tracker</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Video className="w-6 h-6 mb-2" />
                <span className="text-sm">Video Editor</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Camera className="w-6 h-6 mb-2" />
                <span className="text-sm">Photo Editor</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Search className="w-6 h-6 mb-2" />
                <span className="text-sm">Smart Search</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Trash2 className="w-6 h-6 mb-2" />
                <span className="text-sm">Bulk Delete</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
