/**
 * 颜色卡片组件
 */

import React, { useState } from 'react';
import { Copy, Check, Link2 } from 'lucide-react';
import { getContrastColor } from '../../utils/colorConversion';
import type { ColorToken, ExtendedSemanticColor } from '../../types';

interface ColorCardProps {
  color: ColorToken | ExtendedSemanticColor;
  size?: 'sm' | 'md' | 'lg';
}

export const ColorCard: React.FC<ColorCardProps> = ({ color, size = 'md' }) => {
  const [isCopied, setIsCopied] = useState(false);
  const contrastColor = getContrastColor(color.value);

  const hasReference = 'reference' in color && color.reference;
  const description = color.description?.replace(/ - 引用.*$/, '').replace(/ - 固定值.*$/, '');
  const reference = hasReference ? color.reference : null;

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

  const minHeightClass = {
    sm: 'min-h-[100px]',
    md: 'min-h-[120px]',
    lg: 'min-h-[140px]'
  };

  const displayName = color.name.length > 16 
    ? color.name.substring(0, 16) + '...' 
    : color.name;

  return (
    <div className="group h-full">
      <div
        className={`${minHeightClass[size]} h-full rounded-xl transition-all duration-200 cursor-pointer
          hover:scale-[1.02] hover:shadow-xl relative overflow-hidden flex flex-col`}
        style={{ backgroundColor: color.value }}
        onClick={handleCopy}
      >
        <div className="flex items-start justify-between p-3">
          <span
            className="text-xs font-medium px-2 py-1 rounded bg-white/20 backdrop-blur-sm"
            style={{ color: contrastColor }}
            title={color.name}
          >
            {displayName}
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

        <div className="flex-1 flex flex-col justify-end p-3 pt-0 space-y-1">
          <p
            className="font-mono text-sm font-semibold"
            style={{ color: contrastColor }}
          >
            {color.value}
          </p>

          {description && (
            <p
              className="text-xs leading-tight opacity-90"
              style={{ color: contrastColor }}
            >
              {description}
            </p>
          )}

          {reference && (
            <div
              className="flex items-center gap-1 text-xs opacity-75"
              style={{ color: contrastColor }}
            >
              <Link2 className="w-3 h-3 flex-shrink-0" />
              <span className="font-mono truncate">{reference}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
