
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
/**
 * `Blop` is a React component that utilizes `framer-motion` to animate its content with a floating or bouncing effect.
 * The component animates its vertical position and opacity, creating a smooth, infinite animation.
 * 
 * You can customize the component by passing children elements, a class name for styling, and inline styles.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the `Blop` component. This can be any valid React element or JSX content.
 * @param {string} [className] - An optional class name that can be used for additional custom styling.
 * @param {React.CSSProperties} [style] - Optional inline styles that will be applied to the component.
 * 
 * @returns {JSX.Element} The `Blop` component, which is an animated div element that moves up and down with changing opacity.
 * 
 * @example
 * ```tsx
 * <Blop className="custom-class" style={{ margin: '20px' }}>
 *   <span>Floating Content</span>
 * </Blop>
 * ```
 */
const Blop: React.FC<IBlopProps> = ({ children, className, style }) => {
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
