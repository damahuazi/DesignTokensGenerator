/**
 * Tokens Studio JSON 格式化工具
 */

import type {
  ColorToken,
  GeneratedTokens,
  ExportFormat,
  ThemeColorScale,
  NeutralColorScale,
  SemanticColors,
  ExtendedSemantic,
  SemanticColorScale
} from '../types';

/**
 * 将主题色阶转换为 Tokens Studio 格式
 */
function formatThemeColorScale(scale: ThemeColorScale): Record<string, { value: string; type: string }> {
  const result: Record<string, { value: string; type: string }> = {};

  scale.scale.forEach((color: ColorToken) => {
    const key = color.name.replace('primary-', '');
    result[key] = {
      value: color.value,
      type: color.type
    };
  });

  return result;
}

/**
 * 将中性色阶转换为 Tokens Studio 格式
 */
function formatNeutralColorScale(scale: NeutralColorScale): Record<string, { value: string; type: string }> {
  const result: Record<string, { value: string; type: string }> = {};

  scale.scale.forEach((color: ColorToken) => {
    const key = color.name.replace('neutral-', '');
    result[key] = {
      value: color.value,
      type: color.type
    };
  });

  return result;
}

/**
 * 将语义色阶数组转换为 Tokens Studio 格式
 */
function formatSemanticColorScale(scale: SemanticColorScale): Record<string, { value: string; type: string }> {
  const result: Record<string, { value: string; type: string }> = {};

  scale.forEach((color: ColorToken) => {
    const key = color.name.replace(/semantic-\w+-/, '');
    result[key] = {
      value: color.value,
      type: color.type
    };
  });

  return result;
}

/**
 * 将语义色转换为 Tokens Studio 格式
 */
function formatSemanticColors(semantic: SemanticColors): {
  success: Record<string, { value: string; type: string }>;
  danger: Record<string, { value: string; type: string }>;
  warning: Record<string, { value: string; type: string }>;
  info: Record<string, { value: string; type: string }>;
} {
  return {
    success: formatSemanticColorScale(semantic.success),
    danger: formatSemanticColorScale(semantic.danger),
    warning: formatSemanticColorScale(semantic.warning),
    info: formatSemanticColorScale(semantic.info)
  };
}

/**
 * 将扩展语义色转换为 Tokens Studio 格式
 */
function formatExtendedSemantic(extended: ExtendedSemantic): Record<string, Record<string, { value: string; type: string }>> {
  const result: Record<string, Record<string, { value: string; type: string }>> = {};

  const processGroup = (group: Record<string, ColorToken>, groupName: string) => {
    result[groupName] = {};
    Object.entries(group).forEach(([key, color]) => {
      result[groupName][key] = {
        value: color.value,
        type: color.type
      };
    });
  };

  processGroup(extended.background, 'background');
  processGroup(extended.foreground, 'foreground');
  processGroup(extended.border, 'border');
  processGroup(extended.ring, 'ring');
  processGroup(extended.overlay, 'overlay');
  processGroup(extended.accent, 'accent');
  processGroup(extended.destructive, 'destructive');
  processGroup(extended.input, 'input');

  return result;
}

/**
 * 将完整的设计变量转换为 Tokens Studio JSON 格式
 */
export function formatTokensForExport(tokens: GeneratedTokens): ExportFormat {
  const format: ExportFormat = {
    tokens: {
      color: {}
    },
    $metadata: {
      version: tokens.metadata.version,
      generatedAt: tokens.metadata.generatedAt
    }
  };

  format.tokens.color.primary = formatThemeColorScale(tokens.themeColorScale);

  if (tokens.neutralColorScale) {
    format.tokens.color.neutral = formatNeutralColorScale(tokens.neutralColorScale);
  }

  if (tokens.semanticColors) {
    format.tokens.color.semantic = formatSemanticColors(tokens.semanticColors);
  }

  if (tokens.extendedSemantic) {
    format.tokens.color.extended = formatExtendedSemantic(tokens.extendedSemantic);
  }

  return format;
}

/**
 * 生成完整的 Tokens Studio 兼容 JSON 字符串
 */
