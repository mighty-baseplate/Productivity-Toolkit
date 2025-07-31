'use client'

import { motion } from 'framer-motion'
import { Github, Heart } from 'lucide-react'

export default function Credits() {
  return (
    <motion.div
      className="glass-card p-4 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2 text-white/70">
        <Heart className="w-4 h-4 text-red-400" />
        <span className="text-sm font-medium">Made with love by</span>
      </div>
      
      <div className="space-y-2">
        <motion.a
          href="https://github.com/mighty-baseplate"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-200 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Github className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          <span className="text-sm font-medium">Atharva Jain</span>
        </motion.a>
        
        <motion.a
          href="https://github.com/anahita-jpeg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-200 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Github className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
          <span className="text-sm font-medium">Anahita Bhalme</span>
        </motion.a>
      </div>
    </motion.div>
  )
}