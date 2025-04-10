# Complete Implementation: Protection Type Selection Screen

This implementation combines all the previous enhancements into a complete, production-ready implementation of the Protection Type Selection screen from BitHedge's Bitcoin Protection Center.

## Implementation

```jsx
// src/components/BitcoinProtection/ProtectionTypeSelection.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { PulsingDot } from "@/components/ui/PulsingDot";
import { Heading1, Heading2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/Button";
import { ShieldIcon } from "@/components/icons/ShieldIcon";
import { LockIcon } from "@/components/icons/LockIcon";
import { BitcoinProtectionIcon } from "@/components/icons/BitcoinProtectionIcon";
import { LearnMoreButton } from "@/components/ui/LearnMoreButton";
import { CollapsibleDetail } from "@/components/ui/CollapsibleDetail";
import { PageTransition, StaggerItem } from "@/components/ui/PageTransition";
import { CardHighlight } from "@/components/ui/CardHighlight";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { ListItem } from "@/components/ui/ListItem";
import { SelectionCard } from "@/components/ui/SelectionCard";
import { LearnMoreText } from "@/components/ui/LearnMoreText";

export const ProtectionTypeSelection = ({ onNext, onBack }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (selectedType) {
      onNext(selectedType);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <BitcoinProtectionIcon className="h-8 w-8" animate={true} />
              <Heading1>Bitcoin Protection Center</Heading1>
            </div>
            <div className="flex items-center space-x-2">
              <PulsingDot color="green" />
              <span className="text-sm text-gray-700">Testnet</span>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-between mb-8 mt-8">
            <StaggerItem>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white mb-2">
                  <span className="font-semibold">1</span>
                </div>
                <span className="text-sm font-medium tracking-wide uppercase text-gray-900">
                  Protection Type
                </span>
              </div>
            </StaggerItem>

            <StaggerItem delay={0.05}>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-2">
                  <span className="font-semibold">2</span>
                </div>
                <span className="text-sm font-medium tracking-wide uppercase text-gray-500">
                  Coverage Amount
                </span>
              </div>
            </StaggerItem>

            <StaggerItem delay={0.1}>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-2">
                  <span className="font-semibold">3</span>
                </div>
                <span className="text-sm font-medium tracking-wide uppercase text-gray-500">
                  Coverage Period
                </span>
              </div>
            </StaggerItem>

            <StaggerItem delay={0.15}>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-2">
                  <span className="font-semibold">4</span>
                </div>
                <span className="text-sm font-medium tracking-wide uppercase text-gray-500">
                  Select Policy
                </span>
              </div>
            </StaggerItem>

            <StaggerItem delay={0.2}>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-2">
                  <span className="font-semibold">5</span>
                </div>
                <span className="text-sm font-medium tracking-wide uppercase text-gray-500">
                  Review Policy
                </span>
              </div>
            </StaggerItem>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <StaggerItem>
            <Heading2 className="mb-6">What are you looking to protect against?</Heading2>
          </StaggerItem>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Protection Type Cards */}
            <motion.div variants={itemVariants}>
              <CardHighlight active={selectedType === "price-drop"} color="blue">
                <SelectionCard
                  isSelected={selectedType === "price-drop"}
                  onClick={() => handleSelectType("price-drop")}
                  variant="protection"
                  className="p-6"
                >
                  <div className="flex items-center">
                    <div
                      className={`
                      p-2 rounded-full 
                      ${selectedType === "price-drop" ? "bg-blue-100" : "bg-blue-50"}
                      ${selectedType === "price-drop" ? "text-blue-600" : "text-blue-500"}
                    `}
                    >
                      <ShieldIcon className="h-10 w-10" animate={selectedType === "price-drop"} />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 ml-3">
                      Protect against Bitcoin price drops
                    </h3>
                  </div>

                  <div className="mt-4">
                    <p className="text-blue-600 font-medium flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1.5 mt-1 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Price Drop Protection ensures you can sell Bitcoin at a guaranteed value
                      </span>
                      <LearnMoreButton
                        title="Price Drop Protection"
                        className="ml-1.5"
                        variant="icon"
                        size="sm"
                      >
                        <p>
                          A price protection policy gives you the right to sell sBTC at a fixed
                          price, even if the market price decreases.
                        </p>
                        <p className="mt-4">Maximum cost: Only the protection premium you pay</p>
                        <p className="mt-4">
                          Think of it like insurance for your Bitcoin value. You pay a small premium
                          upfront to protect against significant losses if the price falls.
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
                            When you purchase price drop protection, you're essentially buying a PUT
                            option that can be exercised if Bitcoin's price falls below your
                            protected price.
                          </p>
                          <p className="mt-2">
                            Maximum cost: Limited to the premium you pay upfront
                          </p>
                        </>
                      }
                    />
                  </div>
                </SelectionCard>
              </CardHighlight>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardHighlight active={selectedType === "price-lock"} color="green">
                <SelectionCard
                  isSelected={selectedType === "price-lock"}
                  onClick={() => handleSelectType("price-lock")}
                  variant="lock"
                  className="p-6"
                >
                  <div className="flex items-center">
                    <div
                      className={`
                      p-2 rounded-full 
                      ${selectedType === "price-lock" ? "bg-green-100" : "bg-green-50"}
                      ${selectedType === "price-lock" ? "text-green-600" : "text-green-500"}
                    `}
                    >
                      <LockIcon className="h-10 w-10" animate={selectedType === "price-lock"} />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 ml-3">
                      Lock in Bitcoin purchase price
                    </h3>
                  </div>

                  <div className="mt-4">
                    <p className="text-green-600 font-medium flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1.5 mt-1 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Purchase Price Lock lets you buy Bitcoin at today's price even if the market
                        rises later
                      </span>
                      <LearnMoreButton
                        title="Purchase Price Lock"
                        className="ml-1.5"
                        variant="icon"
                        size="sm"
                      >
                        <p>
                          A price lock guarantee gives you the right to buy sBTC at a fixed price,
                          even if the market price increases.
                        </p>
                        <p className="mt-4">Maximum cost: Only the lock-in fee you pay</p>
                        <p className="mt-4">
                          This works like a price guarantee - you pay a small fee today to ensure
                          you can buy Bitcoin at the current price even if the market price goes up
                          significantly.
                        </p>
                      </LearnMoreButton>
                    </p>
                  </div>

                  <div className="mt-3">
                    <LearnMoreText
                      summary="A price lock guarantee gives you the right to buy sBTC at a fixed price, even if the market price increases."
                      details={
                        <>
                          <p>
                            When you secure a price lock, you're purchasing a CALL option that can
                            be exercised if Bitcoin's price rises above your locked-in price.
                          </p>
                          <p className="mt-2">
                            Maximum cost: Limited to the lock-in fee you pay upfront
                          </p>
                        </>
                      }
                    />
                  </div>
                </SelectionCard>
              </CardHighlight>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 relative overflow-hidden bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <BackgroundPattern />

            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <BitcoinProtectionIcon className="h-6 w-6 text-red-500" />
                <h4 className="text-lg font-semibold tracking-tight text-gray-800 ml-2.5">
                  Protection Against Price Movement
                </h4>
              </div>

              <CollapsibleDetail
                title="Learn more about Bitcoin protection policies"
                isDefaultOpen={false}
                className="border-t-0"
              >
                <p className="mt-3 text-gray-600">
                  Bitcoin protection policies give you the right (but not the obligation) to buy or
                  sell BTC at a fixed price. They can be used to:
                </p>

                <ul className="space-y-2 mt-4">
                  <ListItem>Protect against adverse price movements</ListItem>
                  <ListItem>Secure future Bitcoin prices with limited risk</ListItem>
                  <ListItem>Safeguard your existing Bitcoin holdings</ListItem>
                </ul>
              </CollapsibleDetail>
            </div>
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between">
          <Button variant="secondary" onClick={onBack}>
            Back to Home
          </Button>

          <Button disabled={!selectedType} onClick={handleNext}>
            Choose Coverage Amount
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};
```

