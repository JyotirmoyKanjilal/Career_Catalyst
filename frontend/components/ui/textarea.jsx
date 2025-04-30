import { forwardRef } from "react"

const Textarea = forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-3 py-2 rounded-md 
            bg-mediumTeal/50 border border-mediumTeal 
            text-white placeholder:text-white/50 
            focus:outline-none focus:ring-2 focus:ring-lightTeal focus:border-transparent
            transition-all duration-200 ease-in-out
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
