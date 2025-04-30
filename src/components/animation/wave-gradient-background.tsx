import { cn } from '@/lib/utils'
import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import Blop from './blop'
interface IWaveGradientBackgroundProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
const variants: MotionProps['variants'] = {
  initial: {
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: [
      "0% 50%",
      "25% 50%",
      "50% 50%",
      "75% 50%",
      "100% 50%",
      "75% 50%",
      "50% 50%",
      "25% 50%",
      "0% 50%",
    ],
    transition: {
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
  exit: {
    backgroundPosition: "0% 50%",
  }
};
/**
 * `WaveGradientBackground` is a background component that animates a wave-like gradient 
 * effect across its background. The background will transition in a loop with multiple
 * background position shifts, creating a dynamic wave effect. This component can be used 
 * as a container with optional children.
 *
 * @param {React.ReactNode} [props.children] - Optional children to be rendered inside the background.
 * @param {string} [props.className] - Optional additional class names to customize the container's appearance.
 * @param {React.CSSProperties} [props.style] - Optional inline styles to further customize the container.
 * 
 * @returns {JSX.Element} The animated wave gradient background component.
 */
const WaveGradientBackground: React.FC<IWaveGradientBackgroundProps> = ({ children, className, style }) => {
  return (
    <motion.div
      className={cn("wave-bg-gradient", className)}
      style={{
        ...style
      }}
      variants={variants}
      animate="animate"
      initial="initial"
      exit="exit"
    >
      <Blop className='top-30 left-10 w-20 h-20' />
      <Blop className='bottom-30 right-10 w-30 h-30' />
      <Blop className='top-30 right-10 w-10 h-10' />
      {children}
    </motion.div>
  )
}

export default WaveGradientBackground