## Implementation Summary

This implementation incorporates all the UI/UX enhancements discussed in the previous documents:

1. **Progressive Disclosure Architecture**

   - Information is organized in layers, with critical details visible by default and additional information accessible via "Learn More" buttons and expandable sections
   - Users can access detailed explanations without being overwhelmed by them initially

2. **Card Design Refinement**

   - Cards feature enhanced visual design with gradients, shadows, and rounded corners
   - Selection state is clearly indicated through visual feedback
   - Interactive elements provide clear hover and active states

3. **Icon System Upgrade**

   - Icons are enhanced with animation and visual interest
   - Two-tone color treatment adds depth and visual appeal
   - Special Bitcoin protection icons are implemented

4. **Typography Improvements**

   - Clear typographic hierarchy with distinct sizing and weights
   - Enhanced readability through proper spacing and line height
   - Consistent text styling based on importance and function

5. **Color and Visual Feedback**

   - Rich color system with semantic meaning (blue for price protection, green for price lock)
   - Interactive elements provide clear visual feedback
   - Background patterns and visual enhancements add depth without distraction

6. **Learn More Pattern**
   - Consistent access to detailed information through standardized patterns
   - Multiple ways to reveal additional content (modals, expandable sections, tooltips)
   - Clear visual cues indicate where more information is available

## Visual Considerations

The implementation emphasizes visual hierarchy through:

1. **Primary Focus Areas**

   - Protection type selection cards are the largest and most visually prominent elements
   - Active selection state is reinforced through multiple visual cues (color, animation, checkmark)

2. **Secondary Elements**

   - Educational content is visually de-emphasized but easily accessible
   - Navigation controls are clearly visible but don't compete with main content

3. **Progressive Animation**
   - Elements appear in a logical sequence through staggered animations
   - Interactions are emphasized through subtle motion
   - Selection state changes include meaningful animation

## Accessibility Considerations

The implementation includes important accessibility features:

1. **Keyboard Navigation**

   - All interactive elements are keyboard accessible
   - Focus states are clearly visible
   - Proper ARIA attributes ensure screen reader compatibility

2. **Text Legibility**

   - Sufficient contrast ratios between text and background
   - Readable font sizes throughout
   - Text can scale appropriately for users with vision impairments

3. **Semantic Structure**
   - Proper heading hierarchy
   - Meaningful button labels
   - Clear state indicators for interactive elements

## Result and Benefits

The redesigned Protection Type Selection screen achieves several key objectives:

1. **Reduced Cognitive Load**

   - Initial view presents only essential information
   - Educational content is available on demand
   - Visual cues guide attention to primary actions

2. **Enhanced Visual Appeal**

   - Modern, polished aesthetic with depth and dimension
   - Cohesive visual system with clear meaning
   - Subtle animations enhance engagement without distraction

3. **Improved Usability**

   - Clear action paths with meaningful feedback
   - Consistent patterns for accessing information
   - Strong visual hierarchy guiding users through the flow

4. **Maintained Educational Value**
   - All educational content is preserved and accessible
   - Information is structured in digestible chunks
   - Consistent patterns make learning intuitive

This implementation demonstrates how the insurance metaphor can be effectively communicated while maintaining a clean, modern interface that doesn't overwhelm users with text.
