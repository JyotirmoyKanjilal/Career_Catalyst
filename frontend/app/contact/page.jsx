"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Briefcase, Mail, Phone, MapPin, Send, ArrowRight, CheckCircle } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

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
      {/* Header with gradient background */}
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
            <span className="block text-white">Get in Touch</span>
            <span className="block text-[#00A3A9] mt-2">We'd Love to Hear From You</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
            Have questions about our services or need help with your account? Our team is here to assist you.
          </p>
        </div>
      </div>

      {/* Contact Form and Info Section */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-8 border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10">
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#006770] to-[#00A3A9] text-white mb-6 animate-fade-in">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#006770] hover:bg-[#008C8B] transition-all hover:scale-105 active:scale-95"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-2 border-[#003B46]/50 bg-[#070F12]/80 py-3 px-4 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-2 border-[#003B46]/50 bg-[#070F12]/80 py-3 px-4 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-2 border-[#003B46]/50 bg-[#070F12]/80 py-3 px-4 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="block w-full rounded-md border-2 border-[#003B46]/50 bg-[#070F12]/80 py-3 px-4 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                    placeholder="Tell us how we can assist you..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-8 border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-[#006770] to-[#00A3A9] text-white">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-[#00A3A9]">Email</h3>
                    <p className="mt-1 text-gray-300">support@careercatalyst.com</p>
                    <p className="mt-1 text-gray-300">info@careercatalyst.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-[#006770] to-[#00A3A9] text-white">
                      <Phone className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-[#00A3A9]">Phone</h3>
                    <p className="mt-1 text-gray-300">+1 (555) 123-4567</p>
                    <p className="mt-1 text-gray-300">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-[#006770] to-[#00A3A9] text-white">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-[#00A3A9]">Office</h3>
                    <p className="mt-1 text-gray-300">123 Innovation Drive</p>
                    <p className="mt-1 text-gray-300">San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map or Office Image */}
            <div className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10 h-64 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#003B46]/10 to-[#00A3A9]/10 group-hover:opacity-0 transition-opacity duration-300"></div>
              <Image src="/placeholder.svg?height=400&width=600" alt="Office location" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#006770] text-white rounded-md hover:bg-[#00A3A9] transition-colors"
                >
                  View on Google Maps
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#003B46]/10 py-16 relative">
        <div className="absolute inset-0 bg-[#070F12] opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3A9]/50 to-transparent"></div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-400">Find quick answers to common questions about contacting us.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What's the typical response time for inquiries?",
                answer:
                  "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.",
              },
              {
                question: "Do you offer technical support over the phone?",
                answer:
                  "Yes, our technical support team is available by phone Monday through Friday, 9am-5pm EST. For complex issues, we may schedule a screen-sharing session.",
              },
              {
                question: "Can I schedule a demo of your platform?",
                answer:
                  "You can request a demo through our contact form or by emailing demo@careercatalyst.com. We'll set up a time that works for you.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-[#070F12]/80 backdrop-blur-sm rounded-lg p-6 border border-[#003B46]/20 shadow-md transition-all duration-500 hover:border-[#00A3A9]/50 hover:shadow-lg"
              >
                <h3 className="text-lg font-medium text-[#00A3A9]">{faq.question}</h3>
                <p className="mt-2 text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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

