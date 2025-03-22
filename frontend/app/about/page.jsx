import Link from "next/link"
import Image from "next/image"
import { Briefcase, ArrowLeft, Users, Award, TrendingUp } from "lucide-react"

export default function AboutPage() {
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
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">About Career Catalyst</h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              We're on a mission to help job seekers ace their interviews and land their dream jobs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <div className="mt-6 space-y-6 text-lg text-gray-300">
                <p>
                  Career Catalyst was founded in 2025 by us after we prepared for various interviews.
                   After going through countless interviews ourselves and helping
                  friends prepare, we realized there was a gap in the market for personalized, AI-powered interview
                  coaching.
                </p>
                <p>
                  What started as a side project quickly grew into a comprehensive platform used by students who are seeking for guidance
                  for interview preparation for campus placements. Our team combines expertise in artificial intelligence, career coaching, and
                  industry-specific knowledge to provide the most effective interview preparation tools available.
                </p>
                
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl ">
              <Image 
                src="/About.jpg"
                alt="Career Catalyst team"
                fill
                className="object-cover width-100% height-100%"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">The principles that guide everything we do</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-5">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Accessibility</h3>
              <p className="mt-4 text-gray-300">
                We believe everyone deserves access to high-quality interview preparation, regardless of their
                background or resources.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-5">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Excellence</h3>
              <p className="mt-4 text-gray-300">
                We're committed to providing the highest quality advice and tools, constantly improving our platform
                based on the latest research and feedback.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-5">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Growth</h3>
              <p className="mt-4 text-gray-300">
                We foster a mindset of continuous learning and improvement, both in our platform and in the job seekers
                we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Meet Our Team</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">The passionate people behind Career Catalyst</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Team Member 1 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl">
              <div className="relative h-80">
                <Image src="/placeholder.svg?height=320&width=400" alt="Team member" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Sarah Johnson</h3>
                <p className="text-purple-400">CEO & Co-Founder</p>
                <p className="mt-4 text-gray-300">
                  Former tech recruiter with 10+ years of experience at Google and Amazon. Passionate about helping
                  candidates showcase their true potential.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl">
              <div className="relative h-80">
                <Image src="/placeholder.svg?height=320&width=400" alt="Team member" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Michael Chen</h3>
                <p className="text-purple-400">CTO & Co-Founder</p>
                <p className="mt-4 text-gray-300">
                  AI researcher with a PhD from MIT. Previously led machine learning teams at Microsoft. Expert in
                  natural language processing and conversational AI.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl">
              <div className="relative h-80">
                <Image src="/placeholder.svg?height=320&width=400" alt="Team member" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Priya Patel</h3>
                <p className="text-purple-400">Head of Content</p>
                <p className="mt-4 text-gray-300">
                  Career coach and author with expertise in behavioral interviewing. Has helped hundreds of
                  professionals navigate career transitions and ace interviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white">50K+</div>
              <div className="mt-2 text-lg text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white">1M+</div>
              <div className="mt-2 text-lg text-gray-300">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white">85%</div>
              <div className="mt-2 text-lg text-gray-300">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white">30+</div>
              <div className="mt-2 text-lg text-gray-300">Industries Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Success Stories</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Hear from users who landed their dream jobs with Career Catalyst
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden">
                  <Image src="/placeholder.svg?height=48&width=48" alt="User avatar" width={48} height={48} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-white">Alex T.</h4>
                  <p className="text-sm text-gray-400">Software Engineer at Google</p>
                </div>
              </div>
              <p className="text-gray-300">
                "After three failed technical interviews, I found Career Catalyst. The AI-powered practice sessions
                helped me identify my weak spots and improve my algorithm explanations. I just accepted an offer from
                Google!"
              </p>
              <div className="mt-4 flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden">
                  <Image src="/placeholder.svg?height=48&width=48" alt="User avatar" width={48} height={48} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-white">Jamie K.</h4>
                  <p className="text-sm text-gray-400">Marketing Director at Spotify</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The industry-specific advice was game-changing. Career Catalyst helped me articulate my marketing
                experience in a way that resonated with tech companies. I landed my dream job at Spotify!"
              </p>
              <div className="mt-4 flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden">
                  <Image src="/placeholder.svg?height=48&width=48" alt="User avatar" width={48} height={48} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-white">Taylor R.</h4>
                  <p className="text-sm text-gray-400">Product Manager at Netflix</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The practice interviews were incredibly realistic. I felt so much more confident going into my actual
                interviews because I had already answered similar questions. Career Catalyst was worth every penny!"
              </p>
              <div className="mt-4 flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Journey</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              How Career Catalyst evolved from an idea to a leading interview preparation platform
            </p>
          </div>

          <div className="mt-16 relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700"></div>

            {/* Timeline Items */}
            <div className="relative z-10">
              {/* 2021 */}
              <div className="mb-16 flex justify-between items-center">
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-bold text-white">2021</h3>
                  <h4 className="text-lg font-semibold text-purple-400 mt-1">The Beginning</h4>
                  <p className="mt-3 text-gray-300">
                    Career Catalyst was founded by Sarah Johnson and Michael Chen after experiencing the challenges of
                    interview preparation firsthand.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-purple-500 border-4 border-gray-900"></div>
                </div>
                <div className="w-5/12 pl-8"></div>
              </div>

              {/* 2022 */}
              <div className="mb-16 flex justify-between items-center">
                <div className="w-5/12 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-purple-500 border-4 border-gray-900"></div>
                </div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-white">2022</h3>
                  <h4 className="text-lg font-semibold text-purple-400 mt-1">Rapid Growth</h4>
                  <p className="mt-3 text-gray-300">
                    Secured seed funding and expanded the team. Launched the first version of our AI-powered interview
                    coach, reaching 10,000 users.
                  </p>
                </div>
              </div>

              {/* 2023 */}
              <div className="mb-16 flex justify-between items-center">
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-bold text-white">2023</h3>
                  <h4 className="text-lg font-semibold text-purple-400 mt-1">Industry Recognition</h4>
                  <p className="mt-3 text-gray-300">
                    Named "Best Career Tech Startup" by TechCrunch. Expanded to cover 30+ industries and reached 50,000
                    active users.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-purple-500 border-4 border-gray-900"></div>
                </div>
                <div className="w-5/12 pl-8"></div>
              </div>

              {/* 2024 */}
              <div className="flex justify-between items-center">
                <div className="w-5/12 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-purple-500 border-4 border-gray-900"></div>
                </div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-white">2024</h3>
                  <h4 className="text-lg font-semibold text-purple-400 mt-1">Today & Beyond</h4>
                  <p className="mt-3 text-gray-300">
                    Continuing to innovate with advanced AI features and expanding our services to help job seekers at
                    every stage of their career journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-purple-800 to-indigo-900 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
            <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to join our community?
                </h2>
                <p className="mt-4 text-lg text-purple-100">
                  Start preparing for your next interview with Career Catalyst and join thousands of successful job
                  seekers.
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
                      href="/contact"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-700 bg-opacity-60 hover:bg-opacity-70"
                    >
                      Contact Us
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
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <p className="text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Career Catalyst. All rights reserved.
            </p>
            <div className="mt-2 flex justify-center space-x-6">
              <Link href="/about" className="text-sm text-gray-400 hover:text-gray-300">
                About
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-gray-300">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-gray-300">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-gray-300">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

