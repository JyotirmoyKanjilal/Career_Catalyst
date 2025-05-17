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
  const res = await axios.get(`${API_URL}/api/discussion/getall`);
  return res.data;
}

// Get user growth
export async function getUserGrowth() {
  try {
    const res = await axios.get(`${API_URL}/user/growth`);
    return res.data.userGrowth || [0, 0, 0, 0, 0, 0, 0];
  } catch (error) {
    console.error('Error fetching user growth:', error);
    return [0, 0, 0, 0, 0, 0, 0]; // Default values on error
  }
}

// Update user status
export async function updateUserStatus(userId, newStatus) {
  try {
    const res = await axios.put(`${API_URL}/user/status`, {
      userId,
      newStatus
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Error updating user status:', error);
    return { 
      success: false,
      message: error.response?.data?.error || 'Failed to update user status'
    };
  }
}

// Update contribution status
export async function updateContributionStatus(contributionId, newStatus) {
  try {
    const res = await axios.put(`${API_URL}/api/contributions/status`, {
      contributionId,
      newStatus
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Error updating contribution status:', error);
    return { 
      success: false,
      message: error.response?.data?.error || 'Failed to update contribution status'
    };
  }
}

// Get all reports
export async function getReports() {
  try {
    const res = await axios.get(`${API_URL}/api/reports/getall`);
    return res.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
}

// Get contributions by category
export async function getContributionsByCategory() {
  try {
    const res = await axios.get(`${API_URL}/api/contributions/by-category`);
    return res.data;
  } catch (error) {
    console.error('Error fetching contribution categories:', error);
    // Return default data on error
    return [
      { category: "Behavioral", count: 0 },
      { category: "Technical", count: 0 },
      { category: "Situational", count: 0 },
      { category: "Other", count: 0 },
    ];
  }
}

// Inside fetchData function in page.jsx
const fetchData = async () => {
  setIsLoading(true)
  try {
    const [usersData, contributionsData, feedbackData, discussionsData, userGrowthData, reportsData, categoryData] = 
      await Promise.all([
        getUsers(),
        getContributions(),
        getFeedback(),
        getDiscussions(),
        getUserGrowth(),
        getReports(),
        getContributionsByCategory()
      ]);
    
    setUsers(usersData)
    setContributions(contributionsData)
    setFeedback(feedbackData)
    setDiscussions(discussionsData)
    setReports(reportsData)
    
    // Update stats with real user growth and category data
    setStats(prevStats => ({
      ...prevStats,
      userGrowth: userGrowthData,
      contributionsByCategory: categoryData
    }));
  } catch (error) {
    console.error("Error fetching data:", error)
    setErrorMessage("Failed to load dashboard data")
  } finally {
    setIsLoading(false)
  }
}

