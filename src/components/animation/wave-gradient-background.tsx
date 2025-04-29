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
const WaveGradientBackground: React.FC<IWaveGradientBackgroundProps> = ({children, className, style}) => {
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
      <Blop className='top-30 left-10 w-20 h-20'/>
      <Blop className='bottom-30 right-10 w-30 h-30'/>
      <Blop className='top-30 right-10 w-10 h-10'/>
      {children}
    </motion.div>
  )
}

export default WaveGradientBackground

