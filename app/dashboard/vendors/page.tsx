"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Users,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Heart,
  Search,
  ContrastIcon as Compare,
  MessageCircle,
  Camera,
  Music,
  Utensils,
  Car,
  Home,
  Palette,
  Gift,
  TrendingUp,
  Eye,
  Share2,
  Bookmark,
} from "lucide-react"

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  const vendors = [
    {
      id: 1,
      name: "Capture Moments Studio",
      category: "Photography",
      rating: 4.9,
      reviews: 156,
      location: "Mumbai",
      price: "₹80,000 - ₹1,50,000",
      status: "booked",
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Wedding Photography", "Pre-wedding", "Candid"],
      availability: "Available",
      responseTime: "2 hours",
      completedWeddings: 200,
    },
    {
      id: 2,
      name: "Royal Banquet Hall",
      category: "Venue",
      rating: 4.8,
      reviews: 89,
      location: "Mumbai",
      price: "₹2,00,000 - ₹5,00,000",
      status: "booked",
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Wedding Venue", "Reception", "Catering"],
      availability: "Booked",
      responseTime: "1 hour",
      capacity: 300,
    },
    {
      id: 3,
      name: "Dream Decorations",
      category: "Decoration",
      rating: 4.7,
      reviews: 124,
      location: "Mumbai",
      price: "₹50,000 - ₹2,00,000",
      status: "shortlisted",
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Floral Decor", "Stage Design", "Lighting"],
      availability: "Available",
      responseTime: "3 hours",
      completedWeddings: 150,
    },
  ]

  const categories = [
    { name: "Photography", icon: <Camera className="w-4 h-4" />, count: 45 },
    { name: "Venue", icon: <Home className="w-4 h-4" />, count: 32 },
    { name: "Catering", icon: <Utensils className="w-4 h-4" />, count: 28 },
    { name: "Decoration", icon: <Palette className="w-4 h-4" />, count: 38 },
    { name: "Music", icon: <Music className="w-4 h-4" />, count: 22 },
    { name: "Transportation", icon: <Car className="w-4 h-4" />, count: 15 },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "My Wedding", href: "/dashboard/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/vendors", icon: <Users className="w-4 h-4" />, active: true },
    { label: "Budget", href: "/dashboard/budget", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/documents", icon: <Gift className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Vendor Management 🤝</h1>
          <p className="text-blue-100">Find, compare, and manage your wedding vendors</p>
        </div>

        <Tabs defaultValue="my-vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="my-vendors">My Vendors</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* My Vendors Tab */}
          <TabsContent value="my-vendors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors
                .filter((v) => v.status === "booked")
                .map((vendor) => (
                  <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{vendor.name}</h3>
                        <Badge className="bg-green-100 text-green-800">Booked</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{vendor.rating}</span>
                        <span className="text-sm text-gray-500">({vendor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{vendor.location}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Vendor Management Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Contract Manager",
                "Payment Tracker",
                "Communication Hub",
                "Performance Monitor",
                "Review System",
                "Booking Calendar",
                "Vendor Comparison",
                "Price Negotiator",
                "Service Tracker",
                "Quality Checker",
                "Timeline Sync",
                "Budget Allocator",
                "Vendor Ratings",
                "Feedback System",
                "Dispute Resolution",
                "Vendor Directory",
                "Recommendation Engine",
                "Availability Checker",
                "Service Customizer",
                "Vendor Analytics",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="venue">Venue</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                      <SelectItem value="decoration">Decoration</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="budget">Budget (Under ₹50K)</SelectItem>
                      <SelectItem value="mid">Mid-range (₹50K - ₹1L)</SelectItem>
                      <SelectItem value="premium">Premium (Above ₹1L)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className="text-blue-600">{category.icon}</div>
                    </div>
                    <p className="font-medium text-sm">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.count} vendors</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Vendor Discovery Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Smart Search",
                "AI Recommendations",
                "Price Comparison",
                "Availability Filter",
                "Rating Filter",
                "Location Mapper",
                "Service Filter",
                "Portfolio Viewer",
                "Video Previews",
                "Virtual Tours",
                "Instant Quotes",
                "Package Builder",
                "Bulk Inquiry",
                "Vendor Matching",
                "Style Finder",
                "Budget Optimizer",
                "Date Checker",
                "Capacity Filter",
                "Experience Level",
                "Specialty Search",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Search className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Shortlisted Tab */}
          <TabsContent value="shortlisted" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors
                .filter((v) => v.status === "shortlisted")
                .map((vendor) => (
                  <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{vendor.name}</h3>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{vendor.rating}</span>
                        <span className="text-sm text-gray-500">({vendor.reviews} reviews)</span>
                      </div>
                      <p className="text-sm font-medium text-green-600 mb-3">{vendor.price}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Book Now
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Compare className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Shortlist Management Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Shortlist Organizer",
                "Comparison Matrix",
                "Priority Ranking",
                "Notes Manager",
                "Pros & Cons",
                "Decision Helper",
                "Budget Comparison",
                "Availability Check",
                "Contact Manager",
                "Follow-up Tracker",
                "Proposal Collector",
                "Quote Analyzer",
                "Service Comparer",
                "Timeline Matcher",
                "Location Plotter",
                "Review Aggregator",
                "Portfolio Viewer",
                "Video Calls",
                "Site Visits",
                "Final Selection",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Bookmark className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Feature</th>
                        <th className="text-center p-4">Capture Moments</th>
                        <th className="text-center p-4">Dream Photos</th>
                        <th className="text-center p-4">Perfect Shots</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Price Range</td>
                        <td className="p-4 text-center">₹80K - ₹1.5L</td>
                        <td className="p-4 text-center">₹60K - ₹1.2L</td>
                        <td className="p-4 text-center">₹1L - ₹2L</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Rating</td>
                        <td className="p-4 text-center">4.9/5</td>
                        <td className="p-4 text-center">4.7/5</td>
                        <td className="p-4 text-center">4.8/5</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Experience</td>
                        <td className="p-4 text-center">8 years</td>
                        <td className="p-4 text-center">5 years</td>
                        <td className="p-4 text-center">10 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Side-by-Side Compare",
                "Feature Matrix",
                "Price Analyzer",
                "Rating Comparer",
                "Portfolio Compare",
                "Service Comparison",
                "Package Analyzer",
                "Value Calculator",
                "ROI Estimator",
                "Quality Scorer",
                "Timeline Comparer",
                "Availability Check",
                "Location Analysis",
                "Review Sentiment",
                "Experience Level",
                "Specialization Match",
                "Equipment Compare",
                "Team Size",
                "Backup Options",
                "Final Scorecard",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Compare className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      vendor: "Capture Moments Studio",
                      rating: 5,
                      date: "2024-01-15",
                      review: "Excellent photography service!",
                    },
                    {
                      vendor: "Royal Banquet Hall",
                      rating: 4,
                      date: "2024-01-10",
                      review: "Great venue with good facilities.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{review.vendor}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{review.review}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Write Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor to review" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photographer">Capture Moments Studio</SelectItem>
                      <SelectItem value="venue">Royal Banquet Hall</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                    ))}
                  </div>
                  <textarea className="w-full p-3 border rounded-lg" rows={4} placeholder="Write your review..." />
                  <Button>Submit Review</Button>
                </CardContent>
              </Card>
            </div>

            {/* Review Management Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Review Writer",
                "Rating System",
                "Photo Reviews",
                "Video Reviews",
                "Review Templates",
                "Review Scheduler",
                "Review Reminders",
                "Review Analytics",
                "Vendor Feedback",
                "Review Sharing",
                "Review History",
                "Review Editing",
                "Review Verification",
                "Review Responses",
                "Review Aggregator",
                "Sentiment Analysis",
                "Review Trends",
                "Review Comparison",
                "Review Export",
                "Review Backup",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
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
