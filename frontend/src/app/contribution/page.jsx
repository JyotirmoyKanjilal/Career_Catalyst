"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  ChevronLeft,
  MessageSquare,
  Send,
  ThumbsUp,
  Star,
  Award,
  CheckCircle,
  AlertTriangle,
  Edit,
  Trash,
  Filter,
  Search,
  ChevronDown,
  Clock,
  User,
  Sparkles,
  Lightbulb,
  FileText,
  Eye,
} from "lucide-react"
import { submitContribution, getQuestions, getContributions } from "contribution"

export default function Contribution() {
  // State for contributions and UI
  const [questions, setQuestions] = useState([])
  const [contributions, setContributions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [contributionText, setContributionText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "All",
    difficulty: "All",
    status: "All",
  })
  const [sortBy, setSortBy] = useState("newest")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: "Alex Johnson", contributions: 42, upvotes: 156, badges: ["Top Contributor", "Expert"] },
    { id: 2, name: "Priya Sharma", contributions: 38, upvotes: 142, badges: ["Rising Star"] },
    { id: 3, name: "Marcus Chen", contributions: 31, upvotes: 118, badges: ["Technical Expert"] },
    { id: 4, name: "Sophia Rodriguez", contributions: 27, upvotes: 103, badges: ["Behavioral Expert"] },
    { id: 5, name: "James Wilson", contributions: 24, upvotes: 89, badges: [] },
  ])
  const [userStats, setUserStats] = useState({
    contributions: 12,
    upvotes: 47,
    rank: 8,
    badges: ["Rising Star"],
  })
  const [isEditingContribution, setIsEditingContribution] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  const filterRef = useRef(null)
  const contributionRef = useRef(null)

  // Categories and difficulties
  const categories = ["All", "Behavioral", "Technical", "Situational", "Industry-Specific", "Role-Specific"]
  const difficulties = ["All", "Easy", "Medium", "Hard"]
  const statuses = ["All", "Pending", "Approved", "Rejected"]

  // Handle scroll events for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch questions and contributions on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsData = await getQuestions()
        setQuestions(questionsData)

        const contributionsData = await getContributions()
        setContributions(contributionsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  // Particle animation for background
  useEffect(() => {
    const canvas = document.getElementById("contribution-canvas")
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

  // Scroll to contribution form when selecting a question
  useEffect(() => {
    if (selectedQuestion && contributionRef.current) {
      contributionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [selectedQuestion])

  // Filter questions based on search and filters
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filters.category === "All" || question.category === filters.category
    const matchesDifficulty = filters.difficulty === "All" || question.difficulty === filters.difficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Filter contributions based on search and filters
  const filteredContributions = contributions.filter((contribution) => {
    const matchesSearch =
      contribution.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contribution.question.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filters.status === "All" || contribution.status === filters.status

    return matchesSearch && matchesStatus
  })

  // Sort contributions
  const sortedContributions = [...filteredContributions].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.timestamp) - new Date(a.timestamp)
      case "oldest":
        return new Date(a.timestamp) - new Date(b.timestamp)
      case "mostUpvotes":
        return b.upvotes - a.upvotes
      case "mostViews":
        return b.views - a.views
      default:
        return 0
    }
  })

  // Handle contribution submission
  const handleSubmitContribution = async () => {
    if (!selectedQuestion || !contributionText.trim()) {
      setErrorMessage("Please select a question and provide an answer")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Call server action to submit contribution
      const result = await submitContribution({
        questionId: selectedQuestion.id,
        answer: contributionText,
        isEditing: isEditingContribution !== null,
        contributionId: isEditingContribution,
      })

      if (result.success) {
        // Update UI
        if (isEditingContribution) {
          // Update existing contribution
          setContributions(
            contributions.map((c) =>
              c.id === isEditingContribution
                ? {
                    ...c,
                    answer: contributionText,
                    status: "Pending", // Reset status on edit
                    timestamp: new Date().toISOString(),
                  }
                : c,
            ),
          )
          setSuccessMessage("Contribution updated successfully!")
        } else {
          // Add new contribution
          const newContribution = {
            id: Date.now(), // Temporary ID
            questionId: selectedQuestion.id,
            question: selectedQuestion.question,
            answer: contributionText,
            timestamp: new Date().toISOString(),
            status: "Pending",
            upvotes: 0,
            downvotes: 0,
            views: 0,
            user: "Current User",
          }
          setContributions([newContribution, ...contributions])
          setSuccessMessage("Contribution submitted successfully!")

          // Update user stats
          setUserStats({
            ...userStats,
            contributions: userStats.contributions + 1,
          })
        }

        // Reset form
        setSelectedQuestion(null)
        setContributionText("")
        setIsEditingContribution(null)
      } else {
        setErrorMessage(result.message || "Failed to submit contribution")
      }
    } catch (error) {
      console.error("Error submitting contribution:", error)
      setErrorMessage("An error occurred while submitting your contribution")
    } finally {
      setIsSubmitting(false)
    }

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  // Edit contribution
  const editContribution = (contribution) => {
    const question = questions.find((q) => q.id === contribution.questionId)
    setSelectedQuestion(question)
    setContributionText(contribution.answer)
    setIsEditingContribution(contribution.id)

    if (contributionRef.current) {
      contributionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Delete contribution
  const deleteContribution = async (id) => {
    setIsSubmitting(true)

    try {
      // In a real app, call server action to delete
      // For now, just update UI
      setContributions(contributions.filter((c) => c.id !== id))
      setSuccessMessage("Contribution deleted successfully!")

      // Update user stats
      setUserStats({
        ...userStats,
        contributions: userStats.contributions - 1,
      })
    } catch (error) {
      console.error("Error deleting contribution:", error)
      setErrorMessage("An error occurred while deleting your contribution")
    } finally {
      setIsSubmitting(true)
      setShowDeleteConfirm(null)
    }

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  // Vote on contribution
  const voteOnContribution = (id, isUpvote) => {
    setContributions(
      contributions.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            upvotes: isUpvote ? c.upvotes + 1 : c.upvotes,
            downvotes: !isUpvote ? c.downvotes + 1 : c.downvotes,
          }
        }
        return c
      }),
    )

    // Update user stats if upvoted
    if (isUpvote) {
      setUserStats({
        ...userStats,
        upvotes: userStats.upvotes + 1,
      })
    }
  }

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <div className="min-h-screen bg-[#070F12] text-gray-100 overflow-hidden">
      {/* Animated background canvas */}
      <canvas
        id="contribution-canvas"
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
      </header>

      {/* Main Content */}
      <main className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative z-10">
          {/* Page Title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Answer Contribution System</h1>
                <p className="mt-2 text-gray-400">
                  Share your expertise by contributing answers to interview questions
                </p>
              </div>
              <motion.button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-[#003B46]/80 hover:bg-[#006770] rounded-md transition-all duration-300 shadow-md hover:shadow-[#00A3A9]/20 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="h-4 w-4 mr-2" />
                {showLeaderboard ? "Hide Leaderboard" : "View Leaderboard"}
              </motion.button>
            </div>
          </motion.div>

          {/* Success and Error Messages */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-md flex items-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-400">{successMessage}</p>
              </motion.div>
            )}
            {errorMessage && (
              <motion.div
                className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md flex items-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertTriangle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-400">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Leaderboard */}
          <AnimatePresence>
            {showLeaderboard && (
              <motion.div
                className="mb-8 bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Award className="h-5 w-5 text-[#00A3A9] mr-2" />
                  Top Contributors
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#003B46]/50">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Rank</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Contributor</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Contributions</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Upvotes</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Badges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((user, index) => (
                        <tr
                          key={user.id}
                          className={`border-b border-[#003B46]/30 hover:bg-[#003B46]/20 transition-colors ${
                            index === 0 ? "bg-[#003B46]/10" : ""
                          }`}
                        >
                          <td className="px-4 py-3 text-sm">
                            {index === 0 ? (
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-500/20 text-yellow-400">
                                1
                              </span>
                            ) : index === 1 ? (
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-400/20 text-gray-400">
                                2
                              </span>
                            ) : index === 2 ? (
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-600/20 text-amber-600">
                                3
                              </span>
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">{user.name}</td>
                          <td className="px-4 py-3 text-sm">{user.contributions}</td>
                          <td className="px-4 py-3 text-sm">{user.upvotes}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex flex-wrap gap-1">
                              {user.badges.map((badge, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#00A3A9]/20 text-[#00A3A9]"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {/* Current user */}
                      <tr className="bg-[#006770]/10 border-b border-[#003B46]/30">
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#00A3A9]/20 text-[#00A3A9]">
                            {userStats.rank}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">You</td>
                        <td className="px-4 py-3 text-sm">{userStats.contributions}</td>
                        <td className="px-4 py-3 text-sm">{userStats.upvotes}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {userStats.badges.map((badge, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#00A3A9]/20 text-[#00A3A9]"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-[#003B46]/20 rounded-lg">
                  <h3 className="text-sm font-medium text-white mb-2">How to Earn Badges</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-start">
                      <div className="p-1.5 bg-[#00A3A9]/20 rounded-full mr-2">
                        <Star className="h-4 w-4 text-[#00A3A9]" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">Top Contributor</p>
                        <p className="text-xs text-gray-400">Submit 50+ approved answers</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="p-1.5 bg-[#00A3A9]/20 rounded-full mr-2">
                        <Award className="h-4 w-4 text-[#00A3A9]" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">Expert</p>
                        <p className="text-xs text-gray-400">Receive 100+ upvotes on your answers</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="p-1.5 bg-[#00A3A9]/20 rounded-full mr-2">
                        <Sparkles className="h-4 w-4 text-[#00A3A9]" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">Rising Star</p>
                        <p className="text-xs text-gray-400">10+ contributions in your first month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-2 border-[#003B46]/50 rounded-md bg-[#070F12]/80 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                placeholder="Search questions or contributions..."
              />
            </div>

            <div className="flex gap-2">
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-[#003B46]/50 rounded-md hover:bg-[#003B46]/20 transition-colors"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>

                {/* Filters Dropdown */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-[#070F12] border border-[#003B46]/50 rounded-lg shadow-lg z-20 overflow-hidden"
                    >
                      <div className="p-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                          <select
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-sm focus:border-[#00A3A9] outline-none"
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                          <select
                            value={filters.difficulty}
                            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                            className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-sm focus:border-[#00A3A9] outline-none"
                          >
                            {difficulties.map((difficulty) => (
                              <option key={difficulty} value={difficulty}>
                                {difficulty}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                          <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-sm focus:border-[#00A3A9] outline-none"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => {
                              setFilters({
                                category: "All",
                                difficulty: "All",
                                status: "All",
                              })
                              setShowFilters(false)
                            }}
                            className="px-3 py-1 text-sm text-[#00A3A9] hover:text-[#008C8B] transition-colors"
                          >
                            Reset Filters
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#070F12] border border-[#003B46]/50 rounded-md px-3 py-2 text-sm focus:border-[#00A3A9] outline-none"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="mostUpvotes">Most Upvotes</option>
                <option value="mostViews">Most Views</option>
              </select>
            </div>
          </div>

          {/* Two-column layout for desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Questions Column */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <MessageSquare className="h-5 w-5 text-[#00A3A9] mr-2" />
                  Questions to Answer
                </h2>
                <span className="text-sm text-gray-400">
                  {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Questions List */}
              {filteredQuestions.length > 0 ? (
                <motion.div className="space-y-4" initial="hidden" animate="visible" variants={containerVariants}>
                  {filteredQuestions.map((question) => (
                    <motion.div
                      key={question.id}
                      variants={itemVariants}
                      className={`bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-5 border transition-all duration-300 hover:shadow-[#00A3A9]/10 group ${
                        selectedQuestion?.id === question.id
                          ? "border-[#00A3A9]/50 shadow-lg"
                          : "border-[#003B46]/20 hover:border-[#00A3A9]/30"
                      }`}
                    >
                      <h3 className="text-lg font-medium group-hover:text-[#00A3A9] transition-colors">
                        {question.question}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <div className="bg-[#003B46]/30 text-xs px-2 py-1 rounded-full text-gray-300">
                          {question.category}
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            question.difficulty === "Easy"
                              ? "bg-green-500/20 text-green-400"
                              : question.difficulty === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {question.difficulty}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-400">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {question.answers || 0} answers
                        </div>
                        <button
                          onClick={() => setSelectedQuestion(question)}
                          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                            selectedQuestion?.id === question.id
                              ? "bg-[#00A3A9] text-white"
                              : "bg-[#003B46]/50 hover:bg-[#006770] text-white"
                          }`}
                        >
                          {selectedQuestion?.id === question.id ? "Selected" : "Answer This"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 bg-[#070F12]/80 backdrop-blur-sm rounded-xl border border-[#003B46]/20">
                  <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-300">No questions found</h3>
                  <p className="text-gray-400 mt-2">Try adjusting your filters or search term</p>
                </div>
              )}
            </div>

            {/* Contributions Column */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <User className="h-5 w-5 text-[#00A3A9] mr-2" />
                  Your Contributions
                </h2>
                <span className="text-sm text-gray-400">
                  {filteredContributions.length} contribution{filteredContributions.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Contributions List */}
              {filteredContributions.length > 0 ? (
                <motion.div className="space-y-4" initial="hidden" animate="visible" variants={containerVariants}>
                  {sortedContributions.map((contribution) => (
                    <motion.div
                      key={contribution.id}
                      variants={itemVariants}
                      className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-5 border border-[#003B46]/20 shadow-xl transition-all duration-300 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10 group"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium group-hover:text-[#00A3A9] transition-colors">
                          {contribution.question}
                        </h3>
                        <div
                          className={`px-2 py-1 text-xs rounded-full ${
                            contribution.status === "Approved"
                              ? "bg-green-500/20 text-green-400"
                              : contribution.status === "Rejected"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {contribution.status}
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-sm text-gray-300 line-clamp-3">{contribution.answer}</p>
                      </div>

                      <div className="mt-4 flex flex-wrap justify-between items-center">
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(contribution.timestamp).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {contribution.upvotes}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {contribution.views}
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-2 sm:mt-0">
                          <button
                            onClick={() => editContribution(contribution)}
                            className="p-1.5 rounded-md bg-[#003B46]/50 hover:bg-[#003B46]/80 transition-colors"
                            disabled={contribution.status === "Approved"}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(contribution.id)}
                            className="p-1.5 rounded-md bg-[#003B46]/50 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Delete Confirmation */}
                      <AnimatePresence>
                        {showDeleteConfirm === contribution.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-md"
                          >
                            <p className="text-sm text-red-400 mb-2">
                              Are you sure you want to delete this contribution?
                            </p>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-3 py-1 text-xs border border-[#003B46]/50 rounded hover:bg-[#003B46]/30 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => deleteContribution(contribution.id)}
                                disabled={isSubmitting}
                                className="px-3 py-1 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors flex items-center"
                              >
                                {isSubmitting && showDeleteConfirm === contribution.id ? (
                                  <>
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-3 w-3 text-red-400"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Deleting...
                                  </>
                                ) : (
                                  "Delete"
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 bg-[#070F12]/80 backdrop-blur-sm rounded-xl border border-[#003B46]/20">
                  <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-300">No contributions yet</h3>
                  <p className="text-gray-400 mt-2">Select a question and share your expertise</p>
                </div>
              )}
            </div>
          </div>

          {/* Contribution Form */}
          {selectedQuestion && (
            <motion.div
              ref={contributionRef}
              className="mt-8 bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 text-[#00A3A9] mr-2" />
                {isEditingContribution ? "Edit Your Answer" : "Contribute Your Answer"}
              </h2>

              <div className="mb-4 p-4 bg-[#003B46]/20 rounded-lg">
                <h3 className="font-medium text-[#00A3A9]">{selectedQuestion.question}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <div className="bg-[#003B46]/30 text-xs px-2 py-1 rounded-full text-gray-300">
                    {selectedQuestion.category}
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedQuestion.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-400"
                        : selectedQuestion.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {selectedQuestion.difficulty}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="contribution" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Answer
                </label>
                <textarea
                  id="contribution"
                  value={contributionText}
                  onChange={(e) => setContributionText(e.target.value)}
                  rows={8}
                  className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-3 text-gray-100 focus:border-[#00A3A9] outline-none"
                  placeholder="Share your expertise here..."
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <div className="text-sm text-gray-400">
                  <p>Tips for great answers:</p>
                  <ul className="list-disc pl-5 text-xs mt-1 space-y-1">
                    <li>Use the STAR method for behavioral questions</li>
                    <li>Include specific examples from your experience</li>
                    <li>Keep answers concise and focused</li>
                    <li>Proofread for clarity and grammar</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedQuestion(null)
                      setContributionText("")
                      setIsEditingContribution(null)
                    }}
                    className="px-4 py-2 border border-[#003B46]/50 rounded-md hover:bg-[#003B46]/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitContribution}
                    disabled={isSubmitting || !contributionText.trim()}
                    className={`px-4 py-2 bg-[#006770] hover:bg-[#00A3A9] text-white rounded-md transition-colors flex items-center ${
                      isSubmitting || !contributionText.trim() ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {isEditingContribution ? "Updating..." : "Submitting..."}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        {isEditingContribution ? "Update Answer" : "Submit Answer"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
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
