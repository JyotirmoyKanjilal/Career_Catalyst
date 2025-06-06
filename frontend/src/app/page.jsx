"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
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
  X,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import Navbar from "../components/Navbar";

// Define theme colors based on the provided palette
const theme = {
  darkest: "#070F12",
  darkTeal: "#003B46",
  mediumTeal: "#006770",
  brightTeal: "#008C8B",
  lightTeal: "#00A3A9",
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const examplesRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  // Handle scroll events for animations and header
  useEffect(() => {
    const handleScroll = () => {
      // Header background change on scroll
      setScrolled(window.scrollY > 20);

      // Reveal elements when they come into view
      const sections = document.querySelectorAll(".animate-on-scroll");
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.id || Math.random().toString();

        if (sectionTop < window.innerHeight * 0.75) {
          setIsVisible((prev) => ({ ...prev, [sectionId]: true }));
        }
      });

      // Determine active section for nav highlighting
      const scrollPosition = window.scrollY + 100;

      if (
        heroRef.current &&
        scrollPosition <
          heroRef.current.offsetTop + heroRef.current.offsetHeight
      ) {
        setActiveSection("hero");
      } else if (
        featuresRef.current &&
        scrollPosition <
          featuresRef.current.offsetTop + featuresRef.current.offsetHeight
      ) {
        setActiveSection("features");
      } else if (
        howItWorksRef.current &&
        scrollPosition <
          howItWorksRef.current.offsetTop + howItWorksRef.current.offsetHeight
      ) {
        setActiveSection("how-it-works");
      } else if (
        examplesRef.current &&
        scrollPosition <
          examplesRef.current.offsetTop + examplesRef.current.offsetHeight
      ) {
        setActiveSection("examples");
      } else if (
        faqRef.current &&
        scrollPosition < faqRef.current.offsetTop + faqRef.current.offsetHeight
      ) {
        setActiveSection("faq");
      } else if (ctaRef.current) {
        setActiveSection("cta");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add this function after the useEffect hooks
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      const headerHeight = 64; // Adjust based on your header height
      window.scrollTo({
        top: offsetTop - headerHeight,
        behavior: "smooth",
      });
    }
  };

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Particle animation for hero section
  useEffect(() => {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 50;
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;

        // Use teal color palette for particles
        const tealShades = [
          `rgba(0, 59, 70, ${Math.random() * 0.3 + 0.1})`,
          `rgba(0, 103, 112, ${Math.random() * 0.3 + 0.1})`,
          `rgba(0, 140, 139, ${Math.random() * 0.3 + 0.1})`,
          `rgba(0, 163, 169, ${Math.random() * 0.3 + 0.1})`,
        ];
        this.color = tealShades[Math.floor(Math.random() * tealShades.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0; // Clear existing particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize particles on resize
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        init();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070F12] text-gray-100 overflow-hidden">
      {/* Animated background canvas */}
      <canvas
        id="hero-canvas"
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0"
      ></canvas>      {/* Header */}
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 animate-on-scroll"
        id="hero"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#070F12] via-[#003B46]/30 to-[#070F12]"></div>

        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 border border-[#00A3A9]/30 rounded-full animate-pulse-slow opacity-20"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 border border-[#008C8B]/20 rounded-full animate-pulse-slow opacity-10"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-16 sm:w-32 h-16 sm:h-32 border border-[#006770]/40 rounded-full animate-pulse-slow opacity-20"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Glowing lines */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#008C8B]/50 to-transparent opacity-30"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-[#006770]/50 to-transparent opacity-30"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-[#00A3A9]/50 to-transparent opacity-30"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div
              className={`text-center lg:text-left transition-all duration-1000 ${
                isVisible.hero
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-4 sm:mb-6">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">
                  AI-Powered Interview Preparation
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="block text-white">Ace Your Next</span>
                <span className="block text-[#00A3A9] relative">
                  Interview
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-[#006770] to-[#00A3A9] opacity-50 rounded"></span>
                </span>
              </h1>
              <p className="mt-4 sm:mt-6 max-w-lg mx-auto lg:mx-0 text-base sm:text-xl text-gray-300">
                Get expert answers to your interview questions instantly.
                Prepare confidently with Career Catalyst, your AI-powered
                interview coach.
              </p>
              <div className="mt-6 sm:mt-10 max-w-xl mx-auto lg:mx-0">
                <Link href="/ai-answer">
                  <div className="flex flex-start">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-[#006770] px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-xl font-bold text-white hover:bg-[#008C8B] focus:outline-none focus:ring-2 focus:ring-[#00A3A9] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#00A3A9]/20"
                    >   
                      Ask Now
                    </button>
                  </div>
                </Link>
              </div>
            </div>
            <div
              className={`hidden lg:block relative h-96 transition-all duration-1000 ${
                isVisible.hero
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#003B46]/10 to-[#00A3A9]/10 rounded-lg transform rotate-3 animate-pulse-slow"></div>
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#006770]/10 to-[#008C8B]/10 rounded-lg transform -rotate-3 animate-pulse-slow"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-md">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#00A3A9]/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#008C8B]/10 rounded-full blur-xl"></div>
                  <Image
                    src="/HomeImage.png"
                    alt="Career Catalyst Interview Preparation"
                    width={400}
                    height={400}
                    className="object-contain rounded-lg shadow-xl transform transition-transform hover:scale-105 duration-500 relative z-10"
                  />
                </div>
              </div>
            </div>

            {/* Mobile hero image - shown only on mobile */}
            <div className="lg:hidden flex justify-center mt-6">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                <div className="absolute inset-0 bg-gradient-to-r from-[#003B46]/10 to-[#00A3A9]/10 rounded-lg transform rotate-3 animate-pulse-slow"></div>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#006770]/10 to-[#008C8B]/10 rounded-lg transform -rotate-3 animate-pulse-slow"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <Image
                  src="/HomeImage.png"
                  alt="Career Catalyst Interview Preparation"
                  width={320}
                  height={320}
                  className="object-contain rounded-lg shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        id="features"
        className="py-12 sm:py-16 md:py-24 animate-on-scroll relative"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`text-center transition-all duration-700 ${
              isVisible.features
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-4 sm:mb-6">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span>Key Benefits</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="block text-white">
                Why Choose Career Catalyst?
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400">
              Everything you need to prepare for your next interview, all in one
              place.
            </p>
          </div>

          <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />,
                title: "AI-Powered Answers",
                description:
                  "Get detailed, personalized answers to your specific interview questions using advanced AI technology.",
              },
              {
                icon: <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />,
                title: "Industry-Specific Guidance",
                description:
                  "Tailored advice for different industries, from tech to finance, healthcare to marketing.",
              },
              {
                icon: <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />,
                title: "Performance Tracking",
                description:
                  "Track your progress and identify areas for improvement with detailed analytics.",
              },
              {
                icon: <Award className="h-5 w-5 sm:h-6 sm:w-6" />,
                title: "Expert-Verified Content",
                description:
                  "All answers and advice are reviewed by industry professionals to ensure accuracy and relevance.",
              },
              {
                icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
                title: "Practice Interviews",
                description:
                  "Simulate real interview experiences with our interactive practice sessions and get instant feedback.",
              },
              {
                icon: <Search className="h-5 w-5 sm:h-6 sm:w-6" />,
                title: "Extensive Question Library",
                description:
                  "Access thousands of real interview questions from companies across various industries.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-8 border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/50 hover:shadow-[#00A3A9]/10 transform hover:-translate-y-2 group ${
                  isVisible.features
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-gradient-to-br from-[#006770] to-[#00A3A9] text-white mb-4 sm:mb-5 transform transition-transform group-hover:rotate-12 duration-300 shadow-lg shadow-[#00A3A9]/20">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-400">
                  {feature.description}
                </p>
                <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-[#006770] to-[#00A3A9] group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        ref={howItWorksRef}
        id="how-it-works"
        className="bg-[#003B46]/10 py-12 sm:py-16 md:py-24 animate-on-scroll relative"
      >
        <div className="absolute inset-0 bg-[#070F12] opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`text-center transition-all duration-700 ${
              isVisible["how-it-works"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-4 sm:mb-6">
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="block text-white">
                How Career Catalyst Works
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400">
              Get interview-ready in three simple steps.
            </p>
          </div>

          <div className="mt-10 sm:mt-16">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {[
                {
                  step: 1,
                  title: "Ask Your Question",
                  description:
                    "Type in any interview question you're struggling with or browse our extensive library.",
                  img: "/askQuestions.jpg",
                },
                {
                  step: 2,
                  title: "Get Expert Answers",
                  description:
                    "Receive detailed, tailored responses with examples and strategies for answering effectively.",
                  img: "/GetAnswers.png",
                },
                {
                  step: 3,
                  title: "Practice & Improve",
                  description:
                    "Practice your responses, get feedback, and track your improvement over time.",
                  img: "/Practice.png",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`mt-8 lg:mt-0 text-center transition-all duration-700 ${
                    isVisible["how-it-works"]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative">
                    <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-[#006770] to-[#00A3A9] text-white mx-auto mb-4 sm:mb-5 transform transition-transform hover:scale-110 duration-300 shadow-lg shadow-[#00A3A9]/20">
                      <span className="text-xl sm:text-2xl font-bold">
                        {step.step}
                      </span>
                    </div>
                    {index < 2 && (
                      <div className="hidden lg:block absolute top-8 sm:top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#006770] to-transparent transform -translate-x-10"></div>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-400 px-2 sm:px-4">
                    {step.description}
                  </p>
                  <div className="mt-4 sm:mt-6 h-32 sm:h-40 relative mx-auto w-full max-w-xs group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#006770]/10 to-[#00A3A9]/10 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                    <div className="absolute inset-0 bg-[#070F12] rounded-lg border border-[#003B46]/20 group-hover:border-[#00A3A9]/40 transition-colors duration-300"></div>
                    <Image
                      src={step.img}
                      alt={step.title}
                      width={200}
                      height={160}
                      className="relative rounded-lg object-contain transform transition-all duration-500 group-hover:scale-105 p-4"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Example Questions Section */}
      <section
        ref={examplesRef}
        id="examples"
        className="py-12 sm:py-16 md:py-24 animate-on-scroll relative"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`text-center transition-all duration-700 ${
              isVisible.examples
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-4 sm:mb-6">
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span>Sample Content</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="block text-white">
                Example Questions & Answers
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400">
              See how Career Catalyst helps you prepare for common interview
              questions.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
            {[
              {
                question: "Tell me about yourself",
                type: "Common in all interviews",
                description:
                  "This open-ended question is often used as an ice-breaker. The key is to provide a concise professional summary that highlights your relevant experience and skills. Structure your answer as:",
                bullets: [
                  "Present: Start with your current role and responsibilities",
                  "Past: Briefly mention relevant past experiences",
                  "Future: Express your interest in the role you're interviewing for",
                ],
                example:
                  "I'm currently a Senior Developer at TechCorp, where I lead a team of five engineers building cloud-based solutions. Before that, I spent three years at StartupX developing their core platform. I'm particularly proud of implementing a CI/CD pipeline that reduced deployment time by 40%. I'm now looking to bring my technical leadership and cloud expertise to a larger organization like yours.",
              },
              {
                question: "What is your greatest weakness?",
                type: "Behavioral question",
                description:
                  "This question tests your self-awareness and honesty. The best approach is to:",
                bullets: [
                  "Choose a genuine but not critical weakness",
                  "Explain how you're actively working to improve",
                  "Provide specific examples of progress you've made",
                ],
                example:
                  "I've sometimes struggled with delegation, preferring to handle important tasks myself to ensure they meet my standards. However, I've recognized this limits team growth and my own capacity. I've been working on this by implementing a structured delegation process where I identify tasks that others can handle, provide clear instructions, and schedule check-ins rather than micromanaging. This has improved my team's capabilities and freed me to focus on more strategic work.",
              },
            ].map((example, index) => (
              <div
                key={index}
                className={`bg-[#070F12]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-[#003B46]/20 shadow-lg transition-all duration-700 hover:border-[#00A3A9]/50 hover:shadow-[#00A3A9]/10 group ${
                  isVisible.examples
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#003B46]/30 to-[#006770]/30 border-b border-[#003B46]/20">
                  <h3 className="text-base sm:text-lg font-bold text-[#00A3A9] group-hover:text-white transition-colors duration-300">
                    {example.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {example.type}
                  </p>
                </div>
                <div className="px-4 sm:px-6 py-3 sm:py-4">
                  <p className="text-sm sm:text-base text-gray-300">
                    {example.description}
                  </p>
                  <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-300 list-disc pl-5">
                    {example.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-[#003B46]/20 rounded-lg border-l-4 border-[#00A3A9]">
                    <p className="text-xs sm:text-sm text-gray-300 italic">
                      "{example.example}"
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* View More Button */}
            <div
              className={`text-center mt-6 sm:mt-8 transition-all duration-700 ${
                isVisible.examples
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
            <Link href="/answers">
              <button className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#00A3A9]/20">
                View More Examples
                <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className="py-12 sm:py-16 md:py-24 bg-[#003B46]/10 animate-on-scroll relative"
        id="faq"
      >
        <div className="absolute inset-0 bg-[#070F12] opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`text-center transition-all duration-700 ${
              isVisible.faq
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-4 sm:mb-6">
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="block text-white">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400">
              Find answers to common questions about Career Catalyst.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 max-w-3xl mx-auto">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {[
                {
                  question: "How accurate are the AI-generated answers?",
                  answer:
                    "Our AI is trained on thousands of real interview questions and expert responses. All content is regularly reviewed by industry professionals to ensure accuracy and relevance. While AI provides excellent guidance, we recommend using it as a starting point to develop your own authentic answers.",
                },
                {
                  question: "Can I use Career Catalyst for any industry?",
                  answer:
                    "Yes! We cover a wide range of industries including technology, finance, healthcare, marketing, education, and more. Our Pro and Enterprise plans offer industry-specific advice tailored to your field.",
                },
                {
                  question: "How do the practice interviews work?",
                  answer:
                    "Our practice interviews simulate real interview scenarios. You'll receive a series of questions to answer verbally or in writing. Our AI then provides feedback on your responses, highlighting strengths and areas for improvement. Pro users can also record video responses for more comprehensive feedback.",
                },
                {
                  question: "Can I cancel my subscription at any time?",
                  answer:
                    "Absolutely. There are no long-term contracts, and you can cancel your subscription at any time. If you cancel, you'll continue to have access until the end of your current billing period.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className={`bg-[#070F12]/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-[#003B46]/20 shadow-md transition-all duration-500 hover:border-[#00A3A9]/50 hover:shadow-lg group ${
                    isVisible.faq
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <h3 className="text-base sm:text-lg font-medium text-[#00A3A9] group-hover:text-white transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-12 sm:py-16 md:py-24 animate-on-scroll relative"
        id="cta"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transition-all duration-1000 ${
              isVisible.cta
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#003B46] to-[#006770] opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

            {/* Animated geometric elements */}
            <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 border border-white/10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 border border-white/10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-1/2 left-1/2 w-16 sm:w-32 h-16 sm:h-32 border border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-20">
              <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="lg:col-span-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    Ready to ace your next interview?
                  </h2>
                  <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/80">
                    Join thousands of job seekers who have used Career Catalyst
                    to prepare for interviews and land their dream jobs.
                  </p>
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="inline-flex rounded-md shadow">
                      <Link
                        href="/signup"
                        className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-[#070F12] bg-white hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
                      >
                        Get Started Free
                      </Link>
                    </div>
                    <div className="inline-flex">
                      <Link
                        href="#features"
                        className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-3 border border-white text-sm sm:text-base font-medium rounded-md text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-8 lg:mt-0 lg:col-span-1 flex justify-center items-center">
                  <div className="relative transform transition-transform hover:rotate-3 duration-500">
                    <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-3"></div>
                    <Image
                      src="/HomeImage.png"
                      alt="Career success"
                      width={300}
                      height={300}
                      className="relative rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#070F12] border-t border-[#003B46]/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-12 md:py-16">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="flex items-center space-x-2 group">
                  <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-[#00A3A9] group-hover:text-[#008C8B] transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#00A3A9] transition-colors duration-300">
                    Career Catalyst
                  </span>
                </Link>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400">
                  Your AI-powered interview coach. Get expert answers to your
                  interview questions instantly.
                </p>
                <div className="mt-4 sm:mt-6 flex space-x-4 sm:space-x-6">
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-5 w-5 sm:h-6 sm:w-6 transform transition-transform hover:scale-110 hover:rotate-6 duration-300" />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 transform transition-transform hover:scale-110 hover:rotate-6 duration-300" />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="sr-only">GitHub</span>
                    <Github className="h-5 w-5 sm:h-6 sm:w-6 transform transition-transform hover:scale-110 hover:rotate-6 duration-300" />
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-[#00A3A9] tracking-wider uppercase">
                  Product
                </h3>
                <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-4">
                  <li>
                    <Link
                      href="/answers"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Q & A
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#faq"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-[#00A3A9] tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-4">
                  <li>
                    <Link
                      href="./about"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="./contact"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-[#00A3A9] tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-[#003B46]/20 py-6 sm:py-8">
            <p className="text-center text-xs sm:text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Career Catalyst. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 right-4 p-2 sm:p-3 rounded-full bg-[#006770] text-white shadow-lg z-40 transition-all duration-300 ${
          scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}
