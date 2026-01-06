"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(
  ({ className, value, onValueChange, min = 0, max = 50, step = 1, ...props }, ref) => {
    const currentValue = Array.isArray(value) ? value[0] : value || min;
    const percentage = max > min ? ((currentValue - min) / (max - min)) * 100 : 0;
    
    React.useEffect(() => {
      // Add custom styles for the slider thumb
      const style = document.createElement('style');
      style.textContent = `
        .custom-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgb(5, 150, 105);
          border: 2px solid rgb(5, 150, 105);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .custom-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgb(5, 150, 105);
          border: 2px solid rgb(5, 150, 105);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }, []);
    
    return (
      <div className={cn("relative flex w-full items-center", className)}>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (onValueChange) {
              onValueChange([newValue]);
            }
          }}
          className="custom-slider w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(5, 150, 105) 0%, rgb(5, 150, 105) ${percentage}%, rgb(39, 39, 42) ${percentage}%, rgb(39, 39, 42) 100%)`
          }}
          {...props}
        />
      </div>
    );
  }
)
Slider.displayName = "Slider"

export { Slider }
