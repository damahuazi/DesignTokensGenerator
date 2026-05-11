/**
 * 语义色生成算法
 */

import { hslToHex } from './colorConversion';
import type { SemanticColors, SemanticColorScale, ExtendedSemantic, ExtendedSemanticColor } from '../types';

/**
 * 生成基础语义色
 */
export function generateSemanticColors(scaleCount: number): SemanticColors {
  return {
    success: generateSuccessColorScale(scaleCount),
    danger: generateDangerColorScale(scaleCount),
    warning: generateWarningColorScale(scaleCount),
    info: generateInfoColorScale(scaleCount)
  };
}

/**
 * 生成成功色阶（绿色系）
 */
function generateSuccessColorScale(steps: number): SemanticColorScale {
  const greenH = 145;
  const scale: SemanticColorScale = [];

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    let s = 70 - position * 20;
    let l = 45 + (0.5 - Math.abs(position - 0.5)) * 40;

    s = Math.max(40, Math.min(80, s));
    l = Math.max(20, Math.min(85, l));

    scale.push({
      name: `semantic-success-${i}`,
      value: hslToHex(greenH, s, l),
      type: 'color',
      description: `成功色阶 ${i}`
    });
  }

  return scale;
}

/**
 * 生成危险色阶（红色系）
 */
function generateDangerColorScale(steps: number): SemanticColorScale {
  const redH = 0;
  const scale: SemanticColorScale = [];

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    let s = 75 - position * 20;
    let l = 50 + (0.5 - Math.abs(position - 0.5)) * 35;

    s = Math.max(45, Math.min(85, s));
    l = Math.max(25, Math.min(80, l));

    scale.push({
      name: `semantic-danger-${i}`,
      value: hslToHex(redH, s, l),
      type: 'color',
      description: `危险色阶 ${i}`
    });
  }

  return scale;
}

/**
 * 生成警告色阶（橙色系）
 */
function generateWarningColorScale(steps: number): SemanticColorScale {
  const orangeH = 35;
  const scale: SemanticColorScale = [];

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    let s = 80 - position * 15;
    let l = 55 + (0.5 - Math.abs(position - 0.5)) * 30;

    s = Math.max(50, Math.min(85, s));
    l = Math.max(30, Math.min(85, l));

    scale.push({
      name: `semantic-warning-${i}`,
      value: hslToHex(orangeH, s, l),
      type: 'color',
      description: `警告色阶 ${i}`
    });
  }

  return scale;
}

/**
 * 生成信息色阶（蓝色系）
 */
function generateInfoColorScale(steps: number): SemanticColorScale {
  const blueH = 200;
  const scale: SemanticColorScale = [];

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    let s = 75 - position * 20;
    let l = 50 + (0.5 - Math.abs(position - 0.5)) * 35;

    s = Math.max(45, Math.min(85, s));
    l = Math.max(25, Math.min(85, l));

    scale.push({
      name: `semantic-info-${i}`,
      value: hslToHex(blueH, s, l),
      type: 'color',
      description: `信息色阶 ${i}`
    });
  }

  return scale;
}

/**
 * 创建带引用的扩展语义色
 */
function createReferencedColor(
  name: string,
  value: string,
  reference: string,
  description: string
): ExtendedSemanticColor {
  return {
    name,
    value,
    type: 'color',
    description,
    reference
  };
}

/**
 * 创建固定值的扩展语义色
 */
function createStaticColor(
  name: string,
  value: string,
  description: string
): ExtendedSemanticColor {
  return {
    name,
    value,
    type: 'color',
    description
  };
}

/**
 * 生成扩展语义色（使用引用语法）
 */
