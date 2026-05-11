/**
 * 语义色生成算法
 */

import { hslToHex, hexToHsl } from './colorConversion';
import type { SemanticColors, SemanticColorScale, ExtendedSemantic } from '../types';

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
  const names = generateScaleNames(steps);

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    let s = 70 - position * 20;
    let l = 45 + (0.5 - Math.abs(position - 0.5)) * 40;

    s = Math.max(40, Math.min(80, s));
    l = Math.max(20, Math.min(85, l));

    scale.push({
      name: `semantic-success-${names[i]}`,
      value: hslToHex(greenH, s, l),
      type: 'color',
      description: `成功色 ${names[i]}`
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
  const names = generateScaleNames(steps);

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    let s = 75 - position * 20;
    let l = 50 + (0.5 - Math.abs(position - 0.5)) * 35;

    s = Math.max(45, Math.min(85, s));
    l = Math.max(25, Math.min(80, l));

    scale.push({
      name: `semantic-danger-${names[i]}`,
      value: hslToHex(redH, s, l),
      type: 'color',
      description: `危险色 ${names[i]}`
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
  const names = generateScaleNames(steps);

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    let s = 80 - position * 15;
    let l = 55 + (0.5 - Math.abs(position - 0.5)) * 30;

    s = Math.max(50, Math.min(85, s));
    l = Math.max(30, Math.min(85, l));

    scale.push({
      name: `semantic-warning-${names[i]}`,
      value: hslToHex(orangeH, s, l),
      type: 'color',
      description: `警告色 ${names[i]}`
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
  const names = generateScaleNames(steps);

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    let s = 75 - position * 20;
    let l = 50 + (0.5 - Math.abs(position - 0.5)) * 35;

    s = Math.max(45, Math.min(85, s));
    l = Math.max(25, Math.min(85, l));

    scale.push({
      name: `semantic-info-${names[i]}`,
      value: hslToHex(blueH, s, l),
      type: 'color',
      description: `信息色 ${names[i]}`
    });
  }

  return scale;
}

/**
 * 生成扩展语义色
 */
export function generateExtendedSemantic(
  themeColor: string
): ExtendedSemantic {
  const [themeH, themeS] = hexToHsl(themeColor);

  return {
    background: {
      default: {
        name: 'background-default',
        value: '#ffffff',
        type: 'color',
        description: '默认背景色'
      },
      subtle: {
        name: 'background-subtle',
        value: hslToHex(themeH, 10, 98),
        type: 'color',
        description: '浅背景色'
      },
      muted: {
        name: 'background-muted',
        value: hslToHex(themeH, 15, 95),
        type: 'color',
        description: '柔和背景色'
      },
      inverse: {
        name: 'background-inverse',
        value: hslToHex(themeH, themeS, 15),
        type: 'color',
        description: '反色背景'
      }
    },
    foreground: {
      default: {
        name: 'foreground-default',
        value: hslToHex(themeH, 10, 10),
        type: 'color',
        description: '默认文字色'
      },
      muted: {
        name: 'foreground-muted',
        value: hslToHex(themeH, 5, 45),
        type: 'color',
        description: '柔和文字色'
      },
      subtle: {
        name: 'foreground-subtle',
        value: hslToHex(themeH, 5, 60),
        type: 'color',
        description: '浅文字色'
      },
      inverse: {
        name: 'foreground-inverse',
        value: '#ffffff',
        type: 'color',
        description: '反色文字'
      }
    },
    border: {
      default: {
        name: 'border-default',
        value: hslToHex(themeH, 10, 90),
        type: 'color',
        description: '默认边框色'
      },
      muted: {
        name: 'border-muted',
        value: hslToHex(themeH, 8, 85),
        type: 'color',
        description: '柔和边框色'
      },
      subtle: {
        name: 'border-subtle',
        value: hslToHex(themeH, 5, 95),
        type: 'color',
        description: '浅边框色'
      }
    },
    ring: {
      default: {
        name: 'ring-default',
        value: themeColor,
        type: 'color',
        description: '焦点环颜色'
      }
    },
    overlay: {
      default: {
        name: 'overlay-default',
        value: 'rgba(0, 0, 0, 0.5)',
        type: 'color',
        description: '遮罩层'
      }
    },
    accent: {
      default: {
        name: 'accent-default',
        value: themeColor,
        type: 'color',
        description: '强调色'
      },
      foreground: {
        name: 'accent-foreground',
        value: hslToHex(themeH, Math.min(themeS, 90), 98),
        type: 'color',
        description: '强调色上的文字'
      }
    },
    destructive: {
      default: {
        name: 'destructive-default',
        value: hslToHex(0, 65, 50),
        type: 'color',
        description: '破坏性操作色'
      },
      foreground: {
        name: 'destructive-foreground',
        value: '#ffffff',
        type: 'color',
        description: '破坏性操作色上的文字'
      }
    },
    input: {
      default: {
        name: 'input-default',
        value: hslToHex(themeH, 10, 98),
        type: 'color',
        description: '输入框背景'
      },
      border: {
        name: 'input-border',
        value: hslToHex(themeH, 10, 85),
        type: 'color',
        description: '输入框边框'
      }
    }
  };
}

/**
 * 生成色阶命名
 */
function generateScaleNames(steps: number): string[] {
  if (steps === 5) {
    return ['100', '200', '300', '400', '500'];
  }
  if (steps === 10) {
    return ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  }
  if (steps === 13) {
    return ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  }

  const names: string[] = [];
  const standardNames = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  if (steps <= standardNames.length) {
    const step = Math.floor(standardNames.length / steps);
    for (let i = 0; i < steps; i++) {
      const index = Math.min(i * step, standardNames.length - 1);
      names.push(standardNames[index]);
    }
  } else {
    for (let i = 0; i < steps; i++) {
      const value = Math.round((i / (steps - 1)) * 1000);
      names.push(String(value));
    }
  }

  return names;
}
