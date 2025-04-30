"use client";

import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea.jsx";
import { ArrowLeft, Send, Star, ThumbsUp, MessageSquare } from "lucide-react";

export  function ThreadView({ thread, comments, onBack }) {
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState({});
  const [commentLikes, setCommentLikes] = useState({
    c1: 12,
    c2: 5,
    c3: 8,
  });
  const textareaRef = useRef(null);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // In a real app, this would save the comment to a database
    alert(`Comment submitted: ${newComment}`);
    setNewComment("");
  };

  const handleLikeComment = (commentId) => {
    setLikedComments((prev) => {
      const newState = { ...prev, [commentId]: !prev[commentId] };
      return newState;
    });

    setCommentLikes((prev) => {
      const currentLikes = prev[commentId] || 0;
      return {
        ...prev,
        [commentId]: likedComments[commentId] ? currentLikes - 1 : currentLikes + 1,
      };
    });
  };

  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="animate-slide-in-left">
        <Button
          variant="ghost"
          className="flex items-center gap-2 mb-4 pl-0 text-white hover:text-lightTeal transition-colors duration-300"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to discussions
        </Button>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <Card className="bg-darkTeal border-mediumTeal text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brightTeal to-lightTeal"></div>
          <CardHeader className="p-6 pb-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border-2 border-brightTeal ring-2 ring-lightTeal/20">
                <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
                <AvatarFallback className="bg-mediumTeal text-white">
                  {thread.author.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{thread.title}</h2>
                  <span className="text-sm text-lightTeal/80">{thread.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{thread.author.name}</span>
                  <Badge
                    variant={thread.author.role === "expert" ? "default" : "outline"}
                    className={`${
                      thread.author.role === "expert"
                        ? "bg-brightTeal text-white animate-pulse-subtle"
                        : "border-brightTeal text-brightTeal"
                    }`}
                  >
                    {thread.author.role === "expert" && <Star className="h-3 w-3 mr-1" />}
                    {thread.author.role === "expert" ? "Expert" : "Student"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <p className="mb-4 text-white/90">{thread.content}</p>
            <div className="flex flex-wrap gap-2">
              {thread.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-mediumTeal text-white/90 hover:bg-lightTeal transition-colors duration-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Responses ({comments.length})</h3>
          <Button
            variant="outline"
            className="text-brightTeal border-brightTeal hover:bg-brightTeal hover:text-white transition-all duration-300"
            onClick={focusTextarea}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Add Response
          </Button>
        </div>

        {comments.map((comment, index) => (
          <div
            key={comment.id}
            className="staggered-item animate-fade-up"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <Card className="border-mediumTeal bg-darkTeal/80 text-white overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-mediumTeal to-brightTeal"></div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border-2 border-mediumTeal">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback className="bg-mediumTeal text-white">
                      {comment.author.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.author.name}</span>
                        <Badge
                          variant={comment.author.role === "expert" ? "default" : "outline"}
                          className={`${
                            comment.author.role === "expert"
                              ? "bg-brightTeal text-white"
                              : "border-brightTeal text-brightTeal"
                          }`}
                        >
                          {comment.author.role === "expert" && <Star className="h-3 w-3 mr-1" />}
                          {comment.author.role === "expert" ? "Expert" : "Student"}
                        </Badge>
                      </div>
                      <span className="text-sm text-lightTeal/80">{comment.date}</span>
                    </div>
                    <p className="text-white/90">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        className={`flex items-center gap-1 text-sm ${
                          likedComments[comment.id] ? "text-lightTeal" : "text-white/70"
                        } hover:text-lightTeal transition-colors duration-300`}
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <ThumbsUp className={`h-4 w-4 ${likedComments[comment.id] ? "fill-lightTeal" : ""}`} />
                        <span>{commentLikes[comment.id] || 0}</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-white/70 hover:text-lightTeal transition-colors duration-300">
                        <MessageSquare className="h-4 w-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <Card className="bg-darkTeal border-mediumTeal text-white mt-6">
            <CardContent className="p-6">
              <h4 className="font-medium mb-2 text-white">Add your response</h4>
              <form onSubmit={handleSubmitComment}>
                <Textarea
                  ref={textareaRef}
                  placeholder="Share your thoughts or advice..."
                  className="min-h-[120px] mb-4 bg-mediumTeal/50 border-mediumTeal text-white placeholder:text-white/50 focus:border-lightTeal focus:ring-lightTeal"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="flex items-center gap-2 bg-brightTeal hover:bg-lightTeal text-white transition-all duration-300 hover:scale-105"
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-4 w-4" />
                    Post Response
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
