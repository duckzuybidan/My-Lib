import React from "react";
import { HTMLMotionProps, motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface IShutterButtonProps extends HTMLMotionProps<"button"> {
  mode?: "horizontal-in" | "horizontal-out" | "vertical-in" | "vertical-out";
  icon: React.ReactNode;
  text: string;
  duration?: number;
  ease?: "easeIn" | "easeOut" | "easeInOut" | "linear" | "spring" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate";
  bgColorCode?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  textClassName?: string;
  textStyle?: React.CSSProperties;
}
const generateClassName = (orientation: "horizontal" | "vertical", direction: "in" | "out", isReverse: boolean): string => {
  switch (orientation) {
    case "horizontal":
      return isReverse ? (
        direction === "out" ? "top-0 bottom-0 left-1/2 w-1/2 origin-left" : "top-0 bottom-0 left-1/2 w-1/2 origin-right"
      ) : (
        direction === "out" ? "top-0 bottom-0 right-1/2 w-1/2 origin-right" : "top-0 bottom-0 right-1/2 w-1/2 origin-left"
      );
    case "vertical":
      return isReverse ? (
        direction === "out" ? "left-0 right-0 top-1/2 h-1/2 origin-top" : "left-0 right-0 top-1/2 h-1/2 origin-bottom"
      ) : (
        direction === "out" ? "left-0 right-0 bottom-1/2 h-1/2 origin-bottom" : "left-0 right-0 bottom-1/2 h-1/2 origin-top"
      );
    default:
      return "";
  }
}

/**
 * ShutterButton Component
 *
 * A customizable button with animated shutter-style overlay effects on hover,
 * using Framer Motion. Supports both horizontal and vertical transitions,
 * with options to reverse direction and customize animation behavior.
 *
 * @component
 *
 * @param {Object} props - Props for the ShutterButton component
 * @param {"horizontal-in" | "horizontal-out" | "vertical-in" | "vertical-out"} [props.mode="horizontal-out"]
 *        Animation mode of the shutter. Determines direction and orientation.
 *
 * - "horizontal-in": overlay collapses inward from left and right
 * - "horizontal-out": overlay expands outward from center to sides
 * - "vertical-in": overlay collapses inward from top and bottom
 * - "vertical-out": overlay expands outward from center to top/bottom
 *
 * @param {React.ReactNode} props.icon - Icon element to display in the button.
 *
 * @param {string} props.text - Text label displayed alongside the icon.
 *
 * @param {string} [props.bgColorCode="#4DD0E1"] - Background color of the shutter overlay.
 *
 * @param {number} [props.duration=0.5] - Duration (in seconds) of the hover animation.
 *
 * @param {"easeIn" | "easeOut" | "easeInOut" | "linear" | "spring" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate"} [props.ease="easeInOut"]
 *        Easing function used for the shutter animation.
 *
 * @param {string} [props.containerClassName] - Additional Tailwind CSS classes for the root button container.
 *
 * @param {React.CSSProperties} [props.containerStyle] - Inline styles for the root button container.
 *
 * @param {string} [props.textClassName] - Additional Tailwind CSS classes for the text element.
 *
 * @param {React.CSSProperties} [props.textStyle] - Inline styles for the text element.
 *
 * @param {HTMLMotionProps<"button">} [rest] - Additional props inherited from Framer Motion's `motion.button`.
 *
 * @returns {JSX.Element} A button with animated shutter overlay effects on hover.
 */
const ShutterButton: React.FC<IShutterButtonProps> = ({
  mode = "horizontal-out",
  icon,
  text,
  bgColorCode = "#4DD0E1",
  containerClassName,
  containerStyle,
  textClassName,
  textStyle,
  duration = 0.5,
  ease = "easeInOut",
  ...rest
}) => {
  const orientation = mode.includes("horizontal") ? "horizontal" : "vertical";
  const direction = mode.includes("in") ? "in" : "out";
  const overlayVariants: MotionProps["variants"] = {
    initial: {
      scaleX: orientation === "horizontal" ? 0 : 1,
      scaleY: orientation === "vertical" ? 0 : 1,
    },
    hover: {
      scaleX: 1,
      scaleY: 1,
      transition: { duration: duration, ease: ease },
    },
  };

  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      animate="initial"
      className={cn("relative overflow-hidden flex items-center justify-center", containerClassName)}
      style={containerStyle}
      {...rest}
    >
      <motion.span
        variants={overlayVariants}
        style={{ background: bgColorCode }}
        className={`absolute ${generateClassName(orientation, direction, false)}`}
      />
      <motion.span
        variants={overlayVariants}
        style={{ background: bgColorCode }}
        className={`absolute ${generateClassName(orientation, direction, true)}`}
      />
      <div className="relative z-10 flex justify-center items-center gap-2">
        <span
          className={cn("", textClassName)}
          style={textStyle}
        >
          {text}
        </span>
        {icon}
      </div>
    </motion.button>
  );
};

export default ShutterButton;