export function generateTokensStudioJson(tokens: GeneratedTokens, pretty: boolean = true): string {
  const format = formatTokensForExport(tokens);
  return pretty ? JSON.stringify(format, null, 2) : JSON.stringify(format);
}

/**
 * 下载 JSON 文件
 */
export function downloadTokensJson(tokens: GeneratedTokens, filename: string = 'design-tokens.json'): void {
  const json = generateTokensStudioJson(tokens);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * 复制 JSON 到剪贴板
 */
export async function copyTokensToClipboard(tokens: GeneratedTokens): Promise<boolean> {
  try {
    const json = generateTokensStudioJson(tokens);
    await navigator.clipboard.writeText(json);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * 生成变量名映射（用于不同命名规范）
 */
export function generateVariableNameMapping(): Record<string, string> {
  return {
    primary: 'color-primary',
    neutral: 'color-neutral',
    success: 'color-success',
    danger: 'color-danger',
    warning: 'color-warning',
    info: 'color-info',
    background: 'color-background',
    foreground: 'color-foreground',
    border: 'color-border',
    accent: 'color-accent',
    destructive: 'color-destructive'
  };
}

/**
 * 验证 Tokens Studio JSON 结构
 */
export function validateTokensStudioJson(json: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    const data = JSON.parse(json);

    if (!data.tokens) {
      errors.push('Missing "tokens" property');
    }

    if (!data.tokens?.color) {
      errors.push('Missing "tokens.color" property');
    }

    if (!data.$metadata) {
      errors.push('Missing "$metadata" property');
    }

    if (!data.$metadata?.version) {
      errors.push('Missing "$metadata.version" property');
    }

    if (!data.$metadata?.generatedAt) {
      errors.push('Missing "$metadata.generatedAt" property');
    }

    const validateColorValues = (obj: any, path: string = 'root') => {
      if (typeof obj === 'object' && obj !== null) {
        if (obj.value && typeof obj.value === 'string') {
          if (!/^#[0-9A-Fa-f]{6}$/.test(obj.value) &&
              !/^rgba?\(/.test(obj.value)) {
            errors.push(`Invalid color value at ${path}`);
          }
        } else if (obj.type === 'color' && !obj.value) {
          errors.push(`Missing value for color at ${path}`);
        } else {
          Object.entries(obj).forEach(([key, value]) => {
            validateColorValues(value, `${path}.${key}`);
          });
        }
      }
    };

    if (data.tokens?.color) {
      validateColorValues(data.tokens.color);
    }

  } catch (e) {
    errors.push('Invalid JSON format');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 生成示例 Tokens Studio JSON
 */
export function generateSampleTokensStudioJson(): ExportFormat {
  return {
    tokens: {
      color: {
        primary: {
          '0': { value: '#f0f9ff', type: 'color' },
          '1': { value: '#e0f2fe', type: 'color' },
          '2': { value: '#bae6fd', type: 'color' },
          '3': { value: '#7dd3fc', type: 'color' },
          '4': { value: '#38bdf8', type: 'color' },
          '5': { value: '#0ea5e9', type: 'color' },
          '6': { value: '#0284c7', type: 'color' },
          '7': { value: '#0369a1', type: 'color' },
          '8': { value: '#075985', type: 'color' },
          '9': { value: '#0c4a6e', type: 'color' }
        },
        neutral: {
          '0': { value: '#fafafa', type: 'color' },
          '5': { value: '#71717a', type: 'color' },
          '9': { value: '#18181b', type: 'color' }
        },
        semantic: {
          success: {
            '0': { value: '#f0fdf4', type: 'color' },
            '5': { value: '#22c55e', type: 'color' },
            '9': { value: '#14532d', type: 'color' }
          },
          danger: {
            '0': { value: '#fef2f2', type: 'color' },
            '5': { value: '#ef4444', type: 'color' },
            '9': { value: '#7f1d1d', type: 'color' }
          }
        }
      }
    },
    $metadata: {
      version: '1.0',
      generatedAt: new Date().toISOString()
    }
  };
}
