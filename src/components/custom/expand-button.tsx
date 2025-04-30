import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

interface IExpandButtonProps extends HTMLMotionProps<"button"> {
  colorCode?: string;
  idleWidth?: number;
  expandWidth?: number;
  icon: React.ReactNode;
  text: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  textClassName?: string;
  textStyle?: React.CSSProperties;
}
/**
 * `ExpandButton` is a button component that animates from a circular icon-only button
 * to an expanded button with text on hover.
 *
 * @param {Object} props - Component props
 * @param {string} [props.colorCode="#4DD0E1"] - Background color of the button.
 * @param {number} [props.idleWidth=60] - The width (and height) of the button when idle (unhovered).
 * @param {number} [props.expandWidth] - The width of the button when hovered. Defaults to `idleWidth + 120`.
 * @param {React.ReactNode} props.icon - The icon to display in the center of the button when idle.
 * @param {string} props.text - The text to show when the button is expanded on hover.
 * @param {string} [props.containerClassName] - Optional Tailwind or custom class names for the outer button container.
 * @param {React.CSSProperties} [props.containerStyle] - Optional inline styles for the button container.
 * @param {string} [props.textClassName] - Optional class name for the text span.
 * @param {React.CSSProperties} [props.textStyle] - Optional inline styles for the text span.
 * @param {HTMLMotionProps<"button">} rest - Any other motion or HTML button props passed down.
 */
const ExpandButton: React.FC<IExpandButtonProps> = ({
  colorCode = "#4DD0E1",
  idleWidth = 60,
  expandWidth,
  icon,
  text,
  containerClassName,
  containerStyle,
  textClassName,
  textStyle,
  ...rest
}) => {
  const computedExpandWidth = expandWidth ?? idleWidth + 120;

  const containerVariants = {
    idle: { width: idleWidth },
    hover: {
      width: computedExpandWidth,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 22,
      },
    },
  };

  const bgVariants = {
    idle: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const iconVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 0,
      transition: {
        duration: 0.25,
      },
    },
  };

  const textVariants = {
    idle: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.25 },
    },
    hover: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 220,
        damping: 20,
        delay: 0.1,
        duration: 1,
      },
    },
  };


  return (
    <motion.button
      initial="idle"
      whileHover="hover"
      animate="idle"
      variants={containerVariants}
      style={{
        width: idleWidth,
        height: idleWidth,
        ...containerStyle,
      }}
      className={cn(
        "relative rounded-full flex items-center justify-center cursor-pointer overflow-hidden",
        containerClassName
      )}
      {...rest}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: colorCode }}
        variants={bgVariants}
      />

      <motion.div className="absolute z-10" variants={iconVariants}>
        {icon}
      </motion.div>

      <motion.span
        className={cn("absolute z-10", textClassName)}
        variants={textVariants}
        style={textStyle}
      >
        {text}
      </motion.span>
    </motion.button>
  );
};

export default ExpandButton;
