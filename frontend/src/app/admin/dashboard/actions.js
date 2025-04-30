// Mock data and actions for the admin dashboard

// Get users
export async function getUsers() {
    // In a real app, this would fetch from a database
    return [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "User",
        status: "Active",
        joinedDate: "2023-05-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "Active",
        joinedDate: "2023-06-22",
      },
      {
        id: 3,
        name: "Robert Johnson",
        email: "robert@example.com",
        role: "Premium",
        status: "Active",
        joinedDate: "2023-04-10",
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        role: "User",
        status: "Pending",
        joinedDate: "2023-07-05",
      },
      {
        id: 5,
        name: "Michael Wilson",
        email: "michael@example.com",
        role: "User",
        status: "Banned",
        joinedDate: "2023-03-18",
      },
    ]
  }
  
  // Get contributions
  export async function getContributions() {
    // In a real app, this would fetch from a database
    return [
      {
        id: 1,
        question: "What is your greatest professional achievement?",
        answer:
          "My greatest professional achievement was leading a team that delivered a project ahead of schedule and under budget...",
        user: "John Doe",
        category: "Behavioral",
        status: "Approved",
        date: "2023-06-15",
      },
      {
        id: 2,
        question: "How do you handle conflict in the workplace?",
        answer: "When facing conflict, I first try to understand all perspectives by actively listening...",
        user: "Jane Smith",
        category: "Behavioral",
        status: "Pending",
        date: "2023-07-02",
      },
      {
        id: 3,
        question: "Explain the difference between HTTP and HTTPS",
        answer:
          "HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the web. HTTPS (HTTP Secure) is the secure version that uses SSL/TLS encryption...",
        user: "Robert Johnson",
        category: "Technical",
        status: "Approved",
        date: "2023-05-28",
      },
      {
        id: 4,
        question: "What would you do if a project was falling behind schedule?",
        answer: "If a project was falling behind schedule, I would first identify the root causes of the delay...",
        user: "Emily Davis",
        category: "Situational",
        status: "Rejected",
        date: "2023-07-10",
      },
      {
        id: 5,
        question: "Describe your experience with agile methodologies",
        answer:
          "I have 3 years of experience working in Scrum teams. I've participated in daily stand-ups, sprint planning...",
        user: "Michael Wilson",
        category: "Technical",
        status: "Pending",
        date: "2023-07-12",
      },
    ]
  }
  
  // Get reports
  export async function getReports() {
    // In a real app, this would fetch from a database
    return [
      {
        id: 1,
        reportedContent: "What is your greatest professional achievement?",
        reportedUser: "John Doe",
        reason: "Duplicate question",
        status: "Open",
        date: "2023-07-10",
      },
      {
        id: 2,
        reportedContent: "How to hack into a company's database?",
        reportedUser: "Anonymous",
        reason: "Inappropriate content",
        status: "Open",
        date: "2023-07-12",
      },
      {
        id: 3,
        reportedContent: "This answer contains plagiarized content...",
        reportedUser: "Robert Johnson",
        reason: "Plagiarism",
        status: "Resolved",
        date: "2023-07-05",
      },
      {
        id: 4,
        reportedContent: "The information in this answer is incorrect...",
        reportedUser: "Emily Davis",
        reason: "Misinformation",
        status: "Dismissed",
        date: "2023-06-28",
      },
    ]
  }
  
  // Get stats
  export async function getStats() {
    // In a real app, this would calculate from database
    return {
      totalUsers: 1254,
      activeUsers: 876,
      totalContributions: 532,
      pendingContributions: 48,
      totalQuestions: 1876,
      totalReports: 23,
      userGrowth: [42, 56, 78, 65, 89, 75, 92],
      contributionsByCategory: [
        { category: "Behavioral", count: 245 },
        { category: "Technical", count: 187 },
        { category: "Situational", count: 76 },
        { category: "Other", count: 24 },
      ],
    }
  }
  
  // Update user status
  export async function updateUserStatus(userId, newStatus) {
    // In a real app, this would update the database
    console.log(`Updating user ${userId} status to ${newStatus}`)
  
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 500)
    })
  }
  
  // Update contribution status
  export async function updateContributionStatus(contributionId, newStatus) {
    // In a real app, this would update the database
    console.log(`Updating contribution ${contributionId} status to ${newStatus}`)
  
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 500)
    })
  }
  