/**
 * 导出 Hook
 */

import { useState, useCallback } from 'react';
import type { GeneratedTokens } from '../types';
import { generateTokensStudioJson, downloadTokensJson, copyTokensToClipboard } from '../utils/tokenFormatter';

interface UseTokenExportReturn {
  jsonPreview: string | null;
  isCopied: boolean;
  isDownloading: boolean;
  error: string | null;
  generatePreview: (tokens: GeneratedTokens) => void;
  copyToClipboard: () => Promise<boolean>;
  downloadFile: () => void;
  resetState: () => void;
}

export function useTokenExport(): UseTokenExportReturn {
  const [jsonPreview, setJsonPreview] = useState<string | null>(null);
  const [tokens, setTokens] = useState<GeneratedTokens | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePreview = useCallback((generatedTokens: GeneratedTokens) => {
    setTokens(generatedTokens);
    setError(null);

    try {
      const json = generateTokensStudioJson(generatedTokens);
      setJsonPreview(json);
    } catch (e) {
      setError('生成 JSON 预览失败');
      setJsonPreview(null);
    }
  }, []);

  const copyToClipboard = useCallback(async (): Promise<boolean> => {
    if (!tokens) {
      setError('没有可导出的变量');
      return false;
    }

    setIsCopied(false);
    setError(null);

    try {
      const success = await copyTokensToClipboard(tokens);
      if (success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return true;
      } else {
        setError('复制到剪贴板失败');
        return false;
      }
    } catch (e) {
      setError('复制失败，请手动复制');
      return false;
    }
  }, [tokens]);

  const downloadFile = useCallback(() => {
    if (!tokens) {
      setError('没有可导出的变量');
      return;
    }

    setIsDownloading(true);
    setError(null);

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const filename = `design-tokens-${timestamp}.json`;
      downloadTokensJson(tokens, filename);
      setIsDownloading(false);
    } catch (e) {
      setError('下载失败');
      setIsDownloading(false);
    }
  }, [tokens]);

  const resetState = useCallback(() => {
    setJsonPreview(null);
    setTokens(null);
    setIsCopied(false);
    setIsDownloading(false);
    setError(null);
  }, []);

  return {
    jsonPreview,
    isCopied,
    isDownloading,
    error,
    generatePreview,
    copyToClipboard,
    downloadFile,
    resetState
  };
}
