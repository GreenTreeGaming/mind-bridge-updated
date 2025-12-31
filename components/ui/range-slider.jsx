"use client";

import React, { useEffect, useState } from "react";

const sliderStyles = `
  input[type="range"].range-slider {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    height: 24px;
    border-radius: 5px;
    background: transparent;
    outline: none;
    cursor: pointer;
  }

  input[type="range"].range-slider::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 2px solid #10b981;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  input[type="range"].range-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 2px solid #10b981;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  input[type="range"].range-slider::-webkit-slider-thumb:hover {
    background: #f0fdf4;
    border-color: #059669;
  }

  input[type="range"].range-slider::-moz-range-thumb:hover {
    background: #f0fdf4;
    border-color: #059669;
  }
`;

export default function RangeSlider({ value = [0, 50], onValueChange = () => {}, min = 0, max = 50, step = 1, className = "" }) {
  const [minVal, setMinVal] = useState(value[0] ?? min);
  const [maxVal, setMaxVal] = useState(value[1] ?? max);

  useEffect(() => {
    setMinVal(value[0] ?? min);
    setMaxVal(value[1] ?? max);
  }, [value, min, max]);

  useEffect(() => {
    if (typeof onValueChange === "function") onValueChange([minVal, maxVal]);
  }, [minVal, maxVal, onValueChange]);

  const range = Math.max(1, max - min);
  const minPercent = ((minVal - min) / range) * 100;
  const maxPercent = ((maxVal - min) / range) * 100;

  return (
    <>
      <style>{sliderStyles}</style>
      <div className={`w-full ${className}`}>
        <div className="relative h-8">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-900/30 rounded pointer-events-none" />
          <div
            className="absolute h-1 bg-emerald-400 rounded top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
          />

          {/* Min input */}
          <input
            aria-label="Minimum value"
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={(e) => {
              const v = Math.min(Number(e.target.value), maxVal - step);
              setMinVal(v);
            }}
            className="range-slider absolute left-0 top-0 w-full h-8"
            style={{ zIndex: minVal > maxVal - step ? 20 : 10 }}
          />

          {/* Max input */}
          <input
            aria-label="Maximum value"
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={(e) => {
              const v = Math.max(Number(e.target.value), minVal + step);
              setMaxVal(v);
            }}
            className="range-slider absolute left-0 top-0 w-full h-8"
            style={{ zIndex: 11 }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{min} years</span>
          <span className="text-emerald-400 font-medium">{minVal} - {maxVal} years</span>
          <span>{max} years</span>
        </div>
      </div>
    </>
  );
}
