# Learn More Pattern and Interactive Elements

## Current Issues

- Excessive text causes cognitive overload
- Critical information is buried in lengthy descriptions
- Lack of progressive disclosure for educational content
- No standardized way to access additional information

## Implementation Steps

### 1. Create Modal Component for Detailed Information

```jsx
// src/components/ui/Modal.jsx
import { Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

export const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  const cancelButtonRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This centers the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} sm:w-full sm:p-6`}
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={onClose}
                  ref={cancelButtonRef}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div>
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {title}
                </Dialog.Title>
                <div className="mt-2">{children}</div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
```

### 2. Create "Learn More" Button Component

```jsx
// src/components/ui/LearnMoreButton.jsx
import { useState } from "react";
import { Modal } from "./Modal";
import { InformationCircleIcon } from "@heroicons/react/outline";

export const LearnMoreButton = ({
  title,
  children,
  variant = "icon",
  size = "md",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const renderButton = () => {
    switch (variant) {
      case "text":
        return (
          <button
            type="button"
            onClick={openModal}
            className={`text-primary-600 hover:text-primary-700 font-medium inline-flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded ${className}`}
          >
            <InformationCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
            Learn more
          </button>
        );

      case "link":
        return (
          <button
            type="button"
            onClick={openModal}
            className={`text-primary-600 hover:text-primary-700 hover:underline font-medium text-sm focus:outline-none ${className}`}
          >
            Learn more
          </button>
        );

      case "icon":
      default:
        return (
          <button
            type="button"
            onClick={openModal}
            className={`text-gray-400 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-full ${className}`}
            aria-label="Learn more"
          >
            <InformationCircleIcon
              className={size === "sm" ? "h-4 w-4" : "h-5 w-5"}
              aria-hidden="true"
            />
          </button>
        );
    }
  };

  return (
    <>
      {renderButton()}

      <Modal isOpen={isOpen} onClose={closeModal} title={title} size="md">
        <div className="prose prose-blue max-w-none">{children}</div>
      </Modal>
    </>
  );
};
```

### 3. Create Educational Tooltip Component

```jsx
// src/components/ui/Tooltip.jsx
import { useState } from "react";
import { Transition } from "@headlessui/react";

export const Tooltip = ({ children, content, position = "top", className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    }
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}

      <Transition
        show={isVisible}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div
          className={`absolute z-10 w-64 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded shadow-md ${getPositionClasses()}`}
        >
          {content}

          {/* Triangle pointer */}
          <div
            className={`absolute w-3 h-3 transform rotate-45 bg-white border ${
              position === "top"
                ? "top-full -mt-1.5 left-1/2 -ml-1.5 border-t-0 border-l-0"
                : position === "bottom"
                ? "bottom-full -mb-1.5 left-1/2 -ml-1.5 border-b-0 border-r-0"
                : position === "left"
                ? "left-full -ml-1.5 top-1/2 -mt-1.5 border-l-0 border-t-0"
                : "right-full -mr-1.5 top-1/2 -mt-1.5 border-r-0 border-b-0"
            } border-gray-200`}
          />
        </div>
      </Transition>
    </div>
  );
};
```

### 4. Create Collapsible Detail Section

```jsx
// src/components/ui/CollapsibleDetail.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/solid";

export const CollapsibleDetail = ({ title, children, isDefaultOpen = false, className = "" }) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`border-t border-gray-200 ${className}`}>
      <button
        type="button"
        className="flex justify-between w-full py-3 text-left focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-gray-800">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center ml-2 text-gray-400"
        >
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

### 5. Implement Info Card with Learn More Pattern

```jsx
// src/components/ui/InfoCard.jsx
import { LearnMoreButton } from "./LearnMoreButton";

export const InfoCard = ({ title, summary, detailedContent, icon, className = "" }) => {
  return (
    <div className={`bg-white p-4 rounded-lg border border-gray-200 shadow-sm ${className}`}>
      <div className="flex items-start">
        {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>

            <LearnMoreButton title={title} variant="icon" size="sm">
              {detailedContent}
            </LearnMoreButton>
          </div>

          <p className="mt-1 text-sm text-gray-600">{summary}</p>
        </div>
      </div>
    </div>
  );
};
```

### 6. Create Enhanced Learn More Text Component

```jsx
// src/components/ui/LearnMoreText.jsx
import { useState, useRef } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";

export const LearnMoreText = ({ summary, details, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className={className}>
      <p className="text-gray-600">
        {summary}
        {!isExpanded && (
          <button
            type="button"
            onClick={toggleExpanded}
            className="ml-1 text-primary-600 hover:text-primary-700 inline-flex items-center text-sm font-medium focus:outline-none"
          >
            Learn more
            <ChevronRightIcon className="h-4 w-4 transition-transform" aria-hidden="true" />
          </button>
        )}
      </p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="mt-2 text-gray-600 text-sm">
              {details}

              <button
                type="button"
                onClick={toggleExpanded}
                className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium focus:outline-none"
              >
                Show less
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

### 7. Create Educational Badge Component

```jsx
// src/components/ui/EducationalBadge.jsx
import { Tooltip } from "./Tooltip";

