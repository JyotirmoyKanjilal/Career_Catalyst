"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import ReactMarkdown from "react-markdown"

// Define theme colors based on the provided palette
const theme = {
  darkest: "#070F12",
  darkTeal: "#003B46",
  mediumTeal: "#006770",
  brightTeal: "#008C8B",
  lightTeal: "#00A3A9",
}

export default function AnswersPage() {
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
        // In a real app, this would be a call to your database
        // const data = await getAnswers()

        // Simulated data for demonstration
        const data = [
          {
            id: 1,
            question: "How do I answer 'Tell me about yourself' in a job interview?",
            answer:
              "When answering 'Tell me about yourself,' structure your response in three parts:\n\n1. **Present**: Start with your current role and responsibilities\n2. **Past**: Briefly mention relevant past experiences\n3. **Future**: Express your interest in the role you're interviewing for\n\nKeep your answer concise (1-2 minutes) and focused on professional experiences relevant to the position. Avoid oversharing personal details.\n\nExample: *'I'm currently a Senior Developer at TechCorp, where I lead a team of five engineers building cloud-based solutions. Before that, I spent three years at StartupX developing their core platform. I'm particularly proud of implementing a CI/CD pipeline that reduced deployment time by 40%. I'm now looking to bring my technical leadership and cloud expertise to a larger organization like yours.'*",
            category: "Behavioral",
            upvotes: 245,
            downvotes: 12,
            bookmarks: 89,
            views: 1203,
            createdAt: new Date(2023, 10, 15),
            user: {
              name: "Career Expert",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "Career Coach",
            },
            tags: ["interview basics", "common questions", "self-introduction"],
          },
          {
            id: 2,
            question: "What are the most common React.js interview questions?",
            answer:
              "Here are the most common React.js interview questions you should prepare for:\n\n1. **What is React and how does it work?**\n   React is a JavaScript library for building user interfaces. It works by using a virtual DOM to efficiently update the actual DOM.\n\n2. **What are hooks in React?**\n   Hooks are functions that let you use state and other React features without writing a class component. Common hooks include useState, useEffect, useContext, etc.\n\n3. **Explain the difference between state and props**\n   Props are passed from parent components and are immutable within the component. State is managed within the component and can be updated.\n\n4. **What is JSX?**\n   JSX is a syntax extension for JavaScript that looks similar to HTML and allows you to write HTML-like code in your JavaScript files.\n\n5. **Explain the component lifecycle in React**\n   For class components: mounting, updating, and unmounting phases. For functional components: useEffect hook with dependencies.\n\nPrepare code examples for each of these concepts and be ready to discuss your experience implementing them in real projects.",
            category: "Technical",
            upvotes: 189,
            downvotes: 8,
            bookmarks: 132,
            views: 2450,
            createdAt: new Date(2023, 11, 3),
            user: {
              name: "Tech Interviewer",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "Senior Developer",
            },
            tags: ["react", "frontend", "javascript", "technical interview"],
          },
          {
            id: 3,
            question: "How should I answer questions about salary expectations?",
            answer:
              "When discussing salary expectations, follow these guidelines:\n\n1. **Research thoroughly**: Before the interview, research the typical salary range for the position in your location and industry. Use sites like Glassdoor, PayScale, and industry reports.\n\n2. **Provide a range**: Rather than a specific number, give a range based on your research. For example: 'Based on my experience and the market value for this role, I'm looking for something in the range of $X to $Y.'\n\n3. **Consider the total package**: Remember that compensation includes benefits, bonuses, equity, work-life balance, and growth opportunities.\n\n4. **Deflect if too early**: If asked early in the process, you can politely defer: 'I'd like to learn more about the role and responsibilities before discussing compensation.'\n\n5. **Be confident**: Present your expectations confidently, based on your value and market research.\n\nAvoid underselling yourself or pricing yourself out of consideration. If pressed for a specific number, choose a figure toward the higher end of your researched range.",
            category: "Behavioral",
            upvotes: 312,
            downvotes: 15,
            bookmarks: 178,
            views: 3102,
            createdAt: new Date(2023, 9, 22),
            user: {
              name: "Negotiation Pro",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "HR Consultant",
            },
            tags: ["salary negotiation", "compensation", "interview strategy"],
          },
          {
            id: 4,
            question: "What are good questions to ask at the end of an interview?",
            answer:
              "Asking thoughtful questions at the end of an interview demonstrates your interest and engagement. Here are some effective questions to consider:\n\n**About the Role:**\n- What does success look like in this position in the first 90 days? First year?\n- What are the biggest challenges someone in this position would face?\n- How has this role evolved over time?\n\n**About the Team:**\n- Can you tell me about the team I'd be working with?\n- What's the management style of the person I'd report to?\n- How does the team collaborate and communicate?\n\n**About the Company:**\n- What's the company culture like?\n- What are the company's biggest priorities or challenges in the coming year?\n- How does the company support professional development and growth?\n\n**About Next Steps:**\n- What are the next steps in the interview process?\n- What is your timeline for making a decision?\n\nAvoid questions about basic information readily available on the company website, and questions focused primarily on benefits or time off, which can be discussed after receiving an offer.",
            category: "Behavioral",
            upvotes: 276,
            downvotes: 5,
            bookmarks: 203,
            views: 2876,
            createdAt: new Date(2023, 11, 10),
            user: {
              name: "Interview Coach",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "Career Strategist",
            },
            tags: ["interview questions", "candidate questions", "interview strategy"],
          },
          {
            id: 5,
            question: "How do I explain a gap in my employment history?",
            answer:
              "When explaining employment gaps, honesty and confidence are key. Here's how to address them effectively:\n\n1. **Be honest but strategic**: Never lie about employment gaps, but frame them positively.\n\n2. **Focus on growth and learning**: Highlight what you did during the gap that added to your skills or perspective:\n   - Freelance or consulting work\n   - Volunteer experience\n   - Courses or certifications\n   - Personal projects\n   - Caregiving responsibilities (if comfortable sharing)\n\n3. **Keep it concise**: Briefly explain the gap without oversharing personal details, then redirect the conversation to your qualifications and enthusiasm for the role.\n\n4. **Show how it benefited you**: If possible, explain how the experience during your gap made you a stronger candidate.\n\nExample response: *'After my position at Company X ended, I took six months to complete an advanced certification in project management while doing freelance consulting. This experience broadened my skill set and gave me exposure to different industries, which I believe makes me a more versatile candidate for this role.'*\n\nRemember that employment gaps are increasingly common and many employers are becoming more understanding of diverse career paths.",
            category: "Behavioral",
            upvotes: 198,
            downvotes: 7,
            bookmarks: 145,
            views: 1987,
            createdAt: new Date(2023, 10, 5),
            user: {
              name: "HR Specialist",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "Recruitment Expert",
            },
            tags: ["employment gaps", "career transitions", "interview strategy"],
          },
          {
            id: 6,
            question: "What are the most important leadership principles for a management position?",
            answer:
              "Key leadership principles for management positions include:\n\n1. **Lead by Example**: Demonstrate the work ethic, integrity, and attitude you expect from your team.\n\n2. **Effective Communication**: Clearly articulate vision, expectations, and feedback. Be equally skilled at listening.\n\n3. **Emotional Intelligence**: Understand and manage your emotions and recognize emotions in others to guide thinking and behavior.\n\n4. **Adaptability**: Embrace change and help your team navigate through it successfully.\n\n5. **Empowerment**: Delegate effectively and trust your team members to make decisions and take ownership.\n\n6. **Accountability**: Take responsibility for team outcomes while holding team members accountable for their commitments.\n\n7. **Strategic Thinking**: Balance day-to-day operations with long-term vision and goals.\n\n8. **Continuous Learning**: Commit to personal growth and foster a learning environment for your team.\n\n9. **Inclusivity**: Value diversity of thought and create an environment where all team members feel they belong.\n\n10. **Results Orientation**: Focus on achieving meaningful outcomes while maintaining ethical standards.\n\nWhen interviewing, provide specific examples of how you've demonstrated these principles in past roles. Use the STAR method (Situation, Task, Action, Result) to structure your responses with concrete examples.",
            category: "Leadership",
            upvotes: 231,
            downvotes: 11,
            bookmarks: 167,
            views: 2345,
            createdAt: new Date(2023, 8, 18),
            user: {
              name: "Leadership Coach",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "Executive Mentor",
            },
            tags: ["leadership", "management", "team building"],
          },
          {
            id: 7,
            question: "How do I solve coding problems in technical interviews?",
            answer:
              "To excel at coding problems in technical interviews, follow this structured approach:\n\n1. **Understand the Problem**\n   - Listen carefully and ask clarifying questions\n   - Confirm input/output formats and constraints\n   - Discuss edge cases before coding\n\n2. **Plan Your Approach**\n   - Think aloud to show your reasoning process\n   - Consider multiple solutions before coding\n   - Discuss time and space complexity tradeoffs\n\n3. **Write Clean Code**\n   - Use meaningful variable names\n   - Structure your code logically\n   - Add comments for clarity when necessary\n\n4. **Test Your Solution**\n   - Walk through your code with a simple example\n   - Test edge cases (empty inputs, large values, etc.)\n   - Identify and fix bugs proactively\n\n5. **Optimize If Needed**\n   - Analyze your solution's efficiency\n   - Suggest improvements even if you don't implement them\n\nCommon problem-solving patterns to study:\n- Two-pointer technique\n- Sliding window\n- Binary search\n- Breadth/depth-first search\n- Dynamic programming\n- Hash tables for lookups\n\nPractice regularly on platforms like LeetCode, HackerRank, or CodeSignal, focusing on understanding patterns rather than memorizing solutions.",
            category: "Problem Solving",
            upvotes: 287,
            downvotes: 9,
            bookmarks: 215,
            views: 3421,
            createdAt: new Date(2023, 11, 7),
            user: {
              name: "Tech Interviewer",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "Senior Developer",
            },
            tags: ["coding interview", "algorithms", "problem solving", "technical interview"],
          },
          {
            id: 8,
            question: "What should I include in my portfolio as a UX designer?",
            answer:
              "A strong UX design portfolio should include:\n\n1. **Case Studies (3-5 detailed examples)**\n   - Problem statement and project context\n   - Your research process and key insights\n   - Design process with iterations and decision rationale\n   - Final solution with visuals\n   - Outcomes and impact (metrics if available)\n\n2. **Process Work**\n   - User research documentation\n   - Personas and journey maps\n   - Wireframes and sketches\n   - Prototypes (include interactive versions if possible)\n   - Usability testing results\n\n3. **Range of Skills**\n   - Show variety in projects (mobile, web, different industries)\n   - Highlight specialized skills (information architecture, interaction design, etc.)\n   - Include cross-functional collaboration examples\n\n4. **Personal Touch**\n   - Brief bio that shows your design philosophy\n   - Your unique approach to problem-solving\n   - Contact information and professional social links\n\nTips for presentation:\n- Focus on storytelling over just visuals\n- Be honest about your role in team projects\n- Show before/after comparisons when possible\n- Keep navigation intuitive and accessible\n- Ensure your portfolio itself demonstrates good UX principles\n- Consider including a process section that shows how you work\n\nRegularly update your portfolio with new projects and remove older work that doesn't represent your current skill level.",
            category: "Career Development",
            upvotes: 176,
            downvotes: 4,
            bookmarks: 132,
            views: 1876,
            createdAt: new Date(2023, 10, 25),
            user: {
              name: "Design Leader",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "UX Director",
            },
            tags: ["ux design", "portfolio", "design career"],
          },
          {
            id: 9,
            question: "How do I prepare for a healthcare administration interview?",
            answer:
              "To prepare for a healthcare administration interview, focus on these key areas:\n\n1. **Industry Knowledge**\n   - Stay current on healthcare regulations (HIPAA, ACA, etc.)\n   - Understand reimbursement models and payment systems\n   - Be familiar with quality improvement methodologies\n   - Research current challenges in healthcare delivery\n\n2. **Technical Skills**\n   - Electronic Health Record (EHR) systems experience\n   - Healthcare analytics and reporting capabilities\n   - Budget management and financial analysis\n   - Operational efficiency and process improvement\n\n3. **Leadership and Management**\n   - Staff supervision and development experience\n   - Physician relationship management\n   - Cross-departmental collaboration examples\n   - Change management success stories\n\n4. **Specific Scenarios to Prepare For**\n   - How you've improved patient satisfaction\n   - Cost reduction initiatives you've implemented\n   - Conflict resolution between clinical and administrative staff\n   - Compliance challenge management\n   - Crisis or emergency situation handling\n\n5. **Questions to Ask the Interviewer**\n   - Strategic priorities for the department/organization\n   - Challenges the organization is currently facing\n   - Performance metrics for the role\n   - Organizational culture and leadership style\n\nBefore the interview, thoroughly research the specific healthcare organization - their mission, values, patient population, services offered, and recent news or initiatives. Prepare specific examples from your experience that demonstrate your ability to handle the unique challenges of healthcare administration.",
            category: "Industry Specific",
            upvotes: 142,
            downvotes: 3,
            bookmarks: 98,
            views: 1543,
            createdAt: new Date(2023, 9, 30),
            user: {
              name: "Healthcare Admin",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "Hospital Director",
            },
            tags: ["healthcare", "administration", "industry specific"],
          },
          {
            id: 10,
            question: "What are the best ways to negotiate a job offer?",
            answer:
              "Effective job offer negotiation strategies:\n\n1. **Do Your Research First**\n   - Research salary ranges for similar positions in your location and industry\n   - Understand the complete compensation package (benefits, bonuses, equity, etc.)\n   - Know your market value based on your skills and experience\n\n2. **Consider the Entire Package**\n   - Salary is important, but also consider:\n     - Health benefits and retirement plans\n     - Paid time off and work flexibility\n     - Professional development opportunities\n     - Relocation assistance\n     - Sign-on bonuses\n     - Equity or stock options\n\n3. **Negotiation Tactics**\n   - Express enthusiasm for the role and company\n   - Present your counteroffer as a discussion, not a demand\n   - Use specific numbers rather than ranges when countering\n   - Justify your ask with concrete achievements and value\n   - Consider negotiating multiple elements simultaneously\n   - Get the final offer in writing\n\n4. **Communication Tips**\n   - Negotiate by phone when possible (not email)\n   - Use silence strategically - don't rush to fill pauses\n   - Phrase requests collaboratively: \"How can we work together to reach X?\"\n   - Be professional and respectful throughout\n\n5. **When to Walk Away**\n   - The offer is significantly below market value with no flexibility\n   - Non-negotiable elements don't meet your needs\n   - The negotiation process reveals red flags about company culture\n\nRemember that negotiation is expected - most initial offers have room for adjustment. Practice your negotiation conversation with a friend before the actual discussion to build confidence.",
            category: "Career Development",
            upvotes: 298,
            downvotes: 7,
            bookmarks: 224,
            views: 3567,
            createdAt: new Date(2023, 11, 12),
            user: {
              name: "Negotiation Expert",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "Career Strategist",
            },
            tags: ["negotiation", "job offers", "salary", "career strategy"],
          },
        ]

        setAnswers(data)
        setFilteredAnswers(data)
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
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            selectedCategory === category
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
                  className={`p-2 rounded-md ${
                    currentPage === 1
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
                          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                            currentPage === pageNumber
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
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
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
        className={`fixed bottom-4 right-4 p-2 sm:p-3 rounded-full bg-[#006770] text-white shadow-lg z-40 transition-all duration-300 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
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
