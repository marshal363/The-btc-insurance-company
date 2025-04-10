# Color and Visual Feedback Enhancements

## Current Issues

- Limited visual feedback for user interactions
- Flat color palette with minimal visual interest
- Lack of visual cues to guide user attention
- Missing micro-animations and transitions

## Implementation Steps

### 1. Enhanced Color System in Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        bitcoin: {
          DEFAULT: "#F7931A",
          light: "#FFB347",
          dark: "#E87B06",
        },
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
    },
  },
};
```

### 2. Create Visual Feedback Hooks

```jsx
// src/hooks/useVisualFeedback.js
import { useState } from "react";

export function useButtonFeedback() {
  const [isPressed, setIsPressed] = useState(false);

  const buttonProps = {
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onMouseLeave: () => setIsPressed(false),
    className: `transition-all duration-200 ${
      isPressed ? "transform scale-95 shadow-inner" : "transform scale-100 shadow"
    }`,
  };

  return buttonProps;
}

export function useSelectionFeedback(isSelected) {
  return {
    className: `transition-all duration-300 ${
      isSelected ? "ring-2 ring-primary-500 ring-opacity-50" : "hover:ring-2 hover:ring-gray-200"
    }`,
  };
}
```

### 3. Implement Button with Enhanced Visual Feedback

```jsx
// src/components/ui/Button.jsx
import { motion } from "framer-motion";
import { useButtonFeedback } from "@/hooks/useVisualFeedback";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const feedback = useButtonFeedback();

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50",
    success: "bg-success-600 text-white hover:bg-success-500",
    danger: "bg-danger-600 text-white hover:bg-danger-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2.5 px-5 text-base",
    lg: "py-3 px-6 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        rounded-lg font-medium tracking-wide transition-colors
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...feedback}
      {...props}
    >
      {children}
    </motion.button>
  );
};
```

### 4. Create Color Utility for Text Highlights

```jsx
// src/utils/colorUtils.js
export const getHighlightColors = (type) => {
  switch (type) {
    case "info":
      return {
        text: "text-blue-700",
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "text-blue-500",
      };
    case "success":
      return {
        text: "text-green-700",
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "text-green-500",
      };
    case "warning":
      return {
        text: "text-amber-700",
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: "text-amber-500",
      };
    case "danger":
      return {
        text: "text-red-700",
        bg: "bg-red-50",
        border: "border-red-200",
        icon: "text-red-500",
      };
    case "neutral":
    default:
      return {
        text: "text-gray-700",
        bg: "bg-gray-50",
        border: "border-gray-200",
        icon: "text-gray-500",
      };
  }
};
```

### 5. Create Animated Card Selection Component

```jsx
// src/components/ui/SelectionCard.jsx
import { motion } from "framer-motion";

export const SelectionCard = ({
  children,
  isSelected,
  onClick,
  variant = "default",
  className = "",
}) => {
  const getCardStyle = () => {
    switch (variant) {
      case "protection":
        return {
          bg: isSelected
            ? "bg-gradient-to-br from-blue-50 to-blue-100"
            : "bg-gradient-to-br from-gray-50 to-gray-100",
          border: isSelected ? "border border-blue-200" : "border border-transparent",
          shadow: isSelected ? "shadow-md" : "shadow-sm hover:shadow",
        };
      case "lock":
        return {
          bg: isSelected
            ? "bg-gradient-to-br from-green-50 to-green-100"
            : "bg-gradient-to-br from-gray-50 to-gray-100",
          border: isSelected ? "border border-green-200" : "border border-transparent",
          shadow: isSelected ? "shadow-md" : "shadow-sm hover:shadow",
        };
      default:
        return {
          bg: isSelected ? "bg-gray-100" : "bg-white",
          border: isSelected ? "border border-gray-300" : "border border-gray-200",
          shadow: isSelected ? "shadow-md" : "shadow-sm hover:shadow",
        };
    }
  };

  const style = getCardStyle();

  const cardVariants = {
    selected: {
      y: -2,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    unselected: {
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  const checkVariants = {
    selected: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    unselected: {
      opacity: 0,
      scale: 0.8,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl ${style.bg} ${style.border} ${style.shadow} transition-all duration-300 ${className}`}
      variants={cardVariants}
      animate={isSelected ? "selected" : "unselected"}
      onClick={onClick}
      whileHover={{ y: -2 }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      {isSelected && (
        <motion.div
          className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-1"
          variants={checkVariants}
          initial="unselected"
          animate="selected"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      )}

      {children}
    </motion.div>
  );
};
```

### 6. Implement Card Highlight Effects

```jsx
// src/components/ui/CardHighlight.jsx
import { motion } from "framer-motion";

export const CardHighlight = ({ children, active = false, color = "blue" }) => {
  const getHighlightColor = () => {
    switch (color) {
      case "blue":
        return "#3b82f6";
      case "green":
        return "#10b981";
      case "red":
        return "#ef4444";
      default:
        return "#3b82f6";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: active ? 0.05 : 0,
          transition: { duration: 0.3 },
        }}
        style={{
          background: `radial-gradient(circle at center, ${getHighlightColor()} 0%, transparent 70%)`,
          mixBlendMode: "multiply",
        }}
      />
      {children}
    </div>
  );
};

// Usage
<CardHighlight active={isSelected} color="blue">
  <SelectionCard isSelected={isSelected} onClick={handleSelect}>
    {/* Card content */}
  </SelectionCard>
</CardHighlight>;
```

### 7. Create Pulsing Notification Dot Component

```jsx
// src/components/ui/PulsingDot.jsx
import { motion } from "framer-motion";

export const PulsingDot = ({ color = "green", size = "md" }) => {
  const colors = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
  };

  const sizes = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative">
      <div className={`rounded-full ${colors[color]} ${sizes[size]}`} />
      <motion.div
        className={`absolute top-0 left-0 rounded-full ${colors[color]} ${sizes[size]}`}
        initial={{ opacity: 0.7 }}
        variants={pulseVariants}
        animate="pulse"
        style={{ filter: "blur(1px)" }}
      />
    </div>
  );
};

// Usage for status indicator
<div className="flex items-center space-x-2">
  <PulsingDot color="green" />
  <span className="text-sm text-gray-700">Connected</span>
</div>;
```

### 8. Implement Page Transition Effects

```jsx
// src/components/ui/PageTransition.jsx
import { motion } from "framer-motion";

export const PageTransition = ({ children }) => {
  const variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <motion.div variants={variants} initial="hidden" animate="visible" exit="exit">
      {children}
    </motion.div>
  );
};

// Item animation for children
export const StaggerItem = ({ children, delay = 0 }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
        delay,
      },
    },
  };

  return <motion.div variants={variants}>{children}</motion.div>;
};
```

### 9. Create Background Pattern Component

```jsx
// src/components/ui/BackgroundPattern.jsx
export const BackgroundPattern = ({ className = "" }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none opacity-5 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
  );
};

// Usage
<div className="relative">
  <BackgroundPattern />
  <div className="relative z-10">{/* Content */}</div>
</div>;
```

### 10. Create Selection Feedback Animation

```jsx
// src/components/animations/SelectionFeedback.jsx
import { motion } from "framer-motion";

export const SelectionFeedback = ({ isVisible, x, y }) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        x,
        y,
      }}
      transition={{ duration: 0.3, ease: "backOut" }}
    >
      <div className="w-16 h-16 rounded-full bg-primary-500 bg-opacity-20 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
```
