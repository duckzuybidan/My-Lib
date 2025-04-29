
import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
interface IBlopProps {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
}
const variants: MotionProps['variants'] = {
  animate: {
    y: ["0%", '50%', '0%'],
    opacity: [0.5, 0, 0.5],
    transition: {
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity
    }
  },
}
const Blop: React.FC<IBlopProps> = ({children, className, style}) => {
  return (
    <motion.div
        className={cn("blop shadow-xl", className)}
        style={{
          ...style
        }}
        variants={variants}
        animate="animate"
    >
        {children}
    </motion.div>
  );
};

export default Blop;
