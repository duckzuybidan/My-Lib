import { cn } from "@/lib/utils";
import { motion } from "framer-motion";


interface ITranslateTextProps {
  containerClassName?: string
  containerstyle?: React.CSSProperties
  type?: "vertical" | "horizontal"
  body: {text: string, className?: string, style?: React.CSSProperties}[]
}
const TranslateText: React.FC<ITranslateTextProps> = ({containerClassName, containerstyle, body, type = "vertical"}) => {
  const sentence = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  const verticalTranslate = {
    hidden: {
      y: 0,
      opacity: 0,
    },
    visible: {
      y: 200,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
      },
    },
  };
  const hozontalTranslate = {
    hidden: {
      x: 0,
      opacity: 0,
    },
    visible: {
      x: 200,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
      },
    },
  };
  return (
    <motion.div
    className={cn("", containerClassName)}
    style={{
      ...containerstyle
    }}
    variants={sentence}
      initial="hidden"
      animate="visible"
    >
      {body.map((chunk, index) => (
        <motion.span
          key={index}
          variants={type === "vertical" ? verticalTranslate : hozontalTranslate}
          className={cn("", chunk.className)}
          style={chunk.style}
        >
          {chunk.text}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default TranslateText