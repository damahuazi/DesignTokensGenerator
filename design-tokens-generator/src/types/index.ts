/**
 * 类型定义文件
 */

export interface ColorToken {
  name: string;
  value: string;
  type: string;
  description?: string;
  $value?: string;
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

export type SemanticColorScale = ColorToken[];

export interface SemanticColors {
  success: SemanticColorScale;
  danger: SemanticColorScale;
  warning: SemanticColorScale;
  info: SemanticColorScale;
}

export interface ExtendedSemanticColor {
  name: string;
  value: string;
  type: string;
  description?: string;
  reference?: string;
}

export interface ExtendedSemantic {
  background: {
    default: ExtendedSemanticColor;
    subtle: ExtendedSemanticColor;
    muted: ExtendedSemanticColor;
    inverse: ExtendedSemanticColor;
  };
  foreground: {
    default: ExtendedSemanticColor;
    muted: ExtendedSemanticColor;
    subtle: ExtendedSemanticColor;
    inverse: ExtendedSemanticColor;
  };
  border: {
    default: ExtendedSemanticColor;
    muted: ExtendedSemanticColor;
    subtle: ExtendedSemanticColor;
  };
  ring: {
    default: ExtendedSemanticColor;
  };
  overlay: {
    default: ExtendedSemanticColor;
  };
  accent: {
    default: ExtendedSemanticColor;
    foreground: ExtendedSemanticColor;
  };
  destructive: {
    default: ExtendedSemanticColor;
    foreground: ExtendedSemanticColor;
  };
  input: {
    default: ExtendedSemanticColor;
    border: ExtendedSemanticColor;
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
