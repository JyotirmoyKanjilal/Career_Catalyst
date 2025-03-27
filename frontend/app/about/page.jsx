"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Briefcase, Users, Award, Target, Lightbulb, Heart, Twitter, Linkedin } from "lucide-react"

export default function About() {
  const [isVisible, setIsVisible] = useState({})
  const missionRef = useRef(null)
  const teamRef = useRef(null)
  const valuesRef = useRef(null)
  const historyRef = useRef(null)

  // Handle scroll events for animations
  useEffect(() => {
    const handleScroll = () => {
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

  return (
    <div className="min-h-screen bg-[#070F12] text-gray-100">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-md bg-[#003B46]/80 text-white hover:bg-[#006770] transition-all duration-300 shadow-md hover:shadow-[#00A3A9]/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>
      {/* Hero Section */}
      <div className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003B46]/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-[#00A3A9]/20 rounded-full animate-pulse-slow opacity-20"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-[#008C8B]/10 rounded-full animate-pulse-slow opacity-10"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center space-x-2 group mb-8">
            <Briefcase className="h-8 w-8 text-[#00A3A9] group-hover:text-[#008C8B] transition-all duration-300 group-hover:rotate-12" />
            <span className="text-xl font-bold tracking-tight group-hover:text-[#00A3A9] transition-colors duration-300">
              Career Catalyst
            </span>
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-white">About Us</span>
            <span className="block text-[#00A3A9] mt-2">Our Story & Mission</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            We're on a mission to revolutionize interview preparation and help job seekers land their dream roles.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section ref={missionRef} id="mission" className="py-16 animate-on-scroll relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${isVisible.mission ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-6">
                <Target className="h-4 w-4 mr-2" />
                <span>Our Mission</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Empowering Career Growth Through Technology</h2>
              <p className="mt-4 text-lg text-gray-300">
                At Career Catalyst, we believe that everyone deserves access to high-quality interview preparation
                resources. Our mission is to leverage cutting-edge AI technology to democratize career advancement
                opportunities.
              </p>
              <p className="mt-4 text-lg text-gray-300">
                We're committed to helping job seekers at all stages of their careers prepare effectively for
                interviews, build confidence, and showcase their skills to potential employers.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-[#003B46]/20 rounded-lg p-4 border border-[#003B46]/30">
                  <h3 className="text-xl font-bold text-[#00A3A9]">50,000+</h3>
                  <p className="text-gray-400">Users Helped</p>
                </div>
                <div className="bg-[#003B46]/20 rounded-lg p-4 border border-[#003B46]/30">
                  <h3 className="text-xl font-bold text-[#00A3A9]">85%</h3>
                  <p className="text-gray-400">Success Rate</p>
                </div>
                <div className="bg-[#003B46]/20 rounded-lg p-4 border border-[#003B46]/30">
                  <h3 className="text-xl font-bold text-[#00A3A9]">100+</h3>
                  <p className="text-gray-400">Industries Covered</p>
                </div>
                <div className="bg-[#003B46]/20 rounded-lg p-4 border border-[#003B46]/30">
                  <h3 className="text-xl font-bold text-[#00A3A9]">24/7</h3>
                  <p className="text-gray-400">Support Available</p>
                </div>
              </div>
            </div>
            <div
              className={`mt-10 lg:mt-0 relative transition-all duration-1000 ${isVisible.mission ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#003B46]/10 to-[#00A3A9]/10 rounded-lg transform rotate-3 animate-pulse-slow"></div>
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#006770]/10 to-[#008C8B]/10 rounded-lg transform -rotate-3 animate-pulse-slow"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/HomeImage.png"
                  alt="Our mission"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} id="team" className="py-16 bg-[#003B46]/10 animate-on-scroll relative">
        <div className="absolute inset-0 bg-[#070F12] opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-700 ${isVisible.team ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-6">
              <Users className="h-4 w-4 mr-2" />
              <span>Our Team</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Meet the Minds Behind Career Catalyst</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              Our diverse team brings together expertise in AI, career coaching, and software development to create the
              best interview preparation platform.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Jyotirmoy Kanjilal",
                role: "Founder & CEO",
                bio: "Former tech recruiter with 10+ years of experience. Alex founded Career Catalyst to solve the interview preparation challenges he witnessed firsthand.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Yash Kumar",
                role: "Chief AI Officer",
                bio: "PhD in Machine Learning from MIT. Priya leads our AI development team, ensuring our platform provides accurate, personalized guidance.",
                image: "/placeholder.svg?height=300&width=300",
              },
              
            ].map((member, index) => (
              <div
                key={index}
                className={`bg-[#070F12]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/50 hover:shadow-[#00A3A9]/10 group ${
                  isVisible.team ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#070F12] opacity-60 z-10"></div>
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-[#00A3A9] font-medium">{member.role}</p>
                  <p className="mt-2 text-gray-300">{member.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-[#00A3A9] transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#00A3A9] transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} id="values" className="py-16 animate-on-scroll relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-700 ${isVisible.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-6">
              <Heart className="h-4 w-4 mr-2" />
              <span>Our Values</span>
            </div>
            <h2 className="text-3xl font-bold text-white">What We Stand For</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              Our core values guide everything we do at Career Catalyst, from product development to customer support.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Accessibility",
                description:
                  "We believe career advancement resources should be accessible to everyone, regardless of background or financial situation.",
                icon: <Users className="h-6 w-6" />,
              },
              {
                title: "Innovation",
                description:
                  "We continuously push the boundaries of what's possible with AI to provide the most effective interview preparation tools.",
                icon: <Lightbulb className="h-6 w-6" />,
              },
              {
                title: "Integrity",
                description:
                  "We're committed to providing honest, accurate guidance that truly helps our users succeed in their career journeys.",
                icon: <Award className="h-6 w-6" />,
              },
              {
                title: "Empowerment",
                description:
                  "We don't just help users answer questions; we empower them to build confidence and showcase their unique strengths.",
                icon: <Target className="h-6 w-6" />,
              },
              {
                title: "Inclusivity",
                description:
                  "We design our platform to serve diverse users across industries, experience levels, and backgrounds.",
                icon: <Heart className="h-6 w-6" />,
              },
              {
                title: "Continuous Improvement",
                description:
                  "We're always learning and evolving, using user feedback to make our platform better every day.",
                icon: <Briefcase className="h-6 w-6" />,
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-8 border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/50 hover:shadow-[#00A3A9]/10 transform hover:-translate-y-2 group ${
                  isVisible.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-[#006770] to-[#00A3A9] text-white mb-5 transform transition-transform group-hover:rotate-12 duration-300 shadow-lg shadow-[#00A3A9]/20">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{value.title}</h3>
                <p className="mt-2 text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section ref={historyRef} id="history" className="py-16 bg-[#003B46]/10 animate-on-scroll relative">
        <div className="absolute inset-0 bg-[#070F12] opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-700 ${isVisible.history ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-6">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>Our Journey</span>
            </div>
            <h2 className="text-3xl font-bold text-white">The Career Catalyst Story</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              From a simple idea to a comprehensive interview preparation platform, here's how Career Catalyst evolved.
            </p>
          </div>

          <div className="mt-16 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#006770] to-[#00A3A9] opacity-30"></div>

            {[
              {
                year: "2019",
                title: "The Beginning",
                description:
                  "Career Catalyst started as a weekend project by our founder, Alex Johnson, who wanted to help his friends prepare for tech interviews.",
              },
              {
                year: "2020",
                title: "First Prototype",
                description:
                  "The first version of our AI interview coach was developed, focusing on software engineering interviews.",
              },
              {
                year: "2021",
                title: "Expanding Horizons",
                description:
                  "We secured our first round of funding and expanded our team, adding expertise in AI, career coaching, and product development.",
              },
              {
                year: "2022",
                title: "Industry Coverage",
                description:
                  "Career Catalyst expanded beyond tech to cover finance, healthcare, marketing, and more industries.",
              },
              {
                year: "2023",
                title: "Global Reach",
                description:
                  "We hit 50,000 users worldwide and launched partnerships with universities and career centers.",
              },
              {
                year: "Today",
                title: "Continuous Innovation",
                description:
                  "We continue to refine our AI technology and expand our offerings to help job seekers at all stages of their careers.",
              },
            ].map((milestone, index) => (
              <div
                key={index}
                className={`relative mb-12 ${index % 2 === 0 ? "ml-auto pl-12 pr-0" : "mr-auto pr-12 pl-0"} w-full md:w-1/2 transition-all duration-700 ${
                  isVisible.history ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute top-0 ${index % 2 === 0 ? "left-0" : "right-0"} w-12 h-12 rounded-full bg-gradient-to-br from-[#006770] to-[#00A3A9] flex items-center justify-center text-white font-bold transform -translate-y-1/4 ${index % 2 === 0 ? "-translate-x-1/2" : "translate-x-1/2"} z-10`}
                >
                  {milestone.year}
                </div>
                <div className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10 transition-all duration-300">
                  <h3 className="text-xl font-bold text-[#00A3A9]">{milestone.title}</h3>
                  <p className="mt-2 text-gray-300">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 animate-on-scroll relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#003B46] to-[#006770] opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

            <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
              <h2 className="text-3xl font-bold text-white">Join Our Mission</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
                Whether you're a job seeker looking to advance your career or an organization interested in partnering
                with us, we'd love to hear from you.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#070F12] bg-white hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#070F12] border-t border-[#003B46]/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 group">
              <Briefcase className="h-6 w-6 text-[#00A3A9] group-hover:text-[#008C8B] transition-all duration-300 group-hover:rotate-12" />
              <span className="text-lg font-bold tracking-tight group-hover:text-[#00A3A9] transition-colors duration-300">
                Career Catalyst
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Career Catalyst. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

