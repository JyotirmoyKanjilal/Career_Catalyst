import { Briefcase, MessageSquare, Award, Bookmark, Search } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#070F12] text-gray-100">
      {/* Header (Static) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-transparent bg-[#070F12]/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-7 w-7 sm:h-8 sm:w-8 text-[#00A3A9]" />
                <span className="text-lg sm:text-xl font-bold tracking-tight">Career Catalyst</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="h-4 w-16 bg-[#003B46]/50 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-[#003B46]/50 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-[#003B46]/50 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-[#003B46]/50 rounded animate-pulse"></div>
            </div>
            <div className="md:hidden">
              <div className="h-6 w-6 bg-[#003B46]/50 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#003B46]/20 text-[#00A3A9] mb-4">
            <div className="h-4 w-4 bg-[#003B46]/50 rounded-full mr-2 animate-pulse"></div>
            <div className="h-4 w-32 bg-[#003B46]/50 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-64 bg-[#003B46]/50 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 w-full max-w-3xl bg-[#003B46]/30 rounded mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 w-5/6 max-w-2xl bg-[#003B46]/30 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Main Tabs */}
        <div className="mb-8">
          <div className="border-b border-[#003B46]/50">
            <div className="flex space-x-8 overflow-x-auto">
              <div className="py-4 px-1 relative">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-[#00A3A9]" />
                  <div className="h-5 w-24 bg-[#003B46]/50 rounded animate-pulse"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A3A9]"></div>
              </div>
              <div className="py-4 px-1 relative">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-gray-400" />
                  <div className="h-5 w-24 bg-[#003B46]/30 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="py-4 px-1 relative">
                <div className="flex items-center space-x-2">
                  <Bookmark className="h-5 w-5 text-gray-400" />
                  <div className="h-5 w-24 bg-[#003B46]/30 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-10 w-full bg-[#003B46]/30 rounded animate-pulse"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-10 w-24 bg-[#003B46]/30 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-[#003B46]/30 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-[#00A3A9]/30 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Query List Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
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
      </main>

      {/* Footer */}
      <footer className="bg-[#070F12] border-t border-[#003B46]/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-4 w-24 bg-[#003B46]/30 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-[#003B46]/30 rounded animate-pulse"></div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="h-4 w-48 bg-[#003B46]/30 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
