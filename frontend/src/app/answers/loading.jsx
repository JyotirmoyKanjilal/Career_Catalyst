export default function Loading() {
    return (
      <div className="min-h-screen bg-[#070F12] text-gray-100 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section Skeleton */}
          <div className="relative mb-12 rounded-xl bg-gradient-to-r from-[#003B46] to-[#006770] p-6 sm:p-8 md:p-10">
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded-full w-32 mb-4"></div>
              <div className="h-8 bg-white/20 rounded-lg w-3/4 mb-4"></div>
              <div className="h-6 bg-white/20 rounded-lg w-1/2 mb-6"></div>
              <div className="h-12 bg-white/20 rounded-full w-full max-w-2xl"></div>
            </div>
          </div>
  
          {/* Filters Skeleton */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="h-8 bg-[#003B46]/20 rounded-lg w-48 animate-pulse"></div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="h-10 bg-[#003B46]/20 rounded-md w-24 animate-pulse"></div>
                <div className="h-10 bg-[#003B46]/20 rounded-md w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
  
          {/* Answers List Skeleton */}
          <div className="space-y-6 mb-12">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-[#003B46]/10 rounded-xl p-6 animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-6 bg-[#003B46]/30 rounded w-3/4"></div>
                  <div className="h-6 bg-[#003B46]/30 rounded-full w-20"></div>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-4 bg-[#003B46]/30 rounded w-24"></div>
                  <div className="h-4 bg-[#003B46]/30 rounded w-24"></div>
                  <div className="h-4 bg-[#003B46]/30 rounded w-24"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-[#003B46]/30 rounded w-full"></div>
                  <div className="h-4 bg-[#003B46]/30 rounded w-full"></div>
                  <div className="h-4 bg-[#003B46]/30 rounded w-2/3"></div>
                </div>
                <div className="h-8 bg-[#003B46]/30 rounded w-32 mt-4"></div>
                <div className="mt-4 pt-4 border-t border-[#003B46]/20">
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-[#003B46]/30 rounded-md w-16"></div>
                    <div className="h-6 bg-[#003B46]/30 rounded-md w-20"></div>
                    <div className="h-6 bg-[#003B46]/30 rounded-md w-24"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <div className="h-8 bg-[#003B46]/30 rounded w-20"></div>
                      <div className="h-8 bg-[#003B46]/30 rounded w-24"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-[#003B46]/30 rounded-full w-8"></div>
                      <div className="h-8 bg-[#003B46]/30 rounded-full w-8"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Pagination Skeleton */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-1">
              <div className="h-10 w-10 bg-[#003B46]/20 rounded-md animate-pulse"></div>
              <div className="h-10 w-10 bg-[#003B46]/20 rounded-md animate-pulse"></div>
              <div className="h-10 w-10 bg-[#00A3A9] rounded-md animate-pulse"></div>
              <div className="h-10 w-10 bg-[#003B46]/20 rounded-md animate-pulse"></div>
              <div className="h-10 w-10 bg-[#003B46]/20 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  