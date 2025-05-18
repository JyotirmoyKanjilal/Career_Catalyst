"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  Search,
  Filter,
  ChevronDown,
  MessageSquare,
  ThumbsUp,
  Award,
  Clock,
  CheckCircle,
  User,
  Send,
  Bookmark,
  BookmarkCheck,
  Star,
  X,
  ChevronRight,
  Sparkles,
  Share2,
  Paperclip,
  ImageIcon,
  Tag,
  Layers,
  HelpCircle,
  Cpu,
  Code,
  Server,
  Menu,
  Home,
  Users,
  MessageCircle,
  ExternalLink,
} from "lucide-react"

// Mock data for experts
const EXPERTS = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Senior Software Engineer",
    company: "Google",
    avatar: "/placeholder.svg?height=200&width=200",
    expertise: ["Algorithms", "System Design", "Machine Learning"],
    rating: 4.9,
    responseTime: "Usually responds in 24 hours",
    verified: true,
    bio: "15+ years of experience in software engineering with a PhD in Computer Science. I've conducted over 500 technical interviews and love helping students prepare for their dream roles.",
    stats: {
      questionsAnswered: 342,
      endorsements: 289,
      topContributor: true,
    },
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Lead",
    company: "Microsoft",
    avatar: "/placeholder.svg?height=200&width=200",
    expertise: ["Frontend Development", "React", "UI/UX"],
    rating: 4.8,
    responseTime: "Usually responds in 12 hours",
    verified: true,
    bio: "Frontend specialist with 10 years of experience building scalable web applications. I focus on helping candidates master frontend interviews and portfolio development.",
    stats: {
      questionsAnswered: 215,
      endorsements: 178,
      topContributor: true,
    },
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Senior Product Manager",
    company: "Amazon",
    avatar: "/placeholder.svg?height=200&width=200",
    expertise: ["Product Management", "Behavioral Interviews", "Case Studies"],
    rating: 4.7,
    responseTime: "Usually responds in 48 hours",
    verified: true,
    bio: "Product leader with experience at FAANG companies. I specialize in helping candidates prepare for PM interviews, including case studies and behavioral questions.",
    stats: {
      questionsAnswered: 187,
      endorsements: 156,
      topContributor: false,
    },
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Data Scientist",
    company: "Netflix",
    avatar: "/placeholder.svg?height=200&width=200",
    expertise: ["Data Science", "SQL", "Python", "Statistics"],
    rating: 4.6,
    responseTime: "Usually responds in 36 hours",
    verified: true,
    bio: "Data scientist with a background in statistical analysis and machine learning. I help candidates prepare for data-focused interviews and technical assessments.",
    stats: {
      questionsAnswered: 143,
      endorsements: 112,
      topContributor: false,
    },
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    role: "Engineering Manager",
    company: "Apple",
    avatar: "/placeholder.svg?height=200&width=200",
    expertise: ["Leadership", "System Architecture", "Behavioral Interviews"],
    rating: 4.9,
    responseTime: "Usually responds in 24 hours",
    verified: true,
    bio: "Engineering leader with experience managing large teams. I specialize in helping candidates prepare for leadership roles and behavioral interviews.",
    stats: {
      questionsAnswered: 276,
      endorsements: 231,
      topContributor: true,
    },
  },
]

