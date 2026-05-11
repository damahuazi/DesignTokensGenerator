/**
 * 设计变量生成器 - 类型定义文件
 */

export interface ColorToken {
  name: string;
  value: string;
  type: string;
  description?: string;
}

export interface TokenGroup {
  name: string;
  colors: ColorToken[];
}

export interface ThemeColorScale {
  name: string;
  scale: ColorToken[];
}

export interface NeutralColorScale {
  name: string;
  scale: ColorToken[];
}

export interface SemanticColors {
  success: {
    default: ColorToken;
    light: ColorToken;
    dark: ColorToken;
  };
  danger: {
    default: ColorToken;
    light: ColorToken;
    dark: ColorToken;
  };
  warning: {
    default: ColorToken;
    light: ColorToken;
    dark: ColorToken;
  };
  info: {
    default: ColorToken;
    light: ColorToken;
    dark: ColorToken;
  };
}

export interface ExtendedSemantic {
  background: {
    default: ColorToken;
    subtle: ColorToken;
    muted: ColorToken;
    inverse: ColorToken;
  };
  foreground: {
    default: ColorToken;
    muted: ColorToken;
    subtle: ColorToken;
    inverse: ColorToken;
  };
  border: {
    default: ColorToken;
    muted: ColorToken;
    subtle: ColorToken;
  };
  ring: {
    default: ColorToken;
  };
  overlay: {
    default: ColorToken;
  };
  accent: {
    default: ColorToken;
    foreground: ColorToken;
  };
  destructive: {
    default: ColorToken;
    foreground: ColorToken;
  };
  input: {
    default: ColorToken;
    border: ColorToken;
  };
}

export interface ColorConfig {
  themeColor: string;
  scaleCount: number;
  namingConvention: 'numeric' | 'tint-shade';
  includeNeutral: boolean;
  includeSemantic: boolean;
  includeExtended: boolean;
}

export interface GeneratedTokens {
  themeColorScale: ThemeColorScale;
  neutralColorScale: NeutralColorScale;
  semanticColors: SemanticColors;
  extendedSemantic: ExtendedSemantic;
  metadata: {
    version: string;
    generatedAt: string;
    themeColor: string;
  };
}

export interface ExportFormat {
  tokens: {
    color: {
      primary?: Record<string, { value: string; type: string }>;
      neutral?: Record<string, { value: string; type: string }>;
      semantic?: {
        success?: Record<string, { value: string; type: string }>;
        danger?: Record<string, { value: string; type: string }>;
        warning?: Record<string, { value: string; type: string }>;
        info?: Record<string, { value: string; type: string }>;
      };
      extended?: Record<string, Record<string, { value: string; type: string }>>;
    };
  };
  $metadata: {
    version: string;
    generatedAt: string;
  };
}

export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export interface PresetColor {
  name: string;
  value: string;
}

export const PRESET_COLORS: PresetColor[] = [
  { name: '紫罗兰', value: '#6366F1' },
  { name: '蓝宝石', value: '#0EA5E9' },
  { name: '翡翠', value: '#22C55E' },
  { name: '琥珀', value: '#F59E0B' },
  { name: '玫瑰', value: '#F43F5E' },
  { name: '品红', value: '#D946EF' },
  { name: '青色', value: '#14B8A6' },
  { name: '橙红', value: '#F97316' },
];

export const DEFAULT_CONFIG: ColorConfig = {
  themeColor: '#6366F1',
  scaleCount: 10,
  namingConvention: 'numeric',
  includeNeutral: true,
  includeSemantic: true,
  includeExtended: true,
};
