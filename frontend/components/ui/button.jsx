import { forwardRef } from "react"

const Button = forwardRef(
  (
    {
      variant = "default",
      size = "md",
      className = "",
      children,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center rounded-md font-medium
      transition-colors duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-lightTeal focus:ring-offset-2
      disabled:opacity-50 disabled:pointer-events-none
    `

    const variantStyles = {
      default: "bg-brightTeal text-white hover:bg-lightTeal",
      secondary: "bg-mediumTeal text-white hover:bg-mediumTeal/80",
      outline:
        "border border-brightTeal text-brightTeal hover:bg-brightTeal/10",
      ghost: "text-white hover:bg-mediumTeal/20",
      link: "text-brightTeal underline-offset-4 hover:underline",
      destructive: "bg-red-500 text-white hover:bg-red-600"
    }

    const sizeStyles = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base"
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
