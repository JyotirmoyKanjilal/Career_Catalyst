"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Star } from "lucide-react";

export default function FeedbackForm({ answerId, onSubmit }) {
  const [expertName, setExpertName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expertName || !comment || rating === 0) return;

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      onSubmit(answerId, { expertName, comment, rating });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card className="border-[#006770] bg-[#003B46]">
        <CardHeader className="bg-[#006770] pb-3">
          <CardTitle className="text-white">Provide Expert Feedback</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="expertName" className="text-[#00A3A9]">
                Your Name
              </Label>
              <Input
                id="expertName"
                value={expertName}
                onChange={(e) => setExpertName(e.target.value)}
                placeholder="Enter your name"
                className="bg-[#070F12] border-[#006770] text-white focus:border-[#00A3A9] focus:ring-[#00A3A9]"
                required
              />
            </div>

            <div>
              <Label htmlFor="comment" className="text-[#00A3A9]">
                Feedback
              </Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Provide detailed feedback on the student's answer..."
                className="bg-[#070F12] border-[#006770] text-white focus:border-[#00A3A9] focus:ring-[#00A3A9] min-h-[120px]"
                required
              />
            </div>

            <div>
              <Label className="text-[#00A3A9] block mb-2">Rating</Label>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="mr-1 focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 transition-colors duration-200 ${
                        (hoverRating ? i < hoverRating : i < rating) ? "text-[#00A3A9] fill-[#00A3A9]" : "text-gray-400"
                      }`}
                    />
                  </motion.button>
                ))}
                <span className="ml-2 text-sm text-[#00A3A9]">
                  {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : "Select rating"}
                </span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-[#008C8B] hover:bg-[#00A3A9] text-white"
                disabled={isSubmitting || !expertName || !comment || rating === 0}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"
                  />
                ) : null}
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
