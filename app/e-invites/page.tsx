"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Heart, Share2, Eye, Edit, Palette, Sparkles, Crown, Music } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function EInvitesPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "All Templates", icon: "🎨" },
    { id: "traditional", name: "Traditional", icon: "🏛️" },
    { id: "modern", name: "Modern", icon: "✨" },
    { id: "floral", name: "Floral", icon: "🌸" },
    { id: "royal", name: "Royal", icon: "👑" },
    { id: "minimalist", name: "Minimalist", icon: "⚪" },
    { id: "vintage", name: "Vintage", icon: "📜" },
  ]

  const templates = [
    {
      id: 1,
      name: "Royal Palace",
      category: "royal",
      price: "Free",
      premium: false,
      image: "/placeholder.svg?height=400&width=300",
      description: "Elegant royal design with golden accents",
      features: ["Animation", "Music", "RSVP", "Location Map"],
    },
    {
      id: 2,
      name: "Floral Dreams",
      category: "floral",
      price: "₹299",
      premium: true,
      image: "/placeholder.svg?height=400&width=300",
      description: "Beautiful floral patterns with soft colors",
      features: ["Animation", "Music", "RSVP", "Photo Gallery", "Custom Colors"],
    },
    {
      id: 3,
      name: "Modern Elegance",
      category: "modern",
      price: "₹199",
      premium: true,
      image: "/placeholder.svg?height=400&width=300",
      description: "Clean modern design with geometric patterns",
      features: ["Animation", "RSVP", "Location Map"],
    },
    {
      id: 4,
      name: "Traditional Mandala",
      category: "traditional",
      price: "Free",
      premium: false,
      image: "/placeholder.svg?height=400&width=300",
      description: "Classic Indian mandala design",
      features: ["Music", "RSVP", "Location Map"],
    },
    {
      id: 5,
      name: "Vintage Romance",
      category: "vintage",
      price: "₹399",
      premium: true,
      image: "/placeholder.svg?height=400&width=300",
      description: "Romantic vintage style with ornate details",
      features: ["Animation", "Music", "RSVP", "Photo Gallery", "Custom Fonts"],
    },
    {
      id: 6,
      name: "Minimalist Chic",
      category: "minimalist",
      price: "₹149",
      premium: true,
      image: "/placeholder.svg?height=400&width=300",
      description: "Simple and elegant minimalist design",
      features: ["Animation", "RSVP"],
    },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesSearch = !searchQuery || template.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Customizable Designs",
      description: "Personalize colors, fonts, and layouts to match your wedding theme",
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Background Music",
      description: "Add your favorite songs to create the perfect ambiance",
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Easy Sharing",
      description: "Share via WhatsApp, email, or social media with one click",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Track who viewed your invitation and RSVP responses",
    },
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
              <h1 className="text-xl font-semibold text-gray-900">E-Invitations</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                My Invitations
              </Button>
              <Button
                size="sm"
                className="bg-pink-600 hover:bg-pink-700"
                onClick={() => router.push("/e-invites/create")}
              >
                Create Invitation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Beautiful Digital Wedding Invitations</h1>
          <p className="text-xl text-pink-100 max-w-3xl mx-auto mb-8">
            Create stunning, personalized e-invitations that your guests will love. Choose from hundreds of templates
            and customize every detail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-pink-600 hover:bg-gray-100 px-8"
              onClick={() => router.push("/e-invites/create")}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Your Invitation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-pink-600 px-8"
            >
              <Eye className="w-5 h-5 mr-2" />
              View Samples
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our E-Invitations?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create memorable digital invitations with advanced features and beautiful designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Templates Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
              <p className="text-gray-600">Browse our collection of beautiful invitation templates</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 left-4 flex space-x-2">
                      {template.premium && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      {template.price === "Free" && <Badge className="bg-green-500 text-white">Free</Badge>}
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
                          // Preview template
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-white text-gray-900 hover:bg-gray-100"
                          onClick={() => router.push(`/e-invites/preview/${template.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                          onClick={() => router.push(`/e-invites/customize/${template.id}`)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Customize
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-pink-600">{template.price}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.features.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => router.push(`/e-invites/preview/${template.id}`)}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-pink-600 hover:bg-pink-700"
                        onClick={() => router.push(`/e-invites/customize/${template.id}`)}
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Pricing Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your wedding invitation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">₹0</div>
                <p className="text-gray-600">Perfect for simple invitations</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {["Basic templates", "Standard customization", "WhatsApp sharing", "Basic RSVP tracking"].map(
                    (feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ),
                  )}
                </div>
                <Button className="w-full mt-8" variant="outline">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-pink-200 shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-pink-600 text-white px-4 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">Premium</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">₹299</div>
                <p className="text-gray-600">For beautiful, feature-rich invitations</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "All premium templates",
                    "Full customization",
                    "Background music",
                    "Photo gallery",
                    "Advanced RSVP",
                    "Analytics dashboard",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-8 bg-pink-600 hover:bg-pink-700">Choose Premium</Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">Luxury</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">₹599</div>
                <p className="text-gray-600">For the most exclusive experience</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "All premium features",
                    "Custom design service",
                    "Video backgrounds",
                    "Multiple languages",
                    "Priority support",
                    "Unlimited revisions",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-8" variant="outline">
                  Choose Luxury
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-20 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Create Your Perfect Invitation?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of couples who have created beautiful digital invitations with WeddingBazaar. Start
              designing your dream invitation today!
            </p>
            <Button
              size="lg"
              className="bg-pink-600 hover:bg-pink-700 px-8"
              onClick={() => router.push("/e-invites/create")}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Your Invitation Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
