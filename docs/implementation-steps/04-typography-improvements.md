# Typography Improvements

## Current Issues

- Typography lacks clear hierarchy
- Font weights not optimized for legibility and emphasis
- Limited distinction between different text elements
- Insufficient spacing between text elements

## Implementation Steps

### 1. Update Typography in Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
        display: ["Inter var", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
    },
  },
};
```

### 2. Create Typography Components

```jsx
// src/components/ui/typography.jsx

export const Heading1 = ({ children, className = "" }) => (
  <h1 className={`text-3xl font-bold tracking-tight text-gray-900 ${className}`}>{children}</h1>
);

export const Heading2 = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-semibold tracking-tight text-gray-900 ${className}`}>{children}</h2>
);

export const Heading3 = ({ children, className = "" }) => (
  <h3 className={`text-xl font-semibold tracking-tight text-gray-800 ${className}`}>{children}</h3>
);

export const Subtitle = ({ children, className = "" }) => (
  <p className={`text-lg font-medium text-gray-700 ${className}`}>{children}</p>
);

export const BodyText = ({ children, className = "" }) => (
  <p className={`text-base text-gray-600 ${className}`}>{children}</p>
);

export const Caption = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

export const HighlightText = ({ children, className = "", color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
  };

  return (
    <span className={`font-medium ${colorClasses[color] || colorClasses.blue} ${className}`}>
      {children}
    </span>
  );
};
```

### 3. Implement Custom Bullet Points

```jsx
// src/components/ui/ListItem.jsx
import { CheckCircleIcon } from "@/components/icons/CheckCircleIcon";

export const ListItem = ({ children, className = "" }) => (
  <li className={`flex items-start mb-2 ${className}`}>
    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
    <span className="text-gray-600">{children}</span>
  </li>
);

// Usage
<ul className="space-y-2 mt-4">
  <ListItem>Protect against adverse price movements</ListItem>
  <ListItem>Secure future Bitcoin prices with limited risk</ListItem>
  <ListItem>Safeguard your existing Bitcoin holdings</ListItem>
</ul>;
```

### 4. Enhanced Card Heading

```jsx
// For card headings, apply the enhanced typography
<div className="flex items-center">
  <div className="p-2 rounded-full bg-blue-50">
    <ShieldIcon className="h-10 w-10 text-blue-500" />
  </div>
  <h3 className="text-xl font-semibold tracking-tight text-gray-900 ml-3">
    Protect against Bitcoin price drops
  </h3>
</div>
```

### 5. Improved Feature Description

```jsx
// Before
<p className="text-blue-600 font-medium flex items-center">
  <ArrowRightIcon className="h-4 w-4 mr-1" />
  Price Drop Protection ensures you can sell Bitcoin at a guaranteed value
</p>

// After
<p className="text-blue-600 font-medium flex items-start leading-tight tracking-tight">
  <ArrowRightIcon className="h-4 w-4 mr-1.5 mt-1 flex-shrink-0" />
  <span>Price Drop Protection ensures you can sell Bitcoin at a guaranteed value</span>
</p>
```

### 6. Section Title Enhancement

```jsx
// Before
<div className="flex items-center">
  <ShieldIcon className="h-6 w-6 text-red-500" />
  <h4 className="text-lg font-medium ml-2">Protection Against Price Movement</h4>
</div>

// After
<div className="flex items-center">
  <ShieldIcon className="h-6 w-6 text-red-500" />
  <h4 className="text-lg font-semibold tracking-tight text-gray-800 ml-2.5">
    Protection Against Price Movement
  </h4>
</div>
```

### 7. Main Screen Title Enhancement

```jsx
// Before
<h1 className="text-3xl font-bold mb-8">Bitcoin Protection Center</h1>

// After
<h1 className="text-3xl font-bold tracking-tighter text-gray-900 mb-8">
  Bitcoin Protection Center
</h1>
```

### 8. Step Indicator Typography

```jsx
// Before
<div className="flex justify-between mb-8">
  <div className="flex flex-col items-center">
    <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white mb-2">
      1
    </div>
    <span className="text-sm">Protection Type</span>
  </div>
  {/* Other steps */}
</div>

// After
<div className="flex justify-between mb-8">
  <div className="flex flex-col items-center">
    <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white mb-2">
      <span className="font-semibold">1</span>
    </div>
    <span className="text-sm font-medium tracking-wide uppercase text-gray-600">Protection Type</span>
  </div>
  {/* Other steps */}
</div>
```

### 9. Selection Question Enhancement

```jsx
// Before
<h2 className="text-2xl font-bold mb-6">
  What are you looking to protect against?
</h2>

// After
<h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
  What are you looking to protect against?
</h2>
```

### 10. Button Text Enhancement

```jsx
// Before
<button className="bg-black text-white py-3 px-6 rounded-lg">
  Choose Coverage Amount
</button>

// After
<button className="bg-black text-white py-3 px-6 rounded-lg font-medium tracking-wide">
  Choose Coverage Amount
</button>
```

### 11. Apply Typography Globally

```jsx
// In your global CSS or a typography utility
:root {
  --font-sans: 'Inter var', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

html {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Improve heading rendering */
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

/* Improve paragraph rendering */
p {
  text-wrap: pretty;
}
```
