/**
 * 色阶生成算法
 */

import { hslToHex, hexToHsl } from './colorConversion';
import type { ColorToken } from '../types';

/**
 * 生成主题色阶
 */
export function generateThemeColorScale(
  baseColor: string,
  steps: number = 10
): ColorToken[] {
  const [baseH, baseS, baseL] = hexToHsl(baseColor);
  const scale: ColorToken[] = [];

  const names = generateScaleNames(steps);

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);

    let s = baseS;
    let l: number;

    if (position <= 0.5) {
      l = 95 - (position * 2) * 75;
      s = baseS - 10 + (position * 2) * 15;
    } else {
      const darkPos = (position - 0.5) * 2;
      l = 20 + (1 - darkPos) * 55;
      s = baseS + 5 - darkPos * 10;
    }

    s = Math.max(5, Math.min(100, s));
    l = Math.max(5, Math.min(95, l));

    let hex = hslToHex(baseH, s, l);

    if (i === Math.floor(steps / 2)) {
      hex = baseColor;
      l = baseL;
    }

    scale.push({
      name: `primary-${names[i]}`,
      value: hex,
      type: 'color',
      description: `${names[i]} 主题色阶`
    });
  }

  return scale;
}

/**
 * 生成中性灰阶级
 */
export function generateNeutralColorScale(
  steps: number = 10
): ColorToken[] {
  const scale: ColorToken[] = [];
  const names = generateScaleNames(steps);

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    const l = 95 - position * 90;
    const s = Math.max(0, 3 - position * 3);

    const hex = hslToHex(0, s, l);
    scale.push({
      name: `neutral-${names[i]}`,
      value: hex,
      type: 'color',
      description: `${names[i]} 中性灰`
    });
  }

  return scale;
}

/**
 * 生成扩展中性色（冷灰和暖灰）
 */
export function generateExtendedNeutrals(): ColorToken[] {
  const neutrals: ColorToken[] = [];

  for (let i = 0; i <= 900; i += 100) {
    if (i === 0) i = 50;
    const l = 95 - (i / 900) * 85;
    neutrals.push({
      name: `gray-${i}`,
      value: hslToHex(0, 0, l),
      type: 'color',
      description: `灰色 ${i}`
    });
    if (i === 50) i = 0;
  }

  const coolGrayHue = 220;
  for (let i = 50; i <= 700; i += 100) {
    const l = 92 - (i / 700) * 70;
    neutrals.push({
      name: `cool-gray-${i}`,
      value: hslToHex(coolGrayHue, 5, l),
      type: 'color',
      description: `冷灰 ${i}`
    });
  }

  const warmGrayHue = 30;
  for (let i = 50; i <= 700; i += 100) {
    const l = 90 - (i / 700) * 65;
    neutrals.push({
      name: `warm-gray-${i}`,
      value: hslToHex(warmGrayHue, 5, l),
      type: 'color',
      description: `暖灰 ${i}`
    });
  }

  return neutrals;
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

/**
 * 生成互补色阶
 */
export function generateComplementaryScale(baseColor: string, steps: number = 5): ColorToken[] {
  const [h, s] = hexToHsl(baseColor);
  const complementaryH = (h + 180) % 360;
  const scale: ColorToken[] = [];

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    const newL = 95 - position * 75;
    const newS = s + (position > 0.5 ? 5 : -5);

    const hex = hslToHex(complementaryH, newS, newL);
    scale.push({
      name: `complementary-${(i + 1) * 100}`,
      value: hex,
      type: 'color',
      description: `互补色 ${(i + 1) * 100}`
    });
  }

  return scale;
}

/**
 * 生成三角色阶
 */
export function generateTriadicScales(baseColor: string, steps: number = 5): { scale1: ColorToken[]; scale2: ColorToken[] } {
  const [h, s] = hexToHsl(baseColor);
  const hue2 = (h + 120) % 360;
  const hue3 = (h + 240) % 360;

  const generateScale = (hue: number): ColorToken[] => {
    const scale: ColorToken[] = [];
    for (let i = 0; i < steps; i++) {
      const position = i / (steps - 1);
      const newL = 95 - position * 75;
      const newS = s + (position > 0.5 ? 5 : -5);

      scale.push({
        name: `triadic-${hue}-${(i + 1) * 100}`,
        value: hslToHex(hue, newS, newL),
        type: 'color',
        description: `三角色 ${hue}`
      });
    }
    return scale;
  };

  return {
    scale1: generateScale(hue2),
    scale2: generateScale(hue3)
  };
}

/**
 * 生成相似色阶
 */
export function generateAnalogousScales(baseColor: string, steps: number = 5): { left: ColorToken[]; right: ColorToken[] } {
  const [h, s] = hexToHsl(baseColor);
  const hueShift = 30;

  const generateScale = (hue: number): ColorToken[] => {
    const scale: ColorToken[] = [];
    for (let i = 0; i < steps; i++) {
      const position = i / (steps - 1);
      const newL = 95 - position * 75;
      const newS = s + (position > 0.5 ? 5 : -5);

      scale.push({
        name: `analogous-${hue}-${(i + 1) * 100}`,
        value: hslToHex(hue, newS, newL),
        type: 'color',
        description: `相似色 ${hue}`
      });
    }
    return scale;
  };

  return {
    left: generateScale((h - hueShift + 360) % 360),
    right: generateScale((h + hueShift) % 360)
  };
}
