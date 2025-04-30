"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Hash, FileText, Tag } from "lucide-react";

export function NewThreadForm({ onCancel, onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the thread to a database
    alert(`Thread created: ${title}`);
    onSubmit();
  };

  return (
    <div className="animate-fade-in">
      <Card className="bg-darkTeal border-mediumTeal text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brightTeal to-lightTeal"></div>
        <CardHeader>
          <div className="animate-slide-in-left">
            <Button
              variant="ghost"
              className="flex items-center gap-2 mb-2 pl-0 -ml-2 text-white hover:text-lightTeal transition-colors duration-300"
              onClick={onCancel}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to discussions
            </Button>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <CardTitle className="text-2xl text-white">Start a New Discussion</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Label htmlFor="title" className="text-white">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-lightTeal" />
                  Title
                </div>
              </Label>
              <Input
                id="title"
                placeholder="What's your question or topic?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-mediumTeal/50 border-mediumTeal text-white placeholder:text-white/50 focus:border-lightTeal focus:ring-lightTeal"
              />
            </div>

            <div className="space-y-2 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Label htmlFor="category" className="text-white">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-lightTeal" />
                  Category
                </div>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-mediumTeal/50 border-mediumTeal text-white focus:border-lightTeal focus:ring-lightTeal">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-darkTeal border-mediumTeal text-white">
                  <SelectItem value="technical" className="focus:bg-mediumTeal">
                    Technical Interview
                  </SelectItem>
                  <SelectItem value="behavioral" className="focus:bg-mediumTeal">
                    Behavioral Interview
                  </SelectItem>
                  <SelectItem value="system-design" className="focus:bg-mediumTeal">
                    System Design
                  </SelectItem>
                  <SelectItem value="preparation" className="focus:bg-mediumTeal">
                    Interview Preparation
                  </SelectItem>
                  <SelectItem value="experience" className="focus:bg-mediumTeal">
                    Interview Experience
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Label htmlFor="content" className="text-white">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-lightTeal" />
                  Content
                </div>
              </Label>
              <Textarea
                id="content"
                placeholder="Describe your question or share your thoughts in detail..."
                className="min-h-[200px] bg-mediumTeal/50 border-mediumTeal text-white placeholder:text-white/50 focus:border-lightTeal focus:ring-lightTeal"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <Label htmlFor="tags" className="text-white">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-lightTeal" />
                  Tags (comma separated)
                </div>
              </Label>
              <Input
                id="tags"
                placeholder="e.g., javascript, algorithms, frontend"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-mediumTeal/50 border-mediumTeal text-white placeholder:text-white/50 focus:border-lightTeal focus:ring-lightTeal"
              />
            </div>

            <div className="flex justify-end gap-2 animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-brightTeal text-brightTeal hover:bg-brightTeal hover:text-white transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!title.trim() || !content.trim() || !category}
                className="bg-brightTeal hover:bg-lightTeal text-white transition-all duration-300 hover:scale-105"
              >
                <Send className="h-4 w-4 mr-2" />
                Create Discussion
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
