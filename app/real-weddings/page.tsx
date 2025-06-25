"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Heart, Share2, MapPin, Calendar, Users, Camera, Grid, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RealWeddingsPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("")

  const weddings = [
    {
      id: 1,
      title: "Priya & Rahul's Royal Palace Wedding",
      couple: "Priya & Rahul",
      location: "Udaipur, Rajasthan",
      date: "December 2023",
      style: "Royal Traditional",
      guests: 500,
      budget: "₹25-30 Lakhs",
      photographer: "Rajesh Photography",
      venue: "City Palace",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description:
        "A magnificent royal wedding celebration at the historic City Palace in Udaipur, featuring traditional Rajasthani customs and breathtaking palace architecture.",
      highlights: ["Royal Baraat", "Palace Ceremony", "Traditional Rajasthani Decor", "500+ Guests"],
      vendors: {
        photographer: "Rajesh Photography",
        decorator: "Royal Decorators",
        catering: "Palace Catering",
        makeup: "Bridal Glam Studio",
      },
    },
    {
      id: 2,
      title: "Anjali & Vikram's Beach Paradise Wedding",
      couple: "Anjali & Vikram",
      location: "Goa",
      date: "January 2024",
      style: "Beach Destination",
      guests: 150,
      budget: "₹15-20 Lakhs",
      photographer: "Coastal Captures",
      venue: "Taj Exotica Resort",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description:
        "An intimate beach wedding with stunning ocean views, featuring a perfect blend of traditional ceremonies and modern beach vibes.",
      highlights: ["Beach Ceremony", "Sunset Photography", "Intimate Gathering", "Ocean Views"],
      vendors: {
        photographer: "Coastal Captures",
        decorator: "Beach Blooms",
        catering: "Seaside Cuisine",
        makeup: "Tropical Beauty",
      },
    },
    {
      id: 3,
      title: "Sneha & Arjun's Garden Wedding",
      couple: "Sneha & Arjun",
      location: "Bangalore",
      date: "February 2024",
      style: "Garden Contemporary",
      guests: 300,
      budget: "₹20-25 Lakhs",
      photographer: "Nature's Frame",
      venue: "Leela Palace Gardens",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description:
        "A beautiful garden wedding surrounded by lush greenery and blooming flowers, creating a romantic and natural atmosphere.",
      highlights: ["Garden Setting", "Floral Decor", "Natural Lighting", "Eco-Friendly"],
      vendors: {
        photographer: "Nature's Frame",
        decorator: "Garden Dreams",
        catering: "Green Cuisine",
        makeup: "Natural Glow",
      },
    },
    {
      id: 4,
      title: "Kavya & Rohit's Modern City Wedding",
      couple: "Kavya & Rohit",
      location: "Mumbai",
      date: "March 2024",
      style: "Modern Contemporary",
      guests: 400,
      budget: "₹30-35 Lakhs",
      photographer: "Urban Lens",
      venue: "Grand Hyatt",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description:
        "A sophisticated urban wedding with contemporary decor, modern lighting, and a chic city vibe that perfectly reflected the couple's style.",
      highlights: ["Modern Decor", "City Skyline", "Contemporary Style", "Luxury Venue"],
      vendors: {
        photographer: "Urban Lens",
        decorator: "Modern Moments",
        catering: "City Flavors",
        makeup: "Chic Beauty",
      },
    },
  ]

  const filteredWeddings = weddings.filter((wedding) => {
    const matchesSearch =
      !searchQuery ||
      wedding.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wedding.couple.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = !selectedCity || wedding.location.includes(selectedCity)
    const matchesStyle = !selectedStyle || wedding.style === selectedStyle
    return matchesSearch && matchesCity && matchesStyle
  })

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
              <h1 className="text-xl font-semibold text-gray-900">Real Weddings</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="p-2"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Real Wedding Stories</h1>
          <p className="text-xl text-pink-100 max-w-3xl mx-auto mb-8">
            Get inspired by real couples who planned their dream weddings with WeddingBazaar. Discover their stories,
            vendors, and beautiful moments.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-lg shadow-xl border-0">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Input
                      placeholder="Search couples, venues..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12"
                    />
                    <Search className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                  </div>

                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Udaipur">Udaipur</SelectItem>
                      <SelectItem value="Goa">Goa</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Wedding Style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Styles</SelectItem>
                      <SelectItem value="Royal Traditional">Royal Traditional</SelectItem>
                      <SelectItem value="Beach Destination">Beach Destination</SelectItem>
                      <SelectItem value="Garden Contemporary">Garden Contemporary</SelectItem>
                      <SelectItem value="Modern Contemporary">Modern Contemporary</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="h-12 bg-pink-600 hover:bg-pink-700">
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Wedding Stories</h2>
            <p className="text-gray-600">{filteredWeddings.length} beautiful weddings found</p>
          </div>

          <Select defaultValue="recent">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="budget-low">Budget: Low to High</SelectItem>
              <SelectItem value="budget-high">Budget: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Weddings Grid/List */}
        <div
          className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-8"}`}
        >
          {filteredWeddings.map((wedding) => (
            <Card
              key={wedding.id}
              className={`group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                viewMode === "list" ? "flex" : ""
              }`}
              onClick={() => router.push(`/real-weddings/${wedding.id}`)}
            >
              <div
                className={`${viewMode === "list" ? "w-96 flex-shrink-0" : "aspect-[4/3]"} relative overflow-hidden`}
              >
                <Image
                  src={wedding.images[0] || "/placeholder.svg"}
                  alt={wedding.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 left-4 flex space-x-2">
                  <Badge className="bg-white/90 text-gray-900">
                    <Camera className="w-3 h-3 mr-1" />
                    {wedding.images.length} Photos
                  </Badge>
                </div>

                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-8 h-8 p-0 bg-white/80 hover:bg-white"
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
                    className="w-8 h-8 p-0 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Share wedding
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{wedding.guests} guests</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{wedding.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {wedding.couple}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{wedding.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{wedding.date}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-3">
                    {wedding.style}
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{wedding.description}</p>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {wedding.highlights.slice(0, 3).map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Budget Range</p>
                      <p className="font-semibold text-gray-900">{wedding.budget}</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-pink-600 hover:bg-pink-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/real-weddings/${wedding.id}`)
                      }}
                    >
                      View Story
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Stories
          </Button>
        </div>

        {/* Submit Your Wedding */}
        <Card className="mt-16 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
          <CardContent className="p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Wedding Story</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Did you plan your wedding with WeddingBazaar? We'd love to feature your beautiful story and inspire other
              couples planning their dream wedding.
            </p>
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700" onClick={() => router.push("/submit-wedding")}>
              Submit Your Wedding
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
