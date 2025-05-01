"use server"

// Mock data for discussions
const MOCK_DISCUSSIONS = [
  {
    id: 1,
    title: "How to answer 'Tell me about a time you failed' effectively?",
    category: "behavioral",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "student",
      joinDate: "2023-05-15",
    },
    createdAt: "2023-10-15T14:30:00Z",
    content:
      "I have an upcoming interview and I'm struggling with this question. Every time I try to answer, I either sound like I'm making excuses or revealing too many weaknesses. How do you strike the right balance?",
    tags: ["behavioral", "STAR-method", "failure"],
    upvotes: 24,
    views: 156,
    isBookmarked: false,
    isPinned: false,
    replies: [
      {
        id: 101,
        author: {
          name: "Dr. Sarah Williams",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "expert",
          title: "Career Coach, 10+ years experience",
        },
        createdAt: "2023-10-15T15:45:00Z",
        content:
          "Great question! The key to answering this effectively is using the STAR method (Situation, Task, Action, Result) but with an additional R for Reflection.\n\nFirst, choose a genuine failure but one that's not catastrophic or related to character flaws. Then:\n\n1. Briefly explain the situation and your task\n2. Detail the actions you took that led to failure\n3. Honestly describe the result\n4. Most importantly, reflect on what you learned and how you've applied that lesson since\n\nFor example: 'In my previous role, I was tasked with launching a new feature by a tight deadline. I underestimated the complexity and didn't ask for help early enough. This resulted in a two-week delay. From this experience, I learned to better estimate project scope and communicate challenges early. In my next project, I implemented weekly check-ins and completed it ahead of schedule.'",
        upvotes: 32,
        isVerified: true,
      },
      {
        id: 102,
        author: {
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "student",
        },
        createdAt: "2023-10-15T16:20:00Z",
        content:
          "I used Dr. Williams' approach in my last interview and it worked really well! The interviewer seemed impressed that I had clearly reflected on my mistake and implemented changes. Just make sure your example shows growth!",
        upvotes: 14,
        isVerified: false,
      },
    ],
  },
  {
    id: 2,
    title: "System design interview: How to approach designing a distributed cache?",
    category: "system-design",
    author: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "student",
      joinDate: "2022-11-03",
    },
    createdAt: "2023-10-12T09:15:00Z",
    content:
      "I have a system design interview coming up for a senior backend role. One of the practice questions I'm working on is designing a distributed cache system. I'm not sure where to start or what the key considerations should be. Any advice from people who've tackled similar questions?",
    tags: ["system-design", "distributed-systems", "caching"],
    upvotes: 31,
    views: 203,
    isBookmarked: true,
    isPinned: true,
    replies: [
      {
        id: 201,
        author: {
          name: "Raj Mehta",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "expert",
          title: "Senior System Architect at TechCorp",
        },
        createdAt: "2023-10-12T10:30:00Z",
        content:
          "When designing a distributed cache, I recommend this structured approach:\n\n1. **Requirements clarification**:\n   - Read/write ratio?\n   - Size of cached items?\n   - Throughput requirements?\n   - Latency requirements?\n   - Consistency vs. availability tradeoffs?\n\n2. **Key components**:\n   - Hash function for key distribution\n   - Partition/sharding strategy\n   - Replication for fault tolerance\n   - Eviction policy (LRU, LFU, etc.)\n   - Consistency protocol\n\n3. **Potential issues to address**:\n   - Cache invalidation\n   - Cache coherence\n   - Hot spots/thundering herd\n   - Node failures\n   - Network partitions\n\nStart with a simple design and iterate. Draw diagrams to illustrate data flow. Remember that interviewers care more about your thought process than a perfect solution.",
        upvotes: 42,
        isVerified: true,
      },
    ],
  },
  {
    id: 3,
    title: "Best approach to solve 'Two Sum' coding problem?",
    category: "coding",
    author: {
      name: "Jason Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "student",
      joinDate: "2023-01-22",
    },
    createdAt: "2023-10-10T18:45:00Z",
    content:
      "I keep seeing the 'Two Sum' problem in my interview prep. What's the most efficient way to solve it? And how would you explain your approach to an interviewer?",
    tags: ["algorithms", "arrays", "hash-maps"],
    upvotes: 19,
    views: 178,
    isBookmarked: false,
    isPinned: false,
    replies: [],
  },
  {
    id: 4,
    title: "How to explain a gap in employment during interviews?",
    category: "behavioral",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "student",
      joinDate: "2022-08-14",
    },
    createdAt: "2023-10-08T11:20:00Z",
    content:
      "I took a year off to care for a family member and now I'm returning to the job market. How do I address this gap without it negatively affecting my chances?",
    tags: ["career-gap", "behavioral", "honesty"],
    upvotes: 35,
    views: 245,
    isBookmarked: true,
    isPinned: false,
    replies: [],
  },
  {
    id: 5,
    title: "Preparing for frontend performance questions - what metrics matter most?",
    category: "technical",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "student",
      joinDate: "2023-03-07",
    },
    createdAt: "2023-10-05T14:10:00Z",
    content:
      "I'm interviewing for senior frontend roles and expect questions about performance optimization. Which metrics should I focus on understanding deeply? And what are some impressive optimizations I could mention?",
    tags: ["frontend", "performance", "web-vitals"],
    upvotes: 27,
    views: 189,
    isBookmarked: false,
    isPinned: false,
    replies: [],
  },
]

