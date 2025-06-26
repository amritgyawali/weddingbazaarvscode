"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Calendar,
  Star,
  Download,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
  ChevronDown,
  Heart,
  Users,
  Award,
  Clock,
  ArrowRight,
  Play,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function EnhancedWeddingBazaarHomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [weddingDate, setWeddingDate] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)

    // Initialize search parameters after component mounts
    if (searchParams) {
      const query = searchParams.get("query") || ""
      const city = searchParams.get("city") || ""
      const date = searchParams.get("date") || ""
      
      setSearchQuery(query)
      setSelectedCity(city)
      setWeddingDate(date)
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [searchParams])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("query", searchQuery)
    if (selectedCity) params.set("city", selectedCity)
    if (weddingDate) params.set("date", weddingDate)

    router.push(`/vendors?${params.toString()}`)
  }

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/vendors?category=${categoryName.toLowerCase().replace(" ", "-")}`)
  }

  const categories = [
    { name: "Photographers", count: "2.5k+", icon: "📸", color: "from-purple-500 to-pink-500" },
    { name: "Venues", count: "1.8k+", icon: "🏛️", color: "from-blue-500 to-cyan-500" },
    { name: "Decorators", count: "3.2k+", icon: "🎨", color: "from-green-500 to-emerald-500" },
    { name: "Catering", count: "2.1k+", icon: "🍽️", color: "from-orange-500 to-red-500" },
    { name: "Makeup Artists", count: "1.9k+", icon: "💄", color: "from-pink-500 to-rose-500" },
    { name: "Mehendi Artists", count: "1.5k+", icon: "🎭", color: "from-amber-500 to-yellow-500" },
    { name: "DJ/Music", count: "900+", icon: "🎵", color: "from-indigo-500 to-purple-500" },
    { name: "Bridal Wear", count: "2.8k+", icon: "👗", color: "from-rose-500 to-pink-500" },
    { name: "Groom Wear", count: "1.7k+", icon: "🤵", color: "from-gray-500 to-slate-500" },
    { name: "Jewellery", count: "2.3k+", icon: "💎", color: "from-yellow-500 to-amber-500" },
  ]

  const features = [
    {
      title: "Verified Vendors",
      description: "All vendors are thoroughly verified with genuine reviews and ratings",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      stats: "15k+ Verified",
    },
    {
      title: "Smart Matching",
      description: "AI-powered recommendations based on your preferences and budget",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      stats: "98% Match Rate",
    },
    {
      title: "Best Prices",
      description: "Compare quotes and get exclusive deals from top vendors",
      icon: <Award className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      stats: "Save up to 30%",
    },
    {
      title: "24/7 Support",
      description: "Dedicated wedding planners available round the clock",
      icon: <Clock className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      stats: "< 2min Response",
    },
  ]

  const testimonials = [
    {
      name: "Priya & Rahul",
      location: "Mumbai",
      text: "WeddingBazaar transformed our wedding planning experience. The vendor quality exceeded our expectations, and the platform made everything seamless!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      wedding_date: "Dec 2023",
    },
    {
      name: "Anjali & Vikram",
      location: "Delhi",
      text: "The AI recommendations were spot-on! We found our dream photographer and decorator within hours. Highly recommended for modern couples!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      wedding_date: "Jan 2024",
    },
    {
      name: "Sneha & Arjun",
      location: "Bangalore",
      text: "Outstanding service and support throughout our journey. The mobile app made planning on-the-go incredibly convenient. Thank you WeddingBazaar!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      wedding_date: "Feb 2024",
    },
  ]

  function LoadingScreen() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 mx-auto animate-pulse">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            WeddingBazaar
          </h2>
          <div className="flex space-x-2 justify-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      {/* Enhanced Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-white/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    WeddingBazaar
                  </span>
                </Link>
              </div>
            </div>

            <nav className="hidden lg:block">
              <div className="flex items-center space-x-8">
                {[
                  { name: "Home", href: "/" },
                  { name: "Vendors", href: "/vendors" },
                  { name: "Real Weddings", href: "/real-weddings" },
                  { name: "Blog", href: "/blog" },
                  { name: "E-Invites", href: "/e-invites" },
                ].map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-pink-600 group ${
                      index === 0 ? "text-pink-600" : isScrolled ? "text-gray-700" : "text-white"
                    }`}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={`hidden sm:inline-flex transition-all duration-300 ${
                  isScrolled ? "text-gray-700 hover:text-pink-600" : "text-white hover:text-pink-200"
                }`}
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => router.push("/auth/signup")}
              >
                Sign Up
              </Button>
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-white/95 backdrop-blur-lg border-t border-white/20`}
        >
          <div className="px-4 py-6 space-y-4">
            {[
              { name: "Home", href: "/" },
              { name: "Vendors", href: "/vendors" },
              { name: "Real Weddings", href: "/real-weddings" },
              { name: "Blog", href: "/blog" },
              { name: "E-Invites", href: "/e-invites" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-pink-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-1000"
            style={{
              backgroundImage: "url('/hero-couple.jpg')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                ✨ India's #1 Wedding Platform
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                India's Largest
                <span className="block bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Wedding Planning Platform
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Discover verified vendors, get personalized recommendations, and plan your dream wedding with ease
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-5xl mx-auto">
              <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="relative group">
                      <Input
                        placeholder="Search vendors, venues..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-14 border-0 bg-gray-50 focus:bg-white transition-all duration-300 text-lg"
                      />
                      <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-hover:text-pink-500 transition-colors" />
                    </div>
                    <div className="relative group">
                      <Input
                        placeholder="Select City"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="pl-12 h-14 border-0 bg-gray-50 focus:bg-white transition-all duration-300 text-lg"
                      />
                      <MapPin className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-hover:text-pink-500 transition-colors" />
                      <ChevronDown className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
                    </div>
                    <div className="relative group">
                      <Input
                        type="date"
                        placeholder="Wedding Date"
                        value={weddingDate}
                        onChange={(e) => setWeddingDate(e.target.value)}
                        className="pl-12 h-14 border-0 bg-gray-50 focus:bg-white transition-all duration-300 text-lg"
                      />
                      <Calendar className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-hover:text-pink-500 transition-colors" />
                    </div>
                    <Button
                      className="h-14 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={handleSearch}
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    <span className="text-sm text-gray-600">Popular searches:</span>
                    {["Photographers Mumbai", "Banquet Halls Delhi", "Mehendi Artists"].map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-pink-100 transition-colors"
                        onClick={() => {
                          setSearchQuery(tag)
                          handleSearch()
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
              {[
                { number: "50K+", label: "Happy Couples" },
                { number: "25K+", label: "Verified Vendors" },
                { number: "100+", label: "Cities" },
                { number: "4.9★", label: "Average Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Vendor Categories */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200">Explore Categories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Wedding Vendors
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse through our curated collection of verified vendors across all wedding categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-6 text-center relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <div className="relative">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-110`}
                    >
                      {category.icon}
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {category.name}
                    </h3>

                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 transition-all duration-300"
              onClick={() => router.push("/vendors")}
            >
              View All Categories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Why WeddingBazaar */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why WeddingBazaar?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of wedding planning with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                <CardContent className="p-8 relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>

                  <Badge className={`bg-gradient-to-r ${feature.color} text-white border-0`}>{feature.stats}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Lead Capture */}
      <section className="py-24 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23ffffff' fillOpacity='0.08'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get Personalized Recommendations</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Tell us about your dream wedding and we'll connect you with the perfect vendors
            </p>
          </div>

          <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  router.push("/planning-tool")
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Your Name</label>
                    <Input
                      placeholder="Enter your name"
                      className="h-12 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Partner's Name</label>
                    <Input
                      placeholder="Enter partner's name"
                      className="h-12 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                    <Input
                      placeholder="+91 XXXXX XXXXX"
                      className="h-12 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="h-12 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Wedding City</label>
                    <Input
                      placeholder="Select your wedding city"
                      className="h-12 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Wedding Date</label>
                    <Input
                      type="date"
                      placeholder="Select date"
                      className="h-12 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      required
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Get Personalized Recommendations
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">🔒 Your information is secure and will never be shared</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Vendor Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">Featured Vendors</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Top Rated Wedding Professionals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover award-winning vendors who have made thousands of weddings memorable
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {Array.from({ length: 18 }).map((_, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => router.push(`/vendors/${index + 1}`)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=300&width=300`}
                    alt={`Vendor ${index + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.9</span>
                      </div>
                      <Badge className="bg-white/20 text-white border-0 text-xs">Premium</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => router.push("/vendors")}
            >
              Explore All Vendors
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">Success Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Couples Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real couples who found their perfect wedding vendors through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm cursor-pointer"
                onClick={() => router.push("/real-weddings")}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</blockquote>

                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12 border-2 border-pink-200">
                      <AvatarImage src={testimonial.image || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                        {testimonial.name.split(" ")[0][0]}
                        {testimonial.name.split(" ")[2][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.location} • {testimonial.wedding_date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Mobile App Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">📱 Mobile App</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Plan Your Wedding
                <span className="block text-pink-300">On The Go</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Download our award-winning mobile app and access all features, chat with vendors, and manage your
                wedding planning from anywhere.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Real-time vendor chat and notifications",
                  "Offline access to your wedding checklist",
                  "Photo sharing with vendors and family",
                  "Budget tracking and expense management",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-3 px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open("https://apps.apple.com", "_blank")}
                >
                  <Download className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </Button>
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-3 px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open("https://play.google.com", "_blank")}
                >
                  <Download className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Card
                    key={index}
                    className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-6 hover:bg-white/20 transition-all duration-300"
                  >
                    <CardContent className="p-0">
                      <div className="text-3xl mb-4">{["📱", "💬", "📊", "✅"][index]}</div>
                      <h3 className="font-semibold mb-2">
                        {["Mobile First", "Live Chat", "Analytics", "Checklist"][index]}
                      </h3>
                      <p className="text-sm text-white/80">
                        {
                          [
                            "Optimized for mobile experience",
                            "Real-time vendor communication",
                            "Track your wedding progress",
                            "Never miss important tasks",
                          ][index]
                        }
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700 border-yellow-200">Our Impact</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform has generated over ₹100 Crores in business for vendors last month alone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                stat: "50,000+",
                description: "Happy couples have found their perfect vendors and created magical wedding memories",
                icon: <Heart className="w-8 h-8" />,
                color: "from-pink-500 to-rose-500",
              },
              {
                stat: "25,000+",
                description: "Verified vendors across India, each thoroughly vetted for quality and reliability",
                icon: <Users className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500",
              },
              {
                stat: "100+",
                description: "Cities covered with local vendors who understand regional wedding traditions",
                icon: <Award className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-br from-white to-gray-50"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-110`}
                  >
                    {item.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{item.stat}</div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="inline-block bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 p-8">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-orange-600 mb-2">₹100+ Crores</div>
                <p className="text-orange-700 font-medium">Business generated for vendors last month</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="py-24 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 px-4 py-2">
            ✨ Start Your Journey
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Ready to Plan Your
            <span className="block bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Dream Wedding?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of couples who have planned their perfect wedding with WeddingBazaar. Start your journey
            today and create memories that will last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => router.push("/planning-tool")}
            >
              Start Planning Your Wedding
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-pink-200 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg"
              onClick={() => window.open("https://www.youtube.com/watch?v=demo", "_blank")}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23ffffff' fillOpacity='0.05'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  WeddingBazaar
                </span>
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                India's largest and most trusted wedding planning platform. We help couples create their dream weddings
                with verified vendors and personalized recommendations.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, url: "https://facebook.com" },
                  { Icon: Twitter, url: "https://twitter.com" },
                  { Icon: Instagram, url: "https://instagram.com" },
                  { Icon: Youtube, url: "https://youtube.com" },
                ].map(({ Icon, url }, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(url, "_blank")}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-all duration-300 cursor-pointer group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Company</h4>
              <ul className="space-y-4">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Press", href: "/press" },
                  { name: "Contact", href: "/contact" },
                  { name: "Blog", href: "/blog" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Services</h4>
              <ul className="space-y-4">
                {[
                  { name: "Find Vendors", href: "/vendors" },
                  { name: "Real Weddings", href: "/real-weddings" },
                  { name: "Wedding Planning", href: "/planning-tool" },
                  { name: "E-Invites", href: "/e-invites" },
                  { name: "Vendor Registration", href: "/vendor-signup" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; 2024 WeddingBazaar. All rights reserved. Made with ❤️ for couples in India.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}