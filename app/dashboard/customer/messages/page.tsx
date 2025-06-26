"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  MessageSquare,
  Inbox,
  Sent,
  Reply,
  Forward,
  Paperclip,
  Smile,
  AtSign,
  Hash,
  PhoneCall,
  VideoIcon,
  MailIcon,
  Building,
  UserIcon,
} from "lucide-react"

export default function CustomerMessagesPage() {
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const messageStats = [
    {
      title: "Total Messages",
      value: "156",
      change: "+24",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Unread",
      value: "8",
      change: "+3",
      icon: <Inbox className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Active Chats",
      value: "12",
      change: "+2",
      icon: <Users className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Response Rate",
      value: "95%",
      change: "+5%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const conversations = [
    {
      id: 1,
      name: "Royal Palace Hotel",
      type: "vendor",
      category: "Venue",
      lastMessage: "The venue is confirmed for December 15th. Please review the final contract.",
      timestamp: "2 hours ago",
      unread: 2,
      status: "online",
      avatar: "/avatars/venue.jpg",
    },
    {
      id: 2,
      name: "Capture Moments Studio",
      type: "vendor",
      category: "Photography",
      lastMessage: "I've uploaded the engagement photos to your gallery. Please check them out!",
      timestamp: "5 hours ago",
      unread: 0,
      status: "offline",
      avatar: "/avatars/photographer.jpg",
    },
    {
      id: 3,
      name: "Delicious Delights Catering",
      type: "vendor",
      category: "Catering",
      lastMessage: "We need to finalize the menu by next week. Can we schedule a tasting?",
      timestamp: "1 day ago",
      unread: 1,
      status: "online",
      avatar: "/avatars/catering.jpg",
    },
    {
      id: 4,
      name: "Wedding Planner - Sarah",
      type: "planner",
      category: "Planning",
      lastMessage: "Everything is on track! Let's review the timeline for next week.",
      timestamp: "2 days ago",
      unread: 0,
      status: "away",
      avatar: "/avatars/planner.jpg",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Royal Palace Hotel",
      content: "Hello Priya! Thank you for choosing Royal Palace Hotel for your special day.",
      timestamp: "10:30 AM",
      type: "received",
      attachments: [],
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you! We're excited to celebrate our wedding at your beautiful venue.",
      timestamp: "10:35 AM",
      type: "sent",
      attachments: [],
    },
    {
      id: 3,
      sender: "Royal Palace Hotel",
      content: "I've prepared the final contract with all the details we discussed. Please review it and let me know if you have any questions.",
      timestamp: "11:00 AM",
      type: "received",
      attachments: ["Wedding_Contract_Final.pdf"],
    },
    {
      id: 4,
      sender: "You",
      content: "Perfect! I'll review the contract with Rahul and get back to you by tomorrow.",
      timestamp: "11:05 AM",
      type: "sent",
      attachments: [],
    },
    {
      id: 5,
      sender: "Royal Palace Hotel",
      content: "The venue is confirmed for December 15th. Please review the final contract.",
      timestamp: "2:30 PM",
      type: "received",
      attachments: [],
    },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/customer", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/customer/budget", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/customer/documents", icon: <FileText className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" />, active: true },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vendor":
        return <Building className="w-4 h-4" />
      case "planner":
        return <UserIcon className="w-4 h-4" />
      default:
        return <MessageCircle className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">Communicate with vendors and wedding planners</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search Messages
            </Button>
            <Button className="bg-pink-600 hover:bg-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              New Message
            </Button>
          </div>
        </div>

        {/* Message Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {messageStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change} today</p>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Conversations List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Conversations</span>
                    <Badge variant="secondary">{conversations.filter(c => c.unread > 0).length} unread</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                          selectedConversation === conversation.id ? 'border-pink-500 bg-pink-50' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              {getTypeIcon(conversation.type)}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.status)}`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-sm truncate">{conversation.name}</h4>
                              <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">{conversation.category}</p>
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                            {conversation.unread > 0 && (
                              <Badge className="bg-pink-600 text-white mt-1" size="sm">
                                {conversation.unread} new
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-2">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold">Royal Palace Hotel</h3>
                        <p className="text-sm text-gray-600">Venue • Online</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <PhoneCall className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <VideoIcon className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {/* Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'sent' 
                            ? 'bg-pink-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          {message.attachments.length > 0 && (
                            <div className="mt-2">
                              {message.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs">
                                  <Paperclip className="w-3 h-3" />
                                  <span>{attachment}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex items-center gap-3">
                      <Button size="sm" variant="outline">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" variant="outline">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Vendor Chat</h3>
                  <p className="text-sm text-gray-600 mb-4">Direct messaging with vendors</p>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Group Chat</h3>
                  <p className="text-sm text-gray-600 mb-4">Chat with wedding team</p>
                  <Button className="w-full">Join Group</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <VideoIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Video Call</h3>
                  <p className="text-sm text-gray-600 mb-4">Schedule video meetings</p>
                  <Button className="w-full">Schedule Call</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message All Vendors
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Share Documents
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Reminder
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">New message from Royal Palace Hotel</h4>
                      <p className="text-sm text-gray-600">Contract ready for review</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Photographer confirmed booking</h4>
                      <p className="text-sm text-gray-600">Capture Moments Studio accepted</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Catering menu deadline</h4>
                      <p className="text-sm text-gray-600">Finalize menu by next week</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <Button size="sm" variant="outline">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Notifications</span>
                    <Button size="sm" variant="outline">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push Notifications</span>
                    <Button size="sm" variant="outline">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vendor Messages</span>
                    <Button size="sm" variant="outline">Instant</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Communication Tools</h2>
              <p className="text-gray-600">Advanced tools to communicate with vendors and manage messages</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Communication Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <MessageCircle className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Message Center</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <Inbox className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Inbox Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <Send className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Quick Send</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Users className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Group Chat</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <VideoIcon className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Video Calls</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-teal-50">
                <PhoneCall className="w-6 h-6 mb-2 text-teal-600" />
                <span className="text-sm font-medium">Voice Calls</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-indigo-50">
                <FileText className="w-6 h-6 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Message Templates</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-pink-50">
                <Bell className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm font-medium">Notifications</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-yellow-50">
                <Search className="w-6 h-6 mb-2 text-yellow-600" />
                <span className="text-sm font-medium">Message Search</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-cyan-50">
                <Archive className="w-6 h-6 mb-2 text-cyan-600" />
                <span className="text-sm font-medium">Message Archive</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-lime-50">
                <Paperclip className="w-6 h-6 mb-2 text-lime-600" />
                <span className="text-sm font-medium">File Sharing</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50">
                <Calendar className="w-6 h-6 mb-2 text-emerald-600" />
                <span className="text-sm font-medium">Meeting Scheduler</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-violet-50">
                <AtSign className="w-6 h-6 mb-2 text-violet-600" />
                <span className="text-sm font-medium">Contact Manager</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-rose-50">
                <Reply className="w-6 h-6 mb-2 text-rose-600" />
                <span className="text-sm font-medium">Auto Reply</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-sky-50">
                <Forward className="w-6 h-6 mb-2 text-sky-600" />
                <span className="text-sm font-medium">Message Forward</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-stone-50">
                <Filter className="w-6 h-6 mb-2 text-stone-600" />
                <span className="text-sm font-medium">Message Filters</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-neutral-50">
                <BarChart3 className="w-6 h-6 mb-2 text-neutral-600" />
                <span className="text-sm font-medium">Chat Analytics</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-slate-50">
                <Share2 className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm font-medium">Message Sharing</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-zinc-50">
                <Download className="w-6 h-6 mb-2 text-zinc-600" />
                <span className="text-sm font-medium">Export Messages</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-gray-50">
                <Shield className="w-6 h-6 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Privacy Settings</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
