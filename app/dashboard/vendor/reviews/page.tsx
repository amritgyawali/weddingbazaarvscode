"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
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
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Flag,
  Reply,
  StarHalf,
} from "lucide-react"

export default function VendorReviewsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [filterRating, setFilterRating] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const reviewStats = [
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.2",
      icon: <Star className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Reviews",
      value: "156",
      change: "+12",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "5-Star Reviews",
      value: "124",
      change: "+8",
      icon: <Award className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Response Rate",
      value: "95%",
      change: "+5%",
      icon: <Reply className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const recentReviews = [
    {
      id: "REV001",
      client: "Anjali & Vikram",
      rating: 5,
      date: "2024-08-15",
      service: "Wedding Photography",
      review: "Absolutely amazing work! The photographer captured every precious moment beautifully. Highly recommended!",
      photos: 3,
      helpful: 12,
      responded: true,
    },
    {
      id: "REV002",
      client: "Sneha & Arjun",
      rating: 4,
      date: "2024-08-12",
      service: "Pre-wedding Shoot",
      review: "Great experience overall. The photos came out wonderful and the team was very professional.",
      photos: 2,
      helpful: 8,
      responded: false,
    },
    {
      id: "REV003",
      client: "Priya & Rahul",
      rating: 5,
      date: "2024-08-10",
      service: "Wedding Videography",
      review: "Outstanding service! The video quality is exceptional and they captured all the important moments perfectly.",
      photos: 1,
      helpful: 15,
      responded: true,
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/vendor", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Bookings", href: "/dashboard/vendor/bookings", icon: <Calendar className="w-4 h-4" /> },
    { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: <Camera className="w-4 h-4" /> },
    { label: "Analytics", href: "/dashboard/vendor/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Payments", href: "/dashboard/vendor/payments", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Reviews", href: "/dashboard/vendor/reviews", icon: <Star className="w-4 h-4" />, active: true },
    { label: "Profile", href: "/dashboard/vendor/profile", icon: <Settings className="w-4 h-4" /> },
  ]

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 3.5) return "text-yellow-600"
    return "text-red-600"
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
    <DashboardLayout menuItems={menuItems} userRole="vendor">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
            <p className="text-gray-600">Manage and respond to client reviews and feedback</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Reviews
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Request Review
            </Button>
          </div>
        </div>

        {/* Review Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">All Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="reputation">Reputation</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-6 hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{review.client}</h4>
                              <p className="text-sm text-gray-600">{review.service}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{review.review}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Image className="w-4 h-4" />
                              {review.photos} photos
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {review.helpful} helpful
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {review.responded ? (
                              <Badge className="bg-green-100 text-green-800">Responded</Badge>
                            ) : (
                              <Badge className="bg-orange-100 text-orange-800">Pending Response</Badge>
                            )}
                            <Button size="sm" variant="outline">
                              <Reply className="w-4 h-4 mr-1" />
                              {review.responded ? "Edit Response" : "Respond"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rating Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm w-8">5★</span>
                      <Progress value={79} className="flex-1" />
                      <span className="text-sm text-gray-600">124</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm w-8">4★</span>
                      <Progress value={15} className="flex-1" />
                      <span className="text-sm text-gray-600">24</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm w-8">3★</span>
                      <Progress value={4} className="flex-1" />
                      <span className="text-sm text-gray-600">6</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm w-8">2★</span>
                      <Progress value={1} className="flex-1" />
                      <span className="text-sm text-gray-600">2</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm w-8">1★</span>
                      <Progress value={0} className="flex-1" />
                      <span className="text-sm text-gray-600">0</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Review Highlights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Professional Service</span>
                      <Badge variant="secondary">89%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quality Photos</span>
                      <Badge variant="secondary">92%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Timely Delivery</span>
                      <Badge variant="secondary">85%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Great Communication</span>
                      <Badge variant="secondary">87%</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="grid gap-6">
              {recentReviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{review.client}</h3>
                          <p className="text-sm text-gray-600">{review.service}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-2">
                          {renderStars(review.rating)}
                          <span className="ml-2 font-semibold">{review.rating}.0</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Reply className="w-4 h-4 mr-1" />
                            Respond
                          </Button>
                          <Button size="sm" variant="outline">
                            <Flag className="w-4 h-4 mr-1" />
                            Report
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700">{review.review}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Image className="w-4 h-4" />
                          {review.photos} photos attached
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {review.helpful} found helpful
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {review.responded ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Responded
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-100 text-orange-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Needs Response
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Review Velocity</p>
                      <p className="text-2xl font-bold">2.3/week</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Response Time</p>
                      <p className="text-2xl font-bold">4.2 hrs</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Sentiment Score</p>
                      <p className="text-2xl font-bold">92%</p>
                    </div>
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Recommendation Rate</p>
                      <p className="text-2xl font-bold">96%</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Review trends chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Wedding Photography</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">4.9</span>
                        <div className="flex">{renderStars(5)}</div>
                      </div>
                    </div>
                    <Progress value={98} />

                    <div className="flex justify-between items-center">
                      <span>Pre-wedding Shoots</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">4.7</span>
                        <div className="flex">{renderStars(5)}</div>
                      </div>
                    </div>
                    <Progress value={94} />

                    <div className="flex justify-between items-center">
                      <span>Event Photography</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">4.6</span>
                        <div className="flex">{renderStars(5)}</div>
                      </div>
                    </div>
                    <Progress value={92} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="responses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Review Responses</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">5-Star Response</h4>
                    <p className="text-sm text-gray-600 mb-3">Thank you so much for your wonderful review! It was a pleasure working with you...</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4 mr-1" />
                        Use
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">4-Star Response</h4>
                    <p className="text-sm text-gray-600 mb-3">Thank you for your feedback! We're glad you enjoyed our service...</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4 mr-1" />
                        Use
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Concern Response</h4>
                    <p className="text-sm text-gray-600 mb-3">Thank you for bringing this to our attention. We take all feedback seriously...</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4 mr-1" />
                        Use
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Response</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Select Review</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose a review to respond to" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rev1">Anjali & Vikram - 5 stars</SelectItem>
                        <SelectItem value="rev2">Sneha & Arjun - 4 stars</SelectItem>
                        <SelectItem value="rev3">Priya & Rahul - 5 stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Response</label>
                    <Textarea
                      placeholder="Write your response here..."
                      className="mt-1 min-h-32"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Send Response
                    </Button>
                    <Button variant="outline">
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reputation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Reputation Score</h3>
                  <p className="text-3xl font-bold text-yellow-600">92/100</p>
                  <p className="text-sm text-gray-600 mt-2">Excellent</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Trust Level</h3>
                  <p className="text-3xl font-bold text-green-600">High</p>
                  <p className="text-sm text-gray-600 mt-2">Top 10% vendors</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Verified Status</h3>
                  <p className="text-3xl font-bold text-blue-600">✓</p>
                  <p className="text-sm text-gray-600 mt-2">Verified Vendor</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reputation Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Review Quality</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-20" />
                        <span className="text-sm font-semibold">95%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Response Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20" />
                        <span className="text-sm font-semibold">92%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Customer Satisfaction</span>
                      <div className="flex items-center gap-2">
                        <Progress value={96} className="w-20" />
                        <span className="text-sm font-semibold">96%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Service Consistency</span>
                      <div className="flex items-center gap-2">
                        <Progress value={89} className="w-20" />
                        <span className="text-sm font-semibold">89%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Improvement Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Maintain High Standards</p>
                        <p className="text-sm text-gray-600">Continue delivering excellent service quality</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Faster Response Time</p>
                        <p className="text-sm text-gray-600">Aim to respond to reviews within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Encourage More Reviews</p>
                        <p className="text-sm text-gray-600">Ask satisfied clients to leave reviews</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Review Management Tools</h2>
              <p className="text-gray-600">Comprehensive tools to manage your online reputation and reviews</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Review Management Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <Star className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Review Monitor</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <Reply className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Auto Responder</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <MessageSquare className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Review Requests</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <BarChart3 className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Sentiment Analysis</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <Flag className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Review Flagging</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Bell className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Review Alerts</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <FileText className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Response Templates</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <Award className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Reputation Score</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <TrendingUp className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Review Trends</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Share2 className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Review Sharing</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Download className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">Export Reviews</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Search className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Review Search</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <Filter className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Advanced Filters</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <ThumbsUp className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Helpful Votes</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Image className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Photo Reviews</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Clock className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Response Timer</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <Heart className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Customer Love</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Shield className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Review Protection</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Target className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Review Goals</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Sparkles className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Review Insights</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
