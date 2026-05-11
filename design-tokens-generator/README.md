# Design Tokens Generator

一个用于生成设计系统变量的 Web 工具，支持导出 Tokens Studio 兼容的 JSON 格式。

## 功能特性

- 🎨 **主题色生成**：输入主题色，自动生成完整的色阶
- 🔢 **自定义色阶**：支持 3-20 阶颜色生成
- ⚪ **中性色生成**：基于主题色自动生成配套的中性灰阶
- 🎯 **语义色生成**：自动生成成功、危险、警告、信息等语义色
- 🔗 **引用支持**：扩展语义色引用基础色，修改基础色时自动更新
- 📤 **导出功能**：支持复制和下载 Tokens Studio 格式的 JSON 文件

## 使用方法

### 1. 启动开发服务器

```bash
npm install
npm run dev
```

### 2. 访问应用

打开浏览器访问 `http://localhost:5173`

### 3. 生成颜色变量

1. 在左侧输入框中输入主题色（HEX 格式，如 `#6366F1`）或使用颜色选择器
2. 调整色阶数量（建议 5-13 阶）
3. 选择需要生成的颜色类型
4. 在右侧预览面板查看生成的颜色
5. 点击"复制"或"下载 JSON"按钮导出

### 4. 导入到 Tokens Studio

1. 在 Figma 中打开 Tokens Studio 插件
2. 点击 "Import" → "JSON"
3. 选择导出的 JSON 文件
4. 颜色变量将自动导入到你的设计文件中

## 项目结构

```
design-tokens-generator/
├── src/
│   ├── components/          # UI 组件
│   │   ├── ColorCard.tsx    # 颜色卡片组件
│   │   ├── PreviewPanel.tsx # 预览面板组件
│   │   └── Sidebar.tsx      # 侧边栏设置组件
│   ├── hooks/               # 自定义 Hooks
│   │   └── useColorGeneration.ts
│   ├── utils/               # 工具函数
│   │   ├── colorConversion.ts
│   │   ├── colorScales.ts
│   │   └── semanticColors.ts
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── dist/                    # 构建输出
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS 4
- Lucide React

## 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## License

MIT
