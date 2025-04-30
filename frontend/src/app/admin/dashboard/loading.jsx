export default function Loading() {
    return (
      <div className="min-h-screen bg-[#070F12] text-white p-4">
        <div className="flex flex-col space-y-4 max-w-7xl mx-auto">
          <div className="h-16 bg-[#003B46]/50 rounded-lg animate-pulse"></div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-[#003B46]/50 rounded-lg animate-pulse"></div>
            ))}
          </div>
  
          <div className="h-64 bg-[#003B46]/50 rounded-lg animate-pulse"></div>
          <div className="h-96 bg-[#003B46]/50 rounded-lg animate-pulse"></div>
        </div>
      </div>
    )
  }
  