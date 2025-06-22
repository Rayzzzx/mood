# 🧠 AI 倾诉小站

一个温暖、安全的网页空间，让用户可以匿名倾诉情绪，AI辅助生成理解、鼓励、安慰的内容，并自动归档为情绪日记。

## ✨ 核心功能

### 🗣️ 情绪倾诉
- 匿名文本输入，安全隐私
- 可选情绪标签选择（😔悲伤 / 😡生气 / 😟焦虑 / 😊开心等）
- 支持最多1000字的倾诉内容

### 🤖 AI 智能回应
- 基于 OpenAI GPT 的共情式回复
- 支持4种回复风格：
  - 朋友语气：温暖亲切，像好朋友聊天
  - 心理咨询师：专业理性，提供建设性建议
  - 佛系语气：淡然智慧，帮助放下执念
  - 温柔治愈：柔和安慰，给予温暖支持

### 📔 情绪日记归档
- 自动保存每次倾诉记录和AI回复
- 按日期分组展示，支持时间线回顾
- 情绪标签筛选功能
- 支持删除不需要的记录

### ✨ 每日语录
- 精选励志语录每日更新
- 支持收藏和分享功能
- 温暖的文字陪伴每一天

### 🔄 分享功能
- 一键复制内容到剪贴板
- 支持原生分享API（移动端）
- 生成适合社交媒体的分享文案

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- OpenAI API Key

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd mood-ai
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   创建 `.env.local` 文件：
   ```bash
   # OpenAI API 配置
   OPENAI_API_KEY=your_openai_api_key_here
   
   # 应用配置
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🏗️ 技术架构

### 前端技术栈
- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **UI组件**: Lucide React (图标)
- **工具库**: date-fns, html2canvas

### 后端技术栈
- **API**: Next.js API Routes
- **AI服务**: OpenAI GPT-3.5-turbo
- **数据存储**: 浏览器 LocalStorage (MVP阶段)

### 项目结构
```
mood-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── ai-response/   # AI回复接口
│   │   └── daily-quote/   # 每日语录接口
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx          # 主页面
├── components/            # React 组件
│   ├── AIResponse.tsx     # AI回复展示
│   ├── DailyQuote.tsx     # 每日语录
│   ├── MoodDiary.tsx      # 情绪日记
│   ├── MoodInput.tsx      # 情绪输入
│   ├── MoodSelector.tsx   # 情绪选择器
│   ├── Navigation.tsx     # 导航组件
│   └── StyleSelector.tsx  # 风格选择器
├── lib/                   # 工具库
│   ├── store.ts          # Zustand 状态管理
│   ├── types.ts          # TypeScript 类型定义
│   └── utils.ts          # 工具函数
└── public/               # 静态资源
```

## 🎯 使用指南

### 基本使用流程

1. **倾诉情绪**
   - 在输入框中写下你想说的话
   - 选择当前的心情标签（可选）
   - 选择希望的AI回复风格
   - 点击"倾诉给AI"按钮

2. **查看AI回复**
   - AI会根据你的内容和选择的风格生成温暖的回复
   - 可以重新生成不同的回复
   - 支持复制和分享功能

3. **情绪日记**
   - 切换到"日记"标签查看历史记录
   - 按日期和情绪类型筛选
   - 点击展开查看完整的对话内容

4. **每日语录**
   - 每天自动更新励志语录
   - 可以收藏喜欢的语录
   - 支持分享到社交媒体

### 数据隐私

- 所有数据存储在浏览器本地，不上传到服务器
- 支持随时删除个人记录
- 仅AI回复过程中会调用OpenAI接口
- 倾诉内容仅用于生成回复，不做其他用途

## 🔧 配置说明

### OpenAI API 配置

1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 创建账户并获取 API Key
3. 在 `.env.local` 中配置 `OPENAI_API_KEY`

### 自定义配置

你可以在以下文件中自定义配置：

- `lib/types.ts` - 修改情绪标签和回复风格
- `app/api/daily-quote/route.ts` - 更新语录库
- `app/api/ai-response/route.ts` - 调整AI提示词和参数

## 📱 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量 `OPENAI_API_KEY`
4. 自动部署完成

### 其他平台

项目使用标准的 Next.js 架构，支持部署到：
- Netlify
- Railway
- Docker
- 传统服务器

## 🛠️ 开发

### 开发命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

### 添加新功能

1. **新增情绪标签**：修改 `lib/types.ts` 中的 `MOOD_TAGS`
2. **新增回复风格**：修改 `lib/types.ts` 中的 `RESPONSE_STYLES`
3. **自定义AI提示词**：修改 `app/api/ai-response/route.ts`
4. **新增语录**：修改 `app/api/daily-quote/route.ts`

## 📋 待办事项

### MVP 阶段已完成
- ✅ 基础情绪倾诉功能
- ✅ AI回复生成
- ✅ 本地数据存储
- ✅ 情绪日记归档
- ✅ 每日语录
- ✅ 分享功能

### 后续扩展计划
- [ ] 用户账户系统
- [ ] 云端数据同步
- [ ] 图片分享功能
- [ ] 情绪统计分析
- [ ] 多语言支持
- [ ] PWA 支持
- [ ] 小程序版本

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## ⚠️ 免责声明

本服务仅供情绪倾诉和记录使用，不提供专业的心理健康治疗建议。如果您正在经历严重的心理健康问题，请寻求专业心理健康服务提供者的帮助。

## 💝 致谢

感谢以下开源项目和服务：
- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [OpenAI](https://openai.com/) - AI 服务
- [Zustand](https://github.com/pmndrs/zustand) - 状态管理
- [Lucide](https://lucide.dev/) - 图标库 