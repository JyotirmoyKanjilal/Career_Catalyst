import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#070F12] text-gray-100 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-[#00A3A9] animate-spin" />
        <h2 className="text-xl font-medium text-white">Loading discussions...</h2>
        <p className="text-gray-400">Please wait while we fetch the latest discussions</p>
      </div>
    </div>
  )
}
