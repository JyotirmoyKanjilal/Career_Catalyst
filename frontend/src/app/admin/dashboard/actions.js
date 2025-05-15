import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get all users
export async function getUsers() {
  const res = await axios.get(`${API_URL}/user/getall`);
  console.log(res.data);
  return res.data;
}

// Get all contributions
export async function getContributions() {
  const res = await axios.get(`${API_URL}/api/contributions/getall`);
  return res.data;
}

// Get all Questions
// export async function getQuestions() {
//   const res = await axios.get(`${API_URL}/api/questions/getall`);
//   return res.data;
// }

// Get Feedback
export async function getFeedback() {
  const res = await axios.get(`${API_URL}/api/feedback/getall`);
  return res.data;
}

// Update AI answers
export async function getAIanswers() {
  const res = await axios.put(`${API_URL}/api/ai-answer/getall`);
  return res.data;
}

// Update contribution status
export async function getDiscussions() {
  const res = await axios.put(`${API_URL}/api/discussions/getall`);
  return res.data;
}

