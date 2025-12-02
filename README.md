<!-- @format -->

# 碳汇云联 (Carbon Connect) - 乡村碳汇交易平台

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📖 项目简介

**碳汇云联** 是一个连接乡村与企业的绿色碳汇交易平台。我们利用 AI 遥感卫星与无人机技术，实现林业碳汇的自动化监测与精准交易，旨在赋能乡村振兴，并助力企业达成碳中和目标。

本项目采用 React + TypeScript + Vite 构建，展示了一个现代化的碳汇交易平台前端概念。

## ✨ 核心功能

平台融合前沿科技，提供以下核心服务：

- **🛰️ AI 遥感监测**：利用高分辨率卫星与无人机影像，结合深度学习算法，自动识别林地边界与植被类型。
- **🌲 碳汇精准核算**：基于多源数据融合技术，实时计算森林碳储量，为碳汇交易提供可信数据支撑。
- **⚠️ 智能预警系统**：全天候监控火灾隐患与非法砍伐行为，异常情况秒级报警，守护绿色资产。
- **📈 数字化交易**：构建透明、高效的碳汇交易撮合平台，打通乡村卖方与企业买方的信息壁垒。
- **🤖 数字人服务**：专属数字人“林小汇”提供政策解读、科普教育及交易指引服务。

## 🌍 五大战略领域

全方位赋能乡村可持续发展：

1. **🌱 乡村振兴与农业农村现代化**：推动农业产业升级，增加农民收入。
2. **⚡ 科技创新和未来产业**：AI 遥感、大数据与区块链技术赋能传统林业。
3. **💚 生态文明建设和绿色低碳发展**：践行“绿水青山就是金山银山”理念。
4. **🎨 文化创意和区域交流合作**：挖掘乡村生态文化价值。
5. **🏛️ 社会治理和公共服务**：提升乡村数字化治理水平。

## 🛠️ 技术栈

- **前端框架**: [React](https://react.dev/)
- **开发工具**: [Vite](https://vitejs.dev/)
- **编程语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式库**: [Tailwind CSS](https://tailwindcss.com/)
- **动画库**: [Framer Motion](https://www.framer.com/motion/)
- **图标库**: [Lucide React](https://lucide.dev/)

## 🚀 快速开始

### 环境要求

- Node.js (推荐 v16+)
- npm 或 yarn

### 安装步骤

1. **克隆仓库**

   ```bash
   git clone <repository-url>
   cd carbon-connect
   ```

2. **安装依赖**

   ```bash
   npm install
   # 或者
   yarn install
   ```

3. **启动开发服务器**

   ```bash
   npm run dev
   # 或者
   yarn dev
   ```

   打开浏览器访问控制台输出的地址（通常是 `http://localhost:5173`）。

## 📅 版本更新记录

### v1.2.0 - AI 赋能与 UI 升级
- **AI 智能工具箱**：
  - 在数字人页面集成 **政策解读**、**碳汇估算**、**项目策划** 三大快捷工具。
  - 优化对话界面，支持左侧工具栏与右侧聊天窗口的联动交互。
  - 增强 AI 响应的展示效果，支持长文本自动换行与排版优化。

- **UI/UX 深度优化**：
  - **Navbar**：全新的玻璃拟态导航栏，支持滚动变色与平滑的菜单切换动画。
  - **Footer**：重设计页脚，加入深色动态光效背景与交互式订阅组件。
  - **首页**：移除了部分可能导致卡顿的滚动触发动画，提升浏览流畅度。

### v1.1.0 - UI 升级与体验优化
- **视觉重构**：
  - **Hero 首页**：全新设计的深色沉浸式首屏，集成 3D 悬浮视窗与动态光效。
  - **监测大屏**：新增 `LiveMonitoring` 模块，模拟卫星实时扫描与 AI 预警动画。
  - **入驻申请**：重构 `ProjectRuzhu` 弹窗，采用现代化毛玻璃风格与分步表单设计。

- **功能增强**：
  - **实时反馈**：全站集成 Toast 消息提示系统，操作反馈更及时。
  - **状态管理**：引入 `Zustand` 全局状态管理库，优化弹窗与组件间通信。
  - **交互优化**：修复了数字人对话自动滚动的体验问题，优化了页面滚动指引。

- **工程化改进**：
  - 修复了构建过程中的类型错误 (TypeScript Build Fixes)。
  - 优化了图片资源加载策略，全面替换为 Picsum 稳定图源。

### v1.0.0 - 初始发布与功能重构
- **架构升级**：
  - 从单页应用重构为多页应用架构 (React Router v6)。
  - 引入 `Layout` 组件，实现全局页面切换动画与加载状态管理。
  - 优化构建配置，修复 TypeScript 严格模式下的编译问题。

- **核心功能模块**：
  - **交易平台 (Platform)**：新增碳汇交易市场页面，支持项目筛选、搜索及详情弹窗查看。
  - **数字人助手 (Digital Human)**：集成 DeepSeek API，实现“林小汇”智能对话功能，支持多轮问答。
  - **碳汇计算器 Pro**：升级算法模型，引入树龄、植被密度等多因子修正，提供详细的计算公式展示。

- **界面与体验优化**：
  - **首页焕新**：新增影响力数据 (ImpactStats)、运作流程 (HowItWorks)、成功案例 (SuccessStories)、合作伙伴 (Partners) 及团队展示 (TeamShowcase) 板块。
  - **交互反馈**：引入 `sonner` 组件库，全站应用 Toast 消息提示，提升交互体验。
  - **视觉美化**：优化 Footer 样式，统一全站图片源为稳定的 Picsum 图床，添加“晚风拾云”团队专属展示页。

- **代码维护性**：
  - 对 `Platform` 和 `CarbonCalculator` 等复杂页面进行了组件拆分与封装，提升代码可读性与复用性。

## 📜 脚本说明

- `dev`: 启动开发服务器
- `build`: 构建生产环境代码
- `lint`: 运行 ESLint 代码检查
- `preview`: 预览构建后的应用

## 📄 许可证

MIT License
