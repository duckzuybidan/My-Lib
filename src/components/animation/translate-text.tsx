import { cn } from "@/lib/utils";
import { motion } from "framer-motion";


interface ITranslateTextProps {
  containerClassName?: string
  containerstyle?: React.CSSProperties
  type?: "vertical" | "horizontal"
  body: { text: string, className?: string, style?: React.CSSProperties }[]
}
/**
 * `TranslateText` is a component that animates an array of text chunks using
 * Framer Motion. You can choose between vertical or horizontal animation direction.
 *
 * @param {Object} props - Component props
 * @param {string} [props.containerClassName] - Optional Tailwind or custom class names for the outer container.
 * @param {React.CSSProperties} [props.containerstyle] - Optional inline styles for the outer container.
 * @param {"vertical" | "horizontal"} [props.type="vertical"] - Animation direction: `"vertical"` for upward movement or `"horizontal"` for sideways movement.
 * @param {Array} props.body - Array of text chunks to animate. Each chunk contains:
 * @param {string} props.body[].text - The text to display.
 * @param {string} [props.body[].className] - Optional class name for individual text chunks.
 * @param {React.CSSProperties} [props.body[].style] - Optional inline styles for individual text chunks.
 */
const TranslateText: React.FC<ITranslateTextProps> = ({ containerClassName, containerstyle, body, type = "vertical" }) => {
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