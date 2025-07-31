#  Productivity Toolkit



A stunning, modern productivity dashboard built with Next.js 14, featuring a glassmorphism design, smooth animations, and a comprehensive suite of productivity tools. Inspired by Momentum Dash, this toolkit is designed to elevate your daily workflow with beautiful aesthetics and powerful features.

<p align="center">
  <a href="https://productivitytoolkit.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Visit_Now-brightgreen?style=for-the-badge" alt="Live Demo">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/mighty-baseplate/productivity-toolkit?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-cyan?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</p>

---

### 🎥 Video Showcase
[Watch the Video Showcase](./assets/video/video.mp4)

---

## ✨ Features

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

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React + Heroicons
- **Audio**: Howler.js (prepared for integration)
- **State Management**: React Context + useReducer
- **Storage**: localStorage with automatic persistence
- **Themes**: next-themes for dark/light mode switching

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

## 📁 Project Structure

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

## 🎨 Customization

### **Colors & Gradients**
Edit `tailwind.config.js` to customize the color palette.

### **Background Images**
Update the background image in `components/providers/AppProvider.tsx`.

### **Glass Effects**
Modify glass components in `app/globals.css`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/mighty-baseplate/Productivity-Toolkit/issues).

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **[Atharva Jain](https://github.com/mighty-baseplate)**
- **[Anahita Bhalme](https://github.com/anahita-jpeg)**

---

**Built with ❤️ and ☕ by [Atharva Jain](https://github.com/mighty-baseplate) & [Anahita Bhalme](https://github.com/anahita-jpeg) for productivity enthusiasts worldwide.**

*Ready to supercharge your productivity? Star ⭐ this repo and start building better habits today!*