/**
 * 颜色生成器 Hook
 */

import { useState, useCallback, useMemo } from 'react';
import { isValidHex, normalizeHex } from '../utils/colorConversion';
import { generateThemeColorScale, generateNeutralColorScale } from '../utils/colorScale';
import { generateSemanticColors, generateExtendedSemantic } from '../utils/semanticColors';
import type { ColorConfig, GeneratedTokens, ThemeColorScale, NeutralColorScale, SemanticColors, ExtendedSemantic } from '../types';
import { DEFAULT_CONFIG } from '../types';

interface UseColorGeneratorReturn {
  config: ColorConfig;
  tokens: GeneratedTokens | null;
  error: string | null;
  updateConfig: (updates: Partial<ColorConfig>) => void;
  setThemeColor: (color: string) => void;
  setScaleCount: (count: number) => void;
  toggleNeutral: () => void;
  toggleSemantic: () => void;
  toggleExtended: () => void;
  resetConfig: () => void;
}

export function useColorGenerator(): UseColorGeneratorReturn {
  const [config, setConfig] = useState<ColorConfig>(DEFAULT_CONFIG);
  const [error, setError] = useState<string | null>(null);

  const generateTokens = useCallback((): GeneratedTokens | null => {
    if (!config.themeColor || !isValidHex(config.themeColor)) {
      return null;
    }

    const normalizedColor = normalizeHex(config.themeColor);
    const themeColorScale: ThemeColorScale = {
      name: 'primary',
      scale: generateThemeColorScale(normalizedColor, config.scaleCount)
    };

    const neutralColorScale: NeutralColorScale | null = config.includeNeutral ? {
      name: 'neutral',
      scale: generateNeutralColorScale(config.scaleCount)
    } : null;

    const semanticColors: SemanticColors | null = config.includeSemantic ? {
      ...generateSemanticColors()
    } : null;

    const extendedSemantic: ExtendedSemantic | null = config.includeExtended ? {
      ...generateExtendedSemantic(normalizedColor)
    } : null;

    return {
      themeColorScale,
      neutralColorScale: neutralColorScale!,
      semanticColors: semanticColors!,
      extendedSemantic: extendedSemantic!,
      metadata: {
        version: '1.0',
        generatedAt: new Date().toISOString(),
        themeColor: normalizedColor
      }
    };
  }, [config]);

  const tokens = useMemo(() => {
    return generateTokens();
  }, [generateTokens]);

  const updateConfig = useCallback((updates: Partial<ColorConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const setThemeColor = useCallback((color: string) => {
    const normalized = normalizeHex(color);
    if (!isValidHex(normalized)) {
      setError('无效的颜色格式，请输入有效的 HEX 颜色值');
      return;
    }
    setError(null);
    setConfig(prev => ({ ...prev, themeColor: normalized }));
  }, []);

  const setScaleCount = useCallback((count: number) => {
    const validCount = Math.max(3, Math.min(20, count));
    setConfig(prev => ({ ...prev, scaleCount: validCount }));
  }, []);

  const toggleNeutral = useCallback(() => {
    setConfig(prev => ({ ...prev, includeNeutral: !prev.includeNeutral }));
  }, []);

  const toggleSemantic = useCallback(() => {
    setConfig(prev => ({ ...prev, includeSemantic: !prev.includeSemantic }));
  }, []);

  const toggleExtended = useCallback(() => {
    setConfig(prev => ({ ...prev, includeExtended: !prev.includeExtended }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    setError(null);
  }, []);

  return {
    config,
    tokens,
    error,
    updateConfig,
    setThemeColor,
    setScaleCount,
    toggleNeutral,
    toggleSemantic,
    toggleExtended,
    resetConfig
  };
}
