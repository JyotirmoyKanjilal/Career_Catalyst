const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    const expertToken = localStorage.getItem('expert-token');
    if (expertToken) {
      config.headers['x-expert-token'] = expertToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example: Get all questions
export async function fetchQuestions() {
  try {
    const response = await api.get('/questions/getall');
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch questions");
  }
}

// Fetch questions with metadata for expert feedback
export async function fetchQuestionsWithMetadata() {
  try {
    const response = await api.get('/questions/getall');
    return response.data.map(question => ({
      id: question._id,
      title: question.question,
      content: question.question,
      category: question.category,
      tags: question.tags,
      student: {
        name: "Anonymous", // Could be enhanced with real user data
        avatar: "/placeholder.svg?height=100&width=100"
      },
      date: new Date(question.createdAt).toLocaleDateString(),
      status: question.answers > 0 ? "answered" : "pending",
      upvotes: 0,
      views: question.views,
      bookmarked: question.saved,
      responses: []
    }));
  } catch (error) {
    throw new Error(error.message || "Failed to fetch questions with metadata");
  }
}

// Example: Submit a contribution
export async function submitContribution(contribution) {
  console.log(contribution);
  
  try {
    const response = await api.post('/api/contributions/add', contribution, {
      headers: {
        'x-auth-token': localStorage.getItem('user'), // Include token in headers
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to submit contribution");
  }
}

// Get all contributions
export async function fetchContributions() {
  try {
    const response = await api.get('/api/contributions/getall');
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch contributions");
  }
}

// Login user
export async function loginUser(credentials) {
  try {
    const response = await api.post('/user/authenticate', credentials);
    // Store token in localStorage
    if (response.data && response.data.token) {
      localStorage.setItem('user', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to login user");
  }
}

// Logout user
export function logoutUser() {
  localStorage.removeItem('user');
}


// DISCUSSION API CALLS
// get all discussions
export async function fetchDiscussions() {
  try {
    const response = await api.get('/api/discussion/getall');
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch discussions");
  }
}

// create a new discussion
export async function createDiscussion(discussion) {
  try {
    const response = await api.post('/api/discussion/create', discussion);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to create discussion");
  }
}

// get a specific discussion by ID
export async function fetchDiscussionById(id) {
  try {
    const response = await api.get(`/api/discussion/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch discussion by ID");
  }
}

// post an answer to a discussion
export async function postAnswerToDiscussion(id, answer) {
  try {
    const response = await api.post(`/api/discussion/${id}/answer`, answer);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to post answer to discussion");
  }
}

// Signup user
export async function signupUser(userData) {
  try {
    const response = await api.post('/api/signup/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
}

// Create a discussion from a contribution
export async function createDiscussionFromContribution({contribution, title, description, tags}) {
  console.log(contribution);
  
  try {
    const response = await api.post('/api/discussion/create', {
      contribution,
      title,
      description,
      tags,
      // Add other fields as needed (e.g., createdBy, description, tags)
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create discussion");
  }
}

// Add this new function to fetch discussions by contribution ID
export async function fetchDiscussionsByContribution(contributionId) {
  try {
    const response = await api.get(`/api/discussion/bycontribution/${contributionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch discussions");
  }
}

export async function submitContactForm(data) {
  const res = await fetch(`${API_URL}/api/contact/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit contact form");
  return res.json();
}

// Fetch all expert feedbacks
export async function fetchExpertFeedbacks() {
  try {
    const response = await api.get('/api/getall');
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch expert feedbacks");
  }
}

// Add new expert feedback
export async function addExpertFeedback(feedback) {
  try {
    const response = await api.post('/api/feedback/add', feedback);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to submit feedback");
  }
}

// Fetch feedbacks for a specific query
export async function fetchFeedbacksByQuery(queryId) {
  try {
    const response = await api.get(`/api/feedback/getbyquery/${queryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch feedbacks for query");
  }
}

export async function fetchResponsesByQuery(queryId) {
  const res = await fetch(`/api/queries/${queryId}/responses`);
  return res.json();
}

export async function addExpertResponse({ queryId, expertId, content }) {
  const response = await fetch(`/api/queries/${queryId}/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ expertId, content }),
  });
  if (!response.ok) {
    throw new Error("Failed to add response");
  }
  return response.json();
}
