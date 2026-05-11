/**
 * 顶部导航栏组件
 */

import React from 'react';
import { Download, Palette } from 'lucide-react';

interface HeaderProps {
  onExport?: () => void;
  isExportDisabled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onExport, isExportDisabled }) => {
  return (
    <header className="h-16 bg-background-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Palette className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Design Tokens Generator</h1>
          <p className="text-xs text-text-secondary">设计变量生成器</p>
        </div>
      </div>

      <button
        onClick={onExport}
        disabled={isExportDisabled}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
          ${isExportDisabled
            ? 'bg-background-hover text-text-secondary cursor-not-allowed opacity-50'
            : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25'
          }
        `}
      >
        <Download className="w-4 h-4" />
        导出 JSON
      </button>
    </header>
  );
};
