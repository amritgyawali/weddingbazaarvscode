"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Clock, ArrowRight, Heart, Share2, BookOpen, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function BlogPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "planning", name: "Wedding Planning" },
    { id: "trends", name: "Trends & Ideas" },
    { id: "vendors", name: "Vendor Guides" },
    { id: "real-weddings", name: "Real Weddings" },
    { id: "tips", name: "Tips & Advice" },
    { id: "decor", name: "Decor & Styling" },
  ]

  const featuredPost = {
    id: 1,
    title: "The Ultimate Wedding Planning Timeline: 12 Months to Your Perfect Day",
    excerpt:
      "Planning a wedding can feel overwhelming, but with the right timeline, you can stay organized and stress-free. Here's your complete month-by-month guide to planning the perfect wedding.",
    image: "/placeholder.svg?height=400&width=800",
    category: "Wedding Planning",
    author: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Wedding Planning Expert",
    },
    publishedAt: "March 15, 2024",
    readTime: "8 min read",
    featured: true,
  }

  const blogPosts = [
    {
      id: 2,
      title: "Top 10 Wedding Photography Trends for 2024",
      excerpt:
        "Discover the latest photography trends that are making weddings more beautiful and memorable than ever before.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Trends & Ideas",
      author: {
        name: "Rajesh Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Photography Expert",
      },
      publishedAt: "March 12, 2024",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "How to Choose the Perfect Wedding Venue: A Complete Guide",
      excerpt:
        "Your venue sets the tone for your entire wedding. Learn how to find and book the perfect location for your special day.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Vendor Guides",
      author: {
        name: "Anjali Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Venue Specialist",
      },
      publishedAt: "March 10, 2024",
      readTime: "10 min read",
    },
    {
      id: 4,
      title: "Budget-Friendly Wedding Decor Ideas That Look Expensive",
      excerpt:
        "Create stunning wedding decor without breaking the bank. These creative ideas will make your wedding look luxurious on any budget.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Decor & Styling",
      author: {
        name: "Sneha Gupta",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Decor Designer",
      },
      publishedAt: "March 8, 2024",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Real Wedding: Priya & Rahul's Magical Palace Wedding in Udaipur",
      excerpt:
        "Step inside this breathtaking royal wedding that perfectly blended tradition with modern elegance at the City Palace.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Real Weddings",
      author: {
        name: "Wedding Team",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Editorial Team",
      },
      publishedAt: "March 5, 2024",
      readTime: "5 min read",
    },
    {
      id: 6,
      title: "Wedding Menu Planning: How to Feed Your Guests in Style",
      excerpt:
        "From appetizers to desserts, learn how to create a wedding menu that will delight your guests and fit your budget.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Tips & Advice",
      author: {
        name: "Chef Arjun",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Catering Expert",
      },
      publishedAt: "March 3, 2024",
      readTime: "9 min read",
    },
    {
      id: 7,
      title: "Destination Wedding Planning: Everything You Need to Know",
      excerpt:
        "Planning a destination wedding? Here's your complete guide to organizing the perfect celebration away from home.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Wedding Planning",
      author: {
        name: "Kavya Singh",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Destination Wedding Planner",
      },
      publishedAt: "March 1, 2024",
      readTime: "12 min read",
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularPosts = [
    { title: "10 Must-Have Wedding Photos", readTime: "5 min", views: "12.5k" },
    { title: "Wedding Dress Shopping Guide", readTime: "8 min", views: "10.2k" },
    { title: "How to Plan a Monsoon Wedding", readTime: "6 min", views: "9.8k" },
    { title: "Bridal Makeup Trends 2024", readTime: "4 min", views: "8.9k" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">WB</span>
                </div>
                <span className="text-xl font-bold text-gray-900">WeddingBazaar</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">Wedding Blog</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Wedding Planning Made Simple</h1>
          <p className="text-xl text-pink-100 max-w-3xl mx-auto mb-8">
            Expert advice, real wedding stories, and insider tips to help you plan your perfect wedding. Get inspired
            and stay informed with our comprehensive wedding blog.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.slice(1, 5).map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-pink-600"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-pink-600" />
            <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
          </div>

          <Card
            className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => router.push(`/blog/${featuredPost.id}`)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto relative">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-pink-600 text-white">Featured</Badge>
                </div>
              </div>

              <CardContent className="p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4">
                  {featuredPost.category}
                </Badge>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-pink-600 transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={featuredPost.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {featuredPost.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{featuredPost.author.name}</p>
                      <p className="text-sm text-gray-500">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.publishedAt}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => router.push(`/blog/${post.id}`)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Add to favorites
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Share article
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                          <p className="text-xs text-gray-500">{post.publishedAt}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg" className="px-8">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Posts */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-pink-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Popular Posts</h3>
                </div>

                <div className="space-y-4">
                  {popularPosts.map((post, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{post.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{post.readTime}</span>
                          <span>•</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Stay Updated</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get the latest wedding planning tips and inspiration delivered to your inbox.
                </p>

                <div className="space-y-3">
                  <Input placeholder="Enter your email" className="bg-white" />
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">Subscribe</Button>
                </div>

                <p className="text-xs text-gray-500 mt-3">No spam, unsubscribe at any time.</p>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Categories</h3>

                <div className="space-y-3">
                  {categories.slice(1).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-pink-100 text-pink-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
