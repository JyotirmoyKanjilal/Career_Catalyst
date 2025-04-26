"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  User,
  Settings,
  Edit,
  Save,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Calendar,
  Award,
  BarChart,
  CheckCircle,
  Star,
  TrendingUp,
  MessageSquare,
  FileText,
  Camera,
  Sparkles,
  Zap,
  Bookmark,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Plus,
  Trash,
  Mail,
} from "lucide-react"

export default function Profile() {
  // State for user data
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Software Engineer",
    location: "San Francisco, CA",
    bio: "Passionate software engineer with 5+ years of experience in full-stack development. Specializing in React, Node.js, and cloud technologies. Looking for opportunities to grow in a leadership role.",
    phone: "+1 (555) 123-4567",
    website: "alexjohnson.dev",
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Python", level: 65 },
      { name: "AWS", level: 70 },
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        school: "Stanford University",
        year: "2018 - 2020",
      },
      {
        degree: "B.S. Computer Science",
        school: "University of California, Berkeley",
        year: "2014 - 2018",
      },
    ],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "TechCorp",
        duration: "2020 - Present",
        description: "Leading a team of 5 engineers building cloud-based solutions.",
      },
      {
        title: "Software Engineer",
        company: "StartupX",
        duration: "2018 - 2020",
        description: "Developed core platform features and improved CI/CD pipeline.",
      },
      {
        title: "Software Engineering Intern",
        company: "BigTech Inc.",
        duration: "Summer 2017",
        description: "Worked on front-end development for the company's main product.",
      },
    ],
    interviews: [
      {
        company: "InnovateAI",
        position: "Lead Developer",
        date: "June 15, 2023",
        status: "Completed",
        feedback: "Strong technical skills, good cultural fit.",
        score: 92,
      },
      {
        company: "TechGiant",
        position: "Senior Engineer",
        date: "May 3, 2023",
        status: "Completed",
        feedback: "Excellent problem-solving abilities.",
        score: 88,
      },
      {
        company: "FutureTech",
        position: "Engineering Manager",
        date: "Scheduled",
        date: "July 10, 2023",
        status: "Upcoming",
        score: null,
      },
    ],
    achievements: [
      {
        title: "Interview Master",
        description: "Completed 10 mock interviews",
        icon: <Award className="h-5 w-5" />,
        date: "May 2023",
      },
      {
        title: "Question Solver",
        description: "Answered 50 practice questions",
        icon: <CheckCircle className="h-5 w-5" />,
        date: "April 2023",
      },
      {
        title: "Profile Perfectionist",
        description: "Completed all profile sections",
        icon: <Star className="h-5 w-5" />,
        date: "March 2023",
      },
    ],
    savedJobs: [
      {
        title: "Senior Full Stack Developer",
        company: "TechInnovate",
        location: "Remote",
        salary: "$120k - $150k",
        posted: "2 days ago",
      },
      {
        title: "Engineering Team Lead",
        company: "GrowthStartup",
        location: "San Francisco, CA",
        salary: "$140k - $170k",
        posted: "1 week ago",
      },
      {
        title: "Frontend Developer",
        company: "DesignTech",
        location: "New York, NY",
        salary: "$100k - $130k",
        posted: "3 days ago",
      },
    ],
    notifications: [
      {
        id: 1,
        message: "Your interview with TechGiant is tomorrow at 2:00 PM",
        time: "1 hour ago",
        read: false,
        type: "reminder",
      },
      {
        id: 2,
        message: "New job matching your profile: Senior Developer at InnovateCorp",
        time: "3 hours ago",
        read: true,
        type: "job",
      },
      {
        id: 3,
        message: "Your resume has been viewed by 5 recruiters this week",
        time: "1 day ago",
        read: true,
        type: "alert",
      },
    ],
    settings: {
      emailNotifications: true,
      profileVisibility: "public",
      darkMode: false,
      twoFactorAuth: false,
    },
  })

  // UI state
  const [activeTab, setActiveTab] = useState("overview")
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({})
  const [scrolled, setScrolled] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: "", level: 50 })
  const [profileCompletion, setProfileCompletion] = useState(85)
  const [darkMode, setDarkMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false)
  const [isAnimating, setIsAnimating] = useState({})
  const fileInputRef = useRef(null)
  const notificationRef = useRef(null)
  const chartRef = useRef(null)

  // Handle scroll events for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Count unread notifications
  useEffect(() => {
    const count = userData.notifications.filter((notification) => !notification.read).length
    setUnreadNotifications(count)
  }, [userData.notifications])

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Particle animation for background
  useEffect(() => {
    const canvas = document.getElementById("profile-canvas")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 15 : 30
    const particles = []

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5

        // Use teal color palette for particles
        const tealShades = [
          `rgba(0, 59, 70, ${Math.random() * 0.3 + 0.1})`,
          `rgba(0, 103, 112, ${Math.random() * 0.3 + 0.1})`,
          `rgba(0, 140, 139, ${Math.random() * 0.3 + 0.1})`,
          `rgba(0, 163, 169, ${Math.random() * 0.3 + 0.1})`,
        ]
        this.color = tealShades[Math.floor(Math.random() * tealShades.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particles.length = 0 // Clear existing particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reinitialize particles on resize
      const newIsMobile = window.innerWidth < 768
      if (newIsMobile !== isMobile) {
        init()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Draw activity chart
  useEffect(() => {
    if (activeTab === "activity" && chartRef.current) {
      const canvas = chartRef.current
      const ctx = canvas.getContext("2d")
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Sample data - activity over last 7 days
      const data = [15, 25, 10, 30, 20, 35, 25]
      const maxValue = Math.max(...data)
      const padding = 20
      const barWidth = (width - padding * 2) / data.length - 10
      const barMaxHeight = height - padding * 2

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i <= 4; i++) {
        const y = padding + (barMaxHeight / 4) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(width - padding, y)
        ctx.stroke()
      }

      // Draw bars
      data.forEach((value, index) => {
        const barHeight = (value / maxValue) * barMaxHeight
        const x = padding + index * (barWidth + 10)
        const y = height - padding - barHeight

        // Create gradient for bar
        const gradient = ctx.createLinearGradient(0, y, 0, height - padding)
        gradient.addColorStop(0, "#00A3A9")
        gradient.addColorStop(1, "#006770")

        // Draw bar
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, barHeight, 5)
        ctx.fill()

        // Draw value on top of bar
        ctx.fillStyle = "#fff"
        ctx.font = "10px Arial"
        ctx.textAlign = "center"
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5)

        // Draw day label
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        ctx.fillText(days[index], x + barWidth / 2, height - 5)
      })
    }
  }, [activeTab])

  // Simulate file upload
  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading(false)
            setUploadProgress(0)
          }, 500)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    simulateUpload()
  }

  // Toggle edit mode
  const toggleEditMode = () => {
    if (editMode) {
      // Save changes
      setUserData({ ...userData, ...editData })
      setEditMode(false)
    } else {
      // Enter edit mode
      setEditData({ ...userData })
      setEditMode(true)
    }
  }

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle skill level change
  const handleSkillLevelChange = (index, newLevel) => {
    const updatedSkills = [...userData.skills]
    updatedSkills[index].level = newLevel
    setUserData((prev) => ({ ...prev, skills: updatedSkills }))
  }

  // Add new skill
  const addSkill = () => {
    if (newSkill.name.trim() === "") return

    const updatedSkills = [...userData.skills, { ...newSkill }]
    setUserData((prev) => ({ ...prev, skills: updatedSkills }))
    setNewSkill({ name: "", level: 50 })
    setIsAddingSkill(false)
  }

  // Remove skill
  const removeSkill = (index) => {
    const updatedSkills = [...userData.skills]
    updatedSkills.splice(index, 1)
    setUserData((prev) => ({ ...prev, skills: updatedSkills }))
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = userData.notifications.map((notification) => ({
      ...notification,
      read: true,
    }))
    setUserData((prev) => ({ ...prev, notifications: updatedNotifications }))
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    setUserData((prev) => ({
      ...prev,
      settings: { ...prev.settings, darkMode: !prev.settings.darkMode },
    }))
  }

  // Toggle animation for a section
  const toggleAnimation = (section) => {
    setIsAnimating((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const slideVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className={`min-h-screen bg-[#070F12] text-gray-100 overflow-hidden ${darkMode ? "dark" : ""}`}>
      {/* Animated background canvas */}
      <canvas
        id="profile-canvas"
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0"
      ></canvas>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-500 ${
          scrolled
            ? "border-[#008C8B]/30 bg-[#070F12]/90 backdrop-blur supports-[backdrop-filter]:bg-[#070F12]/80 shadow-lg shadow-[#00A3A9]/10"
            : "border-transparent bg-[#070F12]/70 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <Briefcase className="h-7 w-7 sm:h-8 sm:w-8 text-[#00A3A9] group-hover:text-[#008C8B] transition-all duration-300 group-hover:rotate-12" />
                <span className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-[#00A3A9] transition-colors duration-300">
                  Career Catalyst
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-1 rounded-full hover:bg-[#003B46]/50 transition-colors"
                >
                  <Bell className="h-6 w-6 text-gray-300" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-[#00A3A9] text-xs flex items-center justify-center animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-[#070F12] border border-[#003B46]/50 rounded-lg shadow-lg z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-[#003B46]/50 flex justify-between items-center">
                        <h3 className="font-medium">Notifications</h3>
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-[#00A3A9] hover:text-[#008C8B] transition-colors"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {userData.notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-400">No notifications</div>
                        ) : (
                          userData.notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 border-b border-[#003B46]/30 hover:bg-[#003B46]/20 transition-colors ${
                                !notification.read ? "bg-[#003B46]/10" : ""
                              }`}
                            >
                              <div className="flex items-start">
                                <div
                                  className={`p-2 rounded-full mr-3 ${
                                    notification.type === "reminder"
                                      ? "bg-[#00A3A9]/20 text-[#00A3A9]"
                                      : notification.type === "job"
                                        ? "bg-green-500/20 text-green-500"
                                        : "bg-yellow-500/20 text-yellow-500"
                                  }`}
                                >
                                  {notification.type === "reminder" ? (
                                    <Calendar className="h-4 w-4" />
                                  ) : notification.type === "job" ? (
                                    <Briefcase className="h-4 w-4" />
                                  ) : (
                                    <Bell className="h-4 w-4" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm">{notification.message}</p>
                                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="p-2 border-t border-[#003B46]/50 text-center">
                        <Link href="#" className="text-xs text-[#00A3A9] hover:text-[#008C8B] transition-colors">
                          View all notifications
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark Mode Toggle */}
              <button onClick={toggleDarkMode} className="p-1 rounded-full hover:bg-[#003B46]/50 transition-colors">
                {darkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-gray-300" />}
              </button>

              {/* Back to Home Button */}
              <Link
                href="/"
                className="inline-flex items-center px-3 py-2 rounded-md bg-[#003B46]/80 text-white hover:bg-[#006770] transition-all duration-300 shadow-md hover:shadow-[#00A3A9]/20 text-sm"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <motion.div className="relative z-10 mb-8" initial="hidden" animate="visible" variants={containerVariants}>
          <div className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-[#003B46]/20 shadow-xl">
            {/* Cover Photo */}
            <div className="h-32 sm:h-48 bg-gradient-to-r from-[#003B46] to-[#006770] relative">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

              {/* Edit Button */}
              <motion.button
                onClick={toggleEditMode}
                className="absolute top-4 right-4 inline-flex items-center px-3 py-1.5 rounded-md bg-[#070F12]/50 hover:bg-[#070F12]/70 text-white border border-[#003B46]/50 transition-all hover:scale-105 text-sm backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {editMode ? (
                  <>
                    <Save className="h-4 w-4 mr-1.5" />
                    Save Profile
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-1.5" />
                    Edit Profile
                  </>
                )}
              </motion.button>
            </div>

            {/* Profile Info */}
            <div className="px-4 sm:px-6 pb-6 pt-16 sm:pt-20 relative">
              {/* Avatar */}
              <div className="absolute -top-16 left-6 sm:left-8">
                <motion.div
                  className="relative"
                  onMouseEnter={() => setIsHoveringAvatar(true)}
                  onMouseLeave={() => setIsHoveringAvatar(false)}
                  whileHover={{ scale: 1.05 }}
                  variants={itemVariants}
                >
                  <div className="h-32 w-32 rounded-full border-4 border-[#070F12] overflow-hidden relative">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                    />

                    {/* Upload overlay */}
                    <AnimatePresence>
                      {(isHoveringAvatar || isUploading) && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[#070F12]/70 flex flex-col items-center justify-center cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {isUploading ? (
                            <div className="w-full px-4">
                              <div className="h-2 w-full bg-[#003B46]/50 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#00A3A9] rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-center mt-1">{uploadProgress}%</p>
                            </div>
                          ) : (
                            <>
                              <Camera className="h-6 w-6 text-white mb-1" />
                              <span className="text-xs">Change Photo</span>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Glowing ring animation */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#006770] to-[#00A3A9] opacity-70 blur-sm -z-10 animate-pulse-slow"></div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </motion.div>
              </div>

              {/* Profile Details */}
              <div className="sm:ml-36">
                <motion.div variants={itemVariants}>
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="text-2xl sm:text-3xl font-bold bg-transparent border-b-2 border-[#00A3A9]/50 focus:border-[#00A3A9] outline-none pb-1 w-full max-w-md"
                    />
                  ) : (
                    <h1 className="text-2xl sm:text-3xl font-bold">{userData.name}</h1>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="mt-1">
                  {editMode ? (
                    <input
                      type="text"
                      name="role"
                      value={editData.role}
                      onChange={handleEditChange}
                      className="text-lg text-[#00A3A9] bg-transparent border-b border-[#00A3A9]/30 focus:border-[#00A3A9] outline-none pb-1 w-full max-w-md"
                    />
                  ) : (
                    <p className="text-lg text-[#00A3A9]">{userData.role}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="mt-2 flex flex-wrap items-center text-sm text-gray-400">
                  <div className="flex items-center mr-4 mb-2">
                    {editMode ? (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <input
                          type="text"
                          name="location"
                          value={editData.location}
                          onChange={handleEditChange}
                          className="bg-transparent border-b border-[#003B46]/50 focus:border-[#00A3A9] outline-none pb-0.5 w-40"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{userData.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    {editMode ? (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleEditChange}
                          className="bg-transparent border-b border-[#003B46]/50 focus:border-[#00A3A9] outline-none pb-0.5 w-48"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{userData.email}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mb-2">
                    {editMode ? (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        <input
                          type="text"
                          name="phone"
                          value={editData.phone}
                          onChange={handleEditChange}
                          className="bg-transparent border-b border-[#003B46]/50 focus:border-[#00A3A9] outline-none pb-0.5 w-36"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{userData.phone}</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-4">
                  {editMode ? (
                    <textarea
                      name="bio"
                      value={editData.bio}
                      onChange={handleEditChange}
                      rows={3}
                      className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 focus:border-[#00A3A9] outline-none text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-300">{userData.bio}</p>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Completion */}
        <motion.div className="relative z-10 mb-8" initial="hidden" animate="visible" variants={containerVariants}>
          <div className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-[#003B46]/20 shadow-xl">
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Profile Completion</h3>
              <span className="text-[#00A3A9] font-medium">{profileCompletion}%</span>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full h-2 bg-[#003B46]/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#006770] to-[#00A3A9] rounded-full transition-all duration-1000"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-3 text-sm text-gray-400">
              Complete your profile to increase visibility to recruiters
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs and Content */}
        <div className="relative z-10">
          {/* Tabs */}
          <div className="mb-6 border-b border-[#003B46]/30">
            <div className="flex overflow-x-auto hide-scrollbar space-x-6">
              {[
                { id: "overview", label: "Overview", icon: <User className="h-4 w-4 mr-1.5" /> },
                { id: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4 mr-1.5" /> },
                { id: "skills", label: "Skills", icon: <Award className="h-4 w-4 mr-1.5" /> },
                { id: "interviews", label: "Interviews", icon: <MessageSquare className="h-4 w-4 mr-1.5" /> },
                { id: "activity", label: "Activity", icon: <BarChart className="h-4 w-4 mr-1.5" /> },
                { id: "saved", label: "Saved Jobs", icon: <Bookmark className="h-4 w-4 mr-1.5" /> },
                { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4 mr-1.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center whitespace-nowrap px-1 py-3 border-b-2 font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? "border-[#00A3A9] text-[#00A3A9]"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-[#003B46]/50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* About */}
                <motion.div
                  className="md:col-span-2 bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">About</h3>
                    <button
                      onClick={() => toggleAnimation("about")}
                      className="text-[#00A3A9] hover:text-[#008C8B] transition-colors"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    animate={isAnimating.about ? { y: [0, -5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-gray-300">{userData.bio}</p>
                  </motion.div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10"
                  variants={containerVariants}
                >
                  <motion.h3 variants={itemVariants} className="text-lg font-medium mb-4">
                    Quick Stats
                  </motion.h3>
                  <div className="space-y-4">
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center p-3 bg-[#003B46]/20 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="p-2 bg-[#00A3A9]/20 rounded-full mr-3">
                        <MessageSquare className="h-5 w-5 text-[#00A3A9]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Mock Interviews</p>
                        <p className="text-lg font-medium">12 Completed</p>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center p-3 bg-[#003B46]/20 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="p-2 bg-[#00A3A9]/20 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-[#00A3A9]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Practice Questions</p>
                        <p className="text-lg font-medium">87 Answered</p>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center p-3 bg-[#003B46]/20 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="p-2 bg-[#00A3A9]/20 rounded-full mr-3">
                        <TrendingUp className="h-5 w-5 text-[#00A3A9]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Improvement</p>
                        <p className="text-lg font-medium">+28% This Month</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Education */}
                <motion.div
                  className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Education</h3>
                    <button
                      onClick={() => toggleAnimation("education")}
                      className="text-[#00A3A9] hover:text-[#008C8B] transition-colors"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </motion.div>
                  <div className="space-y-4">
                    {userData.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        animate={isAnimating.education ? { y: [0, -5, 0] } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-l-2 border-[#00A3A9]/50 pl-4 py-1"
                      >
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-sm text-gray-400">{edu.school}</p>
                        <p className="text-xs text-gray-500">{edu.year}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Experience Preview */}
                <motion.div
                  className="md:col-span-2 bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Experience</h3>
                    <button
                      onClick={() => setActiveTab("experience")}
                      className="text-xs text-[#00A3A9] hover:text-[#008C8B] transition-colors flex items-center"
                    >
                      View All <ChevronRight className="h-3 w-3 ml-1" />
                    </button>
                  </motion.div>
                  <div className="space-y-4">
                    {userData.experience.slice(0, 2).map((exp, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="mr-4 relative">
                          <div className="h-10 w-10 rounded-full bg-[#003B46]/50 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-[#00A3A9]" />
                          </div>
                          {index < userData.experience.slice(0, 2).length - 1 && (
                            <div className="absolute top-10 bottom-0 left-1/2 w-0.5 bg-[#003B46]/50 transform -translate-x-1/2"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-sm text-[#00A3A9]">{exp.company}</p>
                          <p className="text-xs text-gray-500">{exp.duration}</p>
                          <p className="text-sm text-gray-400 mt-1">{exp.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10"
                  variants={containerVariants}
                >
                  <motion.h3 variants={itemVariants} className="text-lg font-medium mb-4">
                    Achievements
                  </motion.h3>
                  <div className="space-y-3">
                    {userData.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center p-3 bg-[#003B46]/20 rounded-lg group"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 103, 112, 0.2)" }}
                      >
                        <div className="p-2 bg-[#00A3A9]/20 rounded-full mr-3 group-hover:bg-[#00A3A9]/30 transition-colors">
                          {achievement.icon}
                        </div>
                        <div>
                          <p className="font-medium text-sm group-hover:text-[#00A3A9] transition-colors">
                            {achievement.title}
                          </p>
                          <p className="text-xs text-gray-400">{achievement.description}</p>
                          <p className="text-xs text-gray-500">{achievement.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "experience" && (
              <motion.div
                key="experience"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeVariants}
                className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl"
              >
                <motion.h3 variants={itemVariants} className="text-xl font-medium mb-6">
                  Work Experience
                </motion.h3>

                <div className="space-y-8">
                  {userData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      variants={slideVariants}
                      className="relative pl-8 pb-8"
                      custom={index}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Timeline dot and line */}
                      <div className="absolute left-0 top-0 h-full w-8">
                        <div className="h-8 w-8 rounded-full bg-[#003B46] border-2 border-[#00A3A9] flex items-center justify-center z-10 relative">
                          <Briefcase className="h-4 w-4 text-[#00A3A9]" />
                        </div>
                        {index < userData.experience.length - 1 && (
                          <div className="absolute top-8 bottom-0 left-4 w-0.5 bg-[#003B46]/50 transform -translate-x-1/2"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="bg-[#003B46]/10 rounded-lg p-4 border border-[#003B46]/30 hover:border-[#00A3A9]/30 transition-colors">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <div>
                            <h4 className="text-lg font-medium">{exp.title}</h4>
                            <p className="text-[#00A3A9]">{exp.company}</p>
                          </div>
                          <p className="text-sm text-gray-400 bg-[#003B46]/30 px-2 py-1 rounded">{exp.duration}</p>
                        </div>
                        <p className="text-gray-300">{exp.description}</p>

                        {/* Edit buttons (only shown in edit mode) */}
                        {editMode && (
                          <div className="mt-3 flex space-x-2">
                            <button className="text-xs text-[#00A3A9] hover:text-[#008C8B] transition-colors flex items-center">
                              <Edit className="h-3 w-3 mr-1" /> Edit
                            </button>
                            <button className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center">
                              <Trash className="h-3 w-3 mr-1" /> Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Add Experience Button (only shown in edit mode) */}
                  {editMode && (
                    <motion.div variants={itemVariants} className="pl-8">
                      <button className="w-full py-3 border-2 border-dashed border-[#003B46]/50 rounded-lg text-[#00A3A9] hover:border-[#00A3A9]/50 hover:bg-[#003B46]/10 transition-all flex items-center justify-center">
                        <Plus className="h-4 w-4 mr-2" /> Add Experience
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeVariants}
                className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl"
              >
                <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-medium">Skills & Expertise</h3>
                  {editMode && !isAddingSkill && (
                    <button
                      onClick={() => setIsAddingSkill(true)}
                      className="text-sm text-[#00A3A9] hover:text-[#008C8B] transition-colors flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Skill
                    </button>
                  )}
                </motion.div>

                {/* Add Skill Form */}
                <AnimatePresence>
                  {isAddingSkill && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-6 overflow-hidden"
                    >
                      <div className="bg-[#003B46]/20 rounded-lg p-4 border border-[#003B46]/30">
                        <h4 className="text-sm font-medium mb-3">Add New Skill</h4>
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="skill-name" className="block text-xs text-gray-400 mb-1">
                              Skill Name
                            </label>
                            <input
                              id="skill-name"
                              type="text"
                              value={newSkill.name}
                              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                              className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-sm focus:border-[#00A3A9] outline-none"
                              placeholder="e.g. React, Python, Project Management"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Proficiency Level: {newSkill.level}%
                            </label>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              step="5"
                              value={newSkill.level}
                              onChange={(e) => setNewSkill({ ...newSkill, level: Number.parseInt(e.target.value) })}
                              className="w-full h-2 bg-[#003B46]/50 rounded-lg appearance-none cursor-pointer accent-[#00A3A9]"
                            />
                          </div>
                          <div className="flex justify-end space-x-2 pt-2">
                            <button
                              onClick={() => setIsAddingSkill(false)}
                              className="px-3 py-1 text-sm border border-[#003B46]/50 rounded hover:bg-[#003B46]/30 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={addSkill}
                              disabled={!newSkill.name.trim()}
                              className={`px-3 py-1 text-sm rounded ${
                                newSkill.name.trim()
                                  ? "bg-[#006770] hover:bg-[#00A3A9] text-white"
                                  : "bg-[#003B46]/30 text-gray-500 cursor-not-allowed"
                              } transition-colors`}
                            >
                              Add Skill
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userData.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium group-hover:text-[#00A3A9] transition-colors">{skill.name}</h4>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-[#003B46]/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#006770] to-[#00A3A9] rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>

                      {/* Edit controls (only shown in edit mode) */}
                      {editMode && (
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleSkillLevelChange(index, Math.max(10, skill.level - 5))}
                              className="text-xs text-gray-400 hover:text-white transition-colors"
                              disabled={skill.level <= 10}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleSkillLevelChange(index, Math.min(100, skill.level + 5))}
                              className="text-xs text-gray-400 hover:text-white transition-colors"
                              disabled={skill.level >= 100}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeSkill(index)}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "interviews" && (
              <motion.div
                key="interviews"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeVariants}
                className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl"
              >
                <motion.h3 variants={itemVariants} className="text-xl font-medium mb-6">
                  Interview History
                </motion.h3>

                <div className="space-y-6">
                  {userData.interviews.map((interview, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`p-4 rounded-lg border ${
                        interview.status === "Upcoming"
                          ? "border-yellow-500/30 bg-yellow-500/5"
                          : "border-[#003B46]/30 bg-[#003B46]/10"
                      } hover:border-[#00A3A9]/30 transition-all`}
                      whileHover={{ scale: 1.01, x: 5 }}
                    >
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{interview.position}</h4>
                          <p className="text-[#00A3A9]">{interview.company}</p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            interview.status === "Upcoming"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {interview.status}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{interview.date}</span>
                      </div>

                      {interview.status === "Completed" && (
                        <>
                          <p className="text-sm text-gray-300 mb-3">
                            <span className="font-medium">Feedback:</span> {interview.feedback}
                          </p>
                          <div className="flex items-center">
                            <div className="flex-1">
                              <div className="h-2 bg-[#003B46]/30 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#006770] to-[#00A3A9] rounded-full"
                                  style={{ width: `${interview.score}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="ml-3 text-sm font-medium">
                              {interview.score}
                              <span className="text-xs text-gray-500">/100</span>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}

                  <motion.div
                    variants={itemVariants}
                    className="p-4 rounded-lg border border-dashed border-[#003B46]/50 hover:border-[#00A3A9]/30 transition-all text-center"
                  >
                    <button className="text-[#00A3A9] hover:text-[#008C8B] transition-colors flex items-center justify-center w-full">
                      <Plus className="h-4 w-4 mr-2" /> Schedule New Interview
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "activity" && (
              <motion.div
                key="activity"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeVariants}
                className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl"
              >
                <motion.h3 variants={itemVariants} className="text-xl font-medium mb-6">
                  Activity & Progress
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Activity Chart */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-[#003B46]/10 rounded-lg p-4 border border-[#003B46]/30"
                  >
                    <h4 className="font-medium mb-4">Weekly Activity</h4>
                    <div className="h-48 w-full">
                      <canvas ref={chartRef} width="400" height="200"></canvas>
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-[#003B46]/10 rounded-lg p-4 border border-[#003B46]/30"
                  >
                    <h4 className="font-medium mb-4">Recent Activity</h4>
                    <div className="space-y-4">
                      {[
                        {
                          action: "Completed mock interview",
                          detail: "Senior Developer position",
                          time: "2 days ago",
                          icon: <MessageSquare className="h-4 w-4" />,
                        },
                        {
                          action: "Answered practice questions",
                          detail: "React.js fundamentals",
                          time: "3 days ago",
                          icon: <CheckCircle className="h-4 w-4" />,
                        },
                        {
                          action: "Updated resume",
                          detail: "Added new skills and experience",
                          time: "1 week ago",
                          icon: <FileText className="h-4 w-4" />,
                        },
                        {
                          action: "Earned achievement",
                          detail: "Interview Master",
                          time: "2 weeks ago",
                          icon: <Award className="h-4 w-4" />,
                        },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start">
                          <div className="p-2 bg-[#00A3A9]/20 rounded-full mr-3 mt-0.5">{activity.icon}</div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-gray-400">{activity.detail}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Progress Stats */}
                  <motion.div
                    variants={itemVariants}
                    className="md:col-span-2 bg-[#003B46]/10 rounded-lg p-4 border border-[#003B46]/30"
                  >
                    <h4 className="font-medium mb-4">Progress Stats</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        {
                          label: "Interview Readiness",
                          value: 78,
                          icon: <Zap className="h-5 w-5" />,
                          color: "from-green-500 to-teal-500",
                        },
                        {
                          label: "Technical Skills",
                          value: 85,
                          icon: <Code className="h-5 w-5" />,
                          color: "from-[#006770] to-[#00A3A9]",
                        },
                        {
                          label: "Communication",
                          value: 92,
                          icon: <MessageSquare className="h-5 w-5" />,
                          color: "from-purple-500 to-indigo-500",
                        },
                      ].map((stat, index) => (
                        <div key={index} className="bg-[#070F12]/50 rounded-lg p-4 border border-[#003B46]/30">
                          <div className="flex items-center mb-2">
                            <div className="p-2 bg-[#00A3A9]/20 rounded-full mr-2">{stat.icon}</div>
                            <h5 className="font-medium text-sm">{stat.label}</h5>
                          </div>
                          <div className="flex items-center">
                            <div className="flex-1">
                              <div className="h-2 bg-[#003B46]/30 rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                                  style={{ width: `${stat.value}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="ml-3 text-lg font-medium">{stat.value}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "saved" && (
              <motion.div
                key="saved"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeVariants}
                className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl"
              >
                <motion.h3 variants={itemVariants} className="text-xl font-medium mb-6">
                  Saved Jobs
                </motion.h3>

                <div className="space-y-4">
                  {userData.savedJobs.map((job, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="p-4 rounded-lg border border-[#003B46]/30 bg-[#003B46]/10 hover:border-[#00A3A9]/30 transition-all group"
                      whileHover={{ scale: 1.01, x: 5 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium group-hover:text-[#00A3A9] transition-colors">{job.title}</h4>
                          <p className="text-[#00A3A9]">{job.company}</p>
                          <div className="flex flex-wrap items-center mt-2 text-sm text-gray-400">
                            <div className="flex items-center mr-4">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{job.posted}</div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="px-3 py-1 text-xs bg-[#006770] hover:bg-[#00A3A9] text-white rounded transition-colors">
                          Apply Now
                        </button>
                        <button className="px-3 py-1 text-xs border border-[#003B46]/50 hover:border-[#00A3A9]/50 rounded transition-colors">
                          View Details
                        </button>
                        <button className="ml-auto p-1 text-gray-400 hover:text-red-400 transition-colors">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <motion.div
                    variants={itemVariants}
                    className="p-4 rounded-lg border border-dashed border-[#003B46]/50 hover:border-[#00A3A9]/30 transition-all text-center"
                  >
                    <button className="text-[#00A3A9] hover:text-[#008C8B] transition-colors flex items-center justify-center w-full">
                      <Search className="h-4 w-4 mr-2" /> Browse More Jobs
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeVariants}
                className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl"
              >
                <motion.h3 variants={itemVariants} className="text-xl font-medium mb-6">
                  Account Settings
                </motion.h3>

                <div className="space-y-8">
                  {/* Profile Settings */}
                  <motion.div variants={itemVariants}>
                    <h4 className="text-lg font-medium mb-4">Profile Settings</h4>
                    <div className="space-y-4 bg-[#003B46]/10 rounded-lg p-4 border border-[#003B46]/30">
                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h5 className="font-medium text-sm">Profile Visibility</h5>
                          <p className="text-xs text-gray-400">Control who can see your profile</p>
                        </div>
                        <select
                          value={userData.settings.profileVisibility}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              settings: { ...userData.settings, profileVisibility: e.target.value },
                            })
                          }
                          className="bg-[#070F12] border border-[#003B46]/50 rounded px-3 py-1 text-sm focus:border-[#00A3A9] outline-none"
                        >
                          <option value="public">Public</option>
                          <option value="connections">Connections Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>

                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h5 className="font-medium text-sm">Email Notifications</h5>
                          <p className="text-xs text-gray-400">Receive email updates about activity</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                          <input
                            type="checkbox"
                            id="toggle-email"
                            className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                            checked={userData.settings.emailNotifications}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                settings: { ...userData.settings, emailNotifications: e.target.checked },
                              })
                            }
                          />
                          <label
                            htmlFor="toggle-email"
                            className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                              userData.settings.emailNotifications ? "bg-[#00A3A9]" : "bg-[#003B46]/50"
                            }`}
                          >
                            <span
                              className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-300 ${
                                userData.settings.emailNotifications ? "translate-x-6" : "translate-x-0"
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h5 className="font-medium text-sm">Dark Mode</h5>
                          <p className="text-xs text-gray-400">Switch between light and dark themes</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                          <input
                            type="checkbox"
                            id="toggle-dark"
                            className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                            checked={darkMode}
                            onChange={toggleDarkMode}
                          />
                          <label
                            htmlFor="toggle-dark"
                            className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                              darkMode ? "bg-[#00A3A9]" : "bg-[#003B46]/50"
                            }`}
                          >
                            <span
                              className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-300 ${
                                darkMode ? "translate-x-6" : "translate-x-0"
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Security Settings */}
                  <motion.div variants={itemVariants}>
                    <h4 className="text-lg font-medium mb-4">Security Settings</h4>
                    <div className="space-y-4 bg-[#003B46]/10 rounded-lg p-4 border border-[#003B46]/30">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Change Password</h5>
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="current-password" className="block text-xs text-gray-400 mb-1">
                              Current Password
                            </label>
                            <div className="relative">
                              <input
                                id="current-password"
                                type={showPassword ? "text" : "password"}
                                className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 pr-10 text-sm focus:border-[#00A3A9] outline-none"
                                placeholder="••••••••"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="new-password" className="block text-xs text-gray-400 mb-1">
                              New Password
                            </label>
                            <input
                              id="new-password"
                              type="password"
                              className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-sm focus:border-[#00A3A9] outline-none"
                              placeholder="••••••••"
                            />
                          </div>
                          <div>
                            <label htmlFor="confirm-password" className="block text-xs text-gray-400 mb-1">
                              Confirm New Password
                            </label>
                            <input
                              id="confirm-password"
                              type="password"
                              className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-sm focus:border-[#00A3A9] outline-none"
                              placeholder="••••••••"
                            />
                          </div>
                          <div className="pt-2">
                            <button className="px-4 py-2 bg-[#006770] hover:bg-[#00A3A9] text-white rounded text-sm transition-colors">
                              Update Password
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between items-center pt-2">
                        <div>
                          <h5 className="font-medium text-sm">Two-Factor Authentication</h5>
                          <p className="text-xs text-gray-400">Add an extra layer of security to your account</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                          <input
                            type="checkbox"
                            id="toggle-2fa"
                            className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                            checked={userData.settings.twoFactorAuth}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                settings: { ...userData.settings, twoFactorAuth: e.target.checked },
                              })
                            }
                          />
                          <label
                            htmlFor="toggle-2fa"
                            className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                              userData.settings.twoFactorAuth ? "bg-[#00A3A9]" : "bg-[#003B46]/50"
                            }`}
                          >
                            <span
                              className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-300 ${
                                userData.settings.twoFactorAuth ? "translate-x-6" : "translate-x-0"
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Account Actions */}
                  <motion.div variants={itemVariants}>
                    <h4 className="text-lg font-medium mb-4">Account Actions</h4>
                    <div className="space-y-4 bg-[#003B46]/10 rounded-lg p-4 border border-[#003B46]/30">
                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h5 className="font-medium text-sm">Export Your Data</h5>
                          <p className="text-xs text-gray-400">Download a copy of your data</p>
                        </div>
                        <button className="px-3 py-1.5 border border-[#003B46]/50 hover:border-[#00A3A9]/50 rounded text-sm transition-colors">
                          Export Data
                        </button>
                      </div>

                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h5 className="font-medium text-sm text-red-400">Delete Account</h5>
                          <p className="text-xs text-gray-400">Permanently delete your account and all data</p>
                        </div>
                        <button className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded text-sm transition-colors">
                          Delete Account
                        </button>
                      </div>

                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h5 className="font-medium text-sm">Sign Out</h5>
                          <p className="text-xs text-gray-400">Log out of your account</p>
                        </div>
                        <button className="px-3 py-1.5 flex items-center border border-[#003B46]/50 hover:border-[#00A3A9]/50 rounded text-sm transition-colors">
                          <LogOut className="h-4 w-4 mr-1.5" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#070F12] border-t border-[#003B46]/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="mx-2 text-gray-600">•</span>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Career Catalyst. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Missing component definition
function Code({ className, ...props }) {
  return <code className={`${className}`} {...props} />
}

function Search({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function MapPin({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function Phone({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
