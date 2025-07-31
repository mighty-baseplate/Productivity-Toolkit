'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/components/providers/AppProvider'
import Sidebar from '@/components/layout/Sidebar'
import HeroSection from '@/components/sections/HeroSection'
import DailyFocus from '@/components/sections/DailyFocus'
import TaskManager from '@/components/sections/TaskManager'
import PomodoroTimer from '@/components/sections/PomodoroTimer'
import BMICalculator from '@/components/sections/BMICalculator'
import MusicPlayer from '@/components/sections/MusicPlayer'
import ThemeToggle from '@/components/ui/ThemeToggle'
import BackgroundThemeSwitcher from '@/components/ui/BackgroundThemeSwitcher'
import MyNotes from '@/components/sections/MyNotes'

export type ActiveSection = 'focus' | 'tasks' | 'timer' | 'wellness' | 'music' | 'notes'

export default function Dashboard() {
  const { state } = useApp()
  const [activeSection, setActiveSection] = useState<ActiveSection>('focus')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'focus':
        return <DailyFocus />
      case 'tasks':
        return <TaskManager />
      case 'timer':
        return <PomodoroTimer />
      case 'wellness':
        return <BMICalculator />
      case 'music':
        return <MusicPlayer />
      case 'notes':
        return <MyNotes />
      default:
        return <DailyFocus />
    }
  }

  const getBackgroundStyle = () => {
    switch (state.backgroundTheme) {
      case 'light':
        return 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
      case 'dark':
        return 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
      case 'gradient':
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  }

  const getOverlayStyle = () => {
    switch (state.backgroundTheme) {
      case 'light':
        return 'bg-gradient-to-br from-gray-500/40 via-blue-500/30 to-purple-500/40'
      case 'dark':
        return 'bg-gradient-to-br from-slate-900/90 via-gray-900/80 to-black/90'
      case 'gradient':
      default:
        return 'bg-gradient-to-br from-blue-900/80 via-purple-900/60 to-pink-900/80 dark:from-slate-900/90 dark:via-purple-900/80 dark:to-indigo-900/90'
    }
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative transition-all duration-500"
      style={{ 
        background: state.backgroundTheme === 'gradient' ? `url(${state.backgroundImage}), ${getBackgroundStyle()}` : getBackgroundStyle(),
        backgroundBlendMode: state.backgroundTheme === 'gradient' ? 'overlay' : 'normal'
      }}
    >
      {/* Background Overlay */}
      <div className={`absolute inset-0 transition-all duration-500 ${getOverlayStyle()}`} />
      
      {/* Theme Controls */}
      <div className="absolute top-6 right-6 z-50 flex space-x-3">
        <BackgroundThemeSwitcher />
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-80'
        } lg:${sidebarCollapsed ? 'ml-20' : 'ml-80'} max-lg:ml-0`}>
          
          {/* Hero Section - Always visible */}
          <HeroSection />

          {/* Dynamic Content Section */}
          <div className="px-6 pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={false}
          setCollapsed={setSidebarCollapsed}
          mobile
        />
      </div>
    </div>
  )
}