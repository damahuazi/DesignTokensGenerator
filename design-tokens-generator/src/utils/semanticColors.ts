/**
 * 语义色生成算法
 */

import { hslToHex } from './colorConversion';
import type { SemanticColors, SemanticColorScale, ExtendedSemantic, ColorToken } from '../types';

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
 * 生成扩展语义色（引用基础色阶）
 */
export function generateExtendedSemantic(
  themeColorScale: ColorToken[],
  neutralColorScale: ColorToken[],
  semanticColors: SemanticColors,
  scaleCount: number
): ExtendedSemantic {
  const midIndex = Math.floor(scaleCount / 2);

  return {
    background: {
      default: {
        name: 'background-default',
        value: '#ffffff',
        type: 'color',
        description: '默认背景色 - 继承 white'
      },
      subtle: {
        name: 'background-subtle',
        value: neutralColorScale[Math.floor(scaleCount * 0.98)].value,
        type: 'color',
        description: `浅背景色 - 继承 neutral.${Math.floor(scaleCount * 0.98)}`
      },
      muted: {
        name: 'background-muted',
        value: neutralColorScale[Math.floor(scaleCount * 0.95)].value,
        type: 'color',
        description: `柔和背景色 - 继承 neutral.${Math.floor(scaleCount * 0.95)}`
      },
      inverse: {
        name: 'background-inverse',
        value: themeColorScale[scaleCount - 1].value,
        type: 'color',
        description: `反色背景 - 继承 primary.${scaleCount - 1}`
      }
    },
    foreground: {
      default: {
        name: 'foreground-default',
        value: neutralColorScale[1].value,
        type: 'color',
        description: `默认文字色 - 继承 neutral.1`
      },
      muted: {
        name: 'foreground-muted',
        value: neutralColorScale[Math.floor(scaleCount * 0.5)].value,
        type: 'color',
        description: `柔和文字色 - 继承 neutral.${Math.floor(scaleCount * 0.5)}`
      },
      subtle: {
        name: 'foreground-subtle',
        value: neutralColorScale[Math.floor(scaleCount * 0.7)].value,
        type: 'color',
        description: `浅文字色 - 继承 neutral.${Math.floor(scaleCount * 0.7)}`
      },
      inverse: {
        name: 'foreground-inverse',
        value: '#ffffff',
        type: 'color',
        description: '反色文字 - 继承 white'
      }
    },
    border: {
      default: {
        name: 'border-default',
        value: neutralColorScale[Math.floor(scaleCount * 0.85)].value,
        type: 'color',
        description: `默认边框色 - 继承 neutral.${Math.floor(scaleCount * 0.85)}`
      },
      muted: {
        name: 'border-muted',
        value: neutralColorScale[Math.floor(scaleCount * 0.8)].value,
        type: 'color',
        description: `柔和边框色 - 继承 neutral.${Math.floor(scaleCount * 0.8)}`
      },
      subtle: {
        name: 'border-subtle',
        value: neutralColorScale[Math.floor(scaleCount * 0.95)].value,
        type: 'color',
        description: `浅边框色 - 继承 neutral.${Math.floor(scaleCount * 0.95)}`
      }
    },
    ring: {
      default: {
        name: 'ring-default',
        value: themeColorScale[midIndex].value,
        type: 'color',
        description: `焦点环 - 继承 primary.${midIndex}`
      }
    },
    overlay: {
      default: {
        name: 'overlay-default',
        value: neutralColorScale[scaleCount - 2].value,
        type: 'color',
        description: `遮罩层 - 继承 neutral.${scaleCount - 2}`
      }
    },
    accent: {
      default: {
        name: 'accent-default',
        value: themeColorScale[midIndex].value,
        type: 'color',
        description: `强调色 - 继承 primary.${midIndex}`
      },
      foreground: {
        name: 'accent-foreground',
        value: neutralColorScale[Math.floor(scaleCount * 0.98)].value,
        type: 'color',
        description: `强调色上的文字 - 继承 neutral.${Math.floor(scaleCount * 0.98)}`
      }
    },
    destructive: {
      default: {
        name: 'destructive-default',
        value: semanticColors.danger[midIndex].value,
        type: 'color',
        description: `破坏性操作 - 继承 semantic-danger.${midIndex}`
      },
      foreground: {
        name: 'destructive-foreground',
        value: '#ffffff',
        type: 'color',
        description: '破坏性操作色上的文字 - 继承 white'
      }
    },
    input: {
      default: {
        name: 'input-default',
        value: neutralColorScale[0].value,
        type: 'color',
        description: `输入框背景 - 继承 neutral.0`
      },
      border: {
        name: 'input-border',
        value: neutralColorScale[Math.floor(scaleCount * 0.8)].value,
        type: 'color',
        description: `输入框边框 - 继承 neutral.${Math.floor(scaleCount * 0.8)}`
      }
    }
  };
}
