import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showValue?: boolean;
  formatValue?: (value: number, max: number) => string;
  size?: "default" | "sm" | "lg";
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    showValue = false, 
    formatValue,
    size = "default",
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
    
    const sizeClasses = {
      default: "h-4",
      sm: "h-2",
      lg: "h-6"
    };
    
    return (
      <div
        ref={ref}
        className={cn("relative w-full overflow-hidden rounded-full bg-secondary", sizeClasses[size], className)}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-primary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
            {formatValue ? formatValue(value, max) : `${Math.round(percentage)}%`}
          </div>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };