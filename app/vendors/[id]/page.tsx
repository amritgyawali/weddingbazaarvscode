"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Heart,
  Share2,
  Phone,
  Mail,
  MapPin,
  Award,
  Users,
  Clock,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  Download,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"

export default function VendorDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock vendor data - in real app, fetch based on params.id
  const vendor = {
    id: 1,
    name: "Rajesh Photography",
    category: "Wedding Photographer",
    city: "Mumbai, Maharashtra",
    rating: 4.9,
    reviews: 245,
    price: "₹50,000 - ₹2,00,000",
    verified: true,
    premium: true,
    description:
      "Award-winning wedding photographer with over 10 years of experience capturing beautiful moments. Specializing in candid photography, pre-wedding shoots, and traditional ceremonies.",
    specialties: ["Candid Photography", "Pre-wedding Shoots", "Traditional Ceremonies", "Destination Weddings"],
    experience: "10+ Years",
    eventsCompleted: "500+",
    responseTime: "Within 2 hours",
    languages: ["Hindi", "English", "Marathi"],
    serviceAreas: ["Mumbai", "Pune", "Nashik", "Goa"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    packages: [
      {
        name: "Basic Package",
        price: "₹50,000",
        features: ["6 hours coverage", "300+ edited photos", "Online gallery", "Basic album"],
      },
      {
        name: "Premium Package",
        price: "₹1,00,000",
        features: ["12 hours coverage", "500+ edited photos", "Online gallery", "Premium album", "Pre-wedding shoot"],
      },
      {
        name: "Luxury Package",
        price: "₹2,00,000",
        features: [
          "Full day coverage",
          "1000+ edited photos",
          "Online gallery",
          "Luxury album",
          "Pre-wedding shoot",
          "Drone photography",
          "Same day highlights",
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Absolutely amazing work! Rajesh captured every moment beautifully. The photos came out stunning and we couldn't be happier.",
        images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
      },
      {
        id: 2,
        name: "Amit Patel",
        rating: 5,
        date: "1 month ago",
        comment: "Professional service and incredible attention to detail. Highly recommended for wedding photography!",
        images: [],
      },
      {
        id: 3,
        name: "Sneha Gupta",
        rating: 4,
        date: "2 months ago",
        comment: "Great photographer with creative vision. The pre-wedding shoot was fantastic!",
        images: ["/placeholder.svg?height=100&width=100"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">WB</span>
                </div>
                <span className="text-xl font-bold text-gray-900">WeddingBazaar</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center space-x-2 ${isFavorite ? "text-red-600 border-red-600" : ""}`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-600" : ""}`} />
                <span>{isFavorite ? "Saved" : "Save"}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => {
                  navigator.share({
                    title: vendor.name,
                    text: vendor.description,
                    url: window.location.href,
                  })
                }}
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={vendor.images[selectedImageIndex] || "/placeholder.svg"}
                    alt={vendor.name}
                    fill
                    className="object-cover"
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
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-6 gap-2">
                    {vendor.images.map((image, index) => (
                      <div
                        key={index}
                        className={`aspect-square relative overflow-hidden rounded-lg cursor-pointer border-2 ${
                          selectedImageIndex === index ? "border-pink-500" : "border-transparent"
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${vendor.name} ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Info */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{vendor.name}</h1>
                    <p className="text-lg text-gray-600 mb-4">{vendor.category}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{vendor.city}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{vendor.experience}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{vendor.eventsCompleted} events</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold">{vendor.rating}</span>
                      <span className="text-gray-500">({vendor.reviews} reviews)</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{vendor.price}</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{vendor.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Award className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-xs text-gray-600">{vendor.experience}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Events</p>
                    <p className="text-xs text-gray-600">{vendor.eventsCompleted}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Response</p>
                    <p className="text-xs text-gray-600">{vendor.responseTime}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Verified</p>
                    <p className="text-xs text-gray-600">Profile</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Service Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.serviceAreas.map((area, index) => (
                        <Badge key={index} variant="outline">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.languages.map((language, index) => (
                        <Badge key={index} variant="outline">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="packages" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="packages" className="space-y-4">
                {vendor.packages.map((pkg, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">{pkg.name}</h3>
                        <p className="text-2xl font-bold text-pink-600">{pkg.price}</p>
                      </div>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700">Select Package</Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {vendor.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{review.name}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      {review.images.length > 0 && (
                        <div className="flex space-x-2">
                          {review.images.map((image, index) => (
                            <div key={index} className="w-20 h-20 relative overflow-hidden rounded-lg">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Review image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="gallery">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {vendor.images.map((image, index) => (
                    <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Vendor</h3>

                <div className="space-y-4">
                  <Button
                    className="w-full bg-pink-600 hover:bg-pink-700"
                    onClick={() => router.push(`/vendors/${vendor.id}/contact`)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open("tel:+919876543210", "_self")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open("mailto:vendor@example.com", "_self")}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Response Rate</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Response Time</span>
                    <span className="font-medium">{vendor.responseTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Vendors */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Similar Vendors</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-12 relative overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          alt="Similar vendor"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Vendor Name {item}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">4.8 (120)</span>
                        </div>
                      </div>
                    </div>
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