export const EducationalBadge = ({ label, tooltip, variant = "info", className = "" }) => {
  const variants = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    neutral: "bg-gray-100 text-gray-800",
  };

  return (
    <Tooltip content={tooltip} position="top">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      >
        {label}
      </span>
    </Tooltip>
  );
};
```

### 8. Implement Card with Protection Type and Info Button

```jsx
// src/components/BitcoinProtection/ProtectionTypeCard.jsx
import { LearnMoreButton } from "@/components/ui/LearnMoreButton";
import { ShieldIcon } from "@/components/icons/ShieldIcon";

export const ProtectionTypeCard = ({
  title,
  summary,
  detailedContent,
  icon = <ShieldIcon className="h-8 w-8 text-blue-500" />,
  isSelected = false,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`
        p-6 rounded-xl cursor-pointer transition-all
        ${
          isSelected
            ? "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-md"
            : "bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm hover:shadow hover:-translate-y-0.5"
        }
        ${className}
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-white bg-opacity-50">{icon}</div>
          <h3 className="text-xl font-semibold ml-3 text-gray-900">{title}</h3>
        </div>

        <LearnMoreButton title={title} variant="icon">
          {detailedContent}
        </LearnMoreButton>
      </div>

      <p className="mt-3 text-gray-600">{summary}</p>

      {isSelected && (
        <div className="mt-3 bg-blue-600 text-white px-3 py-1.5 rounded-lg inline-block text-sm font-medium">
          Selected
        </div>
      )}
    </div>
  );
};
```

### 9. Implement Feature Highlight Component with Learn More

```jsx
// src/components/ui/FeatureHighlight.jsx
import { ArrowRightIcon } from "@heroicons/react/solid";
import { LearnMoreButton } from "./LearnMoreButton";

export const FeatureHighlight = ({
  title,
  shortDescription,
  detailedContent,
  icon,
  className = "",
}) => {
  return (
    <div className={`mt-4 ${className}`}>
      <div className="flex items-center">
        <ArrowRightIcon className="h-4 w-4 text-blue-600 flex-shrink-0" />
        <h4 className="ml-2 text-lg font-medium text-blue-600 flex items-center">
          {title}
          <LearnMoreButton title={title} variant="icon" size="sm" className="ml-1">
            {detailedContent}
          </LearnMoreButton>
        </h4>
      </div>

      <p className="mt-1 text-gray-600 ml-6">{shortDescription}</p>
    </div>
  );
};
```

### 10. Implement Price Drop Protection Card with Learn More Pattern

```jsx
// src/components/BitcoinProtection/PriceDropProtectionCard.jsx
import { useState } from "react";
import { SelectionCard } from "@/components/ui/SelectionCard";
import { ShieldIcon } from "@/components/icons/ShieldIcon";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { LearnMoreButton } from "@/components/ui/LearnMoreButton";
import { LearnMoreText } from "@/components/ui/LearnMoreText";

export const PriceDropProtectionCard = ({ isSelected, onClick, className = "" }) => {
  return (
    <SelectionCard
      isSelected={isSelected}
      onClick={onClick}
      variant="protection"
      className={className}
    >
      <div className="flex items-center">
        <div
          className={`
          p-2 rounded-full 
          ${isSelected ? "bg-blue-100" : "bg-blue-50"}
          ${isSelected ? "text-blue-600" : "text-blue-500"}
        `}
        >
          <ShieldIcon className="h-10 w-10" animate={isSelected} />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-gray-900 ml-3">
          Protect against Bitcoin price drops
        </h3>
      </div>

      <div className="mt-4">
        <p className="text-blue-600 font-medium flex items-start">
          <ArrowRightIcon className="h-4 w-4 mr-1.5 mt-1 flex-shrink-0" />
          <span>Price Drop Protection ensures you can sell Bitcoin at a guaranteed value</span>
          <LearnMoreButton
            title="Price Drop Protection"
            className="ml-1.5"
            variant="icon"
            size="sm"
          >
            <p>
              A price protection policy gives you the right to sell sBTC at a fixed price, even if
              the market price decreases.
            </p>
            <p className="mt-4">Maximum cost: Only the protection premium you pay</p>
            <p className="mt-4">
              Think of it like insurance for your Bitcoin value. You pay a small premium upfront to
              protect against significant losses if the price falls.
            </p>
          </LearnMoreButton>
        </p>
      </div>

      <div className="mt-3">
        <LearnMoreText
          summary="A price protection policy gives you the right to sell sBTC at a fixed price, even if the market price decreases."
          details={
            <>
              <p>
                When you purchase price drop protection, you're essentially buying a PUT option that
                can be exercised if Bitcoin's price falls below your protected price.
              </p>
              <p className="mt-2">Maximum cost: Limited to the premium you pay upfront</p>
              <p className="mt-2">
                This protection works similarly to insurance - you pay a small premium to guard
                against a potentially larger loss.
              </p>
            </>
          }
        />
      </div>
    </SelectionCard>
  );
};
```
