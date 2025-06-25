"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Heart, Share2, Phone, Award, Grid, List, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function VendorsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([10000, 500000])
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get("category") || "all")
  const [selectedCity, setSelectedCity] = useState(searchParams?.get("city") || "")
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("query") || "")
  const [sortBy, setSortBy] = useState("rating")

  const categories = [
    "All Categories",
    "Photographers",
    "Venues",
    "Decorators",
    "Catering",
    "Makeup Artists",
    "Mehendi Artists",
    "DJ/Music",
    "Bridal Wear",
    "Groom Wear",
    "Jewellery",
  ]

  const cities = [
    "All Cities",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ]

  const vendors = [
    {
      id: 1,
      name: "Rajesh Photography",
      category: "Photographers",
      city: "Mumbai",
      rating: 4.9,
      reviews: 245,
      price: "₹50,000 - ₹2,00,000",
      image: "/placeholder.svg?height=300&width=400",
      verified: true,
      premium: true,
      description: "Award-winning wedding photographer with 10+ years experience",
      specialties: ["Candid Photography", "Pre-wedding Shoots", "Traditional Ceremonies"],
    },
    {
      id: 2,
      name: "Grand Palace Banquets",
      category: "Venues",
      city: "Delhi",
      rating: 4.8,
      reviews: 189,
      price: "₹1,50,000 - ₹5,00,000",
      image: "/placeholder.svg?height=300&width=400",
      verified: true,
      premium: false,
      description: "Luxurious banquet hall perfect for grand celebrations",
      specialties: ["AC Banquet Hall", "Parking Available", "Catering Services"],
    },
    {
      id: 3,
      name: "Floral Dreams Decorators",
      category: "Decorators",
      city: "Bangalore",
      rating: 4.7,
      reviews: 156,
      price: "₹75,000 - ₹3,00,000",
      image: "/placeholder.svg?height=300&width=400",
      verified: true,
      premium: true,
      description: "Creative wedding decorators specializing in floral arrangements",
      specialties: ["Floral Decor", "Stage Decoration", "Mandap Design"],
    },
    {
      id: 4,
      name: "Spice Garden Catering",
      category: "Catering",
      city: "Chennai",
      rating: 4.6,
      reviews: 203,
      price: "₹800 - ₹2,500 per plate",
      image: "/placeholder.svg?height=300&width=400",
      verified: true,
      premium: false,
      description: "Multi-cuisine catering with authentic flavors",
      specialties: ["South Indian", "North Indian", "Continental"],
    },
    {
      id: 5,
      name: "Glamour Makeup Studio",
      category: "Makeup Artists",
      city: "Mumbai",
      rating: 4.9,
      reviews: 178,
      price: "₹25,000 - ₹1,00,000",
      image: "/placeholder.svg?height=300&width=400",
      verified: true,
      premium: true,
      description: "Professional bridal makeup artist with celebrity clientele",
      specialties: ["Bridal Makeup", "Hair Styling", "Pre-wedding Makeup"],
    },
    {
      id: 6,
      name: "Henna Art by Priya",
      category: "Mehendi Artists",
      city: "Jaipur",
      rating: 4.8,
      reviews: 134,
      price: "₹15,000 - ₹50,000",
      image: "/placeholder.svg?height=300&width=400",
      verified: true,
      premium: false,
      description: "Intricate mehendi designs for all occasions",
      specialties: ["Bridal Mehendi", "Arabic Designs", "Contemporary Patterns"],
    },
  ]

  const filteredVendors = vendors.filter((vendor) => {
    const matchesCategory =
      selectedCategory === "all" ||
      selectedCategory === "All Categories" ||
      vendor.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesCity = !selectedCity || selectedCity === "All Cities" || vendor.city === selectedCity
    const matchesSearch =
      !searchQuery ||
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesCity && matchesSearch
  })

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">WB</span>
                </div>
                <span className="text-xl font-bold text-gray-900">WeddingBazaar</span>
              </Link>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  placeholder="Search vendors, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-12"
                />
                <Search className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </Button>

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-80 flex-shrink-0`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Filters</h3>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase().replace(" ", "-")}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">City</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000000}
                    min={5000}
                    step={5000}
                    className="w-full"
                  />
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Minimum Rating</label>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="rating" className="text-pink-600" />
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{rating}+ Stars</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Verified Vendors */}
                <div className="mb-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="text-pink-600" />
                    <span className="text-sm font-medium text-gray-700">Verified Vendors Only</span>
                  </label>
                </div>

                {/* Premium Vendors */}
                <div className="mb-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="text-pink-600" />
                    <span className="text-sm font-medium text-gray-700">Premium Vendors</span>
                  </label>
                </div>

                <Button className="w-full bg-pink-600 hover:bg-pink-700">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wedding Vendors</h1>
                <p className="text-gray-600">{sortedVendors.length} vendors found</p>
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Vendors Grid/List */}
            <div
              className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}`}
            >
              {sortedVendors.map((vendor) => (
                <Card
                  key={vendor.id}
                  className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                  onClick={() => router.push(`/vendors/${vendor.id}`)}
                >
                  <div
                    className={`${viewMode === "list" ? "w-80 flex-shrink-0" : "aspect-video"} relative overflow-hidden ${viewMode === "grid" ? "rounded-t-lg" : "rounded-l-lg"}`}
                  >
                    <Image
                      src={vendor.image || "/placeholder.svg"}
                      alt={vendor.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {vendor.verified && (
                        <Badge className="bg-green-500 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {vendor.premium && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Premium</Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 bg-white/80 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Add to favorites logic
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
                          // Share logic
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                          {vendor.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {vendor.category} • {vendor.city}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{vendor.rating}</span>
                        <span className="text-sm text-gray-500">({vendor.reviews})</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vendor.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {vendor.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {vendor.specialties.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{vendor.specialties.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{vendor.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(`tel:+919876543210`, "_self")
                          }}
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-pink-600 hover:bg-pink-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/vendors/${vendor.id}/contact`)
                          }}
                        >
                          Contact
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
                Load More Vendors
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
