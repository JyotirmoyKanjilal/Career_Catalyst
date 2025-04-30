"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, BookOpen, Star } from "lucide-react";

export default function StudentAnswer({
  answer,
  onSelect,
  expanded = false,
  showFeedback = false,
}) {
  return (
    <Card
      className={`overflow-hidden border-[#006770] ${
        expanded
          ? "bg-[#003B46]"
          : "bg-[#003B46]/70 hover:bg-[#003B46] cursor-pointer"
      } transition-all duration-300`}
      onClick={!expanded && onSelect ? onSelect : undefined}
    >
      <CardHeader className="bg-[#006770] pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="mb-2 bg-[#008C8B] hover:bg-[#008C8B]/90">
              <BookOpen className="mr-1 h-3 w-3" />
              {answer.subject}
            </Badge>
            <CardTitle className="text-white text-lg">{answer.question}</CardTitle>
          </div>
          <div className="flex items-center text-sm text-[#00A3A9]/80">
            <Clock className="mr-1 h-3 w-3" />
            {answer.submittedAt}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center mb-3 text-[#00A3A9]">
          <User className="mr-2 h-4 w-4" />
          <span>{answer.studentName}</span>
        </div>

        <div className="bg-[#070F12]/50 p-3 rounded-md mb-4 text-white/90">
          {expanded
            ? answer.answer
            : answer.answer.length > 150
            ? `${answer.answer.substring(0, 150)}...`
            : answer.answer}
        </div>

        {(showFeedback || expanded) && answer.feedback.length > 0 && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4"
            >
              <h3 className="text-[#00A3A9] font-medium mb-2">Expert Feedback:</h3>
              <div className="space-y-3">
                {answer.feedback.map((feedback) => (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#070F12]/50 p-3 rounded-md border-l-2 border-[#00A3A9]"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-[#00A3A9]">
                        {feedback.expertName}
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < feedback.rating
                                ? "text-[#00A3A9] fill-[#00A3A9]"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-[#00A3A9]/70 ml-2">
                          {feedback.createdAt}
                        </span>
                      </div>
                    </div>
                    <p className="text-white/90">{feedback.comment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {!expanded && !showFeedback && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-[#00A3A9]/80">
              {answer.feedback.length > 0
                ? `${answer.feedback.length} feedback${
                    answer.feedback.length > 1 ? "s" : ""
                  }`
                : "No feedback yet"}
            </span>
            {onSelect && (
              <span className="text-sm text-[#00A3A9] hover:text-[#00A3A9]/80">
                {answer.feedback.length > 0 ? "View details" : "Provide feedback"}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
