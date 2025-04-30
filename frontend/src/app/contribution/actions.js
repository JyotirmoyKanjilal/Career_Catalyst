"use server"
"use client"

// Mock data for questions
const questionsData = [
  {
    id: 1,
    question: "Tell me about yourself",
    category: "Behavioral",
    difficulty: "Easy",
    tags: ["Common", "Introduction", "All Levels"],
    answers: 32,
  },
  {
    id: 2,
    question: "What is your greatest weakness?",
    category: "Behavioral",
    difficulty: "Medium",
    tags: ["Common", "Self-Assessment"],
    answers: 28,
  },
  {
    id: 3,
    question: "Explain the concept of RESTful APIs",
    category: "Technical",
    difficulty: "Medium",
    tags: ["Web Development", "Backend", "API"],
    answers: 15,
  },
  {
    id: 4,
    question: "How would you implement a binary search tree?",
    category: "Technical",
    difficulty: "Hard",
    tags: ["Data Structures", "Algorithms", "Computer Science"],
    answers: 12,
  },
  {
    id: 5,
    question: "Describe a time when you had to deal with a difficult team member",
    category: "Behavioral",
    difficulty: "Medium",
    tags: ["Teamwork", "Conflict Resolution"],
    answers: 24,
  },
  {
    id: 6,
    question: "What are closures in JavaScript?",
    category: "Technical",
    difficulty: "Medium",
    tags: ["JavaScript", "Frontend", "Programming Concepts"],
    answers: 18,
  },
  {
    id: 7,
    question: "How do you handle stress and pressure?",
    category: "Behavioral",
    difficulty: "Easy",
    tags: ["Stress Management", "Self-Assessment"],
    answers: 22,
  },
  {
    id: 8,
    question: "Explain the difference between HTTP and HTTPS",
    category: "Technical",
    difficulty: "Easy",
    tags: ["Networking", "Web Development", "Security"],
    answers: 14,
  },
]

// Mock data for contributions
const contributionsData = [
  {
    id: 1,
    questionId: 1,
    question: "Tell me about yourself",
    answer:
      "When answering this question, I structure my response using the Present-Past-Future format. I start with my current role and responsibilities, then briefly mention relevant past experiences that led me to where I am today. Finally, I express my interest in the role I'm interviewing for and how my skills align with it. For example: 'I'm currently a Senior Software Engineer at XYZ Company, where I lead a team developing cloud-based solutions. Before that, I spent three years at ABC Corp, where I helped build their core platform and improved deployment time by 40%. I'm now looking to bring my technical leadership and cloud expertise to a larger organization like yours.'",
    timestamp: "2023-08-15T14:30:00Z",
    status: "Approved",
    upvotes: 24,
    downvotes: 2,
    views: 156,
    user: "Current User",
  },
  {
    id: 2,
    questionId: 2,
    question: "What is your greatest weakness?",
    answer:
      "When addressing this question, I'm honest but strategic. I choose a genuine weakness that isn't critical to the job, demonstrate self-awareness, and focus on how I'm actively improving. For example: 'I've sometimes struggled with public speaking. While I excel in one-on-one conversations, I used to get nervous presenting to larger groups. To address this, I joined Toastmasters last year and have been volunteering to lead team presentations. These efforts have significantly improved my confidence, and my manager recently complimented me on how well I handled our department presentation last month.'",
    timestamp: "2023-08-20T09:15:00Z",
    status: "Pending",
    upvotes: 12,
    downvotes: 1,
    views: 87,
    user: "Current User",
  },
  {
    id: 3,
    questionId: 3,
    question: "Explain the concept of RESTful APIs",
    answer:
      "RESTful APIs (Representational State Transfer) are an architectural style for designing networked applications. They rely on stateless, client-server communication, typically over HTTP. Key principles include: 1) Resources are identified by URLs, 2) Operations are performed using standard HTTP methods (GET, POST, PUT, DELETE), 3) Stateless interactions where each request contains all information needed, 4) Uniform interface with consistent resource identifiers and self-descriptive messages. For example, a RESTful API for a blog might use GET /posts to retrieve all posts, POST /posts to create a new post, and DELETE /posts/123 to delete a specific post.",
    timestamp: "2023-09-05T11:45:00Z",
    status: "Approved",
    upvotes: 18,
    downvotes: 0,
    views: 112,
    user: "Current User",
  },
]

// Get questions
export async function getQuestions() {
  // In a real app, this would fetch from a database
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
  return questionsData
}

// Get contributions
export async function getContributions() {
  // In a real app, this would fetch from a database
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
  return contributionsData
}

// Submit contribution
export async function submitContribution({ questionId, answer, isEditing }) {
  // In a real app, this would save to a database
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

  // Validate input
  if (!questionId || !answer.trim()) {
    return { success: false, message: "Question ID and answer are required" }
  }

  // Return success response
  return {
    success: true,
    message: isEditing ? "Contribution updated successfully" : "Contribution submitted successfully",
  }
}
