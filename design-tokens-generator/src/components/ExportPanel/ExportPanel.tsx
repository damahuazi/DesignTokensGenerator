/**
 * 导出面板组件
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Copy, Download, Check, Code, FileJson } from 'lucide-react';
import type { GeneratedTokens } from '../../types';

interface ExportPanelProps {
  tokens: GeneratedTokens | null;
  jsonPreview: string | null;
  onGeneratePreview: (tokens: GeneratedTokens) => void;
  onCopy: () => void;
  onDownload: () => void;
  isCopied: boolean;
  isDownloading: boolean;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  tokens,
  jsonPreview,
  onGeneratePreview,
  onCopy,
  onDownload,
  isCopied,
  isDownloading
}) => {
  const [height, setHeight] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  useEffect(() => {
    if (tokens) {
      onGeneratePreview(tokens);
    }
  }, [tokens, onGeneratePreview]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startYRef.current = e.clientY;
    startHeightRef.current = height;
  }, [height]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const delta = startYRef.current - e.clientY;
      const newHeight = Math.max(200, Math.min(800, startHeightRef.current + delta));
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  return (
    <div ref={panelRef} className="border-t border-border bg-background-card" style={{ userSelect: 'none' }}>
      <div
        className={`h-2 flex items-center justify-center cursor-ns-resize transition-colors ${
          isResizing ? 'bg-primary/20' : 'hover:bg-primary/10'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className={`w-12 h-1 rounded-full transition-colors ${
          isResizing ? 'bg-primary' : 'bg-border-light'
        }`} />
      </div>

      <div className="p-6" style={{ height: height - 8, overflow: 'hidden' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileJson className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Tokens Studio JSON</h3>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onCopy}
              disabled={!tokens || isCopied}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                ${isCopied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-background border border-border text-text-primary hover:bg-background-hover'
                }
                ${!tokens ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  复制
                </>
              )}
            </button>

            <button
              onClick={onDownload}
              disabled={!tokens || isDownloading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                bg-primary text-white hover:bg-primary-dark transition-all
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  下载中
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  下载 JSON
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative" style={{ height: height - 100 }}>
          <div className="bg-background rounded-xl border border-border overflow-hidden h-full flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 bg-background-hover border-b border-border flex-shrink-0">
              <Code className="w-4 h-4 text-text-secondary" />
              <span className="text-xs text-text-secondary font-medium">JSON Preview</span>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {jsonPreview ? (
                <pre className="p-4 text-xs font-mono text-text-primary leading-relaxed whitespace-pre-wrap break-words">
                  {jsonPreview}
                </pre>
              ) : (
                <div className="p-8 text-center text-text-secondary">
                  <FileJson className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>输入主题色以生成 JSON</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-xs text-text-secondary">
            <span className="font-medium text-primary">提示：</span>
            导出的 JSON 文件可直接导入 Tokens Studio 插件使用。
            点击复制按钮或下载文件即可获取完整的颜色变量定义。
          </p>
        </div>
      </div>
    </div>
  );
};
