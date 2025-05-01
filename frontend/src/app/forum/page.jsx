"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { fetchDiscussions, createDiscussion, addReply, upvoteDiscussion, upvoteReply, toggleBookmark } from "./actions"
import {
  MessageSquare,
  Search,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  MessageCircle,
  Clock,
  Award,
  Tag,
  Bookmark,
  Share2,
  MoreHorizontal,
  Send,
  Briefcase,
  X,
  Menu,
  PlusCircle,
  TrendingUp,
  Star,
  AlertCircle,
  CheckCircle,
  Eye,
  SlidersHorizontal,
  Loader2,
} from "lucide-react"

// Categories for the forum
const CATEGORIES = [
  { id: "all", name: "All Topics", count: 124 },
  { id: "technical", name: "Technical Interviews", count: 45 },
  { id: "behavioral", name: "Behavioral Questions", count: 38 },
  { id: "coding", name: "Coding Challenges", count: 27 },
  { id: "system-design", name: "System Design", count: 14 },
]

export default function ForumPage() {
  const [discussions, setDiscussions] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [expandedDiscussion, setExpandedDiscussion] = useState(null)
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false)
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "behavioral",
    tags: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)
  const [animateItems, setAnimateItems] = useState({})
  const [notification, setNotification] = useState(null)

  const discussionListRef = useRef(null)
  const formRef = useRef(null)
  const replyInputRef = useRef(null)

  // Load discussions on initial render
  useEffect(() => {
    const loadDiscussions = async () => {
      try {
        setIsLoading(true)
        const data = await fetchDiscussions()
        setDiscussions(data)
      } catch (error) {
        console.error("Failed to fetch discussions:", error)
        showNotification("Failed to load discussions. Please try again.", "error")
      } finally {
        setIsLoading(false)
      }
    }

    loadDiscussions()
  }, [])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowScrollTop(window.scrollY > 300)

      // Animate items as they come into view
      const discussionItems = document.querySelectorAll(".discussion-item")
      discussionItems.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0
        const id = item.getAttribute("data-id")

        if (isVisible && !animateItems[id]) {
          setAnimateItems((prev) => ({ ...prev, [id]: true }))
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [animateItems])

  // Handle click outside of new discussion form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowNewDiscussionForm(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus reply input when replying
  useEffect(() => {
    if (replyingTo && replyInputRef.current) {
      replyInputRef.current.focus()
    }
  }, [replyingTo])

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  // Filter discussions based on active category and search query
  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesCategory = activeCategory === "all" || discussion.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (discussion.tags && discussion.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    return matchesCategory && matchesSearch
  })

  // Sort discussions
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else if (sortBy === "popular") {
      return b.upvotes - a.upvotes
    } else if (sortBy === "mostReplies") {
      return (b.replies?.length || 0) - (a.replies?.length || 0)
    }
    return 0
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60))
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`
      }
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    }
  }

  // Handle new discussion submission
  const handleSubmitNewDiscussion = async (e) => {
    e.preventDefault()

    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      showNotification("Please fill in all required fields", "error")
      return
    }

    try {
      setIsSubmitting(true)

      const tags = newDiscussion.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const newDiscussionData = {
        title: newDiscussion.title,
        content: newDiscussion.content,
        category: newDiscussion.category,
        tags,
      }

      const createdDiscussion = await createDiscussion(newDiscussionData)

      setDiscussions((prev) => [createdDiscussion, ...prev])
      setNewDiscussion({
        title: "",
        content: "",
        category: "behavioral",
        tags: "",
      })
      setShowNewDiscussionForm(false)
      showNotification("Discussion created successfully!")

      // Scroll to the new discussion
      setTimeout(() => {
        window.scrollTo({
          top: discussionListRef.current.offsetTop - 100,
          behavior: "smooth",
        })
      }, 100)
    } catch (error) {
      console.error("Failed to create discussion:", error)
      showNotification("Failed to create discussion. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle reply submission
  const handleSubmitReply = async (discussionId) => {
    if (!replyContent.trim()) return

    try {
      setIsSubmitting(true)

      const newReply = await addReply(discussionId, replyContent)

      setDiscussions((prev) =>
        prev.map((discussion) => {
          if (discussion.id === discussionId) {
            return {
              ...discussion,
              replies: [...(discussion.replies || []), newReply],
            }
          }
          return discussion
        }),
      )

      setReplyContent("")
      setReplyingTo(null)
      showNotification("Reply added successfully!")
    } catch (error) {
      console.error("Failed to add reply:", error)
      showNotification("Failed to add reply. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle upvote for discussion
  const handleUpvoteDiscussion = async (discussionId) => {
    try {
      const updatedDiscussion = await upvoteDiscussion(discussionId)

      setDiscussions((prev) =>
        prev.map((discussion) => {
          if (discussion.id === discussionId) {
            return updatedDiscussion
          }
          return discussion
        }),
      )
    } catch (error) {
      console.error("Failed to upvote discussion:", error)
      showNotification("Failed to upvote. Please try again.", "error")
    }
  }

  // Handle upvote for reply
  const handleUpvoteReply = async (discussionId, replyId) => {
    try {
      const updatedReply = await upvoteReply(discussionId, replyId)

      setDiscussions((prev) =>
        prev.map((discussion) => {
          if (discussion.id === discussionId) {
            return {
              ...discussion,
              replies: discussion.replies.map((reply) => {
                if (reply.id === replyId) {
                  return updatedReply
                }
                return reply
              }),
            }
          }
          return discussion
        }),
      )
    } catch (error) {
      console.error("Failed to upvote reply:", error)
      showNotification("Failed to upvote. Please try again.", "error")
    }
  }

  // Handle bookmark toggle
  const handleBookmark = async (discussionId) => {
    try {
      const updatedDiscussion = await toggleBookmark(discussionId)

      setDiscussions((prev) =>
        prev.map((discussion) => {
          if (discussion.id === discussionId) {
            return updatedDiscussion
          }
          return discussion
        }),
      )

      showNotification(updatedDiscussion.isBookmarked ? "Discussion bookmarked!" : "Bookmark removed")
    } catch (error) {
      console.error("Failed to toggle bookmark:", error)
      showNotification("Failed to update bookmark. Please try again.", "error")
    }
  }

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-[#070F12] text-gray-100">
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/ai-answer" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                AI Answers
              </Link>
              <Link href="/answers" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Answer Library
              </Link>
              <Link
                href="/forum"
                className="text-sm font-medium text-[#00A3A9] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#00A3A9] after:w-full"
              >
                Discussion Forum
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                About
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

            {/* Sign In / Profile */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#00A3A9]/50">
                  <Image src="/placeholder.svg?height=32&width=32" alt="Profile" fill className="object-cover" />
                </div>
                <span>My Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-16 left-0 right-0 bg-[#070F12]/95 border-b border-[#003B46]/20 overflow-hidden transition-all duration-300 ease-in-out z-40 ${
            isMenuOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"
          }`}
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
              AI Answers
            </Link>
            <Link
              href="/answers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#003B46]/20 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Answer Library
            </Link>
            <Link
              href="/forum"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#00A3A9] bg-[#003B46]/20 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Discussion Forum
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#003B46]/20 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 pb-3 border-t border-[#003B46]/20">
              <Link
                href="/profile"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#003B46]/20 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#00A3A9]/50 mr-3">
                  <Image src="/placeholder.svg?height=32&width=32" alt="Profile" fill className="object-cover" />
                </div>
                <span>My Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="relative mb-8 sm:mb-12 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#003B46] to-[#006770] opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

            {/* Animated geometric elements */}
            <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 border border-white/10 rounded-full transform translate-x-1/3 -translate-y-1/3 animate-pulse-slow"></div>
            <div
              className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 border border-white/10 rounded-full transform -translate-x-1/3 translate-y-1/3 animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="relative px-6 py-8 sm:px-10 sm:py-12 md:py-16">
              <div className="max-w-3xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 animate-fadeInUp">
                  Interview Discussion Forum
                </h1>
                <p
                  className="text-base sm:text-lg text-white/80 mb-6 animate-fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  Connect with students and industry experts to discuss interview questions, share experiences, and get
                  valuable insights to ace your next interview.
                </p>
                <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
                  <button
                    onClick={() => setShowNewDiscussionForm(true)}
                    className="inline-flex items-center px-4 py-2 bg-white text-[#006770] rounded-md font-medium hover:bg-white/90 transition-all transform hover:scale-105 active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Start a Discussion
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-[#00A3A9]/20 text-white border border-white/30 rounded-md font-medium hover:bg-[#00A3A9]/30 transition-all">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Trending Topics
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* New Discussion Form */}
          {showNewDiscussionForm && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div
                ref={formRef}
                className="bg-[#070F12] border border-[#003B46] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl animate-scaleIn"
              >
                <div className="p-4 sm:p-6 border-b border-[#003B46]">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Start a New Discussion</h2>
                    <button
                      onClick={() => setShowNewDiscussionForm(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <form onSubmit={handleSubmitNewDiscussion} className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                        Title <span className="text-[#00A3A9]">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0D1B21] border border-[#003B46] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent"
                        placeholder="What's your question or topic?"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                        Category <span className="text-[#00A3A9]">*</span>
                      </label>
                      <select
                        id="category"
                        value={newDiscussion.category}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, category: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0D1B21] border border-[#003B46] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent"
                      >
                        <option value="behavioral">Behavioral Questions</option>
                        <option value="technical">Technical Interviews</option>
                        <option value="coding">Coding Challenges</option>
                        <option value="system-design">System Design</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                        Description <span className="text-[#00A3A9]">*</span>
                      </label>
                      <textarea
                        id="content"
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0D1B21] border border-[#003B46] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent min-h-[120px]"
                        placeholder="Provide details about your question or topic..."
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        id="tags"
                        value={newDiscussion.tags}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, tags: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0D1B21] border border-[#003B46] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent"
                        placeholder="e.g. behavioral, STAR-method, technical"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowNewDiscussionForm(false)}
                      className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-gradient-to-r from-[#006770] to-[#00A3A9] text-white rounded-md hover:from-[#00A3A9] hover:to-[#006770] transition-all transform hover:scale-105 active:scale-95 flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        <>Post Discussion</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Main Forum Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <div className="bg-[#0D1B21]/80 backdrop-blur-sm rounded-lg border border-[#003B46]/30 overflow-hidden animate-fadeIn">
                <div className="p-4 border-b border-[#003B46]/30 bg-[#003B46]/20">
                  <h2 className="text-lg font-medium text-white flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-[#00A3A9]" />
                    Categories
                  </h2>
                </div>
                <div className="p-2">
                  <ul className="space-y-1">
                    {CATEGORIES.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between transition-all ${
                            activeCategory === category.id
                              ? "bg-[#00A3A9]/20 text-[#00A3A9]"
                              : "text-gray-300 hover:bg-[#003B46]/20 hover:text-white"
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-xs bg-[#003B46]/50 px-2 py-0.5 rounded-full">{category.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stats */}
              <div
                className="bg-[#0D1B21]/80 backdrop-blur-sm rounded-lg border border-[#003B46]/30 overflow-hidden animate-fadeIn"
                style={{ animationDelay: "100ms" }}
              >
                <div className="p-4 border-b border-[#003B46]/30 bg-[#003B46]/20">
                  <h2 className="text-lg font-medium text-white flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-[#00A3A9]" />
                    Forum Stats
                  </h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-[#003B46]/20 rounded-lg">
                      <div className="text-2xl font-bold text-[#00A3A9]">124</div>
                      <div className="text-xs text-gray-400">Discussions</div>
                    </div>
                    <div className="text-center p-2 bg-[#003B46]/20 rounded-lg">
                      <div className="text-2xl font-bold text-[#00A3A9]">847</div>
                      <div className="text-xs text-gray-400">Replies</div>
                    </div>
                    <div className="text-center p-2 bg-[#003B46]/20 rounded-lg">
                      <div className="text-2xl font-bold text-[#00A3A9]">42</div>
                      <div className="text-xs text-gray-400">Experts</div>
                    </div>
                    <div className="text-center p-2 bg-[#003B46]/20 rounded-lg">
                      <div className="text-2xl font-bold text-[#00A3A9]">1.2k</div>
                      <div className="text-xs text-gray-400">Members</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Contributors */}
              <div
                className="bg-[#0D1B21]/80 backdrop-blur-sm rounded-lg border border-[#003B46]/30 overflow-hidden animate-fadeIn"
                style={{ animationDelay: "200ms" }}
              >
                <div className="p-4 border-b border-[#003B46]/30 bg-[#003B46]/20">
                  <h2 className="text-lg font-medium text-white flex items-center">
                    <Award className="w-4 h-4 mr-2 text-[#00A3A9]" />
                    Top Contributors
                  </h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-3">
                    {[
                      {
                        name: "Dr. Sarah Williams",
                        role: "Career Coach",
                        contributions: 47,
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "Raj Mehta",
                        role: "Senior System Architect",
                        contributions: 36,
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "Emily Chen",
                        role: "HR Specialist",
                        contributions: 29,
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                    ].map((contributor, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-3 p-2 hover:bg-[#003B46]/20 rounded-md transition-colors"
                      >
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#00A3A9]/50">
                          <Image
                            src={contributor.avatar || "/placeholder.svg"}
                            alt={contributor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{contributor.name}</p>
                          <p className="text-xs text-gray-400 truncate">{contributor.role}</p>
                        </div>
                        <div className="flex items-center text-xs bg-[#00A3A9]/20 text-[#00A3A9] px-2 py-1 rounded-full">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          {contributor.contributions}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Discussion List */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Filter */}
              <div className="bg-[#0D1B21]/80 backdrop-blur-sm rounded-lg border border-[#003B46]/30 p-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 bg-[#070F12] border border-[#003B46] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent"
                      placeholder="Search discussions..."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <SlidersHorizontal className="h-4 w-4 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-[#070F12] border border-[#003B46] rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="mostReplies">Most Replies</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Discussions */}
              <div ref={discussionListRef} className="space-y-4">
                {isLoading ? (
                  // Skeleton loading state
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="bg-[#0D1B21]/80 backdrop-blur-sm rounded-lg border border-[#003B46]/30 p-4 animate-pulse"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="rounded-full bg-[#003B46]/50 h-10 w-10"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-[#003B46]/50 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-[#003B46]/50 rounded w-1/4"></div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="h-3 bg-[#003B46]/50 rounded w-full"></div>
                          <div className="h-3 bg-[#003B46]/50 rounded w-5/6"></div>
                          <div className="h-3 bg-[#003B46]/50 rounded w-4/6"></div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div className="flex space-x-2">
                            <div className="h-6 bg-[#003B46]/50 rounded w-16"></div>
                            <div className="h-6 bg-[#003B46]/50 rounded w-16"></div>
                          </div>
                          <div className="h-6 bg-[#003B46]/50 rounded w-24"></div>
                        </div>
                      </div>
                    ))
                ) : sortedDiscussions.length > 0 ? (
                  sortedDiscussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      data-id={discussion.id}
                      className={`discussion-item bg-[#0D1B21]/80 backdrop-blur-sm rounded-lg border ${
                        discussion.isPinned ? "border-[#00A3A9]/50" : "border-[#003B46]/30"
                      } overflow-hidden transition-all duration-500 hover:border-[#00A3A9]/50 hover:shadow-lg hover:shadow-[#00A3A9]/5 ${
                        animateItems[discussion.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                    >
                      {discussion.isPinned && (
                        <div className="bg-[#00A3A9]/20 px-4 py-1 text-xs font-medium text-[#00A3A9] flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Pinned Discussion
                        </div>
                      )}

                      <div className="p-4 sm:p-5">
                        <div className="flex items-start">
                          <div className="hidden sm:block">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#003B46]/50">
                              <Image
                                src={discussion.author?.avatar || "/placeholder.svg?height=40&width=40"}
                                alt={discussion.author?.name || "User"}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="sm:ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <h3
                                className="text-lg font-medium text-white hover:text-[#00A3A9] transition-colors cursor-pointer"
                                onClick={() =>
                                  setExpandedDiscussion(expandedDiscussion === discussion.id ? null : discussion.id)
                                }
                              >
                                {discussion.title}
                              </h3>
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleBookmark(discussion.id)}
                                  className={`p-1 rounded-full hover:bg-[#003B46]/30 transition-colors ${
                                    discussion.isBookmarked ? "text-[#00A3A9]" : "text-gray-400 hover:text-white"
                                  }`}
                                  aria-label={discussion.isBookmarked ? "Remove bookmark" : "Bookmark discussion"}
                                >
                                  <Bookmark className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-[#003B46]/30 transition-colors"
                                  aria-label="Share discussion"
                                >
                                  <Share2 className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-[#003B46]/30 transition-colors"
                                  aria-label="More options"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center mt-1 text-xs text-gray-400">
                              <div className="sm:hidden mr-2">
                                <div className="relative w-5 h-5 rounded-full overflow-hidden border border-[#003B46]/50">
                                  <Image
                                    src={discussion.author?.avatar || "/placeholder.svg?height=20&width=20"}
                                    alt={discussion.author?.name || "User"}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                              <span className="font-medium text-gray-300">
                                {discussion.author?.name || "Anonymous"}
                              </span>
                              {discussion.author?.role === "expert" && (
                                <span className="ml-1 px-1.5 py-0.5 bg-[#00A3A9]/20 text-[#00A3A9] rounded text-[10px] font-medium">
                                  Expert
                                </span>
                              )}
                              <span className="mx-1.5">•</span>
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{formatDate(discussion.createdAt)}</span>
                              <span className="mx-1.5">•</span>
                              <MessageCircle className="w-3 h-3 mr-1" />
                              <span>{discussion.replies?.length || 0} replies</span>
                              <span className="mx-1.5">•</span>
                              <Eye className="w-3 h-3 mr-1" />
                              <span>{discussion.views || 0} views</span>
                            </div>

                            <div className="mt-3">
                              <p className="text-gray-300 text-sm line-clamp-2">{discussion.content}</p>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {discussion.tags &&
                                discussion.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-[#003B46]/30 text-[#00A3A9] rounded text-xs hover:bg-[#003B46]/50 transition-colors cursor-pointer"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <button
                                  onClick={() => handleUpvoteDiscussion(discussion.id)}
                                  className="flex items-center space-x-1 text-gray-400 hover:text-[#00A3A9] transition-colors"
                                  aria-label="Upvote discussion"
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  <span className="text-xs">{discussion.upvotes || 0}</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setExpandedDiscussion(discussion.id)
                                    setTimeout(() => {
                                      setReplyingTo(discussion.id)
                                    }, 100)
                                  }}
                                  className="flex items-center space-x-1 text-gray-400 hover:text-[#00A3A9] transition-colors"
                                  aria-label="Reply to discussion"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  <span className="text-xs">Reply</span>
                                </button>
                              </div>
                              <button
                                onClick={() =>
                                  setExpandedDiscussion(expandedDiscussion === discussion.id ? null : discussion.id)
                                }
                                className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-xs"
                                aria-label={expandedDiscussion === discussion.id ? "Hide replies" : "View replies"}
                              >
                                {expandedDiscussion === discussion.id ? (
                                  <>
                                    <span>Hide Replies</span>
                                    <ChevronUp className="w-4 h-4" />
                                  </>
                                ) : (
                                  <>
                                    <span>View Replies</span>
                                    <ChevronDown className="w-4 h-4" />
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Discussion with Replies */}
                        {expandedDiscussion === discussion.id && (
                          <div className="mt-6 pl-0 sm:pl-14 space-y-6 animate-fadeIn">
                            {/* Divider */}
                            <div className="border-t border-[#003B46]/30 pt-4"></div>

                            {/* Replies */}
                            {discussion.replies && discussion.replies.length > 0 ? (
                              <div className="space-y-6">
                                {discussion.replies.map((reply) => (
                                  <div key={reply.id} className="relative">
                                    {/* Vertical line connecting replies */}
                                    <div className="absolute top-10 bottom-0 left-5 w-0.5 bg-[#003B46]/30 hidden sm:block"></div>

                                    <div className="flex items-start">
                                      <div className="hidden sm:block">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#003B46]/50 z-10 bg-[#0D1B21]">
                                          <Image
                                            src={reply.author?.avatar || "/placeholder.svg?height=40&width=40"}
                                            alt={reply.author?.name || "User"}
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                      </div>
                                      <div className="sm:ml-4 flex-1">
                                        <div className="flex items-center">
                                          <div className="sm:hidden mr-2">
                                            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#003B46]/50">
                                              <Image
                                                src={reply.author?.avatar || "/placeholder.svg?height=24&width=24"}
                                                alt={reply.author?.name || "User"}
                                                fill
                                                className="object-cover"
                                              />
                                            </div>
                                          </div>
                                          <span className="font-medium text-gray-300 text-sm">
                                            {reply.author?.name || "Anonymous"}
                                          </span>
                                          {reply.author?.role === "expert" && (
                                            <span className="ml-1 px-1.5 py-0.5 bg-[#00A3A9]/20 text-[#00A3A9] rounded text-[10px] font-medium">
                                              Expert
                                            </span>
                                          )}
                                          {reply.isVerified && (
                                            <span className="ml-1 px-1.5 py-0.5 bg-[#006770]/20 text-[#00A3A9] rounded text-[10px] font-medium flex items-center">
                                              <CheckCircle className="w-3 h-3 mr-0.5" />
                                              Verified
                                            </span>
                                          )}
                                          <span className="mx-1.5 text-xs text-gray-400">•</span>
                                          <span className="text-xs text-gray-400">{formatDate(reply.createdAt)}</span>
                                          {reply.author?.title && (
                                            <>
                                              <span className="mx-1.5 text-xs text-gray-400">•</span>
                                              <span className="text-xs text-gray-400">{reply.author.title}</span>
                                            </>
                                          )}
                                        </div>

                                        <div className="mt-2 bg-[#070F12]/80 rounded-lg p-3 border border-[#003B46]/20">
                                          <p className="text-gray-300 text-sm whitespace-pre-line">{reply.content}</p>
                                        </div>

                                        <div className="mt-2 flex items-center space-x-4">
                                          <button
                                            onClick={() => handleUpvoteReply(discussion.id, reply.id)}
                                            className="flex items-center space-x-1 text-gray-400 hover:text-[#00A3A9] transition-colors"
                                            aria-label="Upvote reply"
                                          >
                                            <ThumbsUp className="w-3 h-3" />
                                            <span className="text-xs">{reply.upvotes || 0}</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-6">
                                <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                                <p className="text-gray-400 text-sm">No replies yet. Be the first to respond!</p>
                              </div>
                            )}

                            {/* Reply Form */}
                            {replyingTo === discussion.id && (
                              <div className="flex items-start space-x-3 animate-fadeIn">
                                <div className="hidden sm:block">
                                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#003B46]/50">
                                    <Image
                                      src="/placeholder.svg?height=40&width=40"
                                      alt="Your Avatar"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="bg-[#070F12] border border-[#003B46] rounded-lg overflow-hidden">
                                    <textarea
                                      ref={replyInputRef}
                                      value={replyContent}
                                      onChange={(e) => setReplyContent(e.target.value)}
                                      className="w-full px-3 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none min-h-[100px]"
                                      placeholder="Share your thoughts or answer..."
                                    />
                                    <div className="flex items-center justify-between px-3 py-2 bg-[#070F12] border-t border-[#003B46]">
                                      <div className="text-xs text-gray-400">
                                        Use <span className="font-mono bg-[#003B46]/30 px-1 rounded">**bold**</span> for
                                        bold text
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() => setReplyingTo(null)}
                                          className="px-3 py-1 text-xs text-gray-300 hover:text-white transition-colors"
                                          disabled={isSubmitting}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={() => handleSubmitReply(discussion.id)}
                                          disabled={!replyContent.trim() || isSubmitting}
                                          className={`flex items-center px-3 py-1 rounded text-xs font-medium ${
                                            replyContent.trim() && !isSubmitting
                                              ? "bg-[#00A3A9] text-white hover:bg-[#008C8B] transition-colors"
                                              : "bg-[#003B46]/50 text-gray-400 cursor-not-allowed"
                                          }`}
                                        >
                                          {isSubmitting ? (
                                            <>
                                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                              Posting...
                                            </>
                                          ) : (
                                            <>
                                              <Send className="w-3 h-3 mr-1" />
                                              Post Reply
                                            </>
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Show Reply Button if not already replying */}
                            {!replyingTo && (
                              <button
                                onClick={() => setReplyingTo(discussion.id)}
                                className="flex items-center justify-center w-full py-2 bg-[#003B46]/30 hover:bg-[#003B46]/50 text-[#00A3A9] rounded-md transition-colors text-sm"
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Add Your Reply
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#0D1B21]/80 backdrop-blur-sm rounded-lg border border-[#003B46]/30 p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-white mb-1">No discussions found</h3>
                    <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
                    <button
                      onClick={() => {
                        setActiveCategory("all")
                        setSearchQuery("")
                        setSortBy("recent")
                      }}
                      className="px-4 py-2 bg-[#003B46]/50 text-white rounded-md hover:bg-[#003B46]/70 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#070F12] border-t border-[#003B46]/20 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Briefcase className="h-6 w-6 text-[#00A3A9] mr-2" />
              <span className="text-lg font-bold text-white">Career Catalyst</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Career Catalyst. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 p-2 rounded-full bg-[#006770] text-white shadow-lg z-40 transition-all duration-300 ${
          showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slideInUp ${
            notification.type === "error" ? "bg-red-900/90 text-white" : "bg-[#006770]/90 text-white"
          }`}
        >
          {notification.type === "error" ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  )
}
