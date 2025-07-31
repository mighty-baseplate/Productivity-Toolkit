'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/components/providers/AppProvider'
import { 
  Edit3, 
  Download, 
  Trash2, 
  Maximize2, 
  Minimize2,
  Save,
  FileText,
  Clock
} from 'lucide-react'

export default function MyNotes() {
  const { state, dispatch } = useApp()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // Auto-save functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (state.notes !== (localStorage.getItem('productivity-toolkit-state') ? JSON.parse(localStorage.getItem('productivity-toolkit-state')!)?.notes || '' : '')) {
        setIsSaving(true)
        setTimeout(() => {
          setIsSaving(false)
          setLastSaved(new Date())
        }, 500)
      }
    }, 1000)

    return () => clearTimeout(saveTimeout)
  }, [state.notes])

  const handleNotesChange = (value: string) => {
    dispatch({ type: 'SET_NOTES', payload: value })
  }

  const handleClearAll = () => {
    if (state.notes.trim() && window.confirm('Are you sure you want to clear all notes? This action cannot be undone.')) {
      dispatch({ type: 'SET_NOTES', payload: '' })
      setLastSaved(new Date())
    }
  }

  const handleDownload = () => {
    if (!state.notes.trim()) {
      alert('No notes to download!')
      return
    }

    const blob = new Blob([state.notes], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `productivity-notes-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    // Focus textarea when entering fullscreen
    if (!isFullscreen) {
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }

  const formatLastSaved = () => {
    if (!lastSaved) return 'Never saved'
    const now = new Date()
    const diff = now.getTime() - lastSaved.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Saved just now'
    if (minutes < 60) return `Saved ${minutes}m ago`
    return `Saved at ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }

  const wordCount = state.notes.trim().split(/\s+/).filter(word => word.length > 0).length
  const charCount = state.notes.length

  if (isFullscreen) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="h-full flex flex-col">
          {/* Fullscreen Header */}
          <motion.div
            className="flex items-center justify-between p-6 border-b border-white/10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">My Notes</h1>
                <p className="text-white/60 text-sm">Distraction-free writing mode</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.div
                className="flex items-center space-x-2 text-white/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isSaving ? (
                  <>
                    <Save className="w-4 h-4 animate-pulse text-green-400" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>{formatLastSaved()}</span>
                  </>
                )}
              </motion.div>

              <motion.button
                onClick={toggleFullscreen}
                className="glass-button p-3 text-white hover:bg-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Minimize2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Fullscreen Textarea */}
          <motion.div
            className="flex-1 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <textarea
              ref={textareaRef}
              value={state.notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Start writing your thoughts, ideas, and notes here..."
              className="w-full h-full bg-transparent text-white text-lg leading-relaxed placeholder-white/40 border-none outline-none resize-none"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            />
          </motion.div>

          {/* Fullscreen Footer */}
          <motion.div
            className="flex items-center justify-between p-6 border-t border-white/10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-6 text-white/60 text-sm">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                onClick={handleDownload}
                className="glass-button px-4 py-2 text-white hover:bg-white/20 flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!state.notes.trim()}
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </motion.button>

              <motion.button
                onClick={handleClearAll}
                className="glass-button px-4 py-2 text-red-400 hover:bg-red-400/20 flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!state.notes.trim()}
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
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
          <Edit3 className="w-5 h-5 text-indigo-400" />
          <span className="text-white font-medium">My Notes</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">Capture your thoughts</h2>
        <p className="text-white/70">Write, organize, and save your ideas</p>
      </div>

      {/* Main Notes Editor */}
      <motion.div
        className="glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-medium flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Notes Editor</span>
          </h3>

          <div className="flex items-center space-x-3">
            <motion.div
              className="flex items-center space-x-2 text-white/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isSaving ? (
                <>
                  <Save className="w-4 h-4 animate-pulse text-green-400" />
                  <span>Auto-saving...</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4" />
                  <span>{formatLastSaved()}</span>
                </>
              )}
            </motion.div>

            <motion.button
              onClick={toggleFullscreen}
              className="glass-button p-2 text-white hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Fullscreen mode"
            >
              <Maximize2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            ref={textareaRef}
            value={state.notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Start writing your thoughts, ideas, project notes, meeting minutes, or anything else you want to remember..."
            className="w-full h-80 glass-input px-6 py-4 text-white placeholder-white/50 text-base leading-relaxed resize-none focus:outline-none"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          />

          {/* Stats and Actions Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center space-x-6 text-white/60 text-sm">
              <span className="flex items-center space-x-1">
                <span>{wordCount}</span>
                <span>words</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>{charCount}</span>
                <span>characters</span>
              </span>
              {state.notes.trim() && (
                <span className="text-green-400 text-xs">Auto-save enabled</span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                onClick={handleDownload}
                className="glass-button px-4 py-2 text-white font-medium flex items-center space-x-2 hover:bg-white/30 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!state.notes.trim()}
              >
                <Download className="w-4 h-4" />
                <span>Download .txt</span>
              </motion.button>

              <motion.button
                onClick={handleClearAll}
                className="glass-button px-4 py-2 text-red-400 font-medium flex items-center space-x-2 hover:bg-red-400/20 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!state.notes.trim()}
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Writing Tips */}
      <motion.div
        className="grid md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {[
          {
            title: 'Auto-Save',
            description: 'Your notes are automatically saved as you type',
            icon: '💾',
            color: 'from-green-400 to-emerald-400'
          },
          {
            title: 'Fullscreen Mode',
            description: 'Focus on writing without distractions',
            icon: '📝',
            color: 'from-blue-400 to-indigo-400'
          },
          {
            title: 'Export Ready',
            description: 'Download your notes as a .txt file anytime',
            icon: '📄',
            color: 'from-purple-400 to-pink-400'
          }
        ].map((tip, index) => (
          <motion.div
            key={tip.title}
            className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="text-3xl mb-3">{tip.icon}</div>
            <h4 className="text-white font-medium mb-2">{tip.title}</h4>
            <p className="text-white/60 text-sm">{tip.description}</p>
            <div className={`h-1 bg-gradient-to-r ${tip.color} rounded-full mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}