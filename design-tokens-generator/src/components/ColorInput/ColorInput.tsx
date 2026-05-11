/**
 * 颜色输入组件
 */

import React, { useState, useEffect } from 'react';
import { isValidHex, normalizeHex } from '../../utils/colorConversion';
import { PRESET_COLORS } from '../../types';
import { Pipette, RotateCcw } from 'lucide-react';

interface ColorInputProps {
  value: string;
  onChange: (color: string) => void;
  error?: string | null;
}

export const ColorInput: React.FC<ColorInputProps> = ({ value, onChange, error }) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const normalized = normalizeHex(newValue);
    if (isValidHex(normalized)) {
      onChange(normalized);
    }
  };

  const handlePresetClick = (color: string) => {
    onChange(color);
    setInputValue(color);
  };

  const handleNativePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setInputValue(e.target.value);
  };

  const handleReset = () => {
    onChange('#6366F1');
    setInputValue('#6366F1');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          主题色
        </label>
        <div className="relative">
          <div className="flex gap-2">
            <div
              className="w-14 h-14 rounded-xl border-2 border-border cursor-pointer transition-all hover:scale-105 flex-shrink-0"
              style={{ backgroundColor: value }}
              onClick={() => setShowPicker(!showPicker)}
            >
              {showPicker && (
                <input
                  type="color"
                  value={value}
                  onChange={handleNativePickerChange}
                  className="w-full h-full opacity-0 cursor-pointer"
                  autoFocus
                />
              )}
            </div>

            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="#6366F1"
                className={`
                  w-full h-14 px-4 pr-12 bg-background border rounded-xl font-mono text-sm
                  focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all
                  ${error ? 'border-red-500' : 'border-border hover:border-border-light'}
                `}
              />
              <button
                onClick={() => setShowPicker(!showPicker)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-text-secondary hover:text-primary transition-colors"
                title="颜色选择器"
              >
                <Pipette className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleReset}
              className="h-14 px-3 bg-background border border-border rounded-xl hover:bg-background-hover transition-colors flex items-center justify-center"
              title="重置"
            >
              <RotateCcw className="w-4 h-4 text-text-secondary" />
            </button>
          </div>

          {showPicker && (
            <div className="absolute right-0 top-full mt-2 z-50">
              <input
                type="color"
                value={value}
                onChange={handleNativePickerChange}
                className="w-48 h-48 cursor-pointer rounded-lg"
              />
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          预设颜色
        </label>
        <div className="grid grid-cols-8 gap-2">
          {PRESET_COLORS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetClick(preset.value)}
              className={`
                w-10 h-10 rounded-lg transition-all hover:scale-110 relative group
                ${value.toLowerCase() === preset.value.toLowerCase() ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
              `}
              style={{ backgroundColor: preset.value }}
              title={preset.name}
            >
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