export function generateExtendedSemantic(
  themeColorScale: { name: string; scale: { name: string; value: string }[] },
  neutralColorScale: { name: string; scale: { name: string; value: string }[] },
  semanticColors: SemanticColors,
  scaleCount: number
): ExtendedSemantic {
  const midIndex = Math.floor(scaleCount / 2);
  const neutralLastIndex = Math.floor(scaleCount * 0.98);
  const neutralMidIndex = Math.floor(scaleCount * 0.95);
  const neutralBorderIndex = Math.floor(scaleCount * 0.85);
  const neutralBorderMutedIndex = Math.floor(scaleCount * 0.8);
  const neutralSubtleIndex = Math.floor(scaleCount * 0.7);
  const neutralMutedIndex = Math.floor(scaleCount * 0.5);

  return {
    background: {
      default: createStaticColor(
        'background-default',
        '#ffffff',
        '默认背景色 - 固定值 white'
      ),
      subtle: createReferencedColor(
        'background-subtle',
        neutralColorScale.scale[neutralLastIndex].value,
        `{color.neutral.${neutralLastIndex}}`,
        `浅背景色 - 引用 neutral.${neutralLastIndex}`
      ),
      muted: createReferencedColor(
        'background-muted',
        neutralColorScale.scale[neutralMidIndex].value,
        `{color.neutral.${neutralMidIndex}}`,
        `柔和背景色 - 引用 neutral.${neutralMidIndex}`
      ),
      inverse: createReferencedColor(
        'background-inverse',
        themeColorScale.scale[scaleCount - 1].value,
        `{color.primary.${scaleCount - 1}}`,
        `反色背景 - 引用 primary.${scaleCount - 1}`
      )
    },
    foreground: {
      default: createReferencedColor(
        'foreground-default',
        neutralColorScale.scale[1].value,
        '{color.neutral.1}',
        '默认文字色 - 引用 neutral.1'
      ),
      muted: createReferencedColor(
        'foreground-muted',
        neutralColorScale.scale[neutralMutedIndex].value,
        `{color.neutral.${neutralMutedIndex}}`,
        `柔和文字色 - 引用 neutral.${neutralMutedIndex}`
      ),
      subtle: createReferencedColor(
        'foreground-subtle',
        neutralColorScale.scale[neutralSubtleIndex].value,
        `{color.neutral.${neutralSubtleIndex}}`,
        `浅文字色 - 引用 neutral.${neutralSubtleIndex}`
      ),
      inverse: createStaticColor(
        'foreground-inverse',
        '#ffffff',
        '反色文字 - 固定值 white'
      )
    },
    border: {
      default: createReferencedColor(
        'border-default',
        neutralColorScale.scale[neutralBorderIndex].value,
        `{color.neutral.${neutralBorderIndex}}`,
        `默认边框色 - 引用 neutral.${neutralBorderIndex}`
      ),
      muted: createReferencedColor(
        'border-muted',
        neutralColorScale.scale[neutralBorderMutedIndex].value,
        `{color.neutral.${neutralBorderMutedIndex}}`,
        `柔和边框色 - 引用 neutral.${neutralBorderMutedIndex}`
      ),
      subtle: createReferencedColor(
        'border-subtle',
        neutralColorScale.scale[neutralMidIndex].value,
        `{color.neutral.${neutralMidIndex}}`,
        `浅边框色 - 引用 neutral.${neutralMidIndex}`
      )
    },
    ring: {
      default: createReferencedColor(
        'ring-default',
        themeColorScale.scale[midIndex].value,
        `{color.primary.${midIndex}}`,
        `焦点环 - 引用 primary.${midIndex}`
      )
    },
    overlay: {
      default: createReferencedColor(
        'overlay-default',
        neutralColorScale.scale[scaleCount - 2].value,
        `{color.neutral.${scaleCount - 2}}`,
        `遮罩层 - 引用 neutral.${scaleCount - 2}`
      )
    },
    accent: {
      default: createReferencedColor(
        'accent-default',
        themeColorScale.scale[midIndex].value,
        `{color.primary.${midIndex}}`,
        `强调色 - 引用 primary.${midIndex}`
      ),
      foreground: createReferencedColor(
        'accent-foreground',
        neutralColorScale.scale[neutralLastIndex].value,
        `{color.neutral.${neutralLastIndex}}`,
        `强调色上的文字 - 引用 neutral.${neutralLastIndex}`
      )
    },
    destructive: {
      default: createReferencedColor(
        'destructive-default',
        semanticColors.danger[midIndex].value,
        `{color.semantic.danger.${midIndex}}`,
        `破坏性操作 - 引用 semantic.danger.${midIndex}`
      ),
      foreground: createStaticColor(
        'destructive-foreground',
        '#ffffff',
        '破坏性操作色上的文字 - 固定值 white'
      )
    },
    input: {
      default: createReferencedColor(
        'input-default',
        neutralColorScale.scale[0].value,
        '{color.neutral.0}',
        '输入框背景 - 引用 neutral.0'
      ),
      border: createReferencedColor(
        'input-border',
        neutralColorScale.scale[neutralBorderMutedIndex].value,
        `{color.neutral.${neutralBorderMutedIndex}}`,
        `输入框边框 - 引用 neutral.${neutralBorderMutedIndex}`
      )
    }
  };
}
