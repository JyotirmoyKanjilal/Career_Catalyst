'use client';

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  Edit,
  Trash,
  ChevronLeft,
  ChevronDown,
  Tag,
  Save,
  X,
  FileText,
  Star,
  Clock,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Folder,
  FolderPlus,
  Eye,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function QuestionManager() {
  // State for questions and UI
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Tell me about yourself",
      category: "Behavioral",
      difficulty: "Easy",
      tags: ["Common", "Introduction", "All Levels"],
      saved: true,
      views: 1245,
      answers: 32,
      rating: 4.8,
      createdAt: "2023-05-15",
    },
    {
      id: 2,
      question: "What is your greatest weakness?",
      category: "Behavioral",
      difficulty: "Medium",
      tags: ["Common", "Self-Assessment"],
      saved: false,
      views: 987,
      answers: 28,
      rating: 4.5,
      createdAt: "2023-06-02",
    },
    {
      id: 3,
      question: "Explain the concept of RESTful APIs",
      category: "Technical",
      difficulty: "Medium",
      tags: ["Web Development", "Backend", "API"],
      saved: true,
      views: 756,
      answers: 15,
      rating: 4.7,
      createdAt: "2023-06-10",
    },
    {
      id: 4,
      question: "How would you implement a binary search tree?",
      category: "Technical",
      difficulty: "Hard",
      tags: ["Data Structures", "Algorithms", "Computer Science"],
      saved: false,
      views: 543,
      answers: 12,
      rating: 4.9,
      createdAt: "2023-06-15",
    },
    {
      id: 5,
      question: "Describe a time when you had to deal with a difficult team member",
      category: "Behavioral",
      difficulty: "Medium",
      tags: ["Teamwork", "Conflict Resolution"],
      saved: true,
      views: 876,
      answers: 24,
      rating: 4.6,
      createdAt: "2023-06-20",
    },
    {
      id: 6,
      question: "What are closures in JavaScript?",
      category: "Technical",
      difficulty: "Medium",
      tags: ["JavaScript", "Frontend", "Programming Concepts"],
      saved: false,
      views: 654,
      answers: 18,
      rating: 4.7,
      createdAt: "2023-06-25",
    },
    {
      id: 7,
      question: "How do you handle stress and pressure?",
      category: "Behavioral",
      difficulty: "Easy",
      tags: ["Stress Management", "Self-Assessment"],
      saved: true, 
      views: 789,
      answers: 22,
      rating: 4.4,
      createdAt: "2023-07-01",
    },
    {
      id: 8,
      question: "Explain the difference between HTTP and HTTPS",
      category: "Technical",
      difficulty: "Easy",
      tags: ["Networking", "Web Development", "Security"],
      saved: false,
      views: 567,
      answers: 14,
      rating: 4.6,
      createdAt: "2023-07-05",
    },
  ])
  const [successMessage, setSuccessMessage] = useState(""); // Add this line
  const [errorMessage, setErrorMessage] = useState(""); // Assuming errorMessage is already defined
  const [isSubmitting, setIsSubmitting] = useState(false); // Assuming this is already defined

  // UI state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedTags, setSelectedTags] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [isEditingQuestion, setIsEditingQuestion] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [sortBy, setSortBy] = useState("newest")
  const [scrolled, setScrolled] = useState(false)
  const [isAddingCollection, setIsAddingCollection] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [collections, setCollections] = useState([
    { id: 1, name: "Favorites", count: 3 },
    { id: 2, name: "Technical Interview Prep", count: 5 },
    { id: 3, name: "Behavioral Questions", count: 4 },
  ])
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [showCollections, setShowCollections] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    category: "Behavioral",
    difficulty: "Medium",
    tags: [],
  });
  const [availableTags, setAvailableTags] = useState(["React", "JavaScript", "CSS", "HTML", "Node.js"]);
  const [newTag, setNewTag] = useState("");

  const filterRef = useRef(null);
  const collectionsRef = useRef(null);

  // Categories and difficulties
  const categories = ["All", "Behavioral", "Technical", "Situational", "Industry-Specific", "Role-Specific"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/questions/getall`);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setErrorMessage("Failed to fetch questions. Please try again later.");
    }
  };

  // Handle form submission for adding or editing a question
  const handleQuestionAddSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Validate form
    if (!newQuestion.question.trim()) {
      setErrorMessage("Question text is required");
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditingQuestion) {
        // Update existing question
        const response = await axios.put(`${API_URL}/questions/update/${isEditingQuestion}`, newQuestion);
        setQuestions(questions.map((q) => (q._id === isEditingQuestion ? response.data : q)));
        setSuccessMessage("Question updated successfully!");
      } else {
        // Add new question
        const response = await axios.post(`${API_URL}/questions/add`, newQuestion);
        setQuestions([...questions, response.data]);
        setSuccessMessage("Question added successfully!");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      setErrorMessage("Failed to submit question. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsAddingQuestion(false);
      setIsEditingQuestion(null);
      setNewQuestion({
        question: "",
        category: "Behavioral",
        difficulty: "Medium",
        tags: [],
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  // Fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Define sortedQuestions based on filters and sorting
  const filteredQuestions = questions.filter((question) => {
    const matchesCategory = selectedCategory === "All" || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || question.difficulty === selectedDifficulty;
    const matchesTags = selectedTags.every((tag) => question.tags.includes(tag));
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesTags && matchesSearch;
  });

  const sortedQuestions = filteredQuestions.sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "mostViewed") return b.views - a.views;
    if (sortBy === "mostAnswers") return b.answers - a.answers;
    if (sortBy === "highestRated") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#070F12] text-gray-100 overflow-hidden">
      {/* Animated background canvas */}
      <canvas
        id="question-canvas"
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0"
      ></canvas>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-500 ${
          scrolled
            ? "border-[#008C8B]/30 bg-[#070F12]/90 backdrop-blur supports-[backdrop-filter]:bg-[#070F12]/80 shadow-lg shadow-[#00A3A9]/10"
            : "border-transparent bg-[#070F12]/70 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <Briefcase className="h-7 w-7 sm:h-8 sm:w-8 text-[#00A3A9] group-hover:text-[#008C8B] transition-all duration-300 group-hover:rotate-12" />
                <span className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-[#00A3A9] transition-colors duration-300">
                  Career Catalyst
                </span>
              </Link>
            </div>

            {/* Back to Home Button */}
            <Link
              href="/"
              className="inline-flex items-center px-3 py-2 rounded-md bg-[#003B46]/80 text-white hover:bg-[#006770] transition-all duration-300 shadow-md hover:shadow-[#00A3A9]/20 text-sm"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative z-10">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Interview Question Manager</h1>
            <p className="mt-2 text-gray-400">
              Browse, create, and organize interview questions to prepare for your next interview
            </p>
          </div>

          {/* Success and Error Messages */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-md flex items-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-400">{successMessage}</p>
              </motion.div>
            )}
            {errorMessage && (
              <motion.div
                className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md flex items-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertTriangle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-400">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-2 border-[#003B46]/50 rounded-md bg-[#070F12]/80 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#00A3A9] focus:border-transparent transition-all"
                placeholder="Search questions..."
              />
            </div>

            <div className="flex gap-2">
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-[#003B46]/50 rounded-md hover:bg-[#003B46]/20 transition-colors"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>

                {/* Filters Dropdown */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-[#070F12] border border-[#003B46]/50 rounded-lg shadow-lg z-20 overflow-hidden"
                    >
                      <div className="p-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-sm focus:border-[#00A3A9] outline-none"
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                          <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-sm focus:border-[#00A3A9] outline-none"
                          >
                            {difficulties.map((difficulty) => (
                              <option key={difficulty} value={difficulty}>
                                {difficulty}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {selectedTags.map((tag) => (
                              <div
                                key={tag}
                                className="bg-[#003B46]/50 text-[#00A3A9] text-xs px-2 py-1 rounded-full flex items-center"
                              >
                                {tag}
                                <button
                                  onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                                  className="ml-1 text-gray-400 hover:text-white"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <select
                            value=""
                            onChange={(e) => {
                              if (e.target.value && !selectedTags.includes(e.target.value)) {
                                setSelectedTags([...selectedTags, e.target.value]);
                              }
                            }}
                            className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-sm focus:border-[#00A3A9] outline-none"
                          >
                            <option value="">Select a tag</option>
                            {availableTags
                              .filter((tag) => !selectedTags.includes(tag))
                              .map((tag) => (
                                <option key={tag} value={tag}>
                                  {tag}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => {
                              setSelectedCategory("All");
                              setSelectedDifficulty("All");
                              setSelectedTags([]);
                              setShowFilters(false);
                            }}
                            className="px-3 py-1 text-sm text-[#00A3A9] hover:text-[#008C8B] transition-colors"
                          >
                            Reset Filters
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative" ref={collectionsRef}>
                <button
                  onClick={() => setShowCollections(!showCollections)}
                  className="inline-flex items-center px-4 py-2 border border-[#003B46]/50 rounded-md hover:bg-[#003B46]/20 transition-colors"
                >
                  <Folder className="h-5 w-5 mr-2" />
                  Collections
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>

                {/* Collections Dropdown */}
                <AnimatePresence>
                  {showCollections && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-[#070F12] border border-[#003B46]/50 rounded-lg shadow-lg z-20 overflow-hidden"
                    >
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-300 mb-3">Your Collections</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          <button
                            onClick={() => {
                              setSelectedCollection(null);
                              setShowCollections(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                              !selectedCollection ? "bg-[#003B46]/50 text-white" : "hover:bg-[#003B46]/20 text-gray-300"
                            } transition-colors flex justify-between items-center`}
                          >
                            <span>All Questions</span>
                            <span className="text-xs bg-[#003B46]/50 px-2 py-0.5 rounded-full">{questions.length}</span>
                          </button>
                          {collections.map((collection) => (
                            <button
                              key={collection.id}
                              onClick={() => {
                                setSelectedCollection(collection);
                                setShowCollections(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                                selectedCollection?.id === collection.id
                                  ? "bg-[#003B46]/50 text-white"
                                  : "hover:bg-[#003B46]/20 text-gray-300"
                              } transition-colors flex justify-between items-center`}
                            >
                              <span>{collection.name}</span>
                              <span className="text-xs bg-[#003B46]/50 px-2 py-0.5 rounded-full">
                                {collection.count}
                              </span>
                            </button>
                          ))}
                        </div>

                        {isAddingCollection ? (
                          <div className="mt-3 p-3 border border-[#003B46]/30 rounded-md bg-[#003B46]/10">
                            <input
                              type="text"
                              value={newCollectionName}
                              onChange={(e) => setNewCollectionName(e.target.value)}
                              placeholder="Collection name"
                              className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-sm focus:border-[#00A3A9] outline-none mb-2"
                              autoFocus
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setIsAddingCollection(false)}
                                className="px-3 py-1 text-xs border border-[#003B46]/50 rounded hover:bg-[#003B46]/30 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={addCollection}
                                disabled={!newCollectionName.trim()}
                                className={`px-3 py-1 text-xs rounded ${
                                  newCollectionName.trim()
                                    ? "bg-[#006770] hover:bg-[#00A3A9] text-white"
                                    : "bg-[#003B46]/30 text-gray-500 cursor-not-allowed"
                                } transition-colors`}
                              >
                                Create
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setIsAddingCollection(true)}
                            className="mt-3 w-full flex items-center justify-center px-3 py-2 text-sm text-[#00A3A9] hover:text-[#008C8B] border border-dashed border-[#003B46]/50 rounded-md hover:border-[#00A3A9]/50 transition-colors"
                          >
                            <FolderPlus className="h-4 w-4 mr-2" />
                            New Collection
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#070F12] border border-[#003B46]/50 rounded-md px-3 py-2 text-sm focus:border-[#00A3A9] outline-none"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="mostViewed">Most Viewed</option>
                <option value="mostAnswers">Most Answers</option>
                <option value="highestRated">Highest Rated</option>
              </select>

              <button
                onClick={() => {
                  setIsAddingQuestion(true);
                  setIsEditingQuestion(null);
                  setNewQuestion({
                    question: "",
                    category: "Behavioral",
                    difficulty: "Medium",
                    tags: [],
                  });
                }}
                className="inline-flex items-center px-4 py-2 bg-[#006770] hover:bg-[#00A3A9] text-white rounded-md transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Question
              </button>
            </div>
          </div>

          {/* Selected Collection Header */}
          {selectedCollection && (
            <div className="mb-6 p-4 bg-[#003B46]/20 rounded-lg border border-[#003B46]/30">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Folder className="h-5 w-5 text-[#00A3A9] mr-2" />
                  <h2 className="text-lg font-medium">{selectedCollection.name}</h2>
                  <span className="ml-2 text-sm text-gray-400">
                    {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCollection(null)}
                  className="text-sm text-[#00A3A9] hover:text-[#008C8B] transition-colors"
                >
                  View All Questions
                </button>
              </div>
            </div>
          )}

          {/* Questions List */}
          {sortedQuestions.length > 0 ? (
            <motion.div className="space-y-4" initial="hidden" animate="visible" variants={containerVariants}>
              {sortedQuestions.map((question) => (
                <motion.div
                  key={question._id}
                  variants={itemVariants}
                  className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-5 border border-[#003B46]/20 shadow-xl transition-all duration-300 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10 group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium group-hover:text-[#00A3A9] transition-colors">
                      {question.question}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleSaved(question.id)}
                        className={`p-1 rounded-full transition-colors ${
                          question.saved ? "text-[#00A3A9] hover:text-[#008C8B]" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {question.saved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => editQuestion(question.id)}
                        className="p-1 rounded-full text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(question.id)}
                        className="p-1 rounded-full text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="bg-[#003B46]/30 text-xs px-2 py-1 rounded-full text-gray-300">
                      {question.category}
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        question.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : question.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {question.difficulty}
                    </div>
                    {question.tags.map((tag) => (
                      <div
                        key={tag}
                        className="bg-[#003B46]/20 text-xs px-2 py-1 rounded-full text-[#00A3A9] flex items-center"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {question.views} views
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {question.answers} answers
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {question.rating} rating
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Added on {question.createdAt}
                    </div>
                  </div>

                  {/* Delete Confirmation */}
                  <AnimatePresence>
                    {showDeleteConfirm === question.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-md"
                      >
                        <p className="text-sm text-red-400 mb-2">Are you sure you want to delete this question?</p>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="px-3 py-1 text-xs border border-[#003B46]/50 rounded hover:bg-[#003B46]/30 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => deleteQuestion(question.id)}
                            disabled={isSubmitting}
                            className="px-3 py-1 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors flex items-center"
                          >
                            {isSubmitting && showDeleteConfirm === question.id ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-3 w-3 text-red-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-[#070F12]/80 backdrop-blur-sm rounded-xl border border-[#003B46]/20">
              <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300">No questions found</h3>
              <p className="text-gray-400 mt-2">
                {searchTerm || selectedCategory !== "All" || selectedDifficulty !== "All" || selectedTags.length > 0
                  ? "Try adjusting your filters or search term"
                  : "Add your first question to get started"}
              </p>
              {(searchTerm ||
                selectedCategory !== "All" ||
                selectedDifficulty !== "All" ||
                selectedTags.length > 0) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                    setSelectedTags([]);
                    setSelectedCollection(null);
                  }}
                  className="mt-4 px-4 py-2 text-[#00A3A9] hover:text-[#008C8B] transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Add/Edit Question Modal */}
        <AnimatePresence>
          {isAddingQuestion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#070F12] border border-[#003B46]/50 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{isEditingQuestion ? "Edit Question" : "Add New Question"}</h2>
                    <button
                      onClick={() => {
                        setIsAddingQuestion(false);
                        setIsEditingQuestion(null);
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={handleQuestionAddSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-1">
                        Question Text
                      </label>
                      <textarea
                        id="question"
                        name="question"
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                        rows={3}
                        className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-3 text-gray-100 focus:border-[#00A3A9] outline-none"
                        placeholder="Enter your interview question here..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={newQuestion.category}
                          onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                          className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-gray-100 focus:border-[#00A3A9] outline-none"
                        >
                          {categories
                            .filter((c) => c !== "All")
                            .map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-1">
                          Difficulty
                        </label>
                        <select
                          id="difficulty"
                          name="difficulty"
                          value={newQuestion.difficulty}
                          onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                          className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-gray-100 focus:border-[#00A3A9] outline-none"
                        >
                          {difficulties
                            .filter((d) => d !== "All")
                            .map((difficulty) => (
                              <option key={difficulty} value={difficulty}>
                                {difficulty}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {newQuestion.tags.map((tag) => (
                          <div
                            key={tag}
                            className="bg-[#003B46]/50 text-[#00A3A9] text-xs px-2 py-1 rounded-full flex items-center"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 text-gray-400 hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          className="flex-1 bg-[#070F12] border border-[#003B46]/50 rounded-md p-2 text-gray-100 focus:border-[#00A3A9] outline-none"
                          placeholder="Add a tag..."
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newQuestion.tags.includes(newTag) || !newTag.trim()) return;
                            setNewQuestion({ ...newQuestion, tags: [...newQuestion.tags, newTag] });
                            setNewTag("");
                          }}
                          disabled={!newTag.trim()}
                          className={`px-3 py-2 rounded ${
                            newTag.trim()
                              ? "bg-[#006770] hover:bg-[#00A3A9] text-white"
                              : "bg-[#003B46]/30 text-gray-500 cursor-not-allowed"
                          } transition-colors`}
                        >
                          Add
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">Popular tags: {availableTags.slice(0, 5).join(", ")}</p>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingQuestion(false);
                          setIsEditingQuestion(null);
                        }}
                        className="px-4 py-2 border border-[#003B46]/50 rounded-md hover:bg-[#003B46]/20 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !newQuestion.question.trim()}
                        className={`px-4 py-2 bg-[#006770] hover:bg-[#00A3A9] text-white rounded-md transition-colors flex items-center ${
                          isSubmitting || !newQuestion.question.trim() ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {isEditingQuestion ? "Updating..." : "Creating..."}
                          </>
                        ) : (
                          <>
                            <Save className="h-5 w-5 mr-2" />
                            {isEditingQuestion ? "Update Question" : "Save Question"}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#070F12] border-t border-[#003B46]/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="mx-2 text-gray-600">•</span>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Career Catalyst. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
