# Icon System Upgrade

## Current Issues

- Basic icon system with limited visual impact
- Icons lack distinctiveness and personality
- No animation or interactive elements in icons
- Icons don't fully communicate the insurance concept

## Implementation Steps

### 1. Create Enhanced Icon Components

```jsx
// Create a new components/icons directory with enhanced icon components
// src/components/icons/ShieldIcon.jsx
import { motion } from "framer-motion"; // Add framer-motion for animations

export const ShieldIcon = ({ className, animate = false }) => {
  const variants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    active: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      animate={animate ? "active" : "initial"}
      variants={variants}
      className={className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
          fill="url(#shieldGradient)"
          strokeWidth="0.5"
          stroke="currentColor"
        />
        <path
          d="M12 6.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm3 6h-2.5v2.5h-1V12.5H9v-1h2.5V9h1v2.5H15v1z"
          fill="white"
        />
      </svg>
    </motion.div>
  );
};

// src/components/icons/LockIcon.jsx
export const LockIcon = ({ className, animate = false }) => {
  const variants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    active: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      animate={animate ? "active" : "initial"}
      variants={variants}
      className={className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect
          x="5"
          y="11"
          width="14"
          height="10"
          rx="2"
          fill="url(#lockGradient)"
          strokeWidth="0.5"
          stroke="currentColor"
        />
        <path
          d="M8 10V7c0-2.21 1.79-4 4-4s4 1.79 4 4v3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16" r="1.5" fill="white" />
      </svg>
    </motion.div>
  );
};

// src/components/icons/InfoIcon.jsx
export const InfoIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

// src/components/icons/ArrowIcon.jsx
export const ArrowIcon = ({ className, direction = "right" }) => {
  const getRotation = () => {
    switch (direction) {
      case "up":
        return "rotate(-90deg)";
      case "down":
        return "rotate(90deg)";
      case "left":
        return "rotate(180deg)";
      default:
        return "rotate(0)";
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      style={{ transform: getRotation() }}
    >
      <path
        fillRule="evenodd"
        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};
```

### 2. Create Animated Bitcoin Protection Icon

```jsx
// src/components/icons/BitcoinProtectionIcon.jsx
import { motion } from "framer-motion";

export const BitcoinProtectionIcon = ({ className, animate = false }) => {
  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    active: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 },
    },
  };

  const bitcoinVariants = {
    initial: { y: 0 },
    animate: {
      y: [-2, 2, -2],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

  const shieldVariants = {
    initial: { opacity: 0.7 },
    animate: {
      opacity: [0.7, 0.9, 0.7],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      animate={animate ? "active" : "initial"}
      variants={iconVariants}
      className={className}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="bitcoinShieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Shield */}
        <motion.path
          variants={shieldVariants}
          initial="initial"
          animate={animate ? "animate" : "initial"}
          d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
          fill="url(#bitcoinShieldGradient)"
          stroke="#3b82f6"
          strokeWidth="0.5"
        />

        {/* Bitcoin Logo */}
        <motion.g
          variants={bitcoinVariants}
          initial="initial"
          animate={animate ? "animate" : "initial"}
        >
          <circle cx="12" cy="12" r="5" fill="#fff" />
          <path
            d="M13.54 10.82c.15-.42.15-.85-.03-1.23-.24-.38-.65-.62-1.14-.67v-.92h-.61v.9c-.16 0-.32.01-.49.02v-.92h-.61v.92c-.13.01-.27.01-.4.02h-.79v.65h.42c.38 0 .5.14.54.28v2.25c-.02.13-.13.27-.43.27h-.42l-.12.72h.77c.13 0 .25 0 .38.01v.93h.61v-.91c.17.01.33.01.49.02v.89h.61v-.92c1.24-.08 2.04-.45 2.15-1.34.08-.68-.13-1.09-.54-1.35.25-.12.44-.32.54-.61zm-1.63 1.9v-1.55c.63 0 1.44-.1 1.44.77 0 .82-.8.78-1.44.78z"
            fill="#3b82f6"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
};
```

### 3. Implement Two-Tone Color Treatment

```jsx
// For all icon components, add two-tone styling

// In your tailwind.config.js, add custom colors
module.exports = {
  theme: {
    extend: {
      colors: {
        "primary-light": "#3b82f6", // Blue 500
        "primary-dark": "#1d4ed8", // Blue 700
        "secondary-light": "#10b981", // Emerald 500
        "secondary-dark": "#047857", // Emerald 700
      },
    },
  },
};

// Then in your components
<div className="relative">
  <ShieldIcon className="h-10 w-10 text-primary-light" />
  {/* Add highlight effect */}
  <div className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-secondary-light opacity-70 blur-sm"></div>
</div>;
```

### 4. Implement Icon Container with Animation

