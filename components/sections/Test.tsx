'use client'

import { motion } from 'framer-motion'

export default function Test() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Hello World
    </motion.div>
  )
}
