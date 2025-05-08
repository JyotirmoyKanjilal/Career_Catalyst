"use client"

import { useState } from "react"
import Link from "next/link"
import { Briefcase, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, Github, Twitter } from "lucide-react"
import * as Yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import toast from "react-hot-toast"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    agreeTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  })

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, values)
        .then((result) => {
          console.log(result.data);

        }).catch((err) => {
          console.log(err);
          toast.error("login failed.PLease check your credentials");
        })
        .finally(() => {

          setIsLoading(false);
          setIsSubmitted(true);
        });
    },
  })

  // Handle next step
  const handleNextStep = () => {
    // Validate first step fields
    const errors = {}
    if (!formik.values.name) errors.name = "Name is required"
    if (!formik.values.email) errors.email = "Email is required"
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)) {
      errors.email = "Invalid email address"
    }

    // Set touched for validation to show
    formik.setTouched({
      name: true,
      email: true,
    })

    // Check if there are errors
    if (!formik.values.name || !formik.values.email || errors.email) {
      return
    }

    setStep(2)
  }

  return (
    <div className="min-h-screen bg-[#070F12] text-gray-100 flex flex-col">
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
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center space-x-2 group">
                <Briefcase className="h-8 w-8 text-[#00A3A9] group-hover:text-[#008C8B] transition-all duration-300 group-hover:rotate-12" />
                <span className="text-xl font-bold tracking-tight group-hover:text-[#00A3A9] transition-colors duration-300">
                  Career Catalyst
                </span>
              </Link>
              <h1 className="mt-6 text-3xl font-bold text-white">Create Your Account</h1>
              <p className="mt-2 text-gray-400">Join thousands of job seekers preparing for interviews</p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#006770] to-[#00A3A9] text-white mx-auto mb-6 animate-fade-in">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
                <p className="text-gray-300 mb-6">
                  Your account has been created. You can now sign in to access your dashboard.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] transition-all hover:scale-105 active:scale-95"
                >
                  Sign In Now
                </Link>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {step === 1 ? (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`block w-full pl-10 pr-3 py-3 border-2 ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-[#003B46]/50"} rounded-md bg-[#070F12]/80 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all`}
                          placeholder="John Doe"
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`block w-full pl-10 pr-3 py-3 border-2 ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-[#003B46]/50"} rounded-md bg-[#070F12]/80 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all`}
                          placeholder="you@example.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A3A9] transition-all hover:scale-105 active:scale-95"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                        Create Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`block w-full pl-10 pr-10 py-3 border-2 ${formik.touched.password && formik.errors.password ? "border-red-500" : "border-[#003B46]/50"} rounded-md bg-[#070F12]/80 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all`}
                          placeholder="••••••••"
                        />
                        {formik.touched.password && formik.errors.password && (
                          <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                        )}
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-300 focus:outline-none"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">Password must be at least 8 characters long</p>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formik.values.agreeTerms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="h-4 w-4 rounded border-gray-600 bg-[#070F12] text-[#00A3A9] focus:ring-[#00A3A9] focus:ring-offset-[#070F12]"
                      />
                      {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.agreeTerms}</div>
                      )}
                      <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-300">
                        I agree to the{" "}
                        <Link href="#" className="text-[#00A3A9] hover:text-[#008C8B] transition-colors">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-[#00A3A9] hover:text-[#008C8B] transition-colors">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isLoading || !formik.values.agreeTerms || !formik.isValid}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A3A9] transition-all ${isLoading || !formik.values.agreeTerms || !formik.isValid
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:scale-105 active:scale-95"
                          }`}
                      >
                        {isLoading ? (
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
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-[#00A3A9] hover:text-[#008C8B] transition-colors"
                    >
                      &larr; Back to previous step
                    </button>
                  </div>
                )}
              </form>
            )}

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#003B46]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#070F12] text-gray-400">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-[#003B46] rounded-md shadow-sm bg-[#070F12] text-sm font-medium text-gray-300 hover:bg-[#003B46]/20 transition-colors"
                >
                  <span className="sr-only">Sign up with Google</span>
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-[#003B46] rounded-md shadow-sm bg-[#070F12] text-sm font-medium text-gray-300 hover:bg-[#003B46]/20 transition-colors"
                >
                  <span className="sr-only">Sign up with Twitter</span>
                  <Twitter className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-[#003B46] rounded-md shadow-sm bg-[#070F12] text-sm font-medium text-gray-300 hover:bg-[#003B46]/20 transition-colors"
                >
                  <span className="sr-only">Sign up with GitHub</span>
                  <Github className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-[#00A3A9] hover:text-[#008C8B] transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B46] to-[#006770] opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=1000')] bg-cover bg-center mix-blend-overlay"></div>

          {/* Animated geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-[#00A3A9]/20 rounded-full animate-pulse-slow opacity-20"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-[#008C8B]/10 rounded-full animate-pulse-slow opacity-10"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
            <div className="max-w-md text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Join us to ace your interviews.</h2>
              <p className="text-lg text-white/80 mb-8">
                Our AI-powered platform helps candidates to land roles at companies.
              </p>
              {/* <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-2xl font-bold text-white">85%</h3>
                  <p className="text-sm text-white/80">Success rate</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-2xl font-bold text-white">50k+</h3>
                  <p className="text-sm text-white/80">Users</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-2xl font-bold text-white">100+</h3>
                  <p className="text-sm text-white/80">Industries</p>
                </div>
              </div> */}
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-white font-medium hover:text-[#00A3A9] transition-colors"
                >
                  Learn more about our success stories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#070F12] border-t border-[#003B46]/20 py-4">
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
