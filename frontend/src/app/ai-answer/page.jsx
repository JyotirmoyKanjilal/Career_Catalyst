"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Settings,
  History,
  Send,
  Copy,
  Save,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  ChevronDown,
  X,
  Sliders,
  Clock,
  CheckCircle,
  Sparkles,
  Lightbulb,
  RefreshCw,
  BookmarkCheck,
  MessageSquare,
  Zap,
} from "lucide-react";
import { generateAnswer } from "./actions";
import axios from "axios";

export default function AIAnswer() {
 
  // State for user input and AI responses
  const [question, setQuestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [answerHistory, setAnswerHistory] = useState([
    {
      id: 1,
      question: "What is the STAR method for answering behavioral questions?",
      answer:
        "The STAR method is a structured approach to answering behavioral interview questions. STAR stands for:\n\n**Situation**: Describe the context or background of a specific situation you were in.\n\n**Task**: Explain the task or challenge you were responsible for in that situation.\n\n**Action**: Detail the specific actions you took to address the task or challenge.\n\n**Result**: Share the outcomes of your actions, preferably with quantifiable results.\n\nThis method helps you provide comprehensive, structured responses that clearly demonstrate your skills and experiences. Instead of speaking in generalities, the STAR method encourages you to tell a specific story that highlights your capabilities.\n\nFor example, if asked about a time you showed leadership, you would:\n1. Describe the situation where leadership was needed\n2. Explain what your responsibility was\n3. Detail the leadership actions you took\n4. Share the positive results that came from your leadership\n\nUsing this method ensures you provide concrete examples rather than vague claims about your abilities.",
      timestamp: "2023-07-15T14:30:00Z",
      saved: true,
    },
    {
      id: 2,
      question: "How should I answer 'What is your greatest weakness?'",
      answer:
        "When answering \"What is your greatest weakness?\" in an interview, follow these guidelines:\n\n1. **Be honest but strategic**: Choose a genuine weakness, but not one that's critical to the role.\n\n2. **Show self-awareness**: Demonstrate that you understand your areas for improvement.\n\n3. **Focus on growth**: Emphasize how you're actively working to improve this weakness.\n\n4. **Provide an example**: Share specific steps you've taken to address it.\n\n5. **End positively**: Mention progress you've already made.\n\nExample answer:\n\"I've sometimes struggled with public speaking. While I'm excellent in one-on-one conversations and small groups, I used to get nervous presenting to larger audiences. To address this, I joined Toastmasters last year and have been volunteering to lead team presentations. I've also taken an online course on presentation skills. These efforts have significantly improved my confidence, and my manager recently complimented me on how well I handled our department presentation last month.\"\n\nAvoid:\n- Cliché answers like \"I'm a perfectionist\" or \"I work too hard\"\n- Weaknesses critical to job performance\n- Personal issues unrelated to work\n- Claiming you have no weaknesses\n- Oversharing or being too negative",
      timestamp: "2023-07-20T09:15:00Z",
      saved: false,
    },
  ]);
  const [scrolled, setScrolled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    answerLength: "medium",
    tone: "professional",
    includeExamples: true,
    formatWithMarkdown: true,
  });
  const [showHistory, setShowHistory] = useState(false);
  const [copiedAnswer, setCopiedAnswer] = useState(false);
  const [savedAnswer, setSavedAnswer] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  const [suggestions, setSuggestions] = useState([
    "Tell me about yourself",
    "What are your greatest strengths?",
    "Why do you want to work here?",
    "Where do you see yourself in 5 years?",
    "Describe a challenging situation at work and how you handled it",
  ]);
  const [typingEffect, setTypingEffect] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [fullAnswer, setFullAnswer] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const settingsRef = useRef(null);
  const historyRef = useRef(null);
  const answerContainerRef = useRef(null);

  // Handle scroll events for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Particle animation for background
  useEffect(() => {
    const canvas = document.getElementById("ai-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 30;
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;

        // Use teal color palette for particles
        const tealShades = [
          `rgba(0, 59, 70, ${Math.random() * 0.3 + 0.1})`,
          `rgba(0, 103, 112, ${Math.random() * 0.3 + 0.1})`,
          `rgba(0, 140, 139, ${Math.random() * 0.3 + 0.1})`,
          `rgba(0, 163, 169, ${Math.random() * 0.3 + 0.1})`,
        ];
        this.color = tealShades[Math.floor(Math.random() * tealShades.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0; // Clear existing particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize particles on resize
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        init();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll to answer when generated
  useEffect(() => {
    if (currentAnswer && answerContainerRef.current) {
      answerContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentAnswer]);

  // Typing effect for answer
  useEffect(() => {
    if (!fullAnswer || typingIndex >= fullAnswer.length) return;

    const timer = setTimeout(() => {
      setTypingEffect(fullAnswer.substring(0, typingIndex + 10));
      setTypingIndex(typingIndex + 10);
    }, 1); // Adjust speed as needed

    return () => clearTimeout(timer);
  }, [fullAnswer, typingIndex]);

  // Generate AI answer
  const handleGenerateAnswer = async () => {
    if (!question.trim()) return;

    setIsGenerating(true);
    setCurrentAnswer(null);
    setCopiedAnswer(false);
    setSavedAnswer(false);
    setFeedbackGiven(null);
    setTypingEffect("");
    setTypingIndex(0);

    try {
      // Call the Gemini API endpoint
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/gemini/generate`, 
        {
          prompt: question // Send the question as the prompt
        });
        
      // Create a new answer object with the generated response
      const newAnswer = {
        id: Date.now(),
        question: question,
        answer: response.data, // The response from Gemini API
        timestamp: new Date().toISOString(),
        saved: false,
      };
      setCurrentAnswer(newAnswer);

      // Call the server action to generate the answer
      const generatedAnswer = await generateAnswer(question, settings);

      // Set the full answer for typing effect
      setFullAnswer(response.data);

      // Update the current answer with the generated text
      newAnswer.answer = generatedAnswer;
      setCurrentAnswer({ ...newAnswer });

      // Add to history
      setAnswerHistory([newAnswer, ...answerHistory]);
    } catch (error) {
      console.error("Error generating answer:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy answer to clipboard
  const copyToClipboard = () => {
    if (!currentAnswer) return;

    navigator.clipboard.writeText(currentAnswer.answer);
    setCopiedAnswer(true);

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedAnswer(false);
    }, 2000);
  };

  // Save answer
  const saveAnswer = () => {
    if (!currentAnswer) return;

    // Update current answer
    const updatedAnswer = { ...currentAnswer, saved: !currentAnswer.saved };
    setCurrentAnswer(updatedAnswer);

    // Update in history
    setAnswerHistory(
      answerHistory.map((answer) =>
        answer.id === currentAnswer.id ? updatedAnswer : answer
      )
    );

    setSavedAnswer(true);

    // Reset saved state after 2 seconds
    setTimeout(() => {
      setSavedAnswer(false);
    }, 2000);
  };

  // Provide feedback
  const provideFeedback = (isPositive) => {
    setFeedbackGiven(isPositive);

    // In a real app, you would send this feedback to the server
    // For now, we'll just show a UI indication
  };

  // Use a suggestion
  const useSuggestion = (suggestion) => {
    setQuestion(suggestion);
    setSelectedSuggestion(suggestion);
  };

  // Load answer from history
  const loadFromHistory = (answer) => {
    setCurrentAnswer(answer);
    setQuestion(answer.question);
    setShowHistory(false);
    setTypingEffect(answer.answer);
    setFullAnswer("");
  };

  // Update settings
  const updateSettings = (key, value) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  // Format answer with markdown
  const formatAnswer = (text) => {
    if (!text) return "";

    // Convert markdown to HTML
    const formattedText = text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Headers
      .replace(
        /^### (.*?)$/gm,
        '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>'
      )
      .replace(
        /^## (.*?)$/gm,
        '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>'
      )
      .replace(
        /^# (.*?)$/gm,
        '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>'
      )
      // Lists
      .replace(/^\d+\. (.*?)$/gm, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/^- (.*?)$/gm, '<li class="ml-4 list-disc">$1</li>')
      // Line breaks
      .replace(/\n\n/g, "<br/><br/>");

    return formattedText;
  };

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-[#070F12] text-gray-100 overflow-hidden">
      {/* Animated background canvas */}
      <canvas
        id="ai-canvas"
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
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              AI Interview Answer Generator
            </h1>
            <p className="mt-2 text-gray-400 max-w-2xl mx-auto">
              Get expert answers to your interview questions instantly with our
              AI-powered assistant
            </p>
          </motion.div>

          {/* Question Input */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <textarea
                id="questionInput"
                // onChange={Formik.handleChange}
                // onBlur={Formik.handleBlur}
                // value={Formik.values.questionInput}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter an interview question..."
                className="w-full h-24 p-4 pr-12 bg-[#070F12]/80 backdrop-blur-sm rounded-xl border border-[#003B46]/50 focus:border-[#00A3A9] focus:ring-1 focus:ring-[#00A3A9] outline-none transition-all resize-none"
              />
              <button
                id="generateButton"
                onClick={handleGenerateAnswer}
                disabled={isGenerating || !question.trim()}
                className={`absolute bottom-3 right-3 p-2 rounded-full ${
                  isGenerating || !question.trim()
                    ? "bg-[#003B46]/50 text-gray-500 cursor-not-allowed"
                    : "bg-[#00A3A9] text-white hover:bg-[#008C8B] transition-colors"
                }`}
              >
                {isGenerating ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-between mt-3">
              <div className="flex space-x-2">
                {/* Settings Button */}
                <div className="relative" ref={settingsRef}>
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center px-3 py-1.5 text-sm bg-[#003B46]/50 hover:bg-[#003B46]/80 rounded-md transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-1.5" />
                    Settings
                    <ChevronDown className="h-3 w-3 ml-1.5" />
                  </button>

                  {/* Settings Dropdown */}
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-1 w-64 bg-[#070F12] border border-[#003B46]/50 rounded-lg shadow-lg z-20 overflow-hidden"
                      >
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-gray-300 mb-2">
                            Answer Settings
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">
                                Answer Length
                              </label>
                              <select
                                value={settings.answerLength}
                                onChange={(e) =>
                                  updateSettings("answerLength", e.target.value)
                                }
                                className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-1.5 text-xs focus:border-[#00A3A9] outline-none"
                              >
                                <option value="concise">Concise</option>
                                <option value="medium">Medium</option>
                                <option value="detailed">Detailed</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">
                                Tone
                              </label>
                              <select
                                value={settings.tone}
                                onChange={(e) =>
                                  updateSettings("tone", e.target.value)
                                }
                                className="w-full bg-[#070F12] border border-[#003B46]/50 rounded-md p-1.5 text-xs focus:border-[#00A3A9] outline-none"
                              >
                                <option value="professional">
                                  Professional
                                </option>
                                <option value="conversational">
                                  Conversational
                                </option>
                                <option value="enthusiastic">
                                  Enthusiastic
                                </option>
                                <option value="confident">Confident</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-xs text-gray-400">
                                Include Examples
                              </label>
                              <div className="relative inline-block w-10 h-5 transition duration-200 ease-in-out">
                                <input
                                  type="checkbox"
                                  id="toggle-examples"
                                  className="absolute w-5 h-5 opacity-0 z-10 cursor-pointer"
                                  checked={settings.includeExamples}
                                  onChange={(e) =>
                                    updateSettings(
                                      "includeExamples",
                                      e.target.checked
                                    )
                                  }
                                />
                                <label
                                  htmlFor="toggle-examples"
                                  className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-300 ${
                                    settings.includeExamples
                                      ? "bg-[#00A3A9]"
                                      : "bg-[#003B46]/50"
                                  }`}
                                >
                                  <span
                                    className={`block h-5 w-5 rounded-full bg-white transform transition-transform duration-300 ${
                                      settings.includeExamples
                                        ? "translate-x-5"
                                        : "translate-x-0"
                                    }`}
                                  ></span>
                                </label>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-xs text-gray-400">
                                Format with Markdown
                              </label>
                              <div className="relative inline-block w-10 h-5 transition duration-200 ease-in-out">
                                <input
                                  type="checkbox"
                                  id="toggle-markdown"
                                  className="absolute w-5 h-5 opacity-0 z-10 cursor-pointer"
                                  checked={settings.formatWithMarkdown}
                                  onChange={(e) =>
                                    updateSettings(
                                      "formatWithMarkdown",
                                      e.target.checked
                                    )
                                  }
                                />
                                <label
                                  htmlFor="toggle-markdown"
                                  className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-300 ${
                                    settings.formatWithMarkdown
                                      ? "bg-[#00A3A9]"
                                      : "bg-[#003B46]/50"
                                  }`}
                                >
                                  <span
                                    className={`block h-5 w-5 rounded-full bg-white transform transition-transform duration-300 ${
                                      settings.formatWithMarkdown
                                        ? "translate-x-5"
                                        : "translate-x-0"
                                    }`}
                                  ></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* History Button */}
                <div className="relative" ref={historyRef}>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center px-3 py-1.5 text-sm bg-[#003B46]/50 hover:bg-[#003B46]/80 rounded-md transition-colors"
                  >
                    <History className="h-4 w-4 mr-1.5" />
                    History
                    <ChevronDown className="h-3 w-3 ml-1.5" />
                  </button>

                  {/* History Dropdown */}
                  <AnimatePresence>
                    {showHistory && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-1 w-72 bg-[#070F12] border border-[#003B46]/50 rounded-lg shadow-lg z-20 overflow-hidden"
                      >
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-gray-300 mb-2">
                            Recent Questions
                          </h3>
                          <div className="max-h-60 overflow-y-auto">
                            {answerHistory.length > 0 ? (
                              <div className="space-y-2">
                                {answerHistory.map((answer) => (
                                  <button
                                    key={answer.id}
                                    onClick={() => loadFromHistory(answer)}
                                    className="w-full text-left p-2 hover:bg-[#003B46]/30 rounded-md transition-colors group flex items-start"
                                  >
                                    <Clock className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm text-gray-300 truncate group-hover:text-[#00A3A9] transition-colors">
                                        {answer.question}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {new Date(
                                          answer.timestamp
                                        ).toLocaleDateString()}
                                      </p>
                                    </div>
                                    {answer.saved && (
                                      <BookmarkCheck className="h-4 w-4 text-[#00A3A9] ml-auto flex-shrink-0" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 text-center py-4">
                                No history yet
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button
                onClick={() => {
                  setQuestion("");
                  setCurrentAnswer(null);
                  setSelectedSuggestion(null);
                }}
                className="flex items-center px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4 mr-1.5" />
                Clear
              </button>
            </div>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
              <Lightbulb className="h-4 w-4 mr-1.5 text-[#00A3A9]" />
              Try these common interview questions:
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => useSuggestion(suggestion)}
                  className={`px-3 py-1.5 text-sm bg-[#003B46]/50 hover:bg-[#003B46]/80 rounded-md transition-all hover:scale-105 ${
                    selectedSuggestion === suggestion
                      ? "ring-2 ring-[#00A3A9]"
                      : ""
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Answer Display */}
          {(isGenerating || currentAnswer) && (
            <motion.div
              ref={answerContainerRef}
              className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-6 border border-[#003B46]/20 shadow-xl transition-all duration-500 hover:border-[#00A3A9]/30 hover:shadow-[#00A3A9]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Question */}
              <div className="flex items-start mb-4">
                <div className="p-2 bg-[#003B46]/50 rounded-full mr-3">
                  <MessageSquare className="h-5 w-5 text-[#00A3A9]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {currentAnswer?.question || question}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {currentAnswer?.timestamp
                      ? new Date(currentAnswer.timestamp).toLocaleString()
                      : new Date().toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Answer */}
              <div className="ml-12 relative">
                {isGenerating ? (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Generating answer...</span>
                  </div>
                ) : (
                  <>
                    <div className="prose prose-invert max-w-none">
                      {fullAnswer ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: settings.formatWithMarkdown
                              ? formatAnswer(typingEffect)
                              : typingEffect.replace(/\n/g, "<br/>"),
                          }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: settings.formatWithMarkdown
                              ? formatAnswer(currentAnswer?.answer)
                              : currentAnswer?.answer.replace(/\n/g, "<br/>"),
                          }}
                        />
                      )}
                    </div>

                    {/* Answer Actions */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <motion.button
                        onClick={copyToClipboard}
                        className="flex items-center px-3 py-1.5 text-sm bg-[#003B46]/50 hover:bg-[#003B46]/80 rounded-md transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {copiedAnswer ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1.5 text-green-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1.5" />
                            Copy
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        onClick={saveAnswer}
                        className={`flex items-center px-3 py-1.5 text-sm ${
                          currentAnswer?.saved
                            ? "bg-[#00A3A9]/20 text-[#00A3A9] hover:bg-[#00A3A9]/30"
                            : "bg-[#003B46]/50 hover:bg-[#003B46]/80"
                        } rounded-md transition-colors`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentAnswer?.saved ? (
                          <>
                            <BookmarkCheck className="h-4 w-4 mr-1.5" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-1.5" />
                            Save
                          </>
                        )}
                      </motion.button>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Helpful?</span>
                        <motion.button
                          onClick={() => provideFeedback(true)}
                          className={`p-1.5 rounded-md ${
                            feedbackGiven === true
                              ? "bg-green-500/20 text-green-400"
                              : "bg-[#003B46]/50 hover:bg-[#003B46]/80"
                          } transition-colors`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => provideFeedback(false)}
                          className={`p-1.5 rounded-md ${
                            feedbackGiven === false
                              ? "bg-red-500/20 text-red-400"
                              : "bg-[#003B46]/50 hover:bg-[#003B46]/80"
                          } transition-colors`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </motion.button>
                      </div>

                      <motion.button
                        onClick={() => {
                          setQuestion(currentAnswer?.question || question);
                          handleGenerateAnswer();
                        }}
                        className="flex items-center px-3 py-1.5 text-sm bg-[#003B46]/50 hover:bg-[#003B46]/80 rounded-md transition-colors ml-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RefreshCw className="h-4 w-4 mr-1.5" />
                        Regenerate
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!isGenerating && !currentAnswer && (
            <motion.div
              className="bg-[#070F12]/80 backdrop-blur-sm rounded-xl p-8 border border-[#003B46]/20 shadow-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-[#003B46]/30 rounded-full">
                  <Sparkles className="h-8 w-8 text-[#00A3A9]" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                AI-Powered Interview Answers
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Enter an interview question above to get a professionally
                crafted answer tailored to your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  className="bg-[#003B46]/20 rounded-lg p-4 max-w-xs"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Zap className="h-5 w-5 text-[#00A3A9] mb-2 mx-auto" />
                  <h4 className="text-sm font-medium text-white mb-1">
                    Instant Answers
                  </h4>
                  <p className="text-xs text-gray-400">
                    Get immediate responses to any interview question
                  </p>
                </motion.div>
                <motion.div
                  className="bg-[#003B46]/20 rounded-lg p-4 max-w-xs"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sliders className="h-5 w-5 text-[#00A3A9] mb-2 mx-auto" />
                  <h4 className="text-sm font-medium text-white mb-1">
                    Customizable
                  </h4>
                  <p className="text-xs text-gray-400">
                    Adjust tone, length, and format to suit your needs
                  </p>
                </motion.div>
                <motion.div
                  className="bg-[#003B46]/20 rounded-lg p-4 max-w-xs"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <BookmarkCheck className="h-5 w-5 text-[#00A3A9] mb-2 mx-auto" />
                  <h4 className="text-sm font-medium text-white mb-1">
                    Save Favorites
                  </h4>
                  <p className="text-xs text-gray-400">
                    Build a library of your best interview answers
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#070F12] border-t border-[#003B46]/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="mx-2 text-gray-600">•</span>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Career Catalyst. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
