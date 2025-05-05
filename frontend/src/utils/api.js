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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example: Get all questions
export async function fetchQuestions() {
  try {
    const response = await api.get('/api/questions/getall');
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch questions");
  }
}

// Example: Submit a contribution
export async function submitContribution(contribution) {
  console.log(contribution);
  
  try {
    const response = await api.post('/api/contributions/add', contribution);
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit contribution");
  }
}

// Get all contributions
export async function fetchContributions() {
  try {
    const response = await api.get('/api/contributions/getall');
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch contributions");
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
    throw new Error("Authentication failed");
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
    throw new Error("Failed to fetch discussions");
  }
}

// create a new discussion
export async function createDiscussion(discussion) {
  try {
    const response = await api.post('/api/discussion/create', discussion);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create discussion");
  }
}

// get a specific discussion by ID
export async function fetchDiscussionById(id) {
  try {
    const response = await api.get(`/api/discussion/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch discussion by ID");
  }
}

// post an answer to a discussion
export async function postAnswerToDiscussion(id, answer) {
  try {
    const response = await api.post(`/api/discussion/${id}/answer`, answer);
    return response.data;
  } catch (error) {
    throw new Error("Failed to post answer to discussion");
  }
}