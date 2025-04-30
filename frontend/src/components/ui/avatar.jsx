"use client"
import React from "react"

export function Avatar({
  src,
  alt = "",
  fallback,
  size = "md",
  className = ""
}) {
  const [imageError, setImageError] = React.useState(false)

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg"
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      className={`
        relative flex shrink-0 overflow-hidden rounded-full
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {src && !imageError ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          onError={handleImageError}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-mediumTeal text-white">
          {fallback || alt.substring(0, 2) || "?"}
        </div>
      )}
    </div>
  )
}

export function AvatarImage({ src, alt, ...props }) {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className="h-full w-full object-cover"
      {...props}
    />
  )
}

export function AvatarFallback({ children, className = "" }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-mediumTeal text-white ${className}`}
    >
      {children}
    </div>
  )
}
