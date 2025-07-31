'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/components/providers/AppProvider'
import { Palette, Check } from 'lucide-react'

const themes = [
  {
    id: 'light' as const,
    name: 'Light',
    description: 'Clean & minimal',
    preview: 'bg-gradient-to-br from-gray-50 to-gray-100',
    style: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
  },
  {
    id: 'dark' as const,
    name: 'Dark',
    description: 'Deep & elegant',
    preview: 'bg-gradient-to-br from-gray-800 to-gray-900',
    style: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
  },
  {
    id: 'gradient' as const,
    name: 'Purple-Blue',
    description: 'Glassmorphic blend',
    preview: 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700',
    style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
]

export default function BackgroundThemeSwitcher() {
  const { state, dispatch } = useApp()
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeChange = (themeId: 'light' | 'dark' | 'gradient') => {
    dispatch({ type: 'SET_BACKGROUND_THEME', payload: themeId })
    setIsOpen(false)
  }

  const currentTheme = themes.find(theme => theme.id === state.backgroundTheme) || themes[2]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-button p-3 hover:scale-105 active:scale-95 transition-all duration-200 relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette className="w-5 h-5 text-white" />
        
        {/* Background preview */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-30"
          style={{ background: currentTheme.style }}
          initial={false}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Theme Selector */}
            <motion.div
              className="absolute top-full right-0 mt-2 z-50"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass-card p-4 w-64">
                <h3 className="text-white font-medium mb-3 flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Background Theme</span>
                </h3>
                
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all duration-200 relative overflow-hidden ${
                        state.backgroundTheme === theme.id
                          ? 'ring-2 ring-white/30 bg-white/10'
                          : 'hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3 relative z-10">
                        <div className={`w-8 h-8 rounded-lg ${theme.preview} border border-white/20`} />
                        
                        <div className="flex-1">
                          <div className="text-white font-medium">{theme.name}</div>
                          <div className="text-white/60 text-xs">{theme.description}</div>
                        </div>
                        
                        {state.backgroundTheme === theme.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check className="w-4 h-4 text-green-400" />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Background preview */}
                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0"
                        style={{ background: theme.style }}
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-white/50 text-xs text-center">
                    Themes apply globally across all sections
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}