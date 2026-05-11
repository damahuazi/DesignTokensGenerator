/**
 * 语义色生成算法
 */

import { hslToHex, hexToHsl } from './colorConversion';
import type { ColorToken, SemanticColors, ExtendedSemantic } from '../types';

/**
 * 生成基础语义色
 */
export function generateSemanticColors(): SemanticColors {
  return {
    success: generateSuccessColors(),
    danger: generateDangerColors(),
    warning: generateWarningColors(),
    info: generateInfoColors()
  };
}

/**
 * 生成成功色（绿色系）
 */
function generateSuccessColors(): SemanticColors['success'] {
  const greenH = 145; // 标准绿色色相
  const baseS = 60;
  const baseL = 45;

  return {
    default: {
      name: 'semantic-success-default',
      value: hslToHex(greenH, baseS, baseL),
      type: 'color',
      description: '成功色'
    },
    light: {
      name: 'semantic-success-light',
      value: hslToHex(greenH, baseS - 15, baseL + 30),
      type: 'color',
      description: '浅成功色'
    },
    dark: {
      name: 'semantic-success-dark',
      value: hslToHex(greenH, baseS + 10, baseL - 20),
      type: 'color',
      description: '深成功色'
    }
  };
}

/**
 * 生成危险色（红色系）
 */
function generateDangerColors(): SemanticColors['danger'] {
  const redH = 0; // 标准红色色相
  const baseS = 65;
  const baseL = 50;

  return {
    default: {
      name: 'semantic-danger-default',
      value: hslToHex(redH, baseS, baseL),
      type: 'color',
      description: '危险色'
    },
    light: {
      name: 'semantic-danger-light',
      value: hslToHex(redH, baseS - 15, baseL + 30),
      type: 'color',
      description: '浅危险色'
    },
    dark: {
      name: 'semantic-danger-dark',
      value: hslToHex(redH, baseS + 10, baseL - 20),
      type: 'color',
      description: '深危险色'
    }
  };
}

/**
 * 生成警告色（橙色系）
 */
function generateWarningColors(): SemanticColors['warning'] {
  const orangeH = 35; // 标准橙色色相
  const baseS = 75;
  const baseL = 55;

  return {
    default: {
      name: 'semantic-warning-default',
      value: hslToHex(orangeH, baseS, baseL),
      type: 'color',
      description: '警告色'
    },
    light: {
      name: 'semantic-warning-light',
      value: hslToHex(orangeH, baseS - 20, baseL + 25),
      type: 'color',
      description: '浅警告色'
    },
    dark: {
      name: 'semantic-warning-dark',
      value: hslToHex(orangeH, baseS + 5, baseL - 25),
      type: 'color',
      description: '深警告色'
    }
  };
}

/**
 * 生成信息色（蓝色系）
 */
function generateInfoColors(): SemanticColors['info'] {
  const blueH = 200; // 标准蓝色色相
  const baseS = 70;
  const baseL = 50;

  return {
    default: {
      name: 'semantic-info-default',
      value: hslToHex(blueH, baseS, baseL),
      type: 'color',
      description: '信息色'
    },
    light: {
      name: 'semantic-info-light',
      value: hslToHex(blueH, baseS - 15, baseL + 30),
      type: 'color',
      description: '浅信息色'
    },
    dark: {
      name: 'semantic-info-dark',
      value: hslToHex(blueH, baseS + 10, baseL - 20),
      type: 'color',
      description: '深信息色'
    }
  };
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
 * 基于主色生成语义变体
 */
export function generateSemanticVariant(
  baseColor: string,
  name: string,
  hueShift: number,
  saturationAdjust: number = 0,
  lightnessAdjust: number = 0
): ColorToken {
  const [h, s, l] = hexToHsl(baseColor);
  const newH = (h + hueShift + 360) % 360;
  const newS = Math.max(0, Math.min(100, s + saturationAdjust));
  const newL = Math.max(5, Math.min(95, l + lightnessAdjust));

  return {
    name: `semantic-${name}`,
    value: hslToHex(newH, newS, newL),
    type: 'color',
    description: `${name} 语义色`
  };
}

/**
 * 生成完整的语义色套件
 */
export function generateFullSemanticSuite(themeColor: string): {
  basic: SemanticColors;
  extended: ExtendedSemantic;
} {
  return {
    basic: generateSemanticColors(),
    extended: generateExtendedSemantic(themeColor)
  };
}

/**
 * 创建暗色主题变体
 */
export function generateDarkSemanticVariant(semantic: SemanticColors): SemanticColors {
  const darken = (color: ColorToken): ColorToken => {
    const [h, s, l] = hexToHsl(color.value);
    return {
      ...color,
      name: color.name.replace('-default', '-dark'),
      value: hslToHex(h, Math.max(0, s - 10), Math.max(10, l - 30)),
      description: `暗色${color.description}`
    };
  };

  return {
    success: {
      default: darken(semantic.success.default),
      light: semantic.success.light,
      dark: semantic.success.dark
    },
    danger: {
      default: darken(semantic.danger.default),
      light: semantic.danger.light,
      dark: semantic.danger.dark
    },
    warning: {
      default: darken(semantic.warning.default),
      light: semantic.warning.light,
      dark: semantic.warning.dark
    },
    info: {
      default: darken(semantic.info.default),
      light: semantic.info.light,
      dark: semantic.info.dark
    }
  };
}
