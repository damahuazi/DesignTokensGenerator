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
  ExtendedSemantic
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
 * 将语义色转换为 Tokens Studio 格式
 */
function formatSemanticColors(semantic: SemanticColors): {
  success: Record<string, { value: string; type: string }>;
  danger: Record<string, { value: string; type: string }>;
  warning: Record<string, { value: string; type: string }>;
  info: Record<string, { value: string; type: string }>;
} {
  const formatVariant = (variant: { default: ColorToken; light: ColorToken; dark: ColorToken }) => ({
    default: { value: variant.default.value, type: 'color' },
    light: { value: variant.light.value, type: 'color' },
    dark: { value: variant.dark.value, type: 'color' }
  });

  return {
    success: formatVariant(semantic.success),
    danger: formatVariant(semantic.danger),
    warning: formatVariant(semantic.warning),
    info: formatVariant(semantic.info)
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

  // 添加主题色阶
  format.tokens.color.primary = formatThemeColorScale(tokens.themeColorScale);

  // 添加中性色阶
  if (tokens.neutralColorScale) {
    format.tokens.color.neutral = formatNeutralColorScale(tokens.neutralColorScale);
  }

  // 添加语义色
  if (tokens.semanticColors) {
    format.tokens.color.semantic = formatSemanticColors(tokens.semanticColors);
  }

  // 添加扩展语义色
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

    // 检查必需的结构
    if (!data.tokens) {
      errors.push('Missing "tokens" property');
    }

    if (!data.tokens?.color) {
      errors.push('Missing "tokens.color" property');
    }

    // 检查元数据
    if (!data.$metadata) {
      errors.push('Missing "$metadata" property');
    }

    if (!data.$metadata?.version) {
      errors.push('Missing "$metadata.version" property');
    }

    if (!data.$metadata?.generatedAt) {
      errors.push('Missing "$metadata.generatedAt" property');
    }

    // 验证颜色值格式
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
          '50': { value: '#f0f9ff', type: 'color' },
          '100': { value: '#e0f2fe', type: 'color' },
          '200': { value: '#bae6fd', type: 'color' },
          '300': { value: '#7dd3fc', type: 'color' },
          '400': { value: '#38bdf8', type: 'color' },
          '500': { value: '#0ea5e9', type: 'color' },
          '600': { value: '#0284c7', type: 'color' },
          '700': { value: '#0369a1', type: 'color' },
          '800': { value: '#075985', type: 'color' },
          '900': { value: '#0c4a6e', type: 'color' }
        },
        neutral: {
          '50': { value: '#fafafa', type: 'color' },
          '500': { value: '#71717a', type: 'color' },
          '900': { value: '#18181b', type: 'color' }
        },
        semantic: {
          success: {
            default: { value: '#22c55e', type: 'color' },
            light: { value: '#86efac', type: 'color' },
            dark: { value: '#15803d', type: 'color' }
          },
          danger: {
            default: { value: '#ef4444', type: 'color' },
            light: { value: '#fca5a5', type: 'color' },
            dark: { value: '#b91c1c', type: 'color' }
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
