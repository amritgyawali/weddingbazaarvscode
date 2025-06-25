"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  MessageCircle,
  Send,
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  Archive,
  Edit,
  Reply,
  Bell,
  BellOff,
  Users,
  Settings,
  TrendingUp,
  Gift,
  Heart,
  CalendarIcon,
  Clock,
  Plus,
  Download,
} from "lucide-react"

export default function MessagesPage() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Royal Palace Gardens",
      type: "vendor",
      lastMessage: "Thank you for choosing us for your special day!",
      timestamp: "2 hours ago",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      category: "Venue",
    },
    {
      id: 2,
      name: "Priya's Photography",
      type: "vendor",
      lastMessage: "I've sent you the engagement photo samples",
      timestamp: "5 hours ago",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      category: "Photography",
    },
    {
      id: 3,
      name: "Wedding Planner Sarah",
      type: "planner",
      lastMessage: "Let's schedule a meeting for next week",
      timestamp: "1 day ago",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      category: "Planning",
    },
    {
      id: 4,
      name: "Catering Services",
      type: "vendor",
      lastMessage: "Menu tasting is confirmed for Friday",
      timestamp: "2 days ago",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      category: "Catering",
    },
  ])

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Royal Palace Gardens",
      content: "Hello! Thank you for your interest in our venue. We'd love to host your special day!",
      timestamp: "10:30 AM",
      type: "received",
      attachments: [],
    },
    {
      id: 2,
      sender: "You",
      content:
        "Hi! Yes, we're very interested. Could you please send us the pricing details and availability for August 15th?",
      timestamp: "10:35 AM",
      type: "sent",
      attachments: [],
    },
    {
      id: 3,
      sender: "Royal Palace Gardens",
      content: "I'm attaching our wedding package brochure with all the details. August 15th is available!",
      timestamp: "10:45 AM",
      type: "received",
      attachments: ["wedding-packages.pdf"],
    },
    {
      id: 4,
      sender: "You",
      content: "Perfect! The packages look great. Can we schedule a site visit this weekend?",
      timestamp: "11:00 AM",
      type: "sent",
      attachments: [],
    },
  ])

  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "My Wedding", href: "/dashboard/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Vendors", href: "/dashboard/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/budget", icon: <Gift className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/timeline", icon: <CalendarIcon className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/documents", icon: <Settings className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/messages", icon: <Settings className="w-4 h-4" />, active: true },
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

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "sent",
        attachments: [],
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Messages & Communication 💬</h1>
          <p className="text-purple-100">Stay connected with vendors, planners, and your wedding team</p>
        </div>

        <Tabs defaultValue="conversations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Chat</TabsTrigger>
            <TabsTrigger value="group">Group Chats</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          {/* Conversations Tab */}
          <TabsContent value="conversations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Conversations List */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Conversations</CardTitle>
                    <Button size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search conversations..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                          selectedConversation.id === conversation.id
                            ? "border-purple-500 bg-purple-50"
                            : "border-transparent"
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                                conversation.status,
                              )}`}
                            ></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium truncate">{conversation.name}</h4>
                              <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                            <div className="flex items-center justify-between mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {conversation.category}
                              </Badge>
                              {conversation.unread > 0 && (
                                <Badge className="bg-purple-500 text-white text-xs">{conversation.unread}</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedConversation.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{selectedConversation.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
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
                        className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === "sent" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
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
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button onClick={sendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Communication Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { name: "Quick Reply", icon: <Reply className="w-5 h-5" />, color: "bg-blue-100 text-blue-600" },
                { name: "Message Templates", icon: <Edit className="w-5 h-5" />, color: "bg-green-100 text-green-600" },
                {
                  name: "File Sharing",
                  icon: <Paperclip className="w-5 h-5" />,
                  color: "bg-purple-100 text-purple-600",
                },
                { name: "Video Call", icon: <Video className="w-5 h-5" />, color: "bg-orange-100 text-orange-600" },
                { name: "Voice Messages", icon: <Phone className="w-5 h-5" />, color: "bg-red-100 text-red-600" },
                { name: "Message Scheduler", icon: <Clock className="w-5 h-5" />, color: "bg-teal-100 text-teal-600" },
                {
                  name: "Auto Responses",
                  icon: <Settings className="w-5 h-5" />,
                  color: "bg-indigo-100 text-indigo-600",
                },
                { name: "Message Archive", icon: <Archive className="w-5 h-5" />, color: "bg-pink-100 text-pink-600" },
                { name: "Chat Backup", icon: <Download className="w-5 h-5" />, color: "bg-gray-100 text-gray-600" },
                {
                  name: "Message Search",
                  icon: <Search className="w-5 h-5" />,
                  color: "bg-yellow-100 text-yellow-600",
                },
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center mx-auto mb-2`}
                    >
                      {tool.icon}
                    </div>
                    <p className="text-sm font-medium">{tool.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vendor Chat Tab */}
          <TabsContent value="vendors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conversations
                .filter((conv) => conv.type === "vendor")
                .map((vendor) => (
                  <Card key={vendor.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={vendor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{vendor.name}</h3>
                          <Badge variant="outline">{vendor.category}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{vendor.lastMessage}</p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Vendor Communication Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Vendor Directory",
                "Contact Manager",
                "Inquiry Templates",
                "Quote Requests",
                "Contract Discussions",
                "Meeting Scheduler",
                "Follow-up Reminders",
                "Vendor Reviews",
                "Communication Log",
                "Vendor Ratings",
                "Service Inquiries",
                "Availability Check",
                "Price Negotiations",
                "Service Comparisons",
                "Vendor Recommendations",
                "Communication History",
                "Vendor Feedback",
                "Service Updates",
                "Vendor Alerts",
                "Communication Analytics",
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

          {/* Group Chats Tab */}
          <TabsContent value="group" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Group Conversations</span>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Group
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Wedding Planning Team",
                      members: 8,
                      lastActivity: "2 hours ago",
                      description: "Main planning group with all vendors and family",
                    },
                    {
                      name: "Bridal Party",
                      members: 6,
                      lastActivity: "5 hours ago",
                      description: "Bridesmaids and groomsmen coordination",
                    },
                    {
                      name: "Family Coordination",
                      members: 12,
                      lastActivity: "1 day ago",
                      description: "Family members and close relatives",
                    },
                  ].map((group, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{group.name}</h4>
                          <p className="text-sm text-gray-600">{group.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{group.members} members</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{group.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Group Chat Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Group Creator",
                "Member Management",
                "Group Settings",
                "Admin Controls",
                "Message Moderation",
                "Group Templates",
                "Announcement Tools",
                "Poll Creator",
                "Event Planning",
                "File Sharing",
                "Group Calendar",
                "Task Assignment",
                "Group Analytics",
                "Member Roles",
                "Group Archive",
                "Broadcast Messages",
                "Group Backup",
                "Privacy Settings",
                "Group Export",
                "Integration Tools",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      type: "message",
                      title: "New message from Royal Palace Gardens",
                      description: "Venue confirmation details",
                      time: "5 minutes ago",
                      read: false,
                    },
                    {
                      type: "reminder",
                      title: "Meeting reminder",
                      description: "Cake tasting at 3 PM today",
                      time: "1 hour ago",
                      read: false,
                    },
                    {
                      type: "update",
                      title: "Vendor update",
                      description: "Photographer shared new portfolio",
                      time: "3 hours ago",
                      read: true,
                    },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${notification.read ? "bg-gray-50" : "bg-blue-50"}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${notification.read ? "bg-gray-400" : "bg-blue-500"}`}
                          ></div>
                          <div>
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.description}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Message Notifications</Label>
                    <Button variant="outline" size="sm">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Email Alerts</Label>
                    <Button variant="outline" size="sm">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Push Notifications</Label>
                    <Button variant="outline" size="sm">
                      <BellOff className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SMS Alerts</Label>
                    <Button variant="outline" size="sm">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notification Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Alert Manager",
                "Notification Rules",
                "Custom Alerts",
                "Reminder System",
                "Notification History",
                "Alert Scheduling",
                "Priority Settings",
                "Notification Templates",
                "Alert Categories",
                "Notification Analytics",
                "Smart Notifications",
                "Quiet Hours",
                "Notification Backup",
                "Alert Integration",
                "Notification Export",
                "Custom Sounds",
                "Visual Alerts",
                "Notification Sync",
                "Alert Automation",
                "Notification API",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Bell className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Message Templates</span>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Vendor Inquiry",
                      category: "Business",
                      preview: "Hello, I'm interested in your services for my wedding on...",
                      uses: 12,
                    },
                    {
                      name: "Meeting Request",
                      category: "Scheduling",
                      preview: "Would you be available for a meeting to discuss...",
                      uses: 8,
                    },
                    {
                      name: "Thank You Note",
                      category: "Courtesy",
                      preview: "Thank you so much for your excellent service...",
                      uses: 15,
                    },
                    {
                      name: "Follow-up Message",
                      category: "Business",
                      preview: "I wanted to follow up on our previous conversation...",
                      uses: 6,
                    },
                  ].map((template, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{template.preview}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Used {template.uses} times</span>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm">Use</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Template Tools */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Template Builder",
                "Quick Responses",
                "Auto-Complete",
                "Template Categories",
                "Custom Variables",
                "Template Sharing",
                "Template Analytics",
                "Smart Suggestions",
                "Template Import",
                "Template Export",
                "Template Backup",
                "Template Search",
                "Template Tags",
                "Template History",
                "Template Favorites",
                "Template Sync",
                "Template API",
                "Template Automation",
                "Template Reports",
                "Template Integration",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <Edit className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Chat Bot Builder",
                "Auto Responder",
                "Message Scheduler",
                "Bulk Messaging",
                "Message Analytics",
                "Communication Hub",
                "Integration Center",
                "API Management",
                "Webhook Setup",
                "Message Backup",
                "Chat Export",
                "Message Search",
                "Communication Reports",
                "Team Collaboration",
                "Message Encryption",
                "Privacy Controls",
                "Message Filtering",
                "Spam Protection",
                "Message Archiving",
                "Communication Audit",
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Settings className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">{tool}</p>
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
