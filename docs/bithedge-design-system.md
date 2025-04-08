# BitHedge Design System

## Introduction

This document outlines the comprehensive design system for BitHedge, a decentralized application (dApp) built on the Stacks blockchain that enables users to hedge Bitcoin volatility using sBTC call options. The design system establishes clear guidelines to ensure consistent design and development across all aspects of the BitHedge platform, with a focus on creating a user experience that is intuitive, reassuring, and actionable for our target users. The visual approach draws inspiration from iOS design principles and modern trading platforms like Binance, creating a sleek, professional, and trustworthy interface.

## Context

- **Brand Name**: BitHedge
- **Product Type**: Web application / dApp
- **Design Inspiration**: iOS & Binance trading platform
- **Target Platforms**: Desktop (primary), Tablet, Mobile
- **Accessibility Requirements**: WCAG 2.1 AA compliance
- **Scalability Needs**: Support for future option types, increased trading volume, and expanded user base
- **Theming**: Light and dark mode support

## 1. Design Principles

### A. Brand Values

#### Core Principles

- **Security**: Emphasize protection, safety, and reliability
- **Clarity**: Present complex financial instruments in accessible ways
- **Trust**: Establish credibility through transparency and Bitcoin-backed stability
- **Control**: Give users power over their hedging strategies
- **Refinement**: Deliver a polished, premium experience that reflects the value of Bitcoin

#### Brand Personality

- **Reassuring**: Calm, confident, and supportive
- **Professional**: Knowledgeable but approachable
- **Precise**: Accurate and meticulous, without being overwhelming
- **Protective**: Focused on preserving value and reducing risk
- **Modern**: Contemporary, sleek, and technically sophisticated

#### Voice and Tone

- **Clear**: Use simple, direct language even for complex concepts
- **Supportive**: Provide guidance and reassurance
- **Educational**: Explain concepts without condescension
- **Honest**: Be transparent about risks, costs, and trade-offs
- **Confident**: Communicate with authority and expertise

#### Design Philosophy

- **Function First**: Prioritize usability and clarity over decoration
- **Emotional Relief**: Design experiences that alleviate anxiety about market volatility
- **Progressive Disclosure**: Reveal complexity gradually based on user need
- **Informed Action**: Enable users to make decisions with complete information
- **iOS-Inspired**: Embrace clarity, deference, and depth in the interface

### B. Visual Language

#### Design Aesthetic

- **Clean**: Spacious, uncluttered layouts focused on essential information
- **Precise**: Accurate visualizations and explicit data presentation
- **Structural**: Card-based organization with clear hierarchy
- **Calm**: Neutral backgrounds with strategic use of color for meaning
- **Elegant**: Refined, modern interface with premium feel
- **Depth**: Subtle shadows and layering for visual hierarchy
- **Translucency**: Strategic use of frosted glass effects for context awareness

#### Style Characteristics

- **Card-Based**: Content organized in discrete, rounded containers with subtle shadows
- **Data-Forward**: Emphasis on numbers, charts, and actionable metrics
- **Contextual**: Information presented with relevant context for decision-making
- **Accessible**: High contrast, readable type, and clear affordances
- **Glassy**: Subtle transparency effects for select UI elements
- **Focused**: Clear visual pathways that guide user attention
- **Binance-Inspired**: Trading interface patterns familiar to cryptocurrency users

#### Pattern Principles

- **Consistency**: Similar functions look and behave similarly
- **Feedback**: Every action produces visible confirmation
- **Guidance**: Progressive education through tooltips and contextual help
- **Predictability**: Interactions follow established patterns
- **Dimensionality**: Use of space and motion to create an engaging experience
- **Clarity**: Clear visual distinction between interactive and static elements

#### Consistency Guidelines

- **Visual**: Maintain consistent color, typography, and spacing across components
- **Behavioral**: Ensure interactions work the same way throughout the application
- **Terminology**: Use the same terms for the same concepts across the interface
- **Layout**: Follow consistent grid and component patterns
- **Motion**: Apply consistent animation patterns to create a cohesive experience
- **Theming**: Support seamless transitions between light and dark modes

