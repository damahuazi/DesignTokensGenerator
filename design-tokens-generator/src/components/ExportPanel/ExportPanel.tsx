/**
 * 导出面板组件
 */

import React from 'react';
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
  React.useEffect(() => {
    if (tokens) {
      onGeneratePreview(tokens);
    }
  }, [tokens, onGeneratePreview]);

  return (
    <div className="border-t border-border bg-background-card">
      <div className="p-6">
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

        <div className="relative">
          <div className="bg-background rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-background-hover border-b border-border">
              <Code className="w-4 h-4 text-text-secondary" />
              <span className="text-xs text-text-secondary font-medium">JSON Preview</span>
            </div>

            <div className="max-h-96 overflow-y-auto scrollbar-thin">
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
