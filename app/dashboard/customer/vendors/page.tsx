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
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  UserCheck,
  UserPlus,
  Handshake,
  CreditCard,
  Calendar as CalendarIcon,
  MapPinIcon,
  StarIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react"

export default function CustomerVendorsPage() {
  const [activeTab, setActiveTab] = useState("search")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")

  const vendorCategories = [
    { name: "Photography", count: 45, icon: <Camera className="w-5 h-5" />, color: "bg-blue-100 text-blue-800" },
    { name: "Catering", count: 32, icon: <Users className="w-5 h-5" />, color: "bg-green-100 text-green-800" },
    { name: "Venues", count: 28, icon: <Building className="w-5 h-5" />, color: "bg-purple-100 text-purple-800" },
    { name: "Decorations", count: 38, icon: <Sparkles className="w-5 h-5" />, color: "bg-pink-100 text-pink-800" },
    { name: "Music & DJ", count: 25, icon: <Music className="w-5 h-5" />, color: "bg-orange-100 text-orange-800" },
    { name: "Makeup Artists", count: 22, icon: <Palette className="w-5 h-5" />, color: "bg-teal-100 text-teal-800" },
  ]

  const featuredVendors = [
    {
      id: 1,
      name: "Capture Moments Studio",
      category: "Photography",
      rating: 4.8,
      reviews: 156,
      price: "₹80,000 - ₹1,50,000",
      location: "Mumbai",
      image: "/vendors/photographer1.jpg",
      verified: true,
      featured: true,
      description: "Professional wedding photography with 10+ years experience",
      services: ["Wedding Photography", "Pre-wedding Shoots", "Videography"],
      availability: "Available",
    },
    {
      id: 2,
      name: "Royal Palace Hotel",
      category: "Venues",
      rating: 4.9,
      reviews: 89,
      price: "₹2,00,000 - ₹5,00,000",
      location: "Mumbai",
      image: "/vendors/venue1.jpg",
      verified: true,
      featured: true,
      description: "Luxury wedding venue with beautiful gardens and halls",
      services: ["Wedding Halls", "Garden Venues", "Catering"],
      availability: "Limited",
    },
    {
      id: 3,
      name: "Delicious Delights Catering",
      category: "Catering",
      rating: 4.7,
      reviews: 234,
      price: "₹800 - ₹1,500 per plate",
      location: "Mumbai",
      image: "/vendors/catering1.jpg",
      verified: true,
      featured: false,
      description: "Multi-cuisine catering with traditional and modern options",
      services: ["Indian Cuisine", "Continental", "Live Counters"],
      availability: "Available",
    },
  ]

  const myVendors = [
    {
      id: 1,
      name: "Capture Moments Studio",
      category: "Photography",
      status: "booked",
      amount: "₹1,20,000",
      bookingDate: "2024-08-15",
      weddingDate: "2024-12-15",
      contact: "+91 98765 43210",
    },
    {
      id: 2,
      name: "Royal Palace Hotel",
      category: "Venues",
      status: "confirmed",
      amount: "₹3,50,000",
      bookingDate: "2024-08-10",
      weddingDate: "2024-12-15",
      contact: "+91 98765 43211",
    },
    {
      id: 3,
      name: "Delicious Delights Catering",
      category: "Catering",
      status: "pending",
      amount: "₹1,80,000",
      bookingDate: "2024-08-20",
      weddingDate: "2024-12-15",
      contact: "+91 98765 43212",
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/customer", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/customer/budget", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Users className="w-4 h-4" />, active: true },
    { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/customer/documents", icon: <FileText className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "booked":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Limited":
        return "bg-yellow-100 text-yellow-800"
      case "Booked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
            <p className="text-gray-600">Find, book, and manage your wedding vendors</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved Vendors
            </Button>
            <Button className="bg-pink-600 hover:bg-pink-700">
              <Search className="w-4 h-4 mr-2" />
              Find Vendors
            </Button>
          </div>
        </div>

        {/* Vendor Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {vendorCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
                <p className="text-xs text-gray-600">{category.count} vendors</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search">Search Vendors</TabsTrigger>
            <TabsTrigger value="my-vendors">My Vendors</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Search Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search vendors by name, service, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                      <SelectItem value="venues">Venues</SelectItem>
                      <SelectItem value="decorations">Decorations</SelectItem>
                      <SelectItem value="music">Music & DJ</SelectItem>
                      <SelectItem value="makeup">Makeup Artists</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterLocation} onValueChange={setFilterLocation}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Vendors */}
            <div className="grid gap-6">
              {featuredVendors.map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                        <Building className="w-12 h-12 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold">{vendor.name}</h3>
                              {vendor.verified && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              {vendor.featured && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-2">{vendor.description}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {vendor.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Badge variant="secondary">{vendor.category}</Badge>
                              </span>
                              <span className="flex items-center gap-1">
                                <div className="flex">{renderStars(Math.floor(vendor.rating))}</div>
                                <span className="font-semibold">{vendor.rating}</span>
                                <span>({vendor.reviews} reviews)</span>
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {vendor.services.map((service, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600 mb-2">{vendor.price}</p>
                            <Badge className={getAvailabilityColor(vendor.availability)}>
                              {vendor.availability}
                            </Badge>
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Message
                              </Button>
                              <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                                <Handshake className="w-4 h-4 mr-1" />
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-vendors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Selected Vendors</h2>
              <Badge variant="secondary">{myVendors.length} vendors selected</Badge>
            </div>

            <div className="grid gap-4">
              {myVendors.map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{vendor.name}</h3>
                          <p className="text-gray-600">{vendor.category}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Booked: {vendor.bookingDate}</span>
                            <span>Wedding: {vendor.weddingDate}</span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {vendor.contact}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600 mb-2">{vendor.amount}</p>
                        <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-1" />
                            Contract
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Confirmed Bookings</h3>
                  <p className="text-3xl font-bold text-green-600">2</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Pending Bookings</h3>
                  <p className="text-3xl font-bold text-yellow-600">1</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Total Amount</h3>
                  <p className="text-3xl font-bold text-blue-600">₹6.5L</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Booking Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myVendors.map((vendor, index) => (
                    <div key={vendor.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{vendor.name}</h4>
                        <p className="text-sm text-gray-600">{vendor.category} • {vendor.amount}</p>
                      </div>
                      <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Vendor Management Tools</h2>
              <p className="text-gray-600">Tools to help you find, compare, and manage wedding vendors</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Vendor Management Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Search className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Vendor Search</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <Users className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Vendor Directory</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <BarChart3 className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Compare Vendors</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Star className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Reviews & Ratings</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Bookmark className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Saved Vendors</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <MessageCircle className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Vendor Chat</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <Calendar className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Booking Calendar</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <FileText className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Contract Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <DollarSign className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Payment Tracker</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Phone className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Contact Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <CheckCircle className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Vendor Checklist</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Award className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Vendor Awards</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <MapPin className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Location Finder</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Share2 className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Vendor Sharing</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Bell className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Vendor Alerts</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Download className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Export Data</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Target className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Vendor Goals</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Shield className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Vendor Verification</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <CreditCard className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Payment Gateway</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Handshake className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Vendor Relations</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