// In a real application, these functions would interact with a database
// For this demo, we'll use the mock data and simulate server actions

// Fetch all discussions
export async function fetchDiscussions() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return MOCK_DISCUSSIONS
}

// Create a new discussion
export async function createDiscussion(discussionData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newDiscussion = {
    id: Math.max(...MOCK_DISCUSSIONS.map((d) => d.id)) + 1,
    ...discussionData,
    author: {
      name: "Current User",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "student",
      joinDate: new Date().toISOString().split("T")[0],
    },
    createdAt: new Date().toISOString(),
    upvotes: 0,
    views: 0,
    isBookmarked: false,
    isPinned: false,
    replies: [],
  }

  // In a real app, we would save to database here
  MOCK_DISCUSSIONS.unshift(newDiscussion)

  return newDiscussion
}

// Add a reply to a discussion
export async function addReply(discussionId, content) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const discussion = MOCK_DISCUSSIONS.find((d) => d.id === discussionId)

  if (!discussion) {
    throw new Error("Discussion not found")
  }

  const newReply = {
    id: discussion.replies ? Math.max(0, ...discussion.replies.map((r) => r.id)) + 1 : 1,
    author: {
      name: "Current User",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "student",
    },
    createdAt: new Date().toISOString(),
    content,
    upvotes: 0,
    isVerified: false,
  }

  // In a real app, we would save to database here
  if (!discussion.replies) {
    discussion.replies = []
  }
  discussion.replies.push(newReply)

  return newReply
}

// Upvote a discussion
export async function upvoteDiscussion(discussionId) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const discussion = MOCK_DISCUSSIONS.find((d) => d.id === discussionId)

  if (!discussion) {
    throw new Error("Discussion not found")
  }

  // In a real app, we would check if the user has already upvoted
  discussion.upvotes = (discussion.upvotes || 0) + 1

  return discussion
}

// Upvote a reply
export async function upvoteReply(discussionId, replyId) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const discussion = MOCK_DISCUSSIONS.find((d) => d.id === discussionId)

  if (!discussion || !discussion.replies) {
    throw new Error("Discussion or replies not found")
  }

  const reply = discussion.replies.find((r) => r.id === replyId)

  if (!reply) {
    throw new Error("Reply not found")
  }

  // In a real app, we would check if the user has already upvoted
  reply.upvotes = (reply.upvotes || 0) + 1

  return reply
}

// Toggle bookmark status
export async function toggleBookmark(discussionId) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const discussion = MOCK_DISCUSSIONS.find((d) => d.id === discussionId)

  if (!discussion) {
    throw new Error("Discussion not found")
  }

  discussion.isBookmarked = !discussion.isBookmarked

  return discussion
}
