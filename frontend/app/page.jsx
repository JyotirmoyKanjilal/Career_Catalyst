import Link from "next/link"
import Image from "next/image"
import {
  Search,
  CheckCircle,
  Briefcase,
  Award,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  Menu,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-purple-500" />
                <span className="text-xl font-bold tracking-tight">Career Catalyst</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </Link>
              <Link href="#examples" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Examples
              </Link>
              <Link href="./about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              About Us
              </Link>
              <Link href="./contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Contact Us
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Sign In / Sign Up Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Ace Your Next</span>
                <span className="block text-purple-500">Interview</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto lg:mx-0 text-xl text-gray-300">
                Get expert answers to your interview questions instantly. Prepare confidently with Career Catalyst, your
                AI-powered interview coach.
              </p>
              <div className="mt-10 max-w-xl mx-auto lg:mx-0">
                <div className="relative rounded-full shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-full border-0 bg-gray-800 py-4 pl-10 pr-20 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500"
                    placeholder="Ask an interview question..."
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      Ask Now
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  Try: "How do I answer 'Tell me about yourself'?" or "What are common React.js interview questions?"
                </p>
              </div>
            </div>
            <div className="hidden lg:block relative h-96">
              <Image
                src="/teacher.jpg"
                alt="Career Catalyst Interview Preparation"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      {/*<section className="bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-400">
            Trusted by job seekers from top companies
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Company logo"
                width={120}
                height={40}
                className="h-12 opacity-50 grayscale"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Company logo"
                width={120}
                height={40}
                className="h-12 opacity-50 grayscale"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Company logo"
                width={120}
                height={40}
                className="h-12 opacity-50 grayscale"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Company logo"
                width={120}
                height={40}
                className="h-12 opacity-50 grayscale"
              />
            </div>
            <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Company logo"
                width={120}
                height={40}
                className="h-12 opacity-50 grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block text-white">Why Choose Career Catalyst?</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              Everything you need to prepare for your next interview, all in one place.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-5">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">AI-Powered Answers</h3>
              <p className="mt-2 text-gray-400">
                Get detailed, personalized answers to your specific interview questions using advanced AI technology.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-5">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Industry-Specific Guidance</h3>
              <p className="mt-2 text-gray-400">
                Tailored advice for different industries, from tech to finance, healthcare to marketing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-5">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Performance Tracking</h3>
              <p className="mt-2 text-gray-400">
                Track your progress and identify areas for improvement with detailed analytics.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-5">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Expert-Verified Content</h3>
              <p className="mt-2 text-gray-400">
                All answers and advice are reviewed by industry professionals to ensure accuracy and relevance.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-5">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Practice Interviews</h3>
              <p className="mt-2 text-gray-400">
                Simulate real interview experiences with our interactive practice sessions and get instant feedback.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-5">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Extensive Question Library</h3>
              <p className="mt-2 text-gray-400">
                Access thousands of real interview questions from companies across various industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block text-white">How Career Catalyst Works</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">Get interview-ready in three simple steps.</p>
          </div>

          <div className="mt-16">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-purple-500 text-white mx-auto mb-5">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-white">Ask Your Question</h3>
                <p className="mt-2 text-gray-400 px-4">
                  Type in any interview question you're struggling with or browse our extensive library.
                </p>
                {/*<div className="mt-4 h-40 relative mx-auto w-full max-w-xs">
                  <Image
                    src="/placeholder.svg?height=160&width=200"
                    alt="Ask a question"
                    fill
                    className="object-contain"
                  />
                </div>*/}
              </div>

              {/* Step 2 */}
              <div className="mt-10 lg:mt-0 text-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-purple-500 text-white mx-auto mb-5">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-white">Get Expert Answers</h3>
                <p className="mt-2 text-gray-400 px-4">
                  Receive detailed, tailored responses with examples and strategies for answering effectively.
                </p>
                {/*<div className="mt-4 h-40 relative mx-auto w-full max-w-xs">
                  <Image
                    src="/placeholder.svg?height=160&width=200"
                    alt="Get answers"
                    fill
                    className="object-contain"
                  />
                </div>*/}
              </div>

              {/* Step 3 */}
              <div className="mt-10 lg:mt-0 text-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-purple-500 text-white mx-auto mb-5">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-white">Practice & Improve</h3>
                <p className="mt-2 text-gray-400 px-4">
                  Practice your responses, get feedback, and track your improvement over time.
                </p>
                {/* <div className="mt-4 h-40 relative mx-auto w-full max-w-xs"> 
                  <Image
                    src="/placeholder.svg?height=160&width=200"
                    alt="Practice and improve"
                    fill
                    className="object-contain"
                  />
                </div>*/}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Questions Section */}
      <section id="examples" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block text-white">Example Questions & Answers</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              See how Career Catalyst helps you prepare for common interview questions.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {/* Example 1 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
              <div className="px-6 py-4 bg-gray-800">
                <h3 className="text-lg font-bold text-white">Tell me about yourself</h3>
                <p className="text-sm text-gray-400">Common in all interviews</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-300">
                  This open-ended question is often used as an ice-breaker. The key is to provide a concise professional
                  summary that highlights your relevant experience and skills. Structure your answer as:
                </p>
                <ul className="mt-4 space-y-2 text-gray-300 list-disc pl-5">
                  <li>Present: Start with your current role and responsibilities</li>
                  <li>Past: Briefly mention relevant past experiences</li>
                  <li>Future: Express your interest in the role you're interviewing for</li>
                </ul>
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-300 italic">
                    "I'm currently a Senior Developer at TechCorp, where I lead a team of five engineers building
                    cloud-based solutions. Before that, I spent three years at StartupX developing their core platform.
                    I'm particularly proud of implementing a CI/CD pipeline that reduced deployment time by 40%. I'm now
                    looking to bring my technical leadership and cloud expertise to a larger organization like yours."
                  </p>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
              <div className="px-6 py-4 bg-gray-800">
                <h3 className="text-lg font-bold text-white">What is your greatest weakness?</h3>
                <p className="text-sm text-gray-400">Behavioral question</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-300">
                  This question tests your self-awareness and honesty. The best approach is to:
                </p>
                <ul className="mt-4 space-y-2 text-gray-300 list-disc pl-5">
                  <li>Choose a genuine but not critical weakness</li>
                  <li>Explain how you're actively working to improve</li>
                  <li>Provide specific examples of progress you've made</li>
                </ul>
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-300 italic">
                    "I've sometimes struggled with delegation, preferring to handle important tasks myself to ensure
                    they meet my standards. However, I've recognized this limits team growth and my own capacity. I've
                    been working on this by implementing a structured delegation process where I identify tasks that
                    others can handle, provide clear instructions, and schedule check-ins rather than micromanaging.
                    This has improved my team's capabilities and freed me to focus on more strategic work."
                  </p>
                </div>
              </div>
            </div>

            {/* View More Button */}
            <div className="text-center mt-8">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                View More Examples
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/*<section className="bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block text-white">What Our Users Say</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              Career Catalyst has helped thousands of job seekers land their dream jobs.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            {/*<div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden">
                  <Image src="/placeholder.svg?height=48&width=48" alt="User avatar" width={48} height={48} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-white">Sarah J.</h4>
                  <p className="text-sm text-gray-400">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Career Catalyst helped me prepare for my technical interviews at Google. The AI provided detailed
                explanations for complex algorithms and system design questions. I got the job!"
              </p>
              <div className="mt-4 flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            {/*<div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden">
                  <Image src="/placeholder.svg?height=48&width=48" alt="User avatar" width={48} height={48} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-white">Michael T.</h4>
                  <p className="text-sm text-gray-400">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-300">
                "After three failed interviews, I found Career Catalyst. The practice sessions and feedback were
                game-changers. I felt so much more confident and landed a PM role at my dream company."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            {/*<div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden">
                  <Image src="/placeholder.svg?height=48&width=48" alt="User avatar" width={48} height={48} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-white">Priya K.</h4>
                  <p className="text-sm text-gray-400">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The industry-specific advice was invaluable. Career Catalyst understood the nuances of marketing
                interviews and helped me articulate my experience in a compelling way."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block text-white">Simple, Transparent Pricing</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              Choose the plan that's right for your interview preparation needs.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl">
              <h3 className="text-xl font-bold text-white">Basic</h3>
              <p className="mt-4 text-gray-400">Get started with essential interview preparation.</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-gray-400">/month</span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">10 AI-powered question answers per month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Access to question library</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Basic answer templates</span>
                </li>
              </ul>
              <button className="mt-8 w-full py-3 px-4 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-purple-900 rounded-xl p-8 border border-purple-700 shadow-xl relative">
              <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-white">Pro</h3>
              <p className="mt-4 text-purple-200">Comprehensive interview preparation for serious job seekers.</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-white">$19</span>
                <span className="text-purple-200">/month</span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-purple-100">Unlimited AI-powered answers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-purple-100">Industry-specific advice</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-purple-100">Practice interviews with feedback</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-purple-100">Performance tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-purple-100">Advanced answer templates</span>
                </li>
              </ul>
              <button className="mt-8 w-full py-3 px-4 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-purple-900">
                Start Pro Plan
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl">
              <h3 className="text-xl font-bold text-white">Enterprise</h3>
              <p className="mt-4 text-gray-400">Custom solutions for organizations and career coaches.</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-white">$99</span>
                <span className="text-gray-400">/month</span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Everything in Pro plan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Team management dashboard</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Custom question libraries</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">White-label options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Priority support</span>
                </li>
              </ul>
              <button className="mt-8 w-full py-3 px-4 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block text-white">Frequently Asked Questions</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
              Find answers to common questions about Career Catalyst.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-8">
              {/* FAQ Item 1 */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white">How accurate are the AI-generated answers?</h3>
                <p className="mt-2 text-gray-300">
                  Our AI is trained on thousands of real interview questions and expert responses. All content is
                  regularly reviewed by industry professionals to ensure accuracy and relevance. While AI provides
                  excellent guidance, we recommend using it as a starting point to develop your own authentic answers.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white">Can I use Career Catalyst for any industry?</h3>
                <p className="mt-2 text-gray-300">
                  Yes! We cover a wide range of industries including technology, finance, healthcare, marketing,
                  education, and more. Our Pro and Enterprise plans offer industry-specific advice tailored to your
                  field.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white">How do the practice interviews work?</h3>
                <p className="mt-2 text-gray-300">
                  Our practice interviews simulate real interview scenarios. You'll receive a series of questions to
                  answer verbally or in writing. Our AI then provides feedback on your responses, highlighting strengths
                  and areas for improvement. Pro users can also record video responses for more comprehensive feedback.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white">Can I cancel my subscription at any time?</h3>
                <p className="mt-2 text-gray-300">
                  Absolutely. There are no long-term contracts, and you can cancel your subscription at any time. If you
                  cancel, you'll continue to have access until the end of your current billing period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-purple-800 to-indigo-900 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
            <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to ace your next interview?
                </h2>
                <p className="mt-4 text-lg text-purple-100">
                  Join thousands of job seekers who have used Career Catalyst to prepare for interviews and land their
                  dream jobs.
                </p>
                <div className="mt-8 flex">
                  <div className="inline-flex rounded-md shadow">
                    <Link
                      href="/signup"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
                    >
                      Get Started Free
                    </Link>
                  </div>
                  <div className="ml-3 inline-flex">
                    <Link
                      href="#features"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-700 bg-opacity-60 hover:bg-opacity-70"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:col-span-1 flex justify-center items-center">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Career success"
                  width={300}
                  height={300}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="flex items-center space-x-2">
                  <Briefcase className="h-8 w-8 text-purple-500" />
                  <span className="text-xl font-bold tracking-tight text-white">Career Catalyst</span>
                </Link>
                <p className="mt-4 text-sm text-gray-400">
                  Your AI-powered interview coach. Get expert answers to your interview questions instantly.
                </p>
                <div className="mt-6 flex space-x-6">
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">GitHub</span>
                    <Github className="h-6 w-6" />
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#features" className="text-base text-gray-400 hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="text-base text-gray-400 hover:text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-white">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 py-8">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} Career Catalyst. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

