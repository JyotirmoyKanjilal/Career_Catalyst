"use client";

import { useState, useEffect } from "react";
import { ThreadView } from "@/components/thread-view";
import { NewThreadForm } from "@/components/new-thread-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, MessageSquare, Users } from "lucide-react";

// Sample data - in a real app, this would come from a database
export const sampleThreads = [
  {
    id: "1",
    title: "How to approach system design questions?",
    author: {
      name: "Dr. Jane Smith",
      role: "expert",
      avatar: "/images/default-avatar.png", // Replace with a valid image path
    },
    date: "2 hours ago",
    replies: 8,
    views: 124,
    content:
      "I've been interviewing candidates for senior positions and noticed many struggle with system design questions. What approaches do you recommend for tackling these types of questions effectively?",
    tags: ["system-design", "senior-level", "interviews"],
  },
  {
    id: "2",
    title: "Common JavaScript closure interview questions",
    author: {
      name: "Mike Johnson",
      role: "student",
      avatar: "/images/default-avatar.png",
    },
    date: "1 day ago",
    replies: 12,
    views: 256,
    content:
      "I have an upcoming interview for a frontend position and I'm struggling with closure-related questions. Can anyone share common questions and how to approach them?",
    tags: ["javascript", "closures", "frontend"],
  },
  {
    id: "3",
    title: "Behavioral questions for product management roles",
    author: {
      name: "Sarah Chen",
      role: "expert",
      avatar: "/images/default-avatar.png",
    },
    date: "3 days ago",
    replies: 5,
    views: 98,
    content:
      "For those preparing for product management interviews, I'd like to share some insights on behavioral questions that frequently come up and strategies to answer them effectively.",
    tags: ["product-management", "behavioral", "interviews"],
  },
  {
    id: "4",
    title: "Struggling with dynamic programming problems",
    author: {
      name: "Alex Rivera",
      role: "student",
      avatar: "/images/default-avatar.png",
    },
    date: "5 days ago",
    replies: 15,
    views: 310,
    content:
      "I keep failing technical interviews because I can't solve dynamic programming problems efficiently. Any tips or resources that helped you master this topic?",
    tags: ["algorithms", "dynamic-programming", "technical"],
  },
];

export const sampleComments = [
  {
    id: "c1",
    threadId: "1",
    author: {
      name: "Robert Chen",
      role: "expert",
      avatar: "/images/default-avatar.png",
    },
    date: "1 hour ago",
    content:
      "Start by understanding the requirements thoroughly. Ask clarifying questions before diving into the solution. Then, identify the core components, discuss scalability considerations, and explain your design choices.",
  },
  {
    id: "c2",
    threadId: "1",
    author: {
      name: "Emily Wong",
      role: "student",
      avatar: "/images/default-avatar.png",
    },
    date: "45 minutes ago",
    content:
      "I've found the STAR method helpful even for system design: Situation, Task, Action, Result. Describe the problem, identify what needs to be built, explain your approach, and discuss the outcome and potential improvements.",
  },
  {
    id: "c3",
    threadId: "1",
    author: {
      name: "Dr. Jane Smith",
      role: "expert",
      avatar: "/images/default-avatar.png",
    },
    date: "30 minutes ago",
    content:
      "Great points! I'd add that candidates should practice drawing diagrams. Visual representation of your system makes it easier for interviewers to follow your thought process.",
  },
];

export function ThreadList({ threads, onThreadClick }) {
  return (
    <div>
      {threads.map((thread) => (
        <div
          key={thread.id}
          onClick={() => onThreadClick(thread)}
          className="cursor-pointer p-4 border-b border-gray-200 hover:bg-gray-100"
        >
          <h3 className="font-bold">{thread.title}</h3>
          <p className="text-sm text-gray-500">{thread.content}</p>
        </div>
      ))}
    </div>
  );
}

export function ThreadView({ thread, comments, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="mb-4 text-blue-500">Back to Threads</button>
      <h2 className="text-xl font-bold">{thread.title}</h2>
      <p className="text-gray-700">{thread.content}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Comments:</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="mt-2 p-2 border rounded">
            <p className="text-sm text-gray-500">{comment.author.name} - {comment.date}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ForumPage() {
  const [activeView, setActiveView] = useState("list");
  const [selectedThread, setSelectedThread] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleThreadClick = (thread) => {
    setIsAnimating(true);
    setIsLoading(true);
    setSelectedThread(thread);
    setTimeout(() => {
      setActiveView("thread");
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const handleBackToList = () => {
    setIsAnimating(true);
    setIsLoading(true);
    setTimeout(() => {
      setActiveView("list");
      setSelectedThread(null);
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const handleNewThread = () => {
    setIsAnimating(true);
    setIsLoading(true);
    setTimeout(() => {
      setActiveView("new");
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const handleThreadCreated = () => {
    setIsAnimating(true);
    setIsLoading(true);
    setTimeout(() => {
      setActiveView("list");
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 animate-fade-in">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between animate-fade-up">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-darkTeal to-brightTeal flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Interview Questions Forum</h1>
          </div>
          <Button
            onClick={handleNewThread}
            className="bg-brightTeal hover:bg-lightTeal text-white flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <PlusCircle className="h-4 w-4" />
            New Discussion
          </Button>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 bg-darkTeal">
              <TabsTrigger value="all" className="data-[state=active]:bg-brightTeal data-[state=active]:text-white">
                All Topics
              </TabsTrigger>
              <TabsTrigger value="technical" className="data-[state=active]:bg-brightTeal data-[state=active]:text-white">
                Technical
              </TabsTrigger>
              <TabsTrigger value="behavioral" className="data-[state=active]:bg-brightTeal data-[state=active]:text-white">
                Behavioral
              </TabsTrigger>
              <TabsTrigger value="system-design" className="data-[state=active]:bg-brightTeal data-[state=active]:text-white">
                System Design
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin-slow rounded-full h-12 w-12 border-t-2 border-b-2 border-brightTeal"></div>
          </div>
        ) : (
          <>
            {activeView === "list" && (
              <div className={`${isAnimating ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
                <ThreadList threads={sampleThreads} onThreadClick={handleThreadClick} />
              </div>
            )}

            {activeView === "thread" && selectedThread && (
              <div className={`${isAnimating ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
                <ThreadView
                  thread={selectedThread}
                  comments={sampleComments.filter((c) => c.threadId === selectedThread.id)}
                  onBack={handleBackToList}
                />
              </div>
            )}

            {activeView === "new" && (
              <div className={`${isAnimating ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
                <NewThreadForm onCancel={handleBackToList} onSubmit={handleThreadCreated} />
              </div>
            )}
          </>
        )}

        <div className="mt-8 p-6 bg-darkTeal rounded-lg text-white animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-5 w-5 text-lightTeal" />
            <h2 className="text-xl font-semibold">Community Stats</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-mediumTeal p-4 rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <span className="text-3xl font-bold text-lightTeal">1,245</span>
              <span className="text-sm">Active Members</span>
            </div>
            <div className="bg-mediumTeal p-4 rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <span className="text-3xl font-bold text-lightTeal">348</span>
              <span className="text-sm">Discussions</span>
            </div>
            <div className="bg-mediumTeal p-4 rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <span className="text-3xl font-bold text-lightTeal">42</span>
              <span className="text-sm">Expert Contributors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
