# 🎯 Productivity Toolkit - Glassmorphic Dashboard

A stunning, modern productivity dashboard built with Next.js 14, featuring a glassmorphism design, smooth animations, and a comprehensive suite of productivity tools. Inspired by Momentum Dash, this toolkit is designed to elevate your daily workflow with beautiful aesthetics and powerful features.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mighty-baseplate/productivity-toolkit)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-brightgreen)](https://productivitytoolkit.netlify.app/)

---

### 🎥 Video Showcase
[Watch the Video Showcase](./assets/video/video.mp4)

---

<details>
<summary>✨ Features</summary>

### 🎨 Design & Aesthetics
- **Glassmorphism UI** - Beautiful glass-morphic cards with backdrop blur effects
- **Smooth Animations** - Powered by Framer Motion for seamless micro-interactions
- **Responsive Design** - Perfect on desktop, tablet, and mobile devices
- **Dark/Light Mode** - Animated theme switching with custom gradients
- **Dynamic Backgrounds** - Rotating background images with overlay gradients

### 🚀 Core Modules
- **📝 Daily Focus**: Set and track your main daily objective with persistent storage.
- **✅ Task Manager**: Three categories (Inbox, Today, Done) with inline editing and drag & drop.
- **⏰ Pomodoro Timer**: 25/5 focus/break cycles with a fullscreen mode and audio notifications.
- **💪 BMI Calculator & Wellness**: Calculate BMI with visual feedback and health tips.
- **🎵 Music & Ambient Sounds**: Two playlists (Lo-Fi Beats and Nature Sounds) with a floating music dock and audio visualizer.

### 🎯 Enhanced Features
- **Responsive Sidebar** - Collapsible navigation with mobile bottom dock.
- **Local Storage** - Persistent data across sessions.
- **Animated Transitions** - Smooth page and component transitions.
- **Floating Particles** - Subtle background animations.

</details>

<details>
<summary>🛠️ Tech Stack</summary>

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React + Heroicons
- **Audio**: Howler.js (prepared for integration)
- **State Management**: React Context + useReducer
- **Storage**: localStorage with automatic persistence
- **Themes**: next-themes for dark/light mode switching

</details>

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/mighty-baseplate/productivity-toolkit.git
   cd productivity-toolkit
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start development server**
   ```bash
   npm run dev
   ```
4. **Open your browser** to `http://localhost:3000`

<details>
<summary>📁 Project Structure</summary>

```
productivity-toolkit/
├── app/                          # Next.js 14 App Router
│   ├── globals.css              # Global styles & Tailwind
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Main dashboard page
├── components/                   # React components
│   ├── Dashboard.tsx            # Main dashboard orchestrator
│   ├── layout/                  # Layout components
│   ├── providers/               # Context providers
│   ├── sections/                # Feature sections
│   └── ui/                      # UI components
├── public/                      # Static assets
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies
```

</details>

<details>
<summary>🎨 Customization</summary>

### **Colors & Gradients**
Edit `tailwind.config.js` to customize the color palette.

### **Background Images**
Update the background image in `components/providers/AppProvider.tsx`.

### **Glass Effects**
Modify glass components in `app/globals.css`.

</details>

<details>
<summary>🚀 Deployment</summary>

### **Vercel (Recommended)**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mighty-baseplate/productivity-toolkit)
Deploy with one click!

### **Netlify**
1. Build the project: `npm run build`
2. Deploy the `out` directory to Netlify.

</details>

## 🤝 Contributing
We welcome contributions! Please fork the repository and open a pull request.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
- **[Atharva Jain](https://github.com/mighty-baseplate)**
- **[Anahita Bhalme](https://github.com/anahita-jpeg)**

---

**Built with ❤️ and ☕ by [Atharva Jain](https://github.com/mighty-baseplate) & [Anahita Bhalme](https://github.com/anahita-jpeg) for productivity enthusiasts worldwide.**

*Ready to supercharge your productivity? Star ⭐ this repo and start building better habits today!*
