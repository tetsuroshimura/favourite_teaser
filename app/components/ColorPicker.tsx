'use client';

import { useState, useEffect, useRef } from 'react';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
}

export default function ColorPicker({ onColorChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    onColorChange(newColor);
  };

  const togglePicker = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Click outside to close functionality
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      {/* Small circular color swatch */}
      <button
        onClick={togglePicker}
        className="rounded-full border border-black transition-all duration-300 focus:outline-none"
        style={{ 
          backgroundColor: selectedColor,
          width: '20px',
          height: '20px'
        }}
        aria-label="Change background color"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Color picker</span>
      </button>

      {/* Large color picker panel */}
      <div
        className={`absolute top-10 right-0 lg:left-0 lg:right-auto bg-white rounded-lg shadow-2xl border border-gray-200 p-4 min-w-[160px] transform transition-all duration-300 origin-top-right lg:origin-top-left ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        {/* Color input */}
        <div className="mb-3">
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-100 hover:border-gray-200 transition-colors duration-200"
            style={{
              background: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
            }}
          />
        </div>

        {/* Color info */}
        <div className="text-center">
          <div className="text-sm font-mono text-gray-700 tracking-wider mb-1">
            {selectedColor.toUpperCase()}
          </div>
          <div className="text-xs text-gray-500">
            Background Color
          </div>
        </div>

        {/* Quick preset colors */}
        <div className="mt-3 grid grid-cols-6 gap-1">
          {['#ffffff', '#f8f9fa', '#F4F2AE', '#08339F', '#085A44', '#000000'].map((color) => (
            <button
              key={color}
              onClick={() => {
                setSelectedColor(color);
                onColorChange(color);
              }}
              className="w-6 h-6 rounded border-2 border-gray-200 hover:border-gray-400 transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: color }}
              aria-label={`Set background to ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}