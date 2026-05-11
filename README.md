# Design Tokens Generator

一个用于生成设计系统变量的 Web 工具，支持导出 Tokens Studio 兼容的 JSON 格式，专为 Figma 设计系统打造。

## 功能特性

- 🎨 **主题色生成**：输入主题色，自动生成完整的色阶
- 🔢 **自定义色阶**：支持 3-20 阶颜色生成
- ⚪ **中性色生成**：基于主题色自动生成配套的中性灰阶
- 🎯 **语义色生成**：自动生成成功、危险、警告、信息等语义色
- 🔗 **引用支持**：扩展语义色引用基础色，修改基础色时自动更新
- 📤 **导出功能**：支持复制和下载 Tokens Studio 格式的 JSON 文件

## 快速开始

### 启动开发服务器

```bash
cd design-tokens-generator
npm install
npm run dev
```

### 访问应用

打开浏览器访问 `http://localhost:5173`

## 使用说明

1. **输入主题色**：在左侧输入框中输入主题色（HEX 格式，如 `#6366F1`）或使用颜色选择器
2. **调整色阶**：设置色阶数量（建议 5-13 阶）
3. **选择颜色类型**：勾选需要生成的颜色类型
4. **预览颜色**：在右侧预览面板查看生成的颜色
5. **导出 JSON**：点击"复制"或"下载 JSON"按钮导出

## 导入到 Tokens Studio

1. 在 Figma 中打开 Tokens Studio 插件
2. 点击 "Import" → "JSON"
3. 选择导出的 JSON 文件
4. 颜色变量将自动导入到设计文件中

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS 4
- Lucide React

## 项目结构

```
├── design-tokens-generator/   # 主应用代码
│   ├── src/                   # 源代码目录
│   ├── dist/                  # 构建输出
│   └── package.json
├── .trae/                     # 开发配置
└── README.md                  # 项目说明
```

## 构建生产版本

```bash
cd design-tokens-generator
npm run build
```

## License

MIT
