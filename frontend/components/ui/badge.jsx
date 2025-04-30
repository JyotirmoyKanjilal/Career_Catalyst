export function Badge({ children, variant = "default", className = "" }) {
    const baseStyles =
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors"
  
    const variantStyles = {
      default: "bg-brightTeal text-white hover:bg-lightTeal",
      secondary: "bg-mediumTeal text-white hover:bg-mediumTeal/80",
      outline: "border border-brightTeal text-brightTeal hover:bg-brightTeal/10",
      destructive: "bg-red-500 text-white hover:bg-red-600"
    }
  
    return (
      <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
        {children}
      </span>
    )
  }
  