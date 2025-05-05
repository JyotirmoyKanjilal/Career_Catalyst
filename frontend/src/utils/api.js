const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Example: Get all questions
export async function fetchQuestions() {
  const res = await fetch(`${API_URL}/api/questions/getall`);
  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
}

// Example: Submit a contribution
export async function submitContribution(contribution) {
  const res = await fetch(`${API_URL}/api/contributions/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contribution),
  });
  if (!res.ok) throw new Error("Failed to submit contribution");
  return res.json();
}

// Get all contributions
export async function fetchContributions() {
  const res = await fetch(`${API_URL}/api/contributions/getall`);
  if (!res.ok) throw new Error("Failed to fetch contributions");
  return res.json();
}