```jsx
const AnimatedIconContainer = ({ children, isSelected, color = "blue" }) => {
  const containerVariants = {
    initial: {
      background: "rgba(243, 244, 246, 1)", // gray-100
    },
    selected: {
      background:
        color === "blue"
          ? "rgba(219, 234, 254, 1)" // blue-100
          : "rgba(220, 252, 231, 1)", // green-100
      transition: { duration: 0.2 },
    },
  };

  const shadowVariants = {
    initial: { opacity: 0 },
    selected: {
      opacity: 0.5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="relative">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate={isSelected ? "selected" : "initial"}
        className="p-3 rounded-full relative z-10"
      >
        {children}
      </motion.div>
      <motion.div
        variants={shadowVariants}
        initial="initial"
        animate={isSelected ? "selected" : "initial"}
        className={`absolute inset-0 rounded-full blur-md ${
          color === "blue" ? "bg-blue-300" : "bg-green-300"
        }`}
      />
    </div>
  );
};

// Usage:
<AnimatedIconContainer isSelected={isSelected} color="blue">
  <ShieldIcon className="h-10 w-10" animate={isSelected} />
</AnimatedIconContainer>;
```

### 5. Create Bitcoin Icon Variants

```jsx
// src/components/icons/BitcoinIcon.jsx
export const BitcoinIcon = ({ className, variant = "default" }) => {
  const renderBitcoinVariant = () => {
    switch (variant) {
      case "protected":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
            {/* Bitcoin with shield overlay */}
            <circle cx="12" cy="12" r="10" fill="#F7931A" />
            <path
              d="M15.75 10.5c.41-.74.42-1.57.03-2.29-.38-.73-1.11-1.24-2.03-1.44V5h-1.5v1.65c-.34 0-.67.03-1 .08V5h-1.5v1.75c-.35.04-.69.08-1 .13-.21.03-.98.24-1 .24v1.5h1.5c.38 0 1 0 1 .75v5.5c0 .75-.62.75-1 .75H7.25v1.5c.35 0 .7-.04 1.03-.12.2-.05.64-.13.97-.13V19h1.5v-1.7c.34-.04.67-.11 1-.2V19h1.5v-2.1c2.18-.44 3.25-1.5 3.25-3.15 0-1.25-.5-2.25-1.5-2.75.5-.25.83-.67 1-1.5zM12 14.5c-1.25 0-2.25-1-2.25-2.25S10.75 10 12 10s2.25 1 2.25 2.25-1 2.25-2.25 2.25z"
              fill="#FFFFFF"
            />
            {/* Shield overlay */}
            <path
              d="M12 3.5l-6 2.5v3.5c0 3.25 2.5 6.25 6 7 3.5-0.75 6-3.75 6-7V6l-6-2.5z"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.7"
            />
          </svg>
        );

      case "locked":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
            {/* Bitcoin with lock overlay */}
            <circle cx="12" cy="12" r="10" fill="#F7931A" />
            <path
              d="M15.75 10.5c.41-.74.42-1.57.03-2.29-.38-.73-1.11-1.24-2.03-1.44V5h-1.5v1.65c-.34 0-.67.03-1 .08V5h-1.5v1.75c-.35.04-.69.08-1 .13-.21.03-.98.24-1 .24v1.5h1.5c.38 0 1 0 1 .75v5.5c0 .75-.62.75-1 .75H7.25v1.5c.35 0 .7-.04 1.03-.12.2-.05.64-.13.97-.13V19h1.5v-1.7c.34-.04.67-.11 1-.2V19h1.5v-2.1c2.18-.44 3.25-1.5 3.25-3.15 0-1.25-.5-2.25-1.5-2.75.5-.25.83-.67 1-1.5zM12 14.5c-1.25 0-2.25-1-2.25-2.25S10.75 10 12 10s2.25 1 2.25 2.25-1 2.25-2.25 2.25z"
              fill="#FFFFFF"
            />
            {/* Lock overlay */}
            <rect x="8" y="11" width="8" height="6" rx="1" fill="#3b82f6" opacity="0.7" />
            <path
              d="M9 11V9c0-1.66 1.34-3 3-3s3 1.34 3 3v2"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        );

      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
            <circle cx="12" cy="12" r="10" fill="#F7931A" />
            <path
              d="M15.75 10.5c.41-.74.42-1.57.03-2.29-.38-.73-1.11-1.24-2.03-1.44V5h-1.5v1.65c-.34 0-.67.03-1 .08V5h-1.5v1.75c-.35.04-.69.08-1 .13-.21.03-.98.24-1 .24v1.5h1.5c.38 0 1 0 1 .75v5.5c0 .75-.62.75-1 .75H7.25v1.5c.35 0 .7-.04 1.03-.12.2-.05.64-.13.97-.13V19h1.5v-1.7c.34-.04.67-.11 1-.2V19h1.5v-2.1c2.18-.44 3.25-1.5 3.25-3.15 0-1.25-.5-2.25-1.5-2.75.5-.25.83-.67 1-1.5zM12 14.5c-1.25 0-2.25-1-2.25-2.25S10.75 10 12 10s2.25 1 2.25 2.25-1 2.25-2.25 2.25z"
              fill="#FFFFFF"
            />
          </svg>
        );
    }
  };

  return renderBitcoinVariant();
};
```
