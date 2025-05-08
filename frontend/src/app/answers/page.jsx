"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  ArrowUpDown,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  MessageSquare,
  Clock,
  Tag,
  User,
  ChevronDown,
  ChevronUp,
  Briefcase,
  X,
  Menu,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  XIcon,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import ReactMarkdown from "react-markdown"
import { fetchContributions, createDiscussionFromContribution, fetchDiscussionsByContribution } from "../../utils/api"
import { useRouter } from 'next/navigation'

// Define theme colors based on the provided palette
const theme = {
  darkest: "#070F12",
  darkTeal: "#003B46",
  mediumTeal: "#006770",
  brightTeal: "#008C8B",
  lightTeal: "#00A3A9",
}

export default function AnswersPage() {

  const router = useRouter();

  const [answers, setAnswers] = useState([])
  const [filteredAnswers, setFilteredAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [expandedAnswer, setExpandedAnswer] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const [showDiscussionModal, setShowDiscussionModal] = useState(false)
  const [selectedContribution, setSelectedContribution] = useState(null)
  const [discussionForm, setDiscussionForm] = useState({
    title: '',
    description: '',
    tags: ''
  })
  const [existingDiscussions, setExistingDiscussions] = useState([])
  const [isLoadingDiscussions, setIsLoadingDiscussions] = useState(false)
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(true)
  const answersPerPage = 5

  const categories = [
    "All",
    "Technical",
    "Behavioral",
    "Leadership",
    "Problem Solving",
    "Career Development",
    "Industry Specific",
  ]

  // Simulated answers data - in a real app, this would come from your database
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchContributions()
        // Map backend data to UI structure
        const mapped = data.map((c) => ({
          id: c._id,
          question: c.questionId?.question || "Question",
          answer: c.answer,
          category: c.questionId?.category || "General",
          upvotes: c.upvotes,
          downvotes: c.downvotes,
          bookmarks: 0,
          views: c.views,
          createdAt: c.timestamp,
          user: {
            name: c.user?.name || "Anonymous",
            avatar: "/placeholder.svg?height=40&width=40",
            role: c.user?.role || "User",
          },
          tags: c.questionId?.tags || [],
        }))
        setAnswers(mapped)
        setFilteredAnswers(mapped)
      } catch (error) {
        console.error("Error fetching answers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter and sort answers
  useEffect(() => {
    let result = [...answers]

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter((answer) => answer.category === selectedCategory)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (answer) =>
          answer.question.toLowerCase().includes(query) ||
          answer.answer.toLowerCase().includes(query) ||
          answer.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case "mostUpvoted":
        result.sort((a, b) => b.upvotes - a.upvotes)
        break
      case "mostViewed":
        result.sort((a, b) => b.views - a.views)
        break
      default:
        break
    }

    setFilteredAnswers(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [answers, selectedCategory, searchQuery, sortOption])

  // Handle scroll events for animations and header
  useEffect(() => {
    const handleScroll = () => {
      // Header background change on scroll
      setScrolled(window.scrollY > 20)

      // Reveal elements when they come into view
      const sections = document.querySelectorAll(".animate-on-scroll")
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionId = section.id || Math.random().toString()

        if (sectionTop < window.innerHeight * 0.75) {
          setIsVisible((prev) => ({ ...prev, [sectionId]: true }))
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate pagination
  const indexOfLastAnswer = currentPage * answersPerPage
  const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage
  const currentAnswers = filteredAnswers.slice(indexOfFirstAnswer, indexOfLastAnswer)
  const totalPages = Math.ceil(filteredAnswers.length / answersPerPage)

  // Pagination controls
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Toggle answer expansion
  const toggleAnswer = (id) => {
    setExpandedAnswer(expandedAnswer === id ? null : id)
  }

  const openDiscussionModal = async (answer) => {
    setSelectedContribution(answer.id)
    setDiscussionForm({
      title: `Discussion: ${answer.question}`,
      description: '',
      tags: answer.tags?.join(', ') || ''
    })
    
    // Fetch existing discussions for this contribution
    setIsLoadingDiscussions(true)
    try {
      const discussions = await fetchDiscussionsByContribution(answer.id)
      setExistingDiscussions(discussions)
    } catch (error) {
      console.error("Failed to fetch discussions:", error)
    } finally {
      setIsLoadingDiscussions(false)
      setShowDiscussionModal(true)
    }
  }

  const handleSubmitDiscussion = async (e) => {
    e.preventDefault();
    
    try {
      const tagsArray = discussionForm.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const discussionData = {
        contribution: selectedContribution,
        title: discussionForm.title,
        description: discussionForm.description,
        tags: tagsArray
      };
      
      const newDiscussion = await createDiscussionFromContribution(discussionData);
      
      // Add the new discussion to the list or redirect
      window.location.href = `/discussion/${newDiscussion._id}`;
    } catch (error) {
      alert("Failed to create discussion: " + error.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#070F12] text-gray-100">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-500 ${scrolled
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link href="/" className="text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white">
                Home
              </Link>
              <Link
                href="/ai-answer"
                className="text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white"
              >
                Ask AI
              </Link>
              <Link
                href="/ai-answer"
                className="text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#00A3A9] after:w-full text-[#00A3A9]"
              >
                Answers
              </Link>
              <Link
                href="/contribution"
                className="text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white"
              >
                Contribute
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-[#003B46]/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00A3A9] transition-colors"
                aria-expanded={isMenuOpen}
                aria-label="Main menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Sign In / Sign Up Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Sign in
              </Link>
              <Link
                href="/auth?mode=signup"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#006770] hover:bg-[#008C8B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A3A9] transition-all hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-16 left-0 right-0 bg-[#070F12]/95 border-b border-[#003B46]/20 overflow-hidden z-40"
            >
              <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#003B46]/20 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/ai-answer"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#003B46]/20 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ask AI
                </Link>
                <Link
                  href="/answers"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#00A3A9] bg-[#003B46]/20 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Answers
                </Link>
                <Link
                  href="/contribution"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#003B46]/20 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contribute
                </Link>
                <div className="pt-4 pb-3 border-t border-[#003B46]/20">
                  <Link
                    href="/auth"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#003B46]/20 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth?mode=signup"
                    className="block px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-[#006770] hover:bg-[#008C8B] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="relative mb-12 animate-on-scroll" id="answers-hero">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#003B46] to-[#006770] p-6 sm:p-8 md:p-10">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

              {/* Animated geometric elements */}
              <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 border border-white/10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 border border-white/10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#003B46]/40 text-[#00A3A9] mb-4 sm:mb-6">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span>Expert Answers</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                    Interview Answer Library
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl">
                    Browse our collection of expert-verified answers to common interview questions across various
                    industries and roles.
                  </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                  className="mt-6 sm:mt-8 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative rounded-full shadow-lg shadow-[#00A3A9]/10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full rounded-full border-2 border-[#003B46]/50 bg-[#070F12]/80 py-3 sm:py-4 pl-9 sm:pl-10 pr-16 sm:pr-20 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="Search questions, answers, or tags..."
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Filters and Sorting */}
          <section className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {filteredAnswers.length} {filteredAnswers.length === 1 ? "Answer" : "Answers"}
                  {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
                  {searchQuery ? ` for "${searchQuery}"` : ""}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 sm:gap-4"
              >
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-3 py-2 border border-[#003B46] rounded-md text-sm font-medium text-gray-300 hover:text-white hover:border-[#00A3A9] transition-colors"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="bg-[#070F12] border border-[#003B46] text-gray-300 text-sm rounded-md focus:ring-[#00A3A9] focus:border-[#00A3A9] block p-2 pr-8"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="mostUpvoted">Most Upvoted</option>
                      <option value="mostViewed">Most Viewed</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Category Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="p-4 bg-[#003B46]/10 rounded-lg border border-[#003B46]/30">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Filter by Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === category
                            ? "bg-[#00A3A9] text-white"
                            : "bg-[#003B46]/30 text-gray-300 hover:bg-[#003B46]/50"
                            }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Answers List */}
          <section className="mb-12">
            {isLoading ? (
              // Loading skeleton
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-[#003B46]/10 rounded-xl p-6 animate-pulse">
                    <div className="h-6 bg-[#003B46]/30 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-[#003B46]/30 rounded w-1/4 mb-6"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-[#003B46]/30 rounded w-full"></div>
                      <div className="h-4 bg-[#003B46]/30 rounded w-full"></div>
                      <div className="h-4 bg-[#003B46]/30 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAnswers.length === 0 ? (
              // No results
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#003B46]/30 text-[#00A3A9] mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No answers found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                    setSortOption("newest")
                  }}
                  className="mt-4 px-4 py-2 bg-[#006770] text-white rounded-md hover:bg-[#008C8B] transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              // Answers list
              <div className="space-y-6">
                {currentAnswers.map((answer, index) => (
                  <motion.div
                    key={answer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl border border-[#003B46]/20 overflow-hidden shadow-lg transition-all duration-300 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/5 group"
                  >
                    <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#003B46]/30 to-[#006770]/30 border-b border-[#003B46]/20">
                      <div className="flex items-start justify-between">
                        <h3 className="text-base sm:text-lg font-bold text-[#00A3A9] group-hover:text-white transition-colors duration-300">
                          {answer.question}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#003B46]/40 text-[#00A3A9]">
                          {answer.category}
                        </span>
                      </div>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatDistanceToNow(new Date(answer.createdAt))} ago</span>
                        </div>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span>{answer.user.name}</span>
                        </div>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          <span>{answer.upvotes}</span>
                        </div>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          <span>{answer.views} views</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 py-4 sm:py-6">
                      <div className={`relative overflow-hidden ${expandedAnswer !== answer.id && "max-h-40"}`}>
                        <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-[#00A3A9] prose-a:text-[#00A3A9] prose-strong:text-white">
                          <ReactMarkdown>
                            {answer.answer}
                          </ReactMarkdown>
                        </div>


                        {expandedAnswer !== answer.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#070F12] to-transparent"></div>
                        )}
                      </div>

                      <button
                        onClick={() => toggleAnswer(answer.id)}
                        className="mt-2 text-sm text-[#00A3A9] hover:text-white flex items-center transition-colors"
                      >
                        {expandedAnswer === answer.id ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Read full answer
                          </>
                        )}
                      </button>

                      <div className="mt-4 pt-4 border-t border-[#003B46]/20">
                        <div className="flex flex-wrap gap-2">
                          {answer.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#003B46]/30 text-gray-300 hover:bg-[#003B46]/50 cursor-pointer transition-colors"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button className="inline-flex items-center text-gray-400 hover:text-[#00A3A9] transition-colors">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span className="text-xs">Helpful</span>
                            </button>
                            <button className="inline-flex items-center text-gray-400 hover:text-[#00A3A9] transition-colors">
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              <span className="text-xs">Not helpful</span>
                            </button>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              className="inline-flex items-center text-gray-400 hover:text-[#00A3A9] transition-colors ml-2"
                              onClick={() => openDiscussionModal(answer)}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Open Discussion
                            </button>
                            <button className="p-1.5 rounded-full text-gray-400 hover:text-[#00A3A9] hover:bg-[#003B46]/30 transition-colors">
                              <Bookmark className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 rounded-full text-gray-400 hover:text-[#00A3A9] hover:bg-[#003B46]/30 transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Pagination */}
          {!isLoading && filteredAnswers.length > 0 && (
            <section className="flex items-center justify-center">
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${currentPage === 1
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-gray-400 hover:text-white hover:bg-[#003B46]/30"
                    } transition-colors`}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <div className="flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1
                    // Show first page, last page, current page, and pages around current page
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={i}
                          onClick={() => paginate(pageNumber)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium ${currentPage === pageNumber
                            ? "bg-[#00A3A9] text-white"
                            : "text-gray-400 hover:text-white hover:bg-[#003B46]/30"
                            } transition-colors`}
                        >
                          {pageNumber}
                        </button>
                      )
                    } else if (
                      (pageNumber === 2 && currentPage > 3) ||
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={i} className="px-3 py-1.5 text-gray-500">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${currentPage === totalPages
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-gray-400 hover:text-white hover:bg-[#003B46]/30"
                    } transition-colors`}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </nav>
            </section>
          )}
        </div>
      </main>

      {/* Discussion Modal */}
      {showDiscussionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-lg bg-[#070F12] border border-[#003B46] rounded-lg overflow-hidden shadow-xl transform transition-all max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 bg-gradient-to-r from-[#003B46]/60 to-[#006770]/60 border-b border-[#003B46] flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-[#00A3A9]" />
                  Discussions
                </h3>
                <button 
                  onClick={() => setShowDiscussionModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-grow overflow-auto">
              {isLoadingDiscussions ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00A3A9]"></div>
                  <span className="ml-3 text-gray-300">Loading discussions...</span>
                </div>
              ) : existingDiscussions.length > 0 ? (
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-medium">
                      {existingDiscussions.length} Discussion{existingDiscussions.length !== 1 ? 's' : ''}
                    </h4>
                    <button
                      onClick={() => setShowNewDiscussionForm(!showNewDiscussionForm)}
                      className="text-sm text-[#00A3A9] hover:text-white flex items-center"
                    >
                      {showNewDiscussionForm ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Hide Form
                        </>
                      ) : (
                        <>
                          <PlusCircle className="h-4 w-4 mr-1" />
                          New Discussion
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* List of existing discussions */}
                  <div className="space-y-4 mb-6">
                    {existingDiscussions.map((discussion) => (
                      <div key={discussion._id} className="p-3 bg-[#003B46]/20 border border-[#003B46]/30 rounded-lg">
                        <Link 
                          href={`/discussion/${discussion._id}`} 
                          className="text-white hover:text-[#00A3A9] font-medium block mb-1"
                        >
                          {discussion.title}
                        </Link>
                        
                        <div className="flex items-center text-xs text-gray-400 mb-2">
                          <span>By {discussion.createdBy?.name || "Anonymous"}</span>
                          <span className="mx-1.5">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                        </div>
                        
                        {discussion.description && (
                          <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                            {discussion.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-1 mt-1">
                          {discussion.tags?.map((tag, idx) => (
                            <span key={idx} className="text-xs bg-[#003B46]/40 text-[#00A3A9] px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              
              {/* Form to create a new discussion */}
              {(existingDiscussions.length === 0 || showNewDiscussionForm) && (
                <form onSubmit={handleSubmitDiscussion} className="p-6 space-y-4">
                  {existingDiscussions.length > 0 && (
                    <div className="pb-3 border-b border-[#003B46]/30 mb-4">
                      <h4 className="text-white font-medium">Create New Discussion</h4>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={discussionForm.title}
                      onChange={(e) => setDiscussionForm({...discussionForm, title: e.target.value})}
                      className="block w-full px-3 py-2 border border-[#003B46] rounded-md bg-[#070F12]/80 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                      placeholder="Discussion title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="3"
                      value={discussionForm.description}
                      onChange={(e) => setDiscussionForm({...discussionForm, description: e.target.value})}
                      className="block w-full px-3 py-2 border border-[#003B46] rounded-md bg-[#070F12]/80 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                      placeholder="What would you like to discuss about this answer?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      id="tags"
                      type="text"
                      value={discussionForm.tags}
                      onChange={(e) => setDiscussionForm({...discussionForm, tags: e.target.value})}
                      className="block w-full px-3 py-2 border border-[#003B46] rounded-md bg-[#070F12]/80 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                      placeholder="javascript, react, interview"
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end space-x-3 border-t border-[#003B46]">
                    <button
                      type="button"
                      onClick={() => existingDiscussions.length > 0 ? setShowNewDiscussionForm(false) : setShowDiscussionModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] text-white rounded-md shadow-sm text-sm font-medium transition-all hover:scale-105"
                    >
                      Create Discussion
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#070F12] border-t border-[#003B46]/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="text-center">
              <Link href="/" className="flex items-center justify-center space-x-2 group">
                <Briefcase className="h-6 w-6 text-[#00A3A9] group-hover:text-[#008C8B] transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#00A3A9] transition-colors duration-300">
                  Career Catalyst
                </span>
              </Link>
              <p className="mt-2 text-sm text-gray-400">
                Your AI-powered interview coach. Get expert answers to your interview questions instantly.
              </p>
            </div>

            <div className="mt-4 border-t border-[#003B46]/20 pt-4">
              <p className="text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Career Catalyst. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 right-4 p-2 sm:p-3 rounded-full bg-[#006770] text-white shadow-lg z-40 transition-all duration-300 ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}
