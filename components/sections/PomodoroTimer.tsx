'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/components/providers/AppProvider'
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Coffee,
  Zap,
  X,
  Palette
} from 'lucide-react'

const timerColors = [
  { id: 'teal', name: 'Teal', color: 'linear-gradient(135deg, #0f766e 0%, #059669 100%)', textColor: 'text-teal-200' },
  { id: 'amber', name: 'Amber', color: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', textColor: 'text-amber-200' },
  { id: 'lavender', name: 'Lavender', color: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', textColor: 'text-purple-200' },
  { id: 'steel', name: 'Steel Blue', color: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', textColor: 'text-blue-200' },
  { id: 'rose', name: 'Rose', color: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)', textColor: 'text-rose-200' },
]

export default function PomodoroTimer() {
  const { state, dispatch } = useApp()
  const [customDuration, setCustomDuration] = useState(30)
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (state.currentTimer.isActive && !state.currentTimer.isPaused) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [state.currentTimer.isActive, state.currentTimer.isPaused, dispatch])

  // Handle timer completion
  useEffect(() => {
    if (state.currentTimer.timeLeft === 0 && state.currentTimer.isActive) {
      // Play completion sound (would use Howler.js here)
      console.log('Timer completed!')
      
      // Auto-start break or work session
      if (state.currentTimer.type === 'pomodoro') {
        const breakDuration = state.currentTimer.isBreak ? 25 * 60 : 5 * 60
        dispatch({
          type: 'START_TIMER',
          payload: {
            duration: breakDuration,
            type: 'pomodoro'
          }
        })
      }
    }
  }, [state.currentTimer.timeLeft, state.currentTimer.isActive, state.currentTimer.type, state.currentTimer.isBreak, dispatch])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = (duration: number, type: 'pomodoro' | 'custom') => {
    dispatch({ type: 'START_TIMER', payload: { duration: duration * 60, type } })
    if (type === 'pomodoro') {
      setShowFullscreen(true)
    }
  }

  const handlePause = () => {
    dispatch({ type: 'PAUSE_TIMER' })
  }

  const handleReset = () => {
    dispatch({ type: 'RESET_TIMER' })
    setShowFullscreen(false)
  }

  const progress = state.currentTimer.type === 'pomodoro' 
    ? (1 - state.currentTimer.timeLeft / (25 * 60)) * 100
    : (1 - state.currentTimer.timeLeft / (customDuration * 60)) * 100

  const currentColor = timerColors.find(c => c.id === state.currentTimer.customColor) || timerColors[0]

  const handleColorChange = (colorId: string) => {
    dispatch({ type: 'SET_TIMER_COLOR', payload: colorId })
    setShowColorPicker(false)
  }

  return (
    <>
      <motion.div
        className="max-w-4xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Timer className="w-5 h-5 text-orange-400" />
            <span className="text-white font-medium">Focus Timer</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">Stay focused with Pomodoro</h2>
          <p className="text-white/70">25 minutes of focus, 5 minutes of rest</p>
        </div>

        {/* Timer Display */}
        <motion.div
          className="glass-card p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative mb-8">
            {/* Color Picker */}
            <div className="absolute top-0 right-0">
              <motion.button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="glass-button p-2 text-white hover:bg-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Timer color"
              >
                <Palette className="w-4 h-4" />
              </motion.button>

              <AnimatePresence>
                {showColorPicker && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 z-10"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  >
                    <div className="glass-card p-3 w-48">
                      <h4 className="text-white text-sm font-medium mb-3">Timer Color</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {timerColors.map((color) => (
                          <motion.button
                            key={color.id}
                            onClick={() => handleColorChange(color.id)}
                            className={`p-2 rounded-lg text-left transition-all duration-200 ${
                              state.currentTimer.customColor === color.id
                                ? 'ring-2 ring-white/30'
                                : 'hover:bg-white/10'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div
                              className="w-full h-6 rounded mb-1"
                              style={{ background: color.color }}
                            />
                            <div className="text-white text-xs">{color.name}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Circular Progress */}
            <div className="relative w-64 h-64 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="3"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke={state.currentTimer.isBreak ? "#10b981" : "#f59e0b"}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100) }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              
              {/* Time Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-3 font-mono tracking-wider">
                    {formatTime(state.currentTimer.timeLeft)}
                  </div>
                  <div className="text-white/70 text-lg font-medium">
                    {state.currentTimer.isBreak ? 'Break Time' : 'Focus Time'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!state.currentTimer.isActive ? (
              <>
                <motion.button
                  onClick={() => handleStart(25, 'pomodoro')}
                  className="glass-button px-6 py-3 text-white font-medium flex items-center space-x-2 hover:bg-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4" />
                  <span>Start Pomodoro</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setShowSettings(true)}
                  className="glass-button px-4 py-3 text-white hover:bg-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  onClick={handlePause}
                  className="glass-button px-6 py-3 text-white font-medium flex items-center space-x-2 hover:bg-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {state.currentTimer.isPaused ? (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={handleReset}
                  className="glass-button px-4 py-3 text-white hover:bg-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>

                {state.currentTimer.type === 'pomodoro' && (
                  <motion.button
                    onClick={() => setShowFullscreen(true)}
                    className="glass-button px-4 py-3 text-white hover:bg-white/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Zap className="w-4 h-4" />
                  </motion.button>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Custom Timer */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-medium mb-4 flex items-center space-x-2">
            <Timer className="w-4 h-4" />
            <span>Custom Timer</span>
          </h3>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-white/70 text-sm mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={customDuration}
                onChange={(e) => setCustomDuration(Number(e.target.value))}
                min="1"
                max="120"
                className="w-full glass-input px-4 py-2 text-white focus:outline-none"
              />
            </div>
            
            <motion.button
              onClick={() => handleStart(customDuration, 'custom')}
              disabled={state.currentTimer.isActive}
              className="glass-button px-6 py-2 text-white font-medium hover:bg-white/30 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: 'Sessions Today', value: '4', icon: '🍅' },
            { label: 'Total Focus Time', value: '2h 15m', icon: '⏱️' },
            { label: 'Productivity Score', value: '85%', icon: '📈' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="glass-card p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Timer Settings</h3>
                <motion.button
                  onClick={() => setShowSettings(false)}
                  className="text-white/60 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Work Duration</label>
                  <input
                    type="number"
                    defaultValue={25}
                    className="w-full glass-input px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Break Duration</label>
                  <input
                    type="number"
                    defaultValue={5}
                    className="w-full glass-input px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Long Break Duration</label>
                  <input
                    type="number"
                    defaultValue={15}
                    className="w-full glass-input px-4 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <motion.button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 glass-button px-4 py-2 text-white"
                  whileHover={{ scale: 1.02 }}
                >
                  Save
                </motion.button>
                <motion.button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-white/60 hover:text-white"
                  whileHover={{ scale: 1.02 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Timer */}
      <AnimatePresence>
        {showFullscreen && state.currentTimer.isActive && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: state.currentTimer.isBreak 
                ? 'linear-gradient(135deg, #0f766e 0%, #059669 100%)'
                : currentColor.color
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <motion.button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-8 right-8 text-white/60 hover:text-white z-10"
              whileHover={{ scale: 1.1 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Content */}
            <div className="text-center text-white">
              <motion.div
                className="mb-8"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {state.currentTimer.isBreak ? (
                  <Coffee className="w-24 h-24 mx-auto mb-4 text-white/80" />
                ) : (
                  <Zap className="w-24 h-24 mx-auto mb-4 text-white/80" />
                )}
                
                <h1 className="text-8xl md:text-9xl font-bold mb-6 font-mono tracking-wider">
                  {formatTime(state.currentTimer.timeLeft)}
                </h1>
                
                <p className="text-3xl md:text-4xl text-white/90 mb-12 font-medium">
                  {state.currentTimer.isBreak ? 'Take a break' : 'Stay focused'}
                </p>

                {/* Large Progress Ring */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-12">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="rgba(255, 255, 255, 0.8)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100) }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  
                  {/* Progress Percentage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/80 text-lg font-semibold">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-center space-x-6">
                <motion.button
                  onClick={handlePause}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-4 text-white font-medium flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {state.currentTimer.isPaused ? (
                    <>
                      <Play className="w-6 h-6" />
                      <span className="text-xl">Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-6 h-6" />
                      <span className="text-xl">Pause</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={handleReset}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-4 text-white font-medium flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-6 h-6" />
                  <span className="text-xl">Reset</span>
                </motion.button>
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-30, -60, -30],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}