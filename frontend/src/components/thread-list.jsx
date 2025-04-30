"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessageSquare, Eye, Star } from "lucide-react";

export function ThreadList({ threads, onThreadClick }) {
  return (
    <div className="space-y-4">
      {threads.map((thread, index) => (
        <div
          key={thread.id}
          className={`staggered-item animate-fade-up`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Card
            className="cursor-pointer hover:bg-darkTeal/90 transition-all duration-300 bg-darkTeal text-white border-mediumTeal overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-lightTeal/10"
            onClick={() => onThreadClick(thread)}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brightTeal to-lightTeal"></div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 border-2 border-brightTeal ring-2 ring-lightTeal/20">
                  <AvatarImage
                    src={thread.author.avatar || "/placeholder.svg"}
                    alt={thread.author.name}
                  />
                  <AvatarFallback className="bg-mediumTeal text-white">
                    {thread.author.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg group-hover:text-lightTeal transition-colors duration-300">
                      {thread.title}
                    </h3>
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
                  <p className="text-white/80 line-clamp-2">{thread.content}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
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
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 py-3 border-t border-mediumTeal flex justify-between text-sm text-white/70">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 group">
                  <MessageSquare className="h-4 w-4 group-hover:text-lightTeal transition-colors duration-300" />
                  <span className="group-hover:text-lightTeal transition-colors duration-300">
                    {thread.replies} replies
                  </span>
                </div>
                <div className="flex items-center gap-1 group">
                  <Eye className="h-4 w-4 group-hover:text-lightTeal transition-colors duration-300" />
                  <span className="group-hover:text-lightTeal transition-colors duration-300">
                    {thread.views} views
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