// Mock data for queries
const QUERIES = [
  {
    id: 1,
    title: "How to approach system design interviews for a mid-level position?",
    content:
      "I have an upcoming system design interview for a mid-level software engineer position. What's the best approach to tackle these kinds of interviews? Any specific frameworks or methodologies I should follow?",
    category: "System Design",
    tags: ["interviews", "system design", "preparation"],
    student: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: "2 days ago",
    status: "answered",
    upvotes: 24,
    views: 156,
    bookmarked: false,
    responses: [
      {
        id: 101,
        expert: EXPERTS[0],
        content:
          "Great question, Alex! For mid-level system design interviews, focus on these key areas:\n\n1. **Requirements clarification**: Always start by asking questions to understand the problem scope. What features are needed? What scale are we talking about?\n\n2. **High-level design**: Sketch the major components of your system. Don't dive into details too early.\n\n3. **Data model**: Define the key entities and relationships.\n\n4. **API design**: Outline the main endpoints your system would expose.\n\n5. **Scalability considerations**: Discuss how your system would handle increased load.\n\nRemember, the interviewer is more interested in your thought process than a perfect solution. Talk through your decisions and tradeoffs clearly.\n\nI recommend practicing with common problems like designing a URL shortener, a social media feed, or a simple e-commerce platform. Good luck!",
        date: "1 day ago",
        upvotes: 18,
        isVerified: true,
      },
      {
        id: 102,
        expert: EXPERTS[4],
        content:
          "To add to Dr. Johnson's excellent advice, I'd emphasize the importance of understanding scalability patterns. For a mid-level position, you should be familiar with:\n\n- Caching strategies\n- Database sharding\n- Load balancing\n- Microservices vs. monoliths\n\nAlso, be prepared to discuss non-functional requirements like reliability, availability, and security. These often separate a good design from a great one.\n\nOne approach I recommend to my mentees is the STAR method for system design:\n- **Scope**: Define what you're building\n- **Think**: Consider the scale and constraints\n- **Architect**: Design the high-level components\n- **Refine**: Optimize and address bottlenecks\n\nBest of luck with your interview!",
        date: "12 hours ago",
        upvotes: 12,
        isVerified: true,
      },
    ],
  },
  {
    id: 2,
    title: "Behavioral interview preparation for product management roles",
    content:
      "I'm preparing for behavioral interviews for a product management position. What are some common questions I should prepare for, and what's the best framework to structure my answers?",
    category: "Behavioral",
    tags: ["product management", "behavioral", "STAR method"],
    student: {
      name: "Maya Patel",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: "3 days ago",
    status: "answered",
    upvotes: 32,
    views: 203,
    bookmarked: true,
    responses: [
      {
        id: 201,
        expert: EXPERTS[2],
        content:
          "Hi Maya! For product management behavioral interviews, you'll want to prepare stories that demonstrate your product thinking, leadership, and execution skills.\n\nCommon questions include:\n\n1. Tell me about a time you launched a successful product\n2. How do you prioritize features?\n3. Describe a situation where you had to make a difficult product decision\n4. How do you work with engineering teams?\n5. Tell me about a product you admire and why\n\nThe STAR method (Situation, Task, Action, Result) is perfect for structuring your answers. Make sure each story highlights a specific skill relevant to product management.\n\nI also recommend preparing a product portfolio - 3-4 detailed examples of products you've worked on, problems you've solved, and the impact you've made. This will give you a solid foundation for most behavioral questions.\n\nBest of luck with your interviews!",
        date: "2 days ago",
        upvotes: 27,
        isVerified: true,
      },
    ],
  },
  {
    id: 3,
    title: "How to prepare for frontend coding challenges?",
    content:
      "I have several frontend developer interviews coming up, and I'm worried about the coding challenges. What types of challenges should I expect, and how should I prepare for them?",
    category: "Technical",
    tags: ["frontend", "coding challenges", "JavaScript"],
    student: {
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: "4 days ago",
    status: "pending",
    upvotes: 18,
    views: 142,
    bookmarked: false,
    responses: [],
  },
  {
    id: 4,
    title: "Data structure topics for entry-level software engineer interviews",
    content:
      "I'm a recent CS graduate preparing for entry-level software engineer interviews. Which data structures and algorithms should I focus on the most? Are there any specific problems that come up frequently?",
    category: "Algorithms",
    tags: ["data structures", "algorithms", "entry-level"],
    student: {
      name: "Tyler Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: "1 week ago",
    status: "answered",
    upvotes: 45,
    views: 312,
    bookmarked: true,
    responses: [
      {
        id: 401,
        expert: EXPERTS[0],
        content:
          "Hi Tyler! For entry-level software engineering roles, you should have a solid understanding of these fundamental data structures and algorithms:\n\n**Data Structures:**\n- Arrays and Strings\n- Linked Lists (singly and doubly linked)\n- Stacks and Queues\n- Hash Tables\n- Trees (Binary Trees, Binary Search Trees)\n- Heaps\n- Graphs (representation, traversal)\n\n**Algorithms:**\n- Sorting (quicksort, mergesort, etc.)\n- Binary Search\n- BFS and DFS\n- Dynamic Programming (basic)\n- Recursion\n\nCommon problems include:\n1. Two-pointer techniques\n2. Sliding window problems\n3. Tree traversals\n4. Graph traversals\n5. String manipulation\n\nI recommend solving 2-3 problems daily on platforms like LeetCode, focusing on easy and medium difficulty problems. Start with array and string problems, then gradually move to more complex data structures.\n\nAlso, don't just memorize solutions - understand the patterns and techniques. Being able to explain your thought process is just as important as getting to the right answer.\n\nGood luck with your preparation!",
        date: "6 days ago",
        upvotes: 38,
        isVerified: true,
      },
      {
        id: 402,
        expert: EXPERTS[1],
        content:
          "To add to Dr. Johnson's comprehensive list, I'd also recommend practicing these specific problem types that I've seen frequently in entry-level interviews:\n\n1. **String manipulation**: Palindrome checking, anagrams, substring problems\n2. **Array operations**: Finding duplicates, merging sorted arrays, subarray sums\n3. **Simple tree problems**: Height calculation, validation, path finding\n4. **Basic dynamic programming**: Fibonacci, climbing stairs, coin change\n\nFor frontend roles specifically, also focus on:\n- JavaScript-specific questions (closures, promises, event loop)\n- DOM manipulation problems\n- Simple UI component implementation\n\nA strategy that worked well for my mentees: pick one data structure per week and solve 5-10 problems focused on it. This builds depth of understanding rather than just breadth.\n\nAlso, mock interviews are invaluable - find a study buddy or use a platform that offers practice interviews to get comfortable explaining your solutions out loud.\n\nYou've got this!",
        date: "5 days ago",
        upvotes: 22,
        isVerified: true,
      },
    ],
  },
  {
    id: 5,
    title: "How to negotiate salary for a senior developer position?",
    content:
      "I've received an offer for a senior developer role, but the salary is lower than I expected. What's the best approach to negotiate without risking the offer? Are there specific benefits or perks I should prioritize besides base salary?",
    category: "Career Advice",
    tags: ["salary negotiation", "senior developer", "job offers"],
    student: {
      name: "Sam Rivera",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: "5 days ago",
    status: "answered",
    upvotes: 37,
    views: 245,
    bookmarked: false,
    responses: [
      {
        id: 501,
        expert: EXPERTS[4],
        content:
          "Congratulations on your offer, Sam! Salary negotiation is an important skill, especially for senior roles. Here's my approach:\n\n1. **Do your research**: Use sites like Glassdoor, Levels.fyi, and Blind to understand the market rate for your role, location, and experience level. This gives you concrete data to support your ask.\n\n2. **Focus on value**: When negotiating, emphasize the specific value you'll bring to the company. Highlight relevant experience, specialized skills, or past achievements that justify a higher compensation.\n\n3. **Consider the total package**: Base salary is important, but also evaluate:\n   - Equity/stock options (often a significant portion of tech compensation)\n   - Signing bonus\n   - Performance bonuses\n   - Retirement benefits (401k matching)\n   - Health insurance quality\n   - PTO and flexible work arrangements\n   - Professional development budget\n\n4. **Use a collaborative tone**: Frame the negotiation as finding a win-win solution, not a confrontation. Something like: \"I'm excited about this role and want to make it work. The base salary is lower than I was expecting based on market research and my experience. Can we discuss ways to bridge this gap?\"\n\n5. **Have a clear target**: Know your walk-away number, but don't reveal it. Instead, give a salary range with your target number at the lower end.\n\nRemember, most companies expect negotiation, especially for senior roles. A reasonable request with proper justification won't risk your offer.\n\nGood luck!",
        date: "3 days ago",
        upvotes: 31,
        isVerified: true,
      },
    ],
  },
]

// Categories for filtering
const CATEGORIES = [
  { id: "all", name: "All Categories", icon: <Layers className="h-4 w-4" /> },
  {
    id: "system-design",
    name: "System Design",
    icon: <Server className="h-4 w-4" />,
  },
  {
    id: "algorithms",
    name: "Algorithms",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "behavioral",
    name: "Behavioral",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "technical",
    name: "Technical",
    icon: <Cpu className="h-4 w-4" />,
  },
  {
    id: "career-advice",
    name: "Career Advice",
    icon: <Briefcase className="h-4 w-4" />,
  },
]

// Tags for filtering
const TAGS = [
  "interviews",
  "system design",
  "algorithms",
  "data structures",
  "behavioral",
  "frontend",
  "backend",
  "career growth",
  "salary negotiation",
  "resume",
  "portfolio",
  "coding challenges",
  "STAR method",
  "leadership",
  "entry-level",
  "senior",
  "product management",
]

export default function ExpertFeedback() {
  // State for UI
  const [activeTab, setActiveTab] = useState("queries")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTags, setSelectedTags] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [showFilters, setShowFilters] = useState(false)
  const [expandedQuery, setExpandedQuery] = useState(null)
  const [showNewQueryForm, setShowNewQueryForm] = useState(false)
  const [showExpertDetails, setShowExpertDetails] = useState(null)
  const [bookmarkedQueries, setBookmarkedQueries] = useState(QUERIES.filter((q) => q.bookmarked).map((q) => q.id))
  const [upvotedQueries, setUpvotedQueries] = useState([])
  const [upvotedResponses, setUpvotedResponses] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Form state
  const [newQuery, setNewQuery] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
  })
  const [newResponse, setNewResponse] = useState("")
  const [tagInput, setTagInput] = useState("")

  // Refs
  const queryListRef = useRef(null)
  const notificationRef = useRef(null)

  // Handle scroll events for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Handle notification timeout
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showNotification])

  // Filter queries based on search, category, and tags
  const filteredQueries = QUERIES.filter((query) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      query.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.content.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by category
    const matchesCategory =
      selectedCategory === "all" || query.category.toLowerCase() === selectedCategory.toLowerCase()

    // Filter by tags
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => query.tags.some((queryTag) => queryTag.toLowerCase() === tag.toLowerCase()))

    return matchesSearch && matchesCategory && matchesTags
  })

  // Sort queries
  const sortedQueries = [...filteredQueries].sort((a, b) => {
    if (sortBy === "recent") {
      // Sort by date (most recent first)
      return new Date(b.date) - new Date(a.date)
    } else if (sortBy === "popular") {
      // Sort by upvotes
      return b.upvotes - a.upvotes
    } else if (sortBy === "unanswered") {
      // Sort by status (unanswered first)
      if (a.status === "pending" && b.status !== "pending") return -1
      if (a.status !== "pending" && b.status === "pending") return 1
      return new Date(b.date) - new Date(a.date)
    }
    return 0
  })

  // Toggle bookmark
  const toggleBookmark = (queryId) => {
    if (bookmarkedQueries.includes(queryId)) {
      setBookmarkedQueries(bookmarkedQueries.filter((id) => id !== queryId))
      showNotificationMessage("Bookmark removed")
    } else {
      setBookmarkedQueries([...bookmarkedQueries, queryId])
      showNotificationMessage("Query bookmarked")
    }
  }

  // Toggle upvote for query
  const toggleQueryUpvote = (queryId) => {
    if (upvotedQueries.includes(queryId)) {
      setUpvotedQueries(upvotedQueries.filter((id) => id !== queryId))
    } else {
      setUpvotedQueries([...upvotedQueries, queryId])
      showNotificationMessage("Query upvoted")
    }
  }

  // Toggle upvote for response
  const toggleResponseUpvote = (responseId) => {
    if (upvotedResponses.includes(responseId)) {
      setUpvotedResponses(upvotedResponses.filter((id) => id !== responseId))
    } else {
      setUpvotedResponses([...upvotedResponses, responseId])
      showNotificationMessage("Response upvoted")
    }
  }

  // Show notification
  const showNotificationMessage = (message) => {
    setNotificationMessage(message)
    setShowNotification(true)
  }

  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      if (!newQuery.tags.includes(tagInput.trim())) {
        setNewQuery({
          ...newQuery,
          tags: [...newQuery.tags, tagInput.trim()],
        })
      }
      setTagInput("")
    }
  }

  // Remove tag from new query
  const removeTag = (tagToRemove) => {
    setNewQuery({
      ...newQuery,
      tags: newQuery.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  // Toggle tag selection for filtering
  const toggleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // Submit new query
  const submitQuery = (e) => {
    e.preventDefault()
    showNotificationMessage("Your query has been submitted")
    setShowNewQueryForm(false)
    setNewQuery({
      title: "",
      content: "",
      category: "",
      tags: [],
    })
    // In a real app, you would save the query to a database here
  }

  // Submit new response
  const submitResponse = (queryId) => {
    if (newResponse.trim() === "") return

    showNotificationMessage("Your response has been submitted")
    setNewResponse("")
    // In a real app, you would save the response to a database here
  }

  // Animation variants
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
        id="feedback-canvas"
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/forum"
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Forum</span>
              </Link>
              <Link href="/expert-feedback" className="text-[#00A3A9] font-medium flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>Expert Feedback</span>
              </Link>
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-[#003B46]/50 transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#070F12]/95 backdrop-blur-md border-b border-[#008C8B]/30 shadow-lg shadow-[#00A3A9]/10 md:hidden"
          >
            <div className="py-3 px-4 space-y-1">
              <Link
                href="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#003B46]/50 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <Home className="h-5 w-5 text-[#00A3A9]" />
                <span>Home</span>
              </Link>
              <Link
                href="/forum"
                className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#003B46]/50 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <MessageCircle className="h-5 w-5 text-[#00A3A9]" />
                <span>Forum</span>
              </Link>
              <Link
                href="/expert-feedback"
                className="flex items-center space-x-3 px-4 py-3 rounded-md bg-[#003B46]/70 text-white"
                onClick={() => setShowMobileMenu(false)}
              >
                <Award className="h-5 w-5 text-[#00A3A9]" />
                <span>Expert Feedback</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#003B46]/50 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <User className="h-5 w-5 text-[#00A3A9]" />
                <span>Profile</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 border border-[#00A3A9]/30 rounded-full animate-pulse-slow opacity-20"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 border border-[#008C8B]/20 rounded-full animate-pulse-slow opacity-10"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-16 sm:w-32 h-16 sm:h-32 border border-[#006770]/40 rounded-full animate-pulse-slow opacity-20"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Page Header */}
        <div className="relative z-10 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-4"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Learn from Industry Experts</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Expert Feedback
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg text-gray-300"
          >
            Get personalized advice and answers from industry professionals, teachers, and experienced peers to
            accelerate your career growth.
          </motion.p>
        </div>

        {/* Main Tabs */}
        <div className="relative z-10 mb-8">
          <div className="border-b border-[#003B46]/50">
            <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab("queries")}
                className={`py-4 px-1 font-medium text-sm sm:text-base relative transition-colors duration-200 ${
                  activeTab === "queries" ? "text-[#00A3A9]" : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Student Queries</span>
                </div>
                {activeTab === "queries" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A3A9]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("experts")}
                className={`py-4 px-1 font-medium text-sm sm:text-base relative transition-colors duration-200 ${
                  activeTab === "experts" ? "text-[#00A3A9]" : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Meet Our Experts</span>
                </div>
                {activeTab === "experts" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A3A9]"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("bookmarks")}
                className={`py-4 px-1 font-medium text-sm sm:text-base relative transition-colors duration-200 ${
                  activeTab === "bookmarks" ? "text-[#00A3A9]" : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Bookmark className="h-5 w-5" />
                  <span>My Bookmarks</span>
                  {bookmarkedQueries.length > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-[#00A3A9]/20 text-[#00A3A9]">
                      {bookmarkedQueries.length}
                    </span>
                  )}
                </div>
                {activeTab === "bookmarks" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A3A9]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="relative z-10">
          {/* Student Queries Tab */}
          {activeTab === "queries" && (
            <div>
              {/* Search and Filter Bar */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search queries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-[#003B46]/50 rounded-md bg-[#070F12]/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center px-4 py-2 border border-[#003B46]/50 rounded-md bg-[#070F12]/80 text-white hover:bg-[#003B46]/30 transition-all"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    <span>Filters</span>
                    <ChevronDown
                      className={`ml-2 h-4 w-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none block w-full px-4 py-2 pr-8 border border-[#003B46]/50 rounded-md bg-[#070F12]/80 text-white focus:outline-none focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="unanswered">Unanswered</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNewQueryForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] transition-all hover:shadow-lg hover:shadow-[#00A3A9]/20"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    <span>Ask a Question</span>
                  </button>
                </div>
              </div>

              {/* Filters Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 overflow-hidden"
                  >
                    <div className="p-4 border border-[#003B46]/50 rounded-md bg-[#070F12]/80 shadow-md">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-300 mb-2">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {CATEGORIES.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => setSelectedCategory(category.id)}
                              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                selectedCategory === category.id
                                  ? "bg-[#00A3A9]/20 text-[#00A3A9] border border-[#00A3A9]/30"
                                  : "bg-[#003B46]/20 text-gray-300 border border-[#003B46]/30 hover:bg-[#003B46]/30"
                              }`}
                            >
                              {category.icon}
                              <span className="ml-1.5">{category.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-2">Popular Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {TAGS.slice(0, 12).map((tag) => (
                            <button
                              key={tag}
                              onClick={() => toggleTagSelection(tag)}
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                                selectedTags.includes(tag)
                                  ? "bg-[#00A3A9]/20 text-[#00A3A9] border border-[#00A3A9]/30"
                                  : "bg-[#003B46]/20 text-gray-300 border border-[#003B46]/30 hover:bg-[#003B46]/30"
                              }`}
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              <span>{tag}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Query List */}
              {isLoading ? (
                // Skeleton loading state
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="border border-[#003B46]/30 rounded-lg bg-[#070F12]/80 overflow-hidden animate-pulse"
                    >
                      <div className="p-6">
                        <div className="h-6 bg-[#003B46]/50 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-[#003B46]/30 rounded w-full mb-2"></div>
                        <div className="h-4 bg-[#003B46]/30 rounded w-2/3"></div>
                        <div className="flex items-center mt-4 space-x-2">
                          <div className="h-8 w-8 bg-[#003B46]/50 rounded-full"></div>
                          <div className="h-4 bg-[#003B46]/30 rounded w-24"></div>
                        </div>
                      </div>
                      <div className="bg-[#003B46]/10 px-6 py-3">
                        <div className="flex justify-between">
                          <div className="flex space-x-4">
                            <div className="h-4 bg-[#003B46]/30 rounded w-16"></div>
                            <div className="h-4 bg-[#003B46]/30 rounded w-16"></div>
                          </div>
                          <div className="h-4 bg-[#003B46]/30 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : sortedQueries.length === 0 ? (
                // Empty state
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12 border border-dashed border-[#003B46]/50 rounded-lg bg-[#070F12]/50"
                >
                  <HelpCircle className="h-12 w-12 text-[#003B46]/70 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No queries found</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    {searchQuery || selectedCategory !== "all" || selectedTags.length > 0
                      ? "Try adjusting your filters or search query"
                      : "Be the first to ask a question and get expert feedback"}
                  </p>
                  <button
                    onClick={() => setShowNewQueryForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] transition-all"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    <span>Ask a Question</span>
                  </button>
                </motion.div>
              ) : (
                // Query list
                <motion.div
                  ref={queryListRef}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {sortedQueries.map((query) => (
                    <motion.div
                      key={query.id}
                      variants={itemVariants}
                      className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                        expandedQuery === query.id
                          ? "border-[#00A3A9]/50 bg-[#070F12]/90 shadow-lg shadow-[#00A3A9]/5"
                          : "border-[#003B46]/30 bg-[#070F12]/80 hover:border-[#003B46]/50 hover:shadow-md"
                      }`}
                    >
                      {/* Query Header */}
                      <div
                        className="p-6 cursor-pointer"
                        onClick={() => setExpandedQuery(expandedQuery === query.id ? null : query.id)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-medium text-white mb-2 pr-6">{query.title}</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleBookmark(query.id)
                              }}
                              className="text-gray-400 hover:text-[#00A3A9] transition-colors"
                            >
                              {bookmarkedQueries.includes(query.id) ? (
                                <BookmarkCheck className="h-5 w-5 text-[#00A3A9]" />
                              ) : (
                                <Bookmark className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleQueryUpvote(query.id)
                              }}
                              className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                                upvotedQueries.includes(query.id)
                                  ? "text-[#00A3A9] bg-[#00A3A9]/10"
                                  : "text-gray-400 hover:text-gray-300 hover:bg-[#003B46]/30"
                              }`}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{query.upvotes + (upvotedQueries.includes(query.id) ? 1 : 0)}</span>
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4 line-clamp-2">{query.content}</p>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="flex items-center mr-4">
                            <img
                              src={query.student.avatar || "/placeholder.svg"}
                              alt={query.student.name}
                              className="h-6 w-6 rounded-full mr-2"
                            />
                            <span>{query.student.name}</span>
                          </div>
                          <div className="flex items-center mr-4">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{query.date}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>
                              {query.responses.length} {query.responses.length === 1 ? "response" : "responses"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tags and Status */}
                      <div className="bg-[#003B46]/10 px-6 py-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#003B46]/30 text-gray-300">
                            {query.category}
                          </span>
                          {query.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#003B46]/20 text-gray-400"
                            >
                              #{tag}
                            </span>
                          ))}
                          {query.tags.length > 3 && (
                            <span className="text-xs text-gray-500">+{query.tags.length - 3} more</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          {query.status === "answered" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00A3A9]/10 text-[#00A3A9]">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Answered
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#003B46]/30 text-gray-300">
                              <Clock className="h-3 w-3 mr-1" />
                              Awaiting Response
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expandedQuery === query.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 border-t border-[#003B46]/30">
                              <div className="mb-8">
                                <h4 className="text-sm font-medium text-gray-400 mb-2">Full Question</h4>
                                <p className="text-gray-300 whitespace-pre-line">{query.content}</p>
                              </div>

                              {/* Responses */}
                              <div className="space-y-6">
                                <h4 className="text-lg font-medium text-white flex items-center">
                                  <MessageSquare className="h-5 w-5 mr-2 text-[#00A3A9]" />
                                  Expert Responses{" "}
                                  <span className="ml-2 text-sm text-gray-400">({query.responses.length})</span>
                                </h4>

                                {query.responses.length === 0 ? (
                                  <div className="text-center py-8 border border-dashed border-[#003B46]/30 rounded-lg">
                                    <MessageSquare className="h-10 w-10 text-[#003B46]/50 mx-auto mb-3" />
                                    <p className="text-gray-400 mb-2">No responses yet</p>
                                    <p className="text-sm text-gray-500">Be the first to provide expert feedback</p>
                                  </div>
                                ) : (
                                  <div className="space-y-6">
                                    {query.responses.map((response) => (
                                      <motion.div
                                        key={response.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                          duration: 0.3,
                                          delay: 0.1,
                                        }}
                                        className="bg-[#003B46]/10 rounded-lg p-5 border border-[#003B46]/30"
                                      >
                                        <div className="flex items-start justify-between mb-4">
                                          <div className="flex items-center">
                                            <img
                                              src={response.expert.avatar || "/placeholder.svg"}
                                              alt={response.expert.name}
                                              className="h-10 w-10 rounded-full mr-3 border-2 border-[#00A3A9]/50"
                                            />
                                            <div>
                                              <div className="flex items-center">
                                                <h5 className="font-medium text-white">{response.expert.name}</h5>
                                                {response.isVerified && (
                                                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-[#00A3A9]/20 text-[#00A3A9]">
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Verified Expert
                                                  </span>
                                                )}
                                              </div>
                                              <p className="text-sm text-gray-400">
                                                {response.expert.role} at {response.expert.company}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-sm text-gray-500">{response.date}</div>
                                        </div>
                                        <div className="prose prose-invert prose-sm max-w-none mb-4">
                                          <p className="text-gray-300 whitespace-pre-line">{response.content}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <button
                                            onClick={() => toggleResponseUpvote(response.id)}
                                            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                                              upvotedResponses.includes(response.id)
                                                ? "text-[#00A3A9] bg-[#00A3A9]/10"
                                                : "text-gray-400 hover:text-gray-300 hover:bg-[#003B46]/30"
                                            }`}
                                          >
                                            <ThumbsUp className="h-4 w-4" />
                                            <span>
                                              {response.upvotes + (upvotedResponses.includes(response.id) ? 1 : 0)}
                                            </span>
                                          </button>
                                          <div className="flex space-x-2">
                                            <button className="text-gray-400 hover:text-gray-300 p-1 rounded-md hover:bg-[#003B46]/30 transition-colors">
                                              <Share2 className="h-4 w-4" />
                                            </button>
                                            <button className="text-gray-400 hover:text-gray-300 p-1 rounded-md hover:bg-[#003B46]/30 transition-colors">
                                              <MessageCircle className="h-4 w-4" />
                                            </button>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                )}

                                {/* Add Response Form */}
                                <div className="mt-6 pt-6 border-t border-[#003B46]/30">
                                  <h4 className="text-lg font-medium text-white mb-4">Add Your Response</h4>
                                  <div className="mb-4">
                                    <textarea
                                      value={newResponse}
                                      onChange={(e) => setNewResponse(e.target.value)}
                                      placeholder="Share your expertise and help this student..."
                                      rows={5}
                                      className="block w-full rounded-md border border-[#003B46]/50 bg-[#070F12]/80 py-3 px-4 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                                    ></textarea>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex space-x-2">
                                      {/* <button className="p-2 text-gray-400 hover:text-gray-300 rounded-md hover:bg-[#003B46]/30 transition-colors">
                                        <Paperclip className="h-5 w-5" />
                                      </button>
                                      <button className="p-2 text-gray-400 hover:text-gray-300 rounded-md hover:bg-[#003B46]/30 transition-colors">
                                        <ImageIcon className="h-5 w-5" />
                                      </button>
                                      <button className="p-2 text-gray-400 hover:text-gray-300 rounded-md hover:bg-[#003B46]/30 transition-colors">
                                        <Code className="h-5 w-5" />
                                      </button> */}
                                    </div>
                                    <button
                                      onClick={() => submitResponse(query.id)}
                                      disabled={!newResponse.trim()}
                                      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                        newResponse.trim()
                                          ? "bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] transition-all hover:shadow-lg hover:shadow-[#00A3A9]/20"
                                          : "bg-[#003B46]/50 cursor-not-allowed"
                                      }`}
                                    >
                                      <Send className="h-4 w-4 mr-2" />
                                      <span>Submit Response</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {/* Experts Tab */}
          {activeTab === "experts" && (
            <div>
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search experts by name, expertise, or company..."
                    className="block w-full pl-10 pr-3 py-2 border border-[#003B46]/50 rounded-md bg-[#070F12]/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {isLoading ? (
                // Skeleton loading state for experts
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="border border-[#003B46]/30 rounded-lg bg-[#070F12]/80 overflow-hidden animate-pulse"
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="h-16 w-16 bg-[#003B46]/50 rounded-full mr-4"></div>
                          <div>
                            <div className="h-5 bg-[#003B46]/50 rounded w-32 mb-2"></div>
                            <div className="h-4 bg-[#003B46]/30 rounded w-24"></div>
                          </div>
                        </div>
                        <div className="h-4 bg-[#003B46]/30 rounded w-full mb-2"></div>
                        <div className="h-4 bg-[#003B46]/30 rounded w-5/6 mb-2"></div>
                        <div className="h-4 bg-[#003B46]/30 rounded w-4/6"></div>
                        <div className="mt-4 flex space-x-2">
                          <div className="h-6 bg-[#003B46]/30 rounded w-16"></div>
                          <div className="h-6 bg-[#003B46]/30 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {EXPERTS.map((expert) => (
                    <motion.div
                      key={expert.id}
                      variants={itemVariants}
                      className="border border-[#003B46]/30 rounded-lg bg-[#070F12]/80 overflow-hidden hover:border-[#00A3A9]/30 hover:shadow-lg hover:shadow-[#00A3A9]/5 transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-start mb-4">
                          <img
                            src={expert.avatar || "/placeholder.svg"}
                            alt={expert.name}
                            className="h-16 w-16 rounded-full mr-4 border-2 border-[#00A3A9]/50 object-cover"
                          />
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-white">{expert.name}</h3>
                              {expert.verified && <CheckCircle className="h-4 w-4 text-[#00A3A9] ml-2" />}
                            </div>
                            <p className="text-sm text-gray-300">
                              {expert.role} at {expert.company}
                            </p>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(expert.rating) ? "text-[#00A3A9] fill-[#00A3A9]" : "text-gray-500"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-400">{expert.rating}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{expert.bio}</p>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {expert.expertise.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#003B46]/30 text-[#00A3A9]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1 text-[#00A3A9]" />
                            <span>{expert.stats.questionsAnswered} answers</span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1 text-[#00A3A9]" />
                            <span>{expert.stats.endorsements} endorsements</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-xs text-gray-500">{expert.responseTime}</span>
                          <button
                            onClick={() => setShowExpertDetails(expert.id)}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#00A3A9] hover:text-white border border-[#00A3A9]/30 hover:border-[#00A3A9] rounded-md hover:bg-[#00A3A9]/10 transition-all"
                          >
                            <span>View Profile</span>
                            <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {/* Bookmarks Tab */}
          {activeTab === "bookmarks" && (
            <div>
              {bookmarkedQueries.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12 border border-dashed border-[#003B46]/50 rounded-lg bg-[#070F12]/50"
                >
                  <Bookmark className="h-12 w-12 text-[#003B46]/70 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No bookmarks yet</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-6">
                    Bookmark interesting queries to save them for later and quickly access them anytime
                  </p>
                  <button
                    onClick={() => setActiveTab("queries")}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] transition-all"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    <span>Browse Queries</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  {QUERIES.filter((q) => bookmarkedQueries.includes(q.id)).map((query) => (
                    <motion.div
                      key={query.id}
                      variants={itemVariants}
                      className="border border-[#003B46]/30 rounded-lg bg-[#070F12]/80 overflow-hidden hover:border-[#003B46]/50 hover:shadow-md transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-medium text-white mb-2 pr-6">{query.title}</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleBookmark(query.id)}
                              className="text-[#00A3A9] hover:text-gray-400 transition-colors"
                            >
                              <BookmarkCheck className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4 line-clamp-2">{query.content}</p>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="flex items-center mr-4">
                            <img
                              src={query.student.avatar || "/placeholder.svg"}
                              alt={query.student.name}
                              className="h-6 w-6 rounded-full mr-2"
                            />
                            <span>{query.student.name}</span>
                          </div>
                          <div className="flex items-center mr-4">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{query.date}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>
                              {query.responses.length} {query.responses.length === 1 ? "response" : "responses"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#003B46]/10 px-6 py-3 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#003B46]/30 text-gray-300">
                            {query.category}
                          </span>
                        </div>
                        <button
                          onClick={() => setExpandedQuery(query.id)}
                          className="inline-flex items-center text-sm text-[#00A3A9] hover:text-white transition-colors"
                        >
                          <span>View Details</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* New Query Form Modal */}
        <AnimatePresence>
          {showNewQueryForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
            >
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-[#070F12]/80 backdrop-blur-sm transition-opacity z-0"
                onClick={() => setShowNewQueryForm(false)}
              ></div>

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 inline-block align-bottom bg-[#070F12] border border-[#003B46]/50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
              >
                <div className="px-6 pt-5 pb-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium leading-6 text-white flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-[#00A3A9]" />
                      Ask a Question
                    </h3>
                    <button
                      onClick={() => setShowNewQueryForm(false)}
                      className="bg-[#070F12] rounded-md text-gray-400 hover:text-white focus:outline-none"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mt-5">
                    <form onSubmit={submitQuery}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                            Question Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            value={newQuery.title}
                            onChange={(e) =>
                              setNewQuery({
                                ...newQuery,
                                title: e.target.value,
                              })
                            }
                            placeholder="e.g., How to prepare for a system design interview?"
                            className="block w-full rounded-md border border-[#003B46]/50 bg-[#070F12]/80 py-3 px-4 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                            Question Details
                          </label>
                          <textarea
                            id="content"
                            value={newQuery.content}
                            onChange={(e) =>
                              setNewQuery({
                                ...newQuery,
                                content: e.target.value,
                              })
                            }
                            rows={5}
                            placeholder="Provide details about your question. The more specific you are, the better answers you'll receive."
                            className="block w-full rounded-md border border-[#003B46]/50 bg-[#070F12]/80 py-3 px-4 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                            required
                          ></textarea>
                        </div>

                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                            Category
                          </label>
                          <select
                            id="category"
                            value={newQuery.category}
                            onChange={(e) =>
                              setNewQuery({
                                ...newQuery,
                                category: e.target.value,
                              })
                            }
                            className="block w-full rounded-md border border-[#003B46]/50 bg-[#070F12]/80 py-3 px-4 text-gray-100 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                            required
                          >
                            <option value="" disabled>
                              Select a category
                            </option>
                            <option value="System Design">System Design</option>
                            <option value="Algorithms">Algorithms</option>
                            <option value="Behavioral">Behavioral</option>
                            <option value="Technical">Technical</option>
                            <option value="Career Advice">Career Advice</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                            Tags (press Enter to add)
                          </label>
                          <div className="flex items-center space-x-2">
                            <div className="relative flex-grow">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Tag className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInput}
                                placeholder="e.g., interviews, algorithms, career"
                                className="block w-full pl-10 pr-3 py-3 border border-[#003B46]/50 bg-[#070F12]/80 rounded-md text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                              />
                            </div>
                          </div>
                          {newQuery.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {newQuery.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#003B46]/30 text-gray-300"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="ml-1.5 text-gray-400 hover:text-white"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowNewQueryForm(false)}
                          className="inline-flex items-center px-4 py-2 border border-[#003B46]/50 rounded-md text-sm font-medium text-white hover:bg-[#003B46]/20 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] transition-all hover:shadow-lg hover:shadow-[#00A3A9]/20"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          <span>Submit Question</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expert Details Modal */}
        <AnimatePresence>
          {showExpertDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 bg-[#070F12]/80 backdrop-blur-sm transition-opacity"
                  onClick={() => setShowExpertDetails(null)}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                  &#8203;
                </span>

                {EXPERTS.filter((e) => e.id === showExpertDetails).map((expert) => (
                  <motion.div
                    key={expert.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block align-bottom bg-[#070F12] border border-[#003B46]/50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
                  >
                    <div className="px-6 pt-5 pb-4 sm:p-6">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-medium leading-6 text-white flex items-center">
                          <Award className="h-5 w-5 mr-2 text-[#00A3A9]" />
                          Expert Profile
                        </h3>
                        <button
                          onClick={() => setShowExpertDetails(null)}
                          className="bg-[#070F12] rounded-md text-gray-400 hover:text-white focus:outline-none"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="mt-5">
                        <div className="flex items-start mb-6">
                          <img
                            src={expert.avatar || "/placeholder.svg"}
                            alt={expert.name}
                            className="h-24 w-24 rounded-full mr-6 border-2 border-[#00A3A9]/50 object-cover"
                          />
                          <div>
                            <div className="flex items-center">
                              <h2 className="text-2xl font-bold text-white">{expert.name}</h2>
                              {expert.verified && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#00A3A9]/20 text-[#00A3A9]">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified Expert
                                </span>
                              )}
                            </div>
                            <p className="text-gray-300 mt-1">
                              {expert.role} at {expert.company}
                            </p>
                            <div className="flex items-center mt-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-5 w-5 ${
                                      i < Math.floor(expert.rating) ? "text-[#00A3A9] fill-[#00A3A9]" : "text-gray-500"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-gray-400">{expert.rating}</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">{expert.responseTime}</p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-lg font-medium text-white mb-2">About</h4>
                          <p className="text-gray-300">{expert.bio}</p>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-lg font-medium text-white mb-2">Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {expert.expertise.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#003B46]/30 text-[#00A3A9]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-[#003B46]/20 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-[#00A3A9]">{expert.stats.questionsAnswered}</div>
                            <div className="text-sm text-gray-400">Questions Answered</div>
                          </div>
                          <div className="bg-[#003B46]/20 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-[#00A3A9]">{expert.stats.endorsements}</div>
                            <div className="text-sm text-gray-400">Endorsements</div>
                          </div>
                          <div className="bg-[#003B46]/20 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-[#00A3A9]">
                              {expert.stats.topContributor ? "Yes" : "No"}
                            </div>
                            <div className="text-sm text-gray-400">Top Contributor</div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setShowExpertDetails(null)}
                            className="inline-flex items-center px-4 py-2 border border-[#003B46]/50 rounded-md text-sm font-medium text-white hover:bg-[#003B46]/20 transition-all"
                          >
                            Close
                          </button>
                          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] transition-all hover:shadow-lg hover:shadow-[#00A3A9]/20">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            <span>Ask a Question</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
              ref={notificationRef}
            >
              <div className="bg-[#003B46] text-white px-4 py-3 rounded-lg shadow-lg border border-[#00A3A9]/30 flex items-center">
                <CheckCircle className="h-5 w-5 text-[#00A3A9] mr-2" />
                <span>{notificationMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
