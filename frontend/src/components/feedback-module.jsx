"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import StudentAnswer from "./student-answer";
import FeedbackForm from "./feedback-form";
import { Check, MessageSquare, Users } from "lucide-react";

// Sample data
const sampleStudentAnswers = [
  {
    id: 1,
    studentName: "Alex Johnson",
    question: "Explain the process of photosynthesis.",
    answer:
      "Photosynthesis is the process by which plants convert light energy into chemical energy. It takes place in the chloroplasts of plant cells, specifically in the grana where chlorophyll is located. The process uses carbon dioxide and water to produce glucose and oxygen.",
    subject: "Biology",
    submittedAt: "2 hours ago",
    feedback: [],
  },
  {
    id: 2,
    studentName: "Jamie Smith",
    question: "Solve the quadratic equation: 2x² + 5x - 3 = 0",
    answer:
      "Using the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a\nWhere a=2, b=5, c=-3\nx = (-5 ± √(25 - 4(2)(-3))) / 2(2)\nx = (-5 ± √(25 + 24)) / 4\nx = (-5 ± √49) / 4\nx = (-5 ± 7) / 4\nx = (-5 + 7) / 4 or (-5 - 7) / 4\nx = 2/4 or -12/4\nx = 0.5 or -3",
    subject: "Mathematics",
    submittedAt: "1 day ago",
    feedback: [
      {
        id: 101,
        expertName: "Dr. Williams",
        comment:
          "Good work using the quadratic formula. Your solution is correct, but try to simplify your fractions in the final answer.",
        rating: 4,
        createdAt: "12 hours ago",
      },
    ],
  },
  {
    id: 3,
    studentName: "Taylor Lee",
    question: "Discuss the causes of World War I.",
    answer:
      "World War I was caused by several factors including nationalism, imperialism, militarism, and alliance systems. The immediate trigger was the assassination of Archduke Franz Ferdinand in Sarajevo in 1914, but tensions had been building for years due to competition between European powers.",
    subject: "History",
    submittedAt: "3 days ago",
    feedback: [
      {
        id: 102,
        expertName: "Prof. Garcia",
        comment:
          "Good overview of the main causes. Consider elaborating on how the alliance system specifically contributed to the escalation of the conflict.",
        rating: 3,
        createdAt: "2 days ago",
      },
      {
        id: 103,
        expertName: "Dr. Chen",
        comment:
          "Well structured answer. You could strengthen it by including specific examples of nationalist movements and imperialist conflicts that contributed to tensions.",
        rating: 4,
        createdAt: "1 day ago",
      },
    ],
  },
];

export default function FeedbackModule() {
  const [studentAnswers, setStudentAnswers] = useState(sampleStudentAnswers);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  const pendingAnswers = studentAnswers.filter((answer) => answer.feedback.length === 0);
  const reviewedAnswers = studentAnswers.filter((answer) => answer.feedback.length > 0);

  const handleFeedbackSubmit = (answerId, feedback) => {
    setStudentAnswers((prev) =>
      prev.map((answer) => {
        if (answer.id === answerId) {
          return {
            ...answer,
            feedback: [
              ...answer.feedback,
              {
                id: Date.now(),
                expertName: feedback.expertName,
                comment: feedback.comment,
                rating: feedback.rating,
                createdAt: "Just now",
              },
            ],
          };
        }
        return answer;
      })
    );
    setSelectedAnswer(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-[#003B46]">
          <TabsTrigger value="pending" className="data-[state=active]:bg-[#008C8B] data-[state=active]:text-white">
            <MessageSquare className="mr-2 h-4 w-4" />
            Pending Feedback ({pendingAnswers.length})
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="data-[state=active]:bg-[#008C8B] data-[state=active]:text-white">
            <Check className="mr-2 h-4 w-4" />
            Reviewed ({reviewedAnswers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <AnimatePresence mode="wait">
            {selectedAnswer === null ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-4"
              >
                {pendingAnswers.length > 0 ? (
                  pendingAnswers.map((answer) => (
                    <motion.div
                      key={answer.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <StudentAnswer answer={answer} onSelect={() => setSelectedAnswer(answer.id)} />
                    </motion.div>
                  ))
                ) : (
                  <Card className="p-8 text-center bg-[#003B46]/50 border-[#006770]">
                    <Users className="mx-auto h-12 w-12 text-[#00A3A9] mb-4" />
                    <p className="text-[#00A3A9]">No pending answers to review</p>
                  </Card>
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <button
                  onClick={() => setSelectedAnswer(null)}
                  className="mb-4 text-[#00A3A9] hover:text-[#00A3A9]/80 transition-colors"
                >
                  ← Back to list
                </button>
                <StudentAnswer answer={studentAnswers.find((a) => a.id === selectedAnswer)} expanded={true} />
                <div className="mt-6">
                  <FeedbackForm answerId={selectedAnswer} onSubmit={handleFeedbackSubmit} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="reviewed" className="mt-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4">
            {reviewedAnswers.length > 0 ? (
              reviewedAnswers.map((answer) => (
                <motion.div
                  key={answer.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <StudentAnswer answer={answer} showFeedback={true} />
                </motion.div>
              ))
            ) : (
              <Card className="p-8 text-center bg-[#003B46]/50 border-[#006770]">
                <Check className="mx-auto h-12 w-12 text-[#00A3A9] mb-4" />
                <p className="text-[#00A3A9]">No reviewed answers yet</p>
              </Card>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
