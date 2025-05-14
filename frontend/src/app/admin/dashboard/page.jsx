"use client"

import { useState, useEffect, useRef } from "react"
import {
  Users,
  FileQuestion,
  Flag,
  BarChart3,
  Settings,
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  CheckCircle,
  XCircle,
  LogOut,
  Menu,
  X,
  Home,
  Activity,
  Bell,
  User,
} from "lucide-react"
import { getUsers, getContributions, updateContributionStatus } from "./actions"

export default function AdminDashboard() {
  // State for admin dashboard
  const [activeTab, setActiveTab] = useState("overview")
  const [users, setUsers] = useState([])
  const [contributions, setContributions] = useState([])
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalContributions: 0,
    pendingContributions: 0,
    totalQuestions: 0,
    totalReports: 0,
    userGrowth: [],
    contributionsByCategory: [],
  })
  const [scrolled, setScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    userStatus: "All",
    contributionStatus: "All",
    reportStatus: "All",
    dateRange: "All",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showUserActions, setShowUserActions] = useState(null)
  const [showContributionActions, setShowContributionActions] = useState(null)
  const [showReportActions, setShowReportActions] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [showBanConfirm, setShowBanConfirm] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New user registered", time: "5 minutes ago", read: false },
    { id: 2, message: "New report submitted", time: "1 hour ago", read: false },
    { id: 3, message: "Contribution approved", time: "3 hours ago", read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days ago
    end: new Date().toISOString().split("T")[0], // today
  })

  const filterRef = useRef(null)
  const userActionsRef = useRef([])
  const contributionActionsRef = useRef([])
  const reportActionsRef = useRef([])
  const chartRef = useRef(null)
  const pieChartRef = useRef(null)
  const notificationsRef = useRef(null)
  const userMenuRef = useRef(null)

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Handle scroll events for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false)
      }

      // Close user action menus
      if (
        showUserActions !== null &&
        userActionsRef.current[showUserActions] &&
        !userActionsRef.current[showUserActions].contains(event.target)
      ) {
        setShowUserActions(null)
      }

      // Close contribution action menus
      if (
        showContributionActions !== null &&
        contributionActionsRef.current[showContributionActions] &&
        !contributionActionsRef.current[showContributionActions].contains(event.target)
      ) {
        setShowContributionActions(null)
      }

      // Close report action menus
      if (
        showReportActions !== null &&
        reportActionsRef.current[showReportActions] &&
        !reportActionsRef.current[showReportActions].contains(event.target)
      ) {
        setShowReportActions(null)
      }

      // Close notifications dropdown
      if (notificationsRef.current && !notificationsRef.current.contains(event.target) && showNotifications) {
        setShowNotifications(false)
      }

      // Close user menu dropdown
      if (userMenuRef.current && !userMenuRef.current.contains(event.target) && showUserMenu) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showUserActions, showContributionActions, showReportActions, showNotifications, showUserMenu])

  // Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be actual API calls
        // For now, we'll use mock data
        const usersData = await getUsers()
        const contributionsData = await getContributions()
        // const reportsData = await getReports()
        // const statsData = await getStats()
        // console.log(usersData) 
        setUsers(usersData) 
        setContributions(contributionsData)
        // setReports(reportsData)
        // setStats(statsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        setErrorMessage("Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Draw charts when data is loaded and tab is active
  useEffect(() => {
    if (activeTab === "overview" && !isLoading && stats.userGrowth?.length > 0) {
      drawUserGrowthChart()
      drawCategoryPieChart()
    }
  }, [activeTab, isLoading, stats])

  // Draw user growth chart
  const drawUserGrowthChart = () => {
    if (!chartRef.current) return

    const canvas = chartRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Sample data - user growth over last 7 days
    const data = stats.userGrowth || [5, 8, 12, 7, 15, 10, 18]
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

  // Draw category pie chart
  const drawCategoryPieChart = () => {
    if (!pieChartRef.current) return

    const canvas = pieChartRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 20

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Sample data - contributions by category
    const data = stats.contributionsByCategory || [
      { category: "Behavioral", count: 45 },
      { category: "Technical", count: 30 },
      { category: "Situational", count: 15 },
      { category: "Other", count: 10 },
    ]

    const total = data.reduce((sum, item) => sum + item.count, 0)
    let startAngle = 0

    // Colors for pie slices
    const colors = ["#00A3A9", "#006770", "#008C8B", "#003B46"]

    // Draw pie slices
    data.forEach((item, index) => {
      const sliceAngle = (2 * Math.PI * item.count) / total
      const endAngle = startAngle + sliceAngle

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      // Draw label
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + labelRadius * Math.cos(labelAngle)
      const labelY = centerY + labelRadius * Math.sin(labelAngle)

      ctx.fillStyle = "#fff"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.category}`, labelX, labelY)
      ctx.fillText(`${Math.round((item.count / total) * 100)}%`, labelX, labelY + 12)

      startAngle = endAngle
    })

    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI)
    ctx.fillStyle = "#070F12"
    ctx.fill()
  }

  // Particle animation for background
  useEffect(() => {
    const canvas = document.getElementById("admin-canvas")
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

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filters.userStatus === "All" || user.status === filters.userStatus

    return matchesSearch && matchesStatus
  })

  // Filter contributions based on search and filters
  console.log(contributions);
  
  const filteredContributions = contributions.filter((contribution) => {
    const matchesSearch =
      contribution.questionId?.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contribution.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contribution.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filters.contributionStatus === "All" || contribution.status === filters.contributionStatus

    return matchesSearch && matchesStatus
  })

  // Filter reports based on search and filters
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedContent.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filters.reportStatus === "All" || report.status === filters.reportStatus

    return matchesSearch && matchesStatus
  })

  // Update user status
  const handleUpdateUserStatus = async (userId, newStatus) => {
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const result = await updateUserStatus(userId, newStatus)

      if (result.success) {
        // Update UI
        setUsers(
          users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  status: newStatus,
                }
              : user,
          ),
        )
        setSuccessMessage(`User ${newStatus === "Banned" ? "banned" : "activated"} successfully!`)
      } else {
        setErrorMessage(result.message || "Failed to update user status")
      }
    } catch (error) {
      console.error("Error updating user status:", error)
      setErrorMessage("An error occurred while updating user status")
    } finally {
      setIsSubmitting(false)
      setShowBanConfirm(null)
      setShowUserActions(null)
    }

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  // Update contribution status
  const handleUpdateContributionStatus = async (contributionId, newStatus) => {
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const result = await updateContributionStatus(contributionId, newStatus)

      if (result.success) {
        // Update UI
        setContributions(
          contributions.map((contribution) =>
            contribution.id === contributionId
              ? {
                  ...contribution,
                  status: newStatus,
                }
              : contribution,
          ),
        )
        setSuccessMessage(`Contribution ${newStatus.toLowerCase()} successfully!`)
      } else {
        setErrorMessage(result.message || "Failed to update contribution status")
      }
    } catch (error) {
      console.error("Error updating contribution status:", error)
      setErrorMessage("An error occurred while updating contribution status")
    } finally {
      setIsSubmitting(false)
      setShowContributionActions(null)
    }

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  // Delete report
  const handleDeleteReport = async (reportId) => {
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // In a real app, call server action to delete
      // For now, just update UI
      setReports(reports.filter((report) => report.id !== reportId))
      setSuccessMessage("Report deleted successfully!")
    } catch (error) {
      console.error("Error deleting report:", error)
      setErrorMessage("An error occurred while deleting the report")
    } finally {
      setIsSubmitting(false)
      setShowDeleteConfirm(null)
      setShowReportActions(null)
    }

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  return (
    <div className="min-h-screen bg-[#070F12] text-white relative overflow-hidden">
      {/* Background canvas for particle animation */}
      <canvas id="admin-canvas" className="fixed top-0 left-0 w-full h-full pointer-events-none"></canvas>

      {/* Success message toast */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-up flex items-center">
          <CheckCircle className="mr-2 h-5 w-5" />
          {successMessage}
        </div>
      )}

      {/* Error message toast */}
      {errorMessage && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-up flex items-center">
          <XCircle className="mr-2 h-5 w-5" />
          {errorMessage}
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#003B46] z-40 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-0 lg:w-16"
        }`}
      >
        <div className="p-4 flex items-center justify-between h-16">
          {sidebarOpen && <h1 className="text-xl font-bold text-[#00A3A9]">Career Catalyst</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1 rounded-full hover:bg-[#006770] transition-colors ${!sidebarOpen && "mx-auto"}`}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center p-3 ${
              activeTab === "overview" ? "bg-[#006770]" : "hover:bg-[#004B56] transition-colors"
            } ${!sidebarOpen && "justify-center"}`}
          >
            <Home size={20} className={sidebarOpen ? "mr-3" : ""} />
            {sidebarOpen && <span>Overview</span>}
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center p-3 ${
              activeTab === "users" ? "bg-[#006770]" : "hover:bg-[#004B56] transition-colors"
            } ${!sidebarOpen && "justify-center"}`}
          >
            <Users size={20} className={sidebarOpen ? "mr-3" : ""} />
            {sidebarOpen && <span>Users</span>}
          </button>

          <button
            onClick={() => setActiveTab("contributions")}
            className={`w-full flex items-center p-3 ${
              activeTab === "contributions" ? "bg-[#006770]" : "hover:bg-[#004B56] transition-colors"
            } ${!sidebarOpen && "justify-center"}`}
          >
            <FileQuestion size={20} className={sidebarOpen ? "mr-3" : ""} />
            {sidebarOpen && <span>Contributions</span>}
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className={`w-full flex items-center p-3 ${
              activeTab === "reports" ? "bg-[#006770]" : "hover:bg-[#004B56] transition-colors"
            } ${!sidebarOpen && "justify-center"}`}
          >
            <Flag size={20} className={sidebarOpen ? "mr-3" : ""} />
            {sidebarOpen && <span>Reports</span>}
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center p-3 ${
              activeTab === "analytics" ? "bg-[#006770]" : "hover:bg-[#004B56] transition-colors"
            } ${!sidebarOpen && "justify-center"}`}
          >
            <BarChart3 size={20} className={sidebarOpen ? "mr-3" : ""} />
            {sidebarOpen && <span>Analytics</span>}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center p-3 ${
              activeTab === "settings" ? "bg-[#006770]" : "hover:bg-[#004B56] transition-colors"
            } ${!sidebarOpen && "justify-center"}`}
          >
            <Settings size={20} className={sidebarOpen ? "mr-3" : ""} />
            {sidebarOpen && <span>Settings</span>}
          </button>
        </div>

        {sidebarOpen && (
          <div className="absolute bottom-4 left-0 w-full px-4">
            <div className="bg-[#006770] rounded-md p-3 text-sm">
              <p className="font-medium">Admin Portal</p>
              <p className="text-gray-300 text-xs mt-1">Version 1.0.0</p>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-0 lg:ml-16"}`}>
        {/* Header */}
        <header
          className={`sticky top-0 z-30 bg-[#070F12] transition-all duration-300 ${
            scrolled ? "shadow-md shadow-[#003B46]/20 bg-opacity-90 backdrop-blur-sm" : ""
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "users" && "User Management"}
                {activeTab === "contributions" && "Contribution Management"}
                {activeTab === "reports" && "Report Management"}
                {activeTab === "analytics" && "Analytics"}
                {activeTab === "settings" && "Settings"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#003B46]/50 border border-[#006770] rounded-md py-1 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all w-40 lg:w-64"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-[#003B46] transition-colors relative"
                >
                  <Bell size={20} />
                  {notifications.some((n) => !n.read) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#003B46] rounded-md shadow-lg overflow-hidden z-50 animate-fade-in-up">
                    <div className="p-3 border-b border-[#006770] flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-[#00A3A9] hover:text-[#008C8B] transition-colors"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-3 text-sm text-gray-400">No notifications</p>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-[#006770]/30 hover:bg-[#006770]/20 transition-colors ${
                              !notification.read ? "bg-[#006770]/10" : ""
                            }`}
                          >
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-[#003B46] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#00A3A9] flex items-center justify-center">
                    <User size={16} />
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#003B46] rounded-md shadow-lg overflow-hidden z-50 animate-fade-in-up">
                    <div className="p-3 border-b border-[#006770] flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#00A3A9] flex items-center justify-center">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Admin User</p>
                        <p className="text-xs text-gray-400">admin@example.com</p>
                      </div>
                    </div>
                    <div>
                      <button className="w-full text-left p-3 hover:bg-[#006770]/20 transition-colors flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span className="text-sm">Profile</span>
                      </button>
                      <button className="w-full text-left p-3 hover:bg-[#006770]/20 transition-colors flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span className="text-sm">Settings</span>
                      </button>
                      <button className="w-full text-left p-3 hover:bg-[#006770]/20 transition-colors flex items-center border-t border-[#006770]/30">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="p-4">
          {/* Loading state */}
          {isLoading ? (
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-[#003B46]/50 rounded-lg p-4 animate-pulse h-32"></div>
                ))}
              </div>
              <div className="bg-[#003B46]/50 rounded-lg p-4 animate-pulse h-64"></div>
              <div className="bg-[#003B46]/50 rounded-lg p-4 animate-pulse h-96"></div>
            </div>
          ) : (
            <>
              {/* Overview tab */}
              {activeTab === "overview" && (
                <div className="space-y-6 animate-fade-in">
                  {/* Stats cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-[#003B46] to-[#006770] rounded-lg p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-300 text-sm">Total Users</p>
                          <h3 className="text-2xl font-bold mt-1">{users.length}</h3>
                          <p className="text-xs text-[#00A3A9] mt-2">
                            <span className="font-medium">+12%</span> from last month
                          </p>
                        </div>
                        <div className="p-2 bg-[#00A3A9]/20 rounded-lg">
                          <Users size={24} className="text-[#00A3A9]" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#003B46] to-[#006770] rounded-lg p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-300 text-sm">Total Contributions</p>
                          <h3 className="text-2xl font-bold mt-1">{contributions.length}</h3>
                          <p className="text-xs text-[#00A3A9] mt-2">
                            <span className="font-medium">+8%</span> from last month
                          </p>
                        </div>
                        <div className="p-2 bg-[#00A3A9]/20 rounded-lg">
                          <FileQuestion size={24} className="text-[#00A3A9]" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#003B46] to-[#006770] rounded-lg p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-300 text-sm">Total Questions</p>
                          <h3 className="text-2xl font-bold mt-1">{answers.length}</h3>
                          <p className="text-xs text-[#00A3A9] mt-2">
                            <span className="font-medium">+15%</span> from last month
                          </p>
                        </div>
                        <div className="p-2 bg-[#00A3A9]/20 rounded-lg">
                          <Activity size={24} className="text-[#00A3A9]" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#003B46] to-[#006770] rounded-lg p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-300 text-sm">Pending Reports</p>
                          <h3 className="text-2xl font-bold mt-1">{stats.totalReports}</h3>
                          <p className="text-xs text-[#00A3A9] mt-2">
                            <span className="font-medium">-5%</span> from last month
                          </p>
                        </div>
                        <div className="p-2 bg-[#00A3A9]/20 rounded-lg">
                          <Flag size={24} className="text-[#00A3A9]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#003B46]/50 rounded-lg p-4 shadow-lg">
                      <h3 className="text-lg font-medium mb-4">User Growth</h3>
                      <div className="h-64 w-full">
                        <canvas ref={chartRef} width="400" height="200"></canvas>
                      </div>
                    </div>

                    <div className="bg-[#003B46]/50 rounded-lg p-4 shadow-lg">
                      <h3 className="text-lg font-medium mb-4">Contributions by Category</h3>
                      <div className="h-64 w-full flex items-center justify-center">
                        <canvas ref={pieChartRef} width="200" height="200"></canvas>
                      </div>
                    </div>
                  </div>

                  {/* Recent activity */}
                  <div className="bg-[#003B46]/50 rounded-lg p-4 shadow-lg">
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 p-3 rounded-md hover:bg-[#006770]/20 transition-colors"
                        >
                          <div className="p-2 bg-[#00A3A9]/20 rounded-full">
                            {i % 3 === 0 && <Users size={16} className="text-[#00A3A9]" />}
                            {i % 3 === 1 && <FileQuestion size={16} className="text-[#00A3A9]" />}
                            {i % 3 === 2 && <Flag size={16} className="text-[#00A3A9]" />}
                          </div>
                          <div>
                            <p className="text-sm">
                              {i % 3 === 0 && "New user registered"}
                              {i % 3 === 1 && "New contribution submitted"}
                              {i % 3 === 2 && "New report submitted"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {i + 1} hour{i !== 0 ? "s" : ""} ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Users tab */}
              {activeTab === "users" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative md:hidden">
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-[#003B46]/50 border border-[#006770] rounded-md py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all w-full"
                      />
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>

                    <div className="relative" ref={filterRef}>
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center space-x-2 bg-[#003B46]/50 border border-[#006770] rounded-md px-3 py-2 text-sm hover:bg-[#006770]/30 transition-colors"
                      >
                        <Filter size={16} />
                        <span>Filter</span>
                        <ChevronDown size={16} />
                      </button>

                      {showFilters && (
                        <div className="absolute left-0 mt-2 w-48 bg-[#003B46] rounded-md shadow-lg overflow-hidden z-10 animate-fade-in-up">
                          <div className="p-3 border-b border-[#006770]">
                            <h3 className="font-medium text-sm">Filter Users</h3>
                          </div>
                          <div className="p-3">
                            <label className="text-sm font-medium">Status</label>
                            <select
                              value={filters.userStatus}
                              onChange={(e) => setFilters({ ...filters, userStatus: e.target.value })}
                              className="mt-1 block w-full bg-[#070F12] border border-[#006770] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all"
                            >
                              <option value="All">All</option>
                              <option value="Active">Active</option>
                              <option value="Pending">Pending</option>
                              <option value="Banned">Banned</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#003B46]/50 rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-[#006770]/30">
                            <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Joined</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#006770]/30">
                          {filteredUsers.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-4 py-4 text-center text-gray-400">
                                No users found
                              </td>
                            </tr>
                          ) : (
                            filteredUsers.map((user, index) => (
                              <tr key={user.id} className="hover:bg-[#006770]/10 transition-colors">
                                <td className="px-4 py-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-[#00A3A9] flex items-center justify-center">
                                      <span className="font-medium text-sm">{user.name.charAt(0)}</span>
                                    </div>
                                    <span className="font-medium">{user.name}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{user.email}</td>
                                <td className="px-4 py-3 text-sm">{user.role}</td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                      user.status === "Active"
                                        ? "bg-green-500/20 text-green-400"
                                        : user.status === "Pending"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                    }`}
                                  >
                                    {user.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm">{user.joinedDate}</td>
                                <td className="px-4 py-3 text-sm relative">
                                  <button
                                    onClick={() => setShowUserActions(index)}
                                    className="p-1 hover:bg-[#006770]/30 rounded-full transition-colors"
                                  >
                                    <MoreVertical size={16} />
                                  </button>

                                  {showUserActions === index && (
                                    <div
                                      ref={(el) => (userActionsRef.current[index] = el)}
                                      className="absolute right-0 mt-2 w-48 bg-[#003B46] rounded-md shadow-lg overflow-hidden z-10 animate-fade-in-up"
                                    >
                                      <button
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors"
                                        onClick={() => {
                                          // View user profile action
                                          setShowUserActions(null)
                                        }}
                                      >
                                        View Profile
                                      </button>
                                      <button
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors"
                                        onClick={() => {
                                          // Edit user action
                                          setShowUserActions(null)
                                        }}
                                      >
                                        Edit User
                                      </button>
                                      {user.status === "Banned" ? (
                                        <button
                                          className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors text-green-400"
                                          onClick={() => handleUpdateUserStatus(user.id, "Active")}
                                        >
                                          Activate User
                                        </button>
                                      ) : (
                                        <button
                                          className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors text-red-400"
                                          onClick={() => setShowBanConfirm(user.id)}
                                        >
                                          Ban User
                                        </button>
                                      )}
                                    </div>
                                  )}

                                  {showBanConfirm === user.id && (
                                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                      <div className="bg-[#003B46] rounded-lg p-6 max-w-md mx-4 animate-fade-in-up">
                                        <h3 className="text-lg font-medium mb-2">Ban User</h3>
                                        <p className="text-gray-300 mb-4">
                                          Are you sure you want to ban {user.name}? This will prevent them from
                                          accessing the platform.
                                        </p>
                                        <div className="flex justify-end space-x-3">
                                          <button
                                            className="px-4 py-2 rounded-md border border-[#006770] hover:bg-[#006770]/20 transition-colors"
                                            onClick={() => setShowBanConfirm(null)}
                                            disabled={isSubmitting}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
                                            onClick={() => handleUpdateUserStatus(user.id, "Banned")}
                                            disabled={isSubmitting}
                                          >
                                            {isSubmitting ? "Processing..." : "Ban User"}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Contributions tab */}
              {activeTab === "contributions" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative md:hidden">
                      <input
                        type="text"
                        placeholder="Search contributions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-[#003B46]/50 border border-[#006770] rounded-md py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all w-full"
                      />
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>

                    <div className="relative" ref={filterRef}>
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center space-x-2 bg-[#003B46]/50 border border-[#006770] rounded-md px-3 py-2 text-sm hover:bg-[#006770]/30 transition-colors"
                      >
                        <Filter size={16} />
                        <span>Filter</span>
                        <ChevronDown size={16} />
                      </button>

                      {showFilters && (
                        <div className="absolute left-0 mt-2 w-48 bg-[#003B46] rounded-md shadow-lg overflow-hidden z-10 animate-fade-in-up">
                          <div className="p-3 border-b border-[#006770]">
                            <h3 className="font-medium text-sm">Filter Contributions</h3>
                          </div>
                          <div className="p-3">
                            <label className="text-sm font-medium">Status</label>
                            <select
                              value={filters.contributionStatus}
                              onChange={(e) => setFilters({ ...filters, contributionStatus: e.target.value })}
                              className="mt-1 block w-full bg-[#070F12] border border-[#006770] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all"
                            >
                              <option value="All">All</option>
                              <option value="Approved">Approved</option>
                              <option value="Pending">Pending</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#003B46]/50 rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-[#006770]/30">
                            <th className="px-4 py-3 text-left text-sm font-medium">Question</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#006770]/30">
                          {filteredContributions.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-4 py-4 text-center text-gray-400">
                                No contributions found
                              </td>
                            </tr>
                          ) : (
                            filteredContributions.map((contribution, index) => (
                              <tr key={contribution.id} className="hover:bg-[#006770]/10 transition-colors">
                                <td className="px-4 py-3">
                                  <div className="max-w-xs truncate">
                                    <span className="font-medium">{contribution.question}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{contribution.user}</td>
                                <td className="px-4 py-3 text-sm">{contribution.category}</td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                      contribution.status === "Approved"
                                        ? "bg-green-500/20 text-green-400"
                                        : contribution.status === "Pending"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                    }`}
                                  >
                                    {contribution.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm">{contribution.date}</td>
                                <td className="px-4 py-3 text-sm relative">
                                  <button
                                    onClick={() => setShowContributionActions(index)}
                                    className="p-1 hover:bg-[#006770]/30 rounded-full transition-colors"
                                  >
                                    <MoreVertical size={16} />
                                  </button>

                                  {showContributionActions === index && (
                                    <div
                                      ref={(el) => (contributionActionsRef.current[index] = el)}
                                      className="absolute right-0 mt-2 w-48 bg-[#003B46] rounded-md shadow-lg overflow-hidden z-10 animate-fade-in-up"
                                    >
                                      <button
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors"
                                        onClick={() => {
                                          // View contribution action
                                          setShowContributionActions(null)
                                        }}
                                      >
                                        View Details
                                      </button>
                                      {contribution.status === "Pending" && (
                                        <>
                                          <button
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors text-green-400"
                                            onClick={() => handleUpdateContributionStatus(contribution.id, "Approved")}
                                          >
                                            Approve
                                          </button>
                                          <button
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors text-red-400"
                                            onClick={() => handleUpdateContributionStatus(contribution.id, "Rejected")}
                                          >
                                            Reject
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Reports tab */}
              {activeTab === "reports" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative md:hidden">
                      <input
                        type="text"
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-[#003B46]/50 border border-[#006770] rounded-md py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all w-full"
                      />
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>

                    <div className="relative" ref={filterRef}>
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center space-x-2 bg-[#003B46]/50 border border-[#006770] rounded-md px-3 py-2 text-sm hover:bg-[#006770]/30 transition-colors"
                      >
                        <Filter size={16} />
                        <span>Filter</span>
                        <ChevronDown size={16} />
                      </button>

                      {showFilters && (
                        <div className="absolute left-0 mt-2 w-48 bg-[#003B46] rounded-md shadow-lg overflow-hidden z-10 animate-fade-in-up">
                          <div className="p-3 border-b border-[#006770]">
                            <h3 className="font-medium text-sm">Filter Reports</h3>
                          </div>
                          <div className="p-3">
                            <label className="text-sm font-medium">Status</label>
                            <select
                              value={filters.reportStatus}
                              onChange={(e) => setFilters({ ...filters, reportStatus: e.target.value })}
                              className="mt-1 block w-full bg-[#070F12] border border-[#006770] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all"
                            >
                              <option value="All">All</option>
                              <option value="Open">Open</option>
                              <option value="Resolved">Resolved</option>
                              <option value="Dismissed">Dismissed</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#003B46]/50 rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-[#006770]/30">
                            <th className="px-4 py-3 text-left text-sm font-medium">Reported Content</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Reported User</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Reason</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#006770]/30">
                          {filteredReports.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-4 py-4 text-center text-gray-400">
                                No reports found
                              </td>
                            </tr>
                          ) : (
                            filteredReports.map((report, index) => (
                              <tr key={report.id} className="hover:bg-[#006770]/10 transition-colors">
                                <td className="px-4 py-3">
                                  <div className="max-w-xs truncate">
                                    <span className="font-medium">{report.reportedContent}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{report.reportedUser}</td>
                                <td className="px-4 py-3 text-sm">{report.reason}</td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                      report.status === "Resolved"
                                        ? "bg-green-500/20 text-green-400"
                                        : report.status === "Open"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-gray-500/20 text-gray-400"
                                    }`}
                                  >
                                    {report.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm">{report.date}</td>
                                <td className="px-4 py-3 text-sm relative">
                                  <button
                                    onClick={() => setShowReportActions(index)}
                                    className="p-1 hover:bg-[#006770]/30 rounded-full transition-colors"
                                  >
                                    <MoreVertical size={16} />
                                  </button>

                                  {showReportActions === index && (
                                    <div
                                      ref={(el) => (reportActionsRef.current[index] = el)}
                                      className="absolute right-0 mt-2 w-48 bg-[#003B46] rounded-md shadow-lg overflow-hidden z-10 animate-fade-in-up"
                                    >
                                      <button
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors"
                                        onClick={() => {
                                          // View report action
                                          setShowReportActions(null)
                                        }}
                                      >
                                        View Details
                                      </button>
                                      {report.status === "Open" && (
                                        <>
                                          <button
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors text-green-400"
                                            onClick={() => {
                                              // Mark as resolved action
                                              setShowReportActions(null)
                                            }}
                                          >
                                            Mark as Resolved
                                          </button>
                                          <button
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors text-gray-400"
                                            onClick={() => {
                                              // Dismiss action
                                              setShowReportActions(null)
                                            }}
                                          >
                                            Dismiss
                                          </button>
                                        </>
                                      )}
                                      <button
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-[#006770]/20 transition-colors text-red-400"
                                        onClick={() => setShowDeleteConfirm(report.id)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}

                                  {showDeleteConfirm === report.id && (
                                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                      <div className="bg-[#003B46] rounded-lg p-6 max-w-md mx-4 animate-fade-in-up">
                                        <h3 className="text-lg font-medium mb-2">Delete Report</h3>
                                        <p className="text-gray-300 mb-4">
                                          Are you sure you want to delete this report? This action cannot be undone.
                                        </p>
                                        <div className="flex justify-end space-x-3">
                                          <button
                                            className="px-4 py-2 rounded-md border border-[#006770] hover:bg-[#006770]/20 transition-colors"
                                            onClick={() => setShowDeleteConfirm(null)}
                                            disabled={isSubmitting}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
                                            onClick={() => handleDeleteReport(report.id)}
                                            disabled={isSubmitting}
                                          >
                                            {isSubmitting ? "Processing..." : "Delete"}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics tab */}
              {activeTab === "analytics" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-[#003B46]/50 rounded-lg p-4 shadow-lg">
                    <h3 className="text-lg font-medium mb-4">Analytics Dashboard</h3>
                    <p className="text-gray-300 mb-6">
                      View detailed analytics and insights about your platform's performance.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-[#006770]/20 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">User Engagement</h4>
                        <div className="h-40 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-[#00A3A9]">78%</p>
                            <p className="text-xs text-gray-400 mt-1">+12% from last month</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#006770]/20 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Question Success Rate</h4>
                        <div className="h-40 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-[#00A3A9]">92%</p>
                            <p className="text-xs text-gray-400 mt-1">+5% from last month</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#006770]/20 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Average Response Time</h4>
                        <div className="h-40 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-[#00A3A9]">1.2s</p>
                            <p className="text-xs text-gray-400 mt-1">-0.3s from last month</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#003B46]/50 rounded-lg p-4 shadow-lg">
                      <h3 className="text-lg font-medium mb-4">User Demographics</h3>
                      <div className="h-64 flex items-center justify-center">
                        <p className="text-gray-400">Demographics chart will be displayed here</p>
                      </div>
                    </div>

                    <div className="bg-[#003B46]/50 rounded-lg p-4 shadow-lg">
                      <h3 className="text-lg font-medium mb-4">Traffic Sources</h3>
                      <div className="h-64 flex items-center justify-center">
                        <p className="text-gray-400">Traffic sources chart will be displayed here</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#003B46]/50 rounded-lg p-4 shadow-lg">
                    <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Server Response Time</span>
                          <span className="text-sm text-[#00A3A9]">85%</span>
                        </div>
                        <div className="w-full bg-[#070F12] rounded-full h-2">
                          <div className="bg-[#00A3A9] h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Database Performance</span>
                          <span className="text-sm text-[#00A3A9]">92%</span>
                        </div>
                        <div className="w-full bg-[#070F12] rounded-full h-2">
                          <div className="bg-[#00A3A9] h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">API Reliability</span>
                          <span className="text-sm text-[#00A3A9]">97%</span>
                        </div>
                        <div className="w-full bg-[#070F12] rounded-full h-2">
                          <div className="bg-[#00A3A9] h-2 rounded-full" style={{ width: "97%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">AI Response Accuracy</span>
                          <span className="text-sm text-[#00A3A9]">89%</span>
                        </div>
                        <div className="w-full bg-[#070F12] rounded-full h-2">
                          <div className="bg-[#00A3A9] h-2 rounded-full" style={{ width: "89%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings tab */}
              {activeTab === "settings" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-[#003B46]/50 rounded-lg p-4 shadow-lg">
                    <h3 className="text-lg font-medium mb-4">General Settings</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Site Name</label>
                        <input
                          type="text"
                          defaultValue="Career Catalyst"
                          className="w-full bg-[#070F12] border border-[#006770] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Site Description</label>
                        <textarea
                          defaultValue="AI-powered career guidance and interview preparation platform"
                          rows={3}
                          className="w-full bg-[#070F12] border border-[#006770] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all"
                        ></textarea>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Maintenance Mode</h4>
                          <p className="text-sm text-gray-400">Temporarily disable the site for maintenance</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-[#070F12]">
                          <input type="checkbox" id="maintenance-toggle" className="sr-only" />
                          <span className="block w-6 h-6 rounded-full bg-gray-500 absolute left-0 transition-transform duration-200"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#003B46]/50 rounded-lg p-4 shadow-lg">
                    <h3 className="text-lg font-medium mb-4">AI Settings</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">AI Model</label>
                        <select className="w-full bg-[#070F12] border border-[#006770] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all">
                          <option>GPT-4</option>
                          <option>GPT-3.5 Turbo</option>
                          <option>Claude 2</option>
                          <option>Custom Model</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">API Key</label>
                        <input
                          type="password"
                          defaultValue="sk-••••••••••••••••••••••••"
                          className="w-full bg-[#070F12] border border-[#006770] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Enable AI Features</h4>
                          <p className="text-sm text-gray-400">Toggle all AI-powered features</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-[#070F12]">
                          <input type="checkbox" id="ai-toggle" className="sr-only" defaultChecked />
                          <span className="block w-6 h-6 rounded-full bg-[#00A3A9] absolute left-6 transition-transform duration-200"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#003B46]/50 rounded-lg p-4 shadow-lg">
                    <h3 className="text-lg font-medium mb-4">Security Settings</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-400">Require 2FA for admin accounts</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-[#070F12]">
                          <input type="checkbox" id="2fa-toggle" className="sr-only" defaultChecked />
                          <span className="block w-6 h-6 rounded-full bg-[#00A3A9] absolute left-6 transition-transform duration-200"></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Content Moderation</h4>
                          <p className="text-sm text-gray-400">Auto-moderate user submissions</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-[#070F12]">
                          <input type="checkbox" id="moderation-toggle" className="sr-only" defaultChecked />
                          <span className="block w-6 h-6 rounded-full bg-[#00A3A9] absolute left-6 transition-transform duration-200"></span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          defaultValue="30"
                          className="w-full bg-[#070F12] border border-[#006770] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-[#00A3A9] hover:bg-[#008C8B] transition-colors rounded-md">
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
