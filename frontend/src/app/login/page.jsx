'use client';

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Briefcase, Mail, Lock, Eye, EyeOff, ArrowRight, Github, Twitter } from "lucide-react"
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik, useFormik } from "formik"
import React from "react"
import axios from "axios"
import {useRouter} from "next/navigation";
// ISSERVER = typeof window === 'undefined';

export default function Login() { 

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)

    // Define validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    // Initialize Formik
    const Formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted:', values);
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, values)
            
            .then((result) => {
              console.log(result.data);
              
              localStorage.setItem('token',result.data.token);
              toast.success("login Successful");
              if(result.data.role === 'admin'){
                router.push('/admin/dashboard');
              }else{
                router.push('/');
              }
              // !ISSERVER  localStorage.setItem('user',result.data.token);
              
            }).catch((err) => {
              console.log(err);
              toast.error("login failed.PLease check your credentials"); 
            });
            // Here you would typically handle authentication
            // e.g., call an API to verify credentials
        },
    });

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
              <h1 className="mt-6 text-3xl font-bold text-white">Welcome Back</h1>
              <p className="mt-2 text-gray-400">Sign in to your account to continue</p>
            </div>

            <form onSubmit={Formik.handleSubmit} className="space-y-6">
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
                    required
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    value={Formik.values.email}
                    className="block w-full pl-10 pr-3 py-3 border-2 border-[#003B46]/50 rounded-md bg-[#070F12]/80 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    onChange={Formik.handleChange}
                    value={Formik.values.password}
                    onBlur={Formik.handleBlur}
                    className="block w-full pl-10 pr-10 py-3 border-2 border-[#003B46]/50 rounded-md bg-[#070F12]/80 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
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
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-[#00A3A9] hover:text-[#008C8B] transition-colors">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#006770] to-[#00A3A9] hover:from-[#00A3A9] hover:to-[#006770] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A3A9] transition-all ${
                    isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-105 active:scale-95"
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
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>

            {/* <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#003B46]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#070F12] text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-[#003B46] rounded-md shadow-sm bg-[#070F12] text-sm font-medium text-gray-300 hover:bg-[#003B46]/20 transition-colors"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-[#003B46] rounded-md shadow-sm bg-[#070F12] text-sm font-medium text-gray-300 hover:bg-[#003B46]/20 transition-colors"
                >
                  <span className="sr-only">Sign in with Twitter</span>
                  <Twitter className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-[#003B46] rounded-md shadow-sm bg-[#070F12] text-sm font-medium text-gray-300 hover:bg-[#003B46]/20 transition-colors"
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <Github className="h-5 w-5" />
                </button>
              </div>
            </div> */}

            <p className="mt-8 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-[#00A3A9] hover:text-[#008C8B] transition-colors">
                Sign up
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
              <h2 className="text-3xl font-bold text-white mb-6">Prepare for your next interview with confidence</h2>
              <p className="text-lg text-white/80 mb-8">
                Get expert answers to your interview questions instantly with our AI-powered platform.
              </p>
              <div className="flex justify-center">
                <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/HomeImage.png"
                    alt="Career Catalyst App"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-white font-medium hover:text-[#00A3A9] transition-colors"
                >
                  Learn more about our features
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
};