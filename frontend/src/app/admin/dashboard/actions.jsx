"use server"

// Mock data for users
const usersData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    status: "Active",
    role: "Software Engineer",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    status: "Active",
    role: "Data Scientist",
    createdAt: "2023-02-20",
  },
  {
    id: 3,
    name: "Marcus Chen",
    email: "marcus.chen@example.com",
    status: "Pending",
    role: "Product Manager",
    createdAt: "2023-03-10",
  },
  {
    id: 4,
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@example.com",
    status: "Banned",
    role: "UX Designer",
    createdAt: "2023-04-01",
  },
]

// Mock data for contributions
const contributionsData = [
  {
    id: 1,
    question: "Tell me about yourself",
    answer: "I am a highly motivated...",
    status: "Approved",
    user: "Alex Johnson",
    timestamp: "2023-08-15",
  },
  {
    id: 2,
    question: "What is your greatest weakness?",
    answer: "I sometimes struggle with...",
    status: "Pending",
    user: "Priya Sharma",
    timestamp: "2023-08-20",
  },
  {
    id: 3,
    question: "Explain the concept of RESTful APIs",
    answer: "RESTful APIs are an architectural style...",
    status: "Approved",
    user: "Marcus Chen",
    timestamp: "2023-09-05",
  },
]

// Mock data for reports
const reportsData = [
  {
    id: 1,
    reportedUser: "Sophia Rodriguez",
    reason: "Inappropriate content",
    status: "Pending",
    reportedContent: "Offensive language",
  },
  {
    id: 2,
    reportedUser: "Marcus Chen",
    reason: "Spam",
    status: "Resolved",
    reportedContent: "Promotional links",
  },
]

// Mock data for stats
const statsData = {
  totalUsers: 100,
  activeUsers: 85,
  totalContributions: 250,
  pendingContributions: 20,
  totalQuestions: 150,
  totalReports: 10,
  userGrowth: [5, 8, 12, 7, 15, 10, 18],
  contributionsByCategory: [
    { category: "Behavioral", count: 45 },
    { category: "Technical", count: 30 },
    { category: "Situational", count: 15 },
    { category: "Other", count: 10 },
  ],
}

// Get users
export async function getUsers() {
  // In a real app, this would fetch from a database
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
  return usersData
}

// Get contributions
export async function getContributions() {
  // In a real app, this would fetch from a database
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
  return contributionsData
}

// Get reports
export async function getReports() {
  // In a real app, this would fetch from a database
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
  return reportsData
}

// Get stats
export async function getStats() {
  // In a real app, this would fetch from a database
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
  return statsData
}

// Update user status
export async function updateUserStatus(userId, newStatus) {
  // In a real app, this would update the database
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

  // Validate input
  if (!userId || !newStatus) {
    return { success: false, message: "User ID and new status are required" }
  }

  // Return success response
  return { success: true, message: "User status updated successfully" }
}

// Update contribution status
export async function updateContributionStatus(contributionId, newStatus) {
  // In a real app, this would update the database
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

  // Validate input
  if (!contributionId || !newStatus) {
    return { success: false, message: "Contribution ID and new status are required" }
  }

  // Return success response
  return { success: true, message: "Contribution status updated successfully" }
}