## 2. Core Design Tokens

### A. Color System

#### Primary Palette

- **Bitcoin Blue** (#0052FF): Trust, stability, security (iOS-inspired bright blue)
  - 100: #E0EBFF
  - 200: #B8D1FF
  - 300: #80A9FF
  - 400: #4D85FF
  - 500: #0052FF (Primary)
  - 600: #0047DB
  - 700: #003BB7
  - 800: #002E8C
  - 900: #001F66

#### Secondary Palette

- **Neutral Gray** (#848E9C): Binance-inspired neutral tones
  - 100: #F5F5F5
  - 200: #E6E8EA
  - 300: #CFD6E4
  - 400: #B7BDC6
  - 500: #848E9C
  - 600: #474D57
  - 700: #323546
  - 800: #1E2329
  - 900: #0B0E11

#### Tertiary Colors

- **Success Green** (#02C076): Success, gain, positive outcomes
- **Warning Red** (#F6465D): Warning, loss, negative outcomes
- **Attention Yellow** (#F0B90B): Alerts, attention, caution

#### Semantic Colors

- **Success**: #02C076
- **Warning**: #F0B90B
- **Error**: #F6465D
- **Info**: #0052FF

#### State Colors

- **Default**: #FFFFFF (with appropriate border/text) or #1E2329 (dark mode)
- **Hover**: Lighten base color by 10%
- **Active/Selected**: Darken base color by 10%
- **Disabled**: #E6E8EA (with #848E9C text) or #323546 (with #474D57 text in dark mode)
- **Focus**: Base color with 3px outline at 50% opacity

#### Theme Colors

- **Light Mode**
  - **Background**: #F5F5F5
  - **Card Background**: #FFFFFF
  - **Border**: #E6E8EA
  - **Text Primary**: #1E2329
  - **Text Secondary**: #474D57
  - **Text Tertiary**: #848E9C
- **Dark Mode**
  - **Background**: #0B0E11
  - **Card Background**: #1E2329
  - **Border**: #323546
  - **Text Primary**: #FFFFFF
  - **Text Secondary**: #B7BDC6
  - **Text Tertiary**: #848E9C

#### Gradient Definitions

- **Action Gradient**: Linear, #0052FF to #2B5CFF (used sparingly)
- **Success Gradient**: Linear, #02C076 to #00A364
- **Chart Gradient**: Linear, transparent to #0052FF at 20% opacity (for area charts)
- **Glass Effect**: Background blur (10px) with 70% opacity overlay

#### Color Contrast Rules

- All text must maintain a 4.5:1 contrast ratio with its background
- Interactive elements require a 3:1 contrast ratio with surrounding colors
- Success/Error states must be distinguishable without relying solely on color

#### Accessibility Guidelines

- Do not rely on color alone to convey meaning
- Provide alternative cues (icons, text) alongside color indicators
- Ensure color blind-friendly combinations (avoid red/green without additional differentiators)
- Test all color combinations in both light and dark mode

### B. Typography

#### Font Families

- **Primary**: SF Pro Display (iOS system font) or Inter (web fallback)
- **Monospace**: SF Mono or Roboto Mono (for code, amounts, and tabular data)

#### Type Scale

- **Tiny**: 10px / 0.625rem
- **XSmall**: 12px / 0.75rem
- **Small**: 14px / 0.875rem
- **Base**: 16px / 1rem
- **Medium**: 18px / 1.125rem
- **Large**: 20px / 1.25rem
- **XLarge**: 24px / 1.5rem
- **XXLarge**: 30px / 1.875rem
- **Huge**: 36px / 2.25rem

#### Font Weights

- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

#### Line Heights

- **Tight**: 1.2
- **Base**: 1.5
- **Loose**: 1.8

#### Letter Spacing

- **Tight**: -0.01em
- **Normal**: 0
- **Wide**: 0.01em

#### Text Styles

##### Headings

- **H1**: 30px/1.2 (Semibold) - More prominent, iOS-inspired
- **H2**: 24px/1.2 (Semibold)
- **H3**: 20px/1.3 (Medium)
- **H4**: 18px/1.3 (Medium)
- **H5**: 16px/1.3 (Medium)

##### Body Text

- **Body Large**: 18px/1.5 (Regular)
- **Body**: 16px/1.5 (Regular)
- **Body Small**: 14px/1.5 (Regular)
- **Caption**: 12px/1.4 (Regular)

##### Special Text

- **Label**: 14px/1.2 (Medium)
- **Button**: 16px/1.2 (Medium)
- **Tag**: 12px/1 (Medium)
- **Code**: 14px/1.5 (SF Mono/Roboto Mono, Regular)
- **Amount**: 16px/1.2 (SF Mono/Roboto Mono, Medium)
- **Number**: 20px/1.2 (Medium) - Highlighted financial values

#### Heading Hierarchy

- Use only one H1 per page
- Maintain sequential order (H1 → H2 → H3)
- Headings must describe their section content
- Headings may be accompanied by supporting text (subheading)

#### Paragraph Styles

- **Default**: Body text with 16px bottom margin
- **Lead**: Larger intro paragraph (Body Large)
- **Supporting**: Smaller explanatory text (Body Small)

### C. Spacing System

#### Base Unit

- 4px (0.25rem)

#### Spacing Scale

- **2xs**: 4px (0.25rem) - 1 unit
- **xs**: 8px (0.5rem) - 2 units
- **sm**: 12px (0.75rem) - 3 units
- **md**: 16px (1rem) - 4 units
- **lg**: 24px (1.5rem) - 6 units
- **xl**: 32px (2rem) - 8 units
- **2xl**: 48px (3rem) - 12 units
- **3xl**: 64px (4rem) - 16 units

#### Layout Grid

- **Columns**: 12-column grid
- **Gutter**: 24px (lg)
- **Margin**: 16px minimum (md), responsive

#### Margins

- **Page Margin**: 16px (mobile), 32px (tablet), 48px (desktop)
- **Card Margin**: 16px (md)
- **Content Margin**: 24px (lg)

#### Padding

- **Card Padding**: 16px (md)
- **Button Padding**: 8px 16px (xs md)
- **Input Padding**: 8px 12px (xs sm)
- **Table Cell Padding**: 8px 12px (xs sm)

#### Component Spacing

- **Related Elements**: 8px (xs)
- **Section Spacing**: 24px (lg)
- **Form Field Spacing**: 16px (md)
- **List Item Spacing**: 8px (xs)

### D. Sizing

#### Icon Sizes

- **Small**: 16px
- **Medium**: 20px
- **Large**: 24px
- **XLarge**: 32px

#### Button Sizes

- **Small**: h32px, padding 8px 12px, font 14px
- **Medium**: h40px, padding 8px 16px, font 16px
- **Large**: h48px, padding 12px 24px, font 18px

#### Input Sizes

- **Small**: h32px
- **Medium**: h40px
- **Large**: h48px

#### Component Scales

- **Card**: Small (240px), Medium (360px), Large (480px), Full-width
- **Modal**: Small (400px), Medium (600px), Large (800px)
- **Table**: Small (4 columns), Medium (7 columns), Large (10+ columns)

### E. Border & Shadows

#### Border Widths

- **Thin**: 1px
- **Medium**: 2px
- **Thick**: 3px

#### Border Styles

- **Solid**: Default border style
- **Dashed**: Used for optional or unfilled states

#### Border Radii

- **None**: 0
- **Small**: 8px (iOS-inspired, more generous)
- **Medium**: 12px
- **Large**: 16px
- **XLarge**: 24px (for feature cards)
- **Circle**: 50%

#### Shadow Levels

- **None**: No shadow
- **Low**: 0 2px 4px rgba(0,0,0,0.05)
- **Medium**: 0 4px 8px rgba(0,0,0,0.08)
- **High**: 0 8px 16px rgba(0,0,0,0.12)
- **Focus**: 0 0 0 3px rgba(0,82,255,0.3)
- **Card**: 0 8px 16px rgba(0,0,0,0.06)

#### Glass Effects

- **Subtle Glass**: Background blur(10px) with 85% opacity
- **Medium Glass**: Background blur(20px) with 75% opacity
- **Heavy Glass**: Background blur(30px) with 65% opacity
- **Glass Card**: Background blur(16px) with 80% opacity, border 1px solid rgba(255,255,255,0.1)

#### Shadow Colors

- **Default**: rgba(0,0,0,0.1) / rgba(0,0,0,0.2) (dark mode)
- **Blue**: rgba(0,82,255,0.3)
- **Green**: rgba(2,192,118,0.3)
- **Red**: rgba(246,70,93,0.3)

### F. Motion

#### Duration Tokens

- **Instant**: 0ms
- **Fast**: 150ms
- **Normal**: 300ms
- **Slow**: 500ms
- **Deliberate**: 700ms (for special attention)

#### Easing Functions

- **Standard**: cubic-bezier(0.4, 0.0, 0.2, 1)
- **Decelerate**: cubic-bezier(0.0, 0.0, 0.2, 1)
- **Accelerate**: cubic-bezier(0.4, 0.0, 1, 1)
- **iOS Spring**: cubic-bezier(0.42, 0, 0.58, 1.0)

#### Animation Patterns

- **Fade**: Opacity 0 to 1
- **Scale**: Transform scale 0.95 to 1
- **Slide**: Transform translateY(10px) to translateY(0)
- **Pulse**: Scale up and down slightly (for attention)
- **Bounce**: Slight overshoot for emphasis (iOS-like)
- **Shimmer**: Highlight scan animation for loading states
- **Progress**: Animated progress indicators
- **Blur Transition**: Blur in/out for content changes

#### Micro-Interactions

- **Button Press**: Scale down to 0.98 with subtle shadow change
- **Toggle**: Smooth sliding with a bounce at the end
- **Card Hover**: Slight lift (translateY(-2px)) with shadow expansion
- **Success Confirmation**: Green check mark with gentle bounce
- **Data Refresh**: Rotating spinner with fade transition
- **Number Change**: Value transitions with count up/down animation

#### Transition Rules

- **Button**: background-color 150ms standard, transform 150ms iOS spring
- **Hover States**: color, background-color 150ms standard
- **Modal Enter**: fade + scale, 300ms decelerate
- **Modal Exit**: fade, 150ms accelerate
- **Tooltip**: fade, 200ms standard
- **Alert Enter**: slide + fade, 300ms decelerate
- **Alert Exit**: fade, 150ms accelerate
- **Tab Switch**: 200ms standard with content crossfade
- **Theme Toggle**: 500ms transition between light/dark

## 3. Component Library

### A. Core Components

#### Buttons

- **Primary**: Gradient blue background, white text, rounded corners
- **Secondary**: White background, blue border and text (dark mode: dark background, blue border)
- **Success**: Green background, white text
- **Danger**: Red background, white text
- **Text**: No background/border, colored text
- **Icon**: Square with centered icon, subtle background on hover
- **Glass**: Translucent background with blur effect

#### Inputs

- **Text Input**: Single-line text entry, floating label design
- **Number Input**: For numerical values only, with increment/decrement controls
- **Textarea**: Multi-line text entry
- **Select**: Dropdown selection with custom styling
- **Radio**: Single selection from visible options, iOS-style
- **Checkbox**: Multiple selection from visible options
- **Toggle**: iOS-style sliding toggle switch
- **Slider**: Range selection via draggable handle with value tooltip

#### Selection Controls

- **Radio Group**: Visually grouped radio buttons
- **Checkbox Group**: Visually grouped checkboxes
- **Segmented Control**: iOS-style button group for exclusive options
- **Dropdown**: Concealed options in a menu with animation
- **Slider**: Range selection with visual feedback and floating value

#### Navigation Items

- **Tabs**: Horizontal section navigation with animated indicator
- **Breadcrumbs**: Hierarchical path display
- **Pagination**: Page navigation for lists/tables
- **Sidebar Menu**: Vertical main navigation
- **Action Bar**: Context-specific action buttons
- **Bottom Sheet**: Mobile-friendly sliding panel from bottom

#### Cards

- **Standard Card**: Container with header, body, footer and rounded corners
- **Information Card**: Display-only information
- **Input Card**: Contains form inputs
- **Action Card**: Contains primary call to action
- **Summary Card**: Data overview with minimal detail
- **Glass Card**: Semi-transparent card with backdrop blur

#### Modal Dialogs

- **Information Modal**: Displays important information
- **Confirmation Modal**: Requires user decision
- **Form Modal**: Contains inputs for data entry
- **Success/Error Modal**: Action feedback
- **Sheet Modal**: iOS-style slide up from bottom

#### Tooltips

- **Information Tooltip**: Additional context on hover
- **Action Tooltip**: Explains button/control function
- **Status Tooltip**: Provides status details
- **Data Tooltip**: Appears on chart hover with precise values

#### Notifications

- **Toast**: Temporary notification (bottom right)
- **Banner**: Full-width notice (top)
- **Inline Alert**: Contextual message within content
- **Badge**: Small counter or status indicator
- **Pulse Indicator**: Subtle animation for real-time updates

### B. Component Specifications

#### Buttons

##### Usage Guidelines

- Use primary buttons for main actions
- Limit primary buttons to one per section
- Use secondary buttons for alternative actions
- Group related buttons together
- Place primary action on right in button groups
- Consider using glass effect buttons in card overlays

##### Anatomy

- Container
- Label
- (Optional) Left/right icon
- (Optional) Loading spinner
- (Optional) Glass/blur effect

##### States

- Default
- Hover
- Active/Pressed (with scale transform)
- Focused
- Disabled
- Loading

##### Variants

- **Primary**: Main call to action, gradient background
- **Secondary**: Alternative actions
- **Success**: Positive outcome actions
- **Danger**: Destructive or high-risk actions
- **Text**: Low-emphasis actions
- **Icon**: Space-constrained areas
- **Glass**: Semi-transparent with blur effect

##### Properties

- **size**: small | medium | large
- **variant**: primary | secondary | success | danger | text | icon | glass
- **icon**: left | right | both | none
- **fullWidth**: boolean
- **isLoading**: boolean
- **isDisabled**: boolean
- **hasGlassEffect**: boolean

##### Behaviors

- Shows hover state on mouseenter
- Shows active state on mousedown with scale transform (0.98)
- Shows focus state when tabbed to
- Triggers loading state while action processes
- Disabled state prevents interaction
- Smooth transitions between states

##### Accessibility

- Role="button" for custom elements
- Keyboard accessible (Enter/Space activation)
- Adequate contrast ratio (4.5:1)
- Loading state announced to screen readers
- Disabled state properly conveyed

##### Examples

```jsx
<Button variant="primary" size="medium">Buy Option</Button>
<Button variant="secondary" icon="left" iconName="refresh">Refresh</Button>
<Button variant="danger" isLoading={true}>Exercise Option</Button>
<Button variant="glass" hasGlassEffect={true}>View Details</Button>
```

#### Option Overview Card

##### Usage Guidelines

- Place prominently on dashboard
- Show most critical option details
- Use clear status indicators
- Maintain consistent information hierarchy
- Consider using glass effect for premium feel

##### Anatomy

- Card container with rounded corners
- Status indicator (tag)
- Option details (grid layout)
- Expiry information
- Hedging context
- Subtle shadow or glass effect

##### States

- Default
- Hover (subtle lift effect)
- Loading (skeleton or shimmer effect)
- Empty (no options)
- Error (data fetch failed)

##### Variants

- **Standard**: Complete information
- **Compact**: Limited information for mobile/dashboard
- **Multiple**: Tabbed view for multiple options
- **Glass**: Semi-transparent with blur effect

##### Properties

- **status**: active | expired | available
- **data**: option data object
- **isLoading**: boolean
- **hasError**: boolean
- **variant**: standard | compact | multiple | glass
- **theme**: light | dark

##### Behaviors

- Updates status in real-time
- Countdown timer for expiry with smooth transitions
- Highlights approaching expiry with color and animation
- Shows skeleton/shimmer effect during loading
- Slight lift effect on hover
- Smooth theme transitions

##### Accessibility

- Semantic heading structure
- Status conveyed by text and color
- Time remaining announced periodically
- Error states properly conveyed to screen readers
- Sufficient contrast in both light and dark themes

##### Examples

```jsx
<OptionOverviewCard
  status="active"
  data={{
    sbcAmount: 0.1,
    premium: 50,
    strikePrice: 100,
    expiryBlock: 12345,
    currentBlock: 12000,
  }}
  variant="standard"
  theme="light"
/>

<OptionOverviewCard
  status="active"
  data={{
    sbcAmount: 0.1,
    premium: 50,
    strikePrice: 100,
    expiryBlock: 12345,
    currentBlock: 12000,
  }}
  variant="glass"
  theme="dark"
/>
```

### C. Component States

#### Default

- Base appearance
- Neutral colors
- Standard borders/shadows
- Clean, unobtrusive presence

#### Hover

- Subtle background shift
- Cursor change
- Slight elevation change (shadow increase)
- May include subtle transform (scale or translate)
- Button: Background lightens 10%

#### Active

- Deeper color/shadow change
- Scale transform to 0.98 of original size
- Indicates current interaction
- Haptic feedback on supported devices
- Quick transition (150ms)

#### Focus

- Blue outline (3px)
- Not affected by pointer device
- Always visible when navigating via keyboard
- Must pass accessibility contrast standards

#### Disabled

- Reduced opacity (70%)
- No hover/active states
- Cursor: not-allowed
- Communicates unavailability clearly

#### Loading

- Loading indicator (spinner with brand colors)
- Reduced opacity for container
- Maintains size/space
- Prevents interaction
- Subtle shimmer or pulse animation

#### Error

- Red border/outline
- Error icon
- Error message text
- May include subtle shake animation
- Haptic feedback on supported devices

#### Success

- Green border/outline
- Success icon
- Confirmation message
- May include subtle pulse animation
- Quick celebration animation (confetti for major actions)

## 4. Layout System

### A. Grid System

#### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

#### Columns

- **Mobile**: 4 columns
- **Tablet**: 8 columns
- **Desktop**: 12 columns
- **Large Desktop**: 12 columns

#### Gutters

- **Mobile**: 16px
- **Tablet**: 24px
- **Desktop**: 24px
- **Large Desktop**: 32px

#### Margins

- **Mobile**: 16px
- **Tablet**: 32px
- **Desktop**: 48px
- **Large Desktop**: 64px

#### Nesting Rules

- Nested grids inherit the parent's gutters
- Components can span multiple columns
- Content should not exceed the parent grid
- Maintain consistent spacing between nested elements

### B. Responsive Patterns

#### Layout Shifts

- **Dashboard**: 3-column (desktop) → 2-column (tablet) → 1-column (mobile)
- **Tables**: Horizontal scroll (tablet) → Card view (mobile)
- **Forms**: 2-column (desktop) → 1-column (mobile)
- **Navigation**: Horizontal (desktop) → Bottom tab bar (mobile, iOS-style)

#### Component Adaptations

- **Cards**: Fixed width (desktop) → Percentage width (tablet) → Full width (mobile)
- **Buttons**: Normal padding (desktop) → Full width for primary (mobile)
- **Inputs**: Standard size (desktop) → Full width (mobile)
- **Modals**: 50% width (desktop) → 75% width (tablet) → Sheet modal (mobile, iOS-style)

#### Spacing Adjustments

- Reduce section spacing by 25% on tablet
- Reduce section spacing by 50% on mobile
- Maintain component internal spacing across breakpoints
- Stack elements vertically instead of horizontally on mobile

#### Typography Scaling

- Reduce heading sizes by 10% on tablet
- Reduce heading sizes by 20% on mobile
- Maintain body text size across breakpoints (minimum 16px)
- Increase line height slightly on smaller screens

#### iOS-Style Adaptations

- Bottom sheet instead of modals on mobile
- Pull-to-refresh for data updates
- Back swipe gesture support
- Bottom tab navigation
- Large, tappable hit areas (minimum 44×44 pixels)

## 5. Pattern Library

### A. Navigation Patterns

#### Menu Structures

- **Primary Navigation**: Horizontal tabs (desktop), Bottom tabs (mobile, iOS-style)
- **Secondary Navigation**: Sidebar, collapsible on mobile
- **User Menu**: Avatar dropdown in header
- **Context Menu**: Bottom sheet or action sheet (iOS-style)

#### Breadcrumbs

- Show current location in hierarchy
- Include home icon as first item
- Truncate when space-constrained
- Last item is current page (non-clickable)
- Collapse to back button on mobile (iOS-style)

#### Pagination

- Display page numbers for direct access
- Include previous/next buttons
- Show current page highlighted
- Display total page count
- On mobile, simplify to prev/next with current/total (iOS-style)

#### Filters

- Group related filters
- Allow multiple simultaneous filters
- Show active filters as tags
- Include clear all option
- On mobile, use bottom sheet for filter options (iOS-style)

### B. Form Patterns

#### Input Validation

- Validate on blur (not on keystroke)
- Show success/error state immediately
- Display specific error messages
- Highlight required fields
- Provide simple, human-readable error messages

#### Error Handling

- Position error messages below inputs
- Use red text and icon for errors
- Group related errors when possible
- Prevent submission of invalid forms
- Consider haptic feedback for form errors on supported devices

#### Success States

- Show checkmark or success message
- Use green color for confirmation
- Consider whole-form success messages
- Fade out success messages after delay
- For major actions, consider subtle celebration animations

#### Group Layouts

- Group related inputs together
- Maintain consistent alignment
- Use fieldsets for logical groups
- Label each group appropriately
- On mobile, consider step-by-step form progression (iOS-style)

### C. Content Patterns

#### Cards Layouts

- **Grid**: Equal-width cards in rows and columns
- **List**: Full-width cards stacked vertically
- **Featured**: Larger main card with smaller secondary cards
- **Dashboard**: Mixed card sizes in structured layout
- **Glass**: Semi-transparent cards with backdrop blur for layers

#### Lists

- Use consistent bullet or numbering styles
- Include appropriate spacing between items
- Align list content with text blocks
- Consider expandable/collapsible lists for long content
- On mobile, support swipe actions for common functions (iOS-style)

#### Tables

- Use fixed headers for long tables
- Allow column sorting where appropriate
- Include striped rows for readability
- Convert to cards on mobile
- Support horizontal scroll with visual indicators
- Consider using frosted glass header that stays visible on scroll

#### Media Displays

- Maintain consistent aspect ratios
- Include placeholder during loading
- Provide fallback for failed media
- Consider lightbox for enlarging images
- Support pinch-to-zoom for detailed images (iOS-style)

## 6. Accessibility Guidelines

### A. Standards Compliance

#### WCAG Compliance

- Target WCAG 2.1 AA compliance for all components
- Test with automated tools and manual review
- Address all accessibility issues before release
- Document any known limitations
- Ensure compliance in both light and dark modes

#### ARIA Implementation

- Use semantic HTML elements whenever possible
- Add ARIA roles only when needed
- Include appropriate ARIA attributes for complex components
- Test with screen readers
- Verify announcements for state changes

#### Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Maintain logical tab order
- Provide visible focus indicators
- Support standard keyboard shortcuts
- Test keyboard navigation flow in both light and dark modes

#### Screen Reader Support

- Test with popular screen readers (NVDA, VoiceOver)
- Ensure all content is properly announced
- Add descriptive labels for visual elements
- Implement appropriate ARIA live regions for dynamic content
- Test real-time updates and notifications

### B. Inclusive Design

#### Color Contrast

- Maintain 4.5:1 contrast ratio for normal text
- Maintain 3:1 contrast ratio for large text and UI components
- Check contrast in all states (default, hover, active, etc.)
- Test designs with color blindness simulators
- Verify all contrast ratios in both light and dark modes

#### Text Sizing

- Support browser text zoom up to 200%
- Use relative units (rem) for font sizes
- Ensure text containers expand with text size
- Test with enlarged text settings
- Maintain minimum touch target size (44×44px) regardless of text size

#### Focus Indicators

- Never remove focus indicators
- Ensure 3:1 contrast for focus indicators
- Make focus indicators clearly visible
- Use consistent focus styles across the application
- Test focus visibility in both light and dark modes

#### Alternative Text

- Provide descriptive alt text for all images
- Use empty alt text for decorative images
- Include transcripts for audio content
- Provide captions for video content
- Test screen reader output for all media elements

#### Error Identification

- Identify errors clearly in text
- Use multiple cues (color, icon, text)
- Provide specific error messages
- Offer suggestions for correction when possible
- Ensure error messages are announced to screen readers

## 7. Implementation Guidelines

### A. Technical Setup

#### Design Tokens

- Implement as CSS custom properties
- Use consistent naming conventions
- Document all tokens in style guide
- Organize tokens by category (color, spacing, etc.)
- Support light and dark theme switching

#### CSS Architecture

- Use BEM methodology for class naming
- Create separate files for components, utilities, and layouts
- Minimize use of !important
- Consider utility classes for common patterns
- Use CSS variables for theme switching

#### Component Structure

- Follow atomic design principles
- Build from smallest (atoms) to largest (templates)
- Document component props and variants
- Include examples and usage guidelines
- Support theming in all components

#### Build System

- Use CSS preprocessing with Sass
- Implement PostCSS for optimization
- Set up style linting
- Configure automatic prefixing
- Bundle optimized for performance

#### Advanced Visual Effects

- Use backdrop-filter for glass effects (with fallbacks)
- Implement efficient animations with GPU acceleration
- Support reduced motion preferences
- Optimize transitions for performance
- Test visual effects across browsers and devices

### B. Development Standards

#### Naming Conventions

- **Components**: PascalCase (e.g., OptionCard)
- **Props**: camelCase (e.g., isLoading)
- **CSS Classes**: kebab-case with BEM (e.g., .option-card\_\_status--active)
- **JavaScript Functions**: camelCase (e.g., calculateHedge)
- **CSS Variables**: --component-element-state (e.g., --button-background-hover)

#### Code Structure

- Organize by feature then by type
- Separate business logic from presentation
- Follow single responsibility principle
- Use consistent file structure across components
- Maintain theme compatibility throughout

#### Documentation

- Include JSDoc comments for functions and components
- Document component props with PropTypes or TypeScript
- Create usage examples for complex components
- Keep documentation updated with code changes
- Include theme variations in examples

#### Testing Requirements

- Unit test all components
- Test for accessibility compliance
- Include visual regression tests
- Test responsive behavior across breakpoints
- Test in both light and dark modes

## Conclusion

This design system provides a comprehensive framework for creating a consistent, accessible, and user-friendly experience for BitHedge. By following these guidelines, we ensure all aspects of the application work together harmoniously to help users hedge their Bitcoin portfolios effectively. The iOS-inspired, Binance-influenced design creates a modern, sleek interface that instills confidence and provides clarity for our users.

The design system is a living document that will evolve as we learn from user feedback and expand the platform's capabilities. All team members are encouraged to contribute to its ongoing development.
