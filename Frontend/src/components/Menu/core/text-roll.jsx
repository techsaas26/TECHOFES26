import { motion } from 'framer-motion'

export function TextRoll({ children, getEnterDelay = (i) => i * 0.05 }) {
  const text = String(children)
  const letters = text.split('')

  return (
    <div className="inline-flex overflow-hidden">
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: getEnterDelay(index),
            duration: 0.4,
            ease: [0.23, 1, 0.320, 1],
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  )
}