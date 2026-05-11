/**
 * 颜色卡片组件
 */

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { getContrastColor } from '../../utils/colorConversion';
import type { ColorToken } from '../../types';

interface ColorCardProps {
  color: ColorToken;
  size?: 'sm' | 'md' | 'lg';
}

export const ColorCard: React.FC<ColorCardProps> = ({ color, size = 'md' }) => {
  const [isCopied, setIsCopied] = useState(false);
  const contrastColor = getContrastColor(color.value);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(color.value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const sizeClasses = {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-32'
  };

  return (
    <div className="group relative">
      <div
        className={`${sizeClasses[size]} rounded-xl transition-all duration-200 cursor-pointer
          hover:scale-105 hover:shadow-xl relative overflow-hidden`}
        style={{ backgroundColor: color.value }}
        onClick={handleCopy}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-3">
          <div className="flex items-start justify-between">
            <span
              className="text-xs font-medium px-2 py-1 rounded bg-white/20 backdrop-blur-sm"
              style={{ color: contrastColor }}
            >
              {color.name}
            </span>

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100
                transition-all hover:bg-white/30"
              title="复制颜色值"
            >
              {isCopied ? (
                <Check className="w-3.5 h-3.5" style={{ color: contrastColor }} />
              ) : (
                <Copy className="w-3.5 h-3.5" style={{ color: contrastColor }} />
              )}
            </button>
          </div>

          <div>
            <p
              className="font-mono text-sm font-semibold"
              style={{ color: contrastColor }}
            >
              {color.value}
            </p>
            {color.description && (
              <p
                className="text-xs mt-0.5 opacity-80"
                style={{ color: contrastColor }}
              >
                {color.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
