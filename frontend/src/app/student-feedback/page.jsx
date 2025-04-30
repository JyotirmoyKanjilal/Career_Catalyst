import FeedbackModule from "@/components/feedback-module"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070F12] text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#00A3A9]">Expert Feedback Platform</h1>
        <p className="text-center mb-12 text-[#00A3A9]/80 max-w-2xl mx-auto">
          A platform for seniors and teachers to provide valuable feedback on student answers
        </p>
        <FeedbackModule />
      </div>
    </main>
  )
}