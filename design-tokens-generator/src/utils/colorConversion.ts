/**
 * 颜色格式转换工具
 */

/**
 * 将 HEX 颜色转换为 RGB
 */
export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  if (!result) {
    throw new Error('Invalid HEX color');
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}

/**
 * 将 RGBA/RGB 字符串解析为 RGB 值
 */
export function parseColor(color: string): [number, number, number] {
  if (color.startsWith('#')) {
    return hexToRgb(color);
  }
  
  const rgbaMatch = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+\s*)?\)/i.exec(color);
  if (rgbaMatch) {
    return [
      parseInt(rgbaMatch[1], 10),
      parseInt(rgbaMatch[2], 10),
      parseInt(rgbaMatch[3], 10)
    ];
  }
  
  return [128, 128, 128];
}

/**
 * 将 RGB 转换为 HEX
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 将 HEX 颜色转换为 HSL
 */
export function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * 将 HSL 转换为 HEX
 */
export function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = lNorm - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 将 RGB 转换为 HSL
 */
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  return hexToHsl(rgbToHex(r, g, b));
}

/**
 * 验证 HEX 颜色格式
 */
export function isValidHex(hex: string): boolean {
  return /^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(hex);
}

/**
 * 规范化 HEX 颜色（添加 # 前缀，转为 6 位）
 */
export function normalizeHex(hex: string): string {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  return `#${h.toLowerCase()}`;
}

/**
 * 调整颜色亮度
 */
export function adjustLightness(hex: string, amount: number): string {
  const [h, s, l] = hexToHsl(hex);
  const newL = Math.max(0, Math.min(100, l + amount));
  return hslToHex(h, s, newL);
}

/**
 * 调整颜色饱和度
 */
export function adjustSaturation(hex: string, amount: number): string {
  const [h, s, l] = hexToHsl(hex);
  const newS = Math.max(0, Math.min(100, s + amount));
  return hslToHex(h, newS, l);
}

/**
 * 获取颜色的对比色（黑或白）
 */
export function getContrastColor(color: string): string {
  try {
    const [r, g, b] = parseColor(color);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  } catch (e) {
    return '#000000';
  }
}

/**
 * 计算 WCAG 对比度
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (c: string) => {
    const [r, g, b] = parseColor(c).map(v => {
      const sRGB = v / 255;
      return sRGB <= 0.03928
        ? sRGB / 12.92
        : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * 判断对比度是否符合 WCAG AA 标准
 */
export function meetsWCAG_AA(hex1: string, hex2: string, largeText: boolean = false): boolean {
  const ratio = getContrastRatio(hex1, hex2);
  return largeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * 混合两个颜色
 */
export function mixColors(hex1: string, hex2: string, weight: number = 0.5): string {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const w = Math.max(0, Math.min(1, weight));

  return rgbToHex(
    Math.round(r1 * w + r2 * (1 - w)),
    Math.round(g1 * w + g2 * (1 - w)),
    Math.round(b1 * w + b2 * (1 - w))
  );
}

/**
 * 创建颜色的透明变体
 */
export function withOpacity(hex: string, opacity: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, opacity))})`;
}

/**
 * 色相旋转
 */
export function rotateHue(hex: string, degrees: number): string {
  const [h, s, l] = hexToHsl(hex);
  const newH = (h + degrees + 360) % 360;
  return hslToHex(newH, s, l);
}

/**
 * 获取颜色名称（简化版）
 */
export function getColorName(hex: string): string {
  const [h, s, l] = hexToHsl(hex);

  if (s < 5) {
    if (l < 10) return '黑色';
    if (l < 30) return '深灰';
    if (l < 50) return '灰色';
    if (l < 70) return '浅灰';
    if (l < 90) return '白色';
    return '白色';
  }

  const hueNames: Record<string, string> = {
    '0-15': '红色',
    '15-45': '橙红',
    '45-75': '橙色',
    '75-105': '琥珀',
    '105-135': '黄色',
    '135-165': '黄绿',
    '165-195': '绿色',
    '195-225': '青绿',
    '225-255': '青色',
    '255-285': '蓝绿',
    '285-315': '蓝色',
    '315-345': '蓝紫',
    '345-360': '紫色'
  };

  for (const [range, name] of Object.entries(hueNames)) {
    const [start, end] = range.split('-').map(Number);
    if (h >= start && h < end) {
      if (l > 70) return `浅${name}`;
      if (l < 30) return `深${name}`;
      return name;
    }
  }

  return '未知';
}
