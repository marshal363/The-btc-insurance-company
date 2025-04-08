# BitHedge Component Library Specification

## Introduction

This document defines the comprehensive component library specification for BitHedge, detailing all aspects of component development, documentation, and maintenance. The component library will serve as the foundation for the BitHedge user interface, ensuring consistency, accessibility, and efficiency across all views of the application.

## Context

- **Framework**: React with Next.js 14 (App Router)
- **Design System**: BitHedge Design System (based on shadcn/ui)
- **Development Stack**: TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lucide React
- **Browser Support**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Performance Targets**:
  - First Contentful Paint < 1.2s
  - Time to Interactive < 3.0s
  - Lighthouse Performance Score > 90
  - Core Web Vitals compliant

## 1. Component Architecture

### A. Core Architecture

#### Component Hierarchy

The BitHedge component library follows a three-tier architecture:

1. **Core Components**: Low-level UI primitives from shadcn/ui
2. **Composite Components**: Domain-specific components built using core components
3. **View Components**: Page-level components assembled from composite components

```
BitHedge Component Hierarchy
│
├── Core (shadcn/ui primitives)
│   ├── Button
│   ├── Card
│   ├── Dialog
│   ├── DropdownMenu
│   ├── Form components
│   ├── Typography components
│   └── ...
│
├── Composite (domain-specific)
│   ├── Navigation
│   │   ├── MainNav
│   │   ├── ViewNav
│   │   └── MobileNav
│   │
│   ├── Wallet
│   │   ├── WalletConnect
│   │   ├── WalletStatus
│   │   └── BalanceDisplay
│   │
│   ├── Options
│   │   ├── OptionCard
│   │   ├── StrikeSelector
│   │   ├── ExpirySelector
│   │   └── PremiumCalculator
│   │
│   ├── Visualization
│   │   ├── PnLChart
│   │   ├── OptionsChain
│   │   ├── MarketChart
│   │   └── HeatMap
│   │
│   └── Transaction
│       ├── TransactionFlow
│       ├── ConfirmationDialog
│       └── StatusIndicator
│
└── View (page-level)
    ├── Landing
    │   ├── Hero
    │   ├── FeatureHighlight
    │   └── HowItWorks
    │
    ├── Home
    │   ├── MarketOverview
    │   ├── PortfolioSummary
    │   └── QuickActions
    │
    ├── EasyOption
    │   ├── StepIndicator
    │   ├── OptionConfigurator
    │   └── ReviewSubmit
    │
    └── OptionData
        ├── MarketStatistics
        ├── ChartDisplay
        ├── OptionTable
        └── AnalyticsSelector
```

#### Composition Patterns

Components follow these composition patterns:

1. **Compound Components**: For related UI elements that share state

   ```tsx
   <StepIndicator>
     <StepIndicator.Step status="completed">Choose</StepIndicator.Step>
     <StepIndicator.Step status="active">Configure</StepIndicator.Step>
     <StepIndicator.Step status="pending">Review</StepIndicator.Step>
   </StepIndicator>
   ```

2. **Render Props**: For components requiring flexible rendering logic

   ```tsx
   <OptionsList
     renderItem={(option) => (
       <OptionCard key={option.id} data={option} onSelect={handleSelect} />
     )}
   />
   ```

3. **Higher-Order Components**: For cross-cutting concerns

   ```tsx
   const withWalletRequired = (Component) => {
     return (props) => {
       const { connected } = useWallet();

       if (!connected) {
         return <WalletConnectPrompt />;
       }

       return <Component {...props} />;
     };
   };
   ```

4. **Hooks**: For reusable stateful logic

   ```tsx
   const OptionDetail = ({ optionId }) => {
     const { option, loading, error } = useOption(optionId);

     if (loading) return <Spinner />;
     if (error) return <ErrorDisplay message={error.message} />;

     return <OptionDetailView data={option} />;
   };
   ```

#### State Management

Components use a combination of state management approaches:

1. **Local Component State**: Using React's `useState` for component-specific state
2. **Composition State**: Using React's `useReducer` for complex component state
3. **Global State**: Using Zustand for application-wide state
4. **Form State**: Using React Hook Form for form components
5. **URL State**: Using Next.js router for view-level state

**State Flow Principles**:

- Prefer local state for UI-specific concerns
- Use global state for shared data (wallet, options, market)
- Keep form state isolated within form components
- Use URL state for shareable/bookmarkable state

#### Props Interface

All components follow these props interface guidelines:

1. **TypeScript Typing**: All props strictly typed
2. **Required vs Optional**: Mark props as required only when necessary
3. **Defaults**: Provide sensible defaults for optional props
4. **Composition**: Use children prop for composition
5. **Event Handlers**: Use `onEvent` naming convention
6. **Variants**: Use variant props for visual variations

Example:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Size of the button */
  size?: "sm" | "md" | "lg";
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Icon to display before button text */
  leftIcon?: React.ReactNode;
  /** Icon to display after button text */
  rightIcon?: React.ReactNode;
  /** Button contents */
  children: React.ReactNode;
}
```

#### Event Handling

Components follow these event handling patterns:

1. **Callback Props**: Pass handlers via props using `onEvent` naming
2. **Event Objects**: Pass consistent event objects to handlers
3. **Bubbling Control**: Use `stopPropagation()` judiciously
4. **Async Handlers**: Support Promise-returning handlers
5. **Cancellation**: Support cancellation patterns where appropriate

Example:

```tsx
interface OptionCardProps {
  option: OptionData;
  onSelect?: (option: OptionData) => void;
  onExercise?: (option: OptionData) => Promise<void>;
  onView?: (option: OptionData) => void;
}
```

#### Rendering Optimization

Components implement these rendering optimizations:

1. **Memoization**: Use `React.memo()` for expensive components
2. **Callback Memoization**: Use `useCallback()` for handler props
3. **Derived State**: Use `useMemo()` for derived calculations
4. **Virtualization**: Use virtualized lists for long data sets
5. **Code Splitting**: Use dynamic imports for heavy components
6. **Selective Rendering**: Implement shouldComponentUpdate logic

#### Performance Considerations

Components adhere to these performance guidelines:

1. **Bundle Size**: Keep individual component size < 15KB
2. **DOM Operations**: Minimize direct DOM manipulations
3. **Animation Performance**: Use `will-change` and hardware acceleration
4. **Batch Updates**: Avoid cascading state updates
5. **Debouncing/Throttling**: Implement for frequent events
6. **Image Optimization**: Use Next.js Image component

### B. Component Categories

#### Atomic Components

These are the fundamental building blocks based on shadcn/ui primitives:

- **Button**: Actions and calls-to-action
- **Input**: Text inputs with validation
- **Select**: Dropdown selection
- **Checkbox/Radio**: Selection controls
- **Switch**: Toggle controls
- **Slider**: Range selection
- **Badge**: Status indicators
- **Avatar**: User identifiers
- **Icon**: Visual indicators (Lucide React)
- **Tooltip**: Contextual information
- **Dialog**: Modal windows
- **Popover**: Contextual popups

#### Composite Components

Domain-specific components combining atomic components:

- **OptionCard**: Display individual option details
- **PriceTag**: Display currency values with formatting
- **WalletButton**: Connect/disconnect wallet
- **AddressDisplay**: Show blockchain addresses
- **TransactionStatus**: Display transaction state
- **StepIndicator**: Show multi-step progress
- **DatePicker**: Date selection with calendar
- **SearchBar**: Search functionality
- **Notification**: Status messages
- **InfoCard**: Information presentation
- **CopyButton**: Copy to clipboard
- **ExpandableSection**: Collapsible content

#### Container Components

Components that manage data fetching and state:

- **OptionProvider**: Provides option data context
- **WalletProvider**: Manages wallet connection
- **MarketDataProvider**: Fetches market data
- **FormContainer**: Manages form state and validation
- **ErrorBoundary**: Handles component errors
- **LoadingContainer**: Manages loading states
- **AuthGuard**: Protects authenticated routes
- **TransactionProvider**: Manages transaction lifecycle

#### Layout Components

Components for page structure and positioning:

- **Page**: Base page layout
- **MainLayout**: Primary application layout
- **Header**: Top navigation area
- **Footer**: Bottom page area
- **Sidebar**: Side navigation/information
- **Grid**: Responsive grid system
- **Stack**: Vertical/horizontal stacking
- **Divider**: Visual separation
- **AspectRatio**: Maintain aspect ratios
- **Spacer**: Control spacing
- **ScrollArea**: Scrollable containers
- **SplitPane**: Adjustable split views

#### Feature Components

Higher-level components for specific features:

- **OptionCreator**: Interface for creating options
- **OptionExerciser**: Interface for exercising options
- **PnLVisualizer**: Profit and loss visualization
- **PortfolioOverview**: Display portfolio status
- **MarketOverview**: Display market status
- **OptionsChain**: Matrix of available options
- **StrikeSelector**: Interface for selecting strike price
- **ExpirySelector**: Interface for selecting expiry date
- **WalletConnector**: Complete wallet connection flow
- **TransactionFlow**: Step-by-step transaction process
- **HeatMap**: Option data heat map visualization
- **MarketChart**: Interactive market data charts

#### Utility Components

Support components for specific tasks:

- **CurrencyFormatter**: Format currency values
- **DateFormatter**: Format date values
- **AddressFormatter**: Format blockchain addresses
- **ErrorDisplay**: Show error messages
- **EmptyState**: Display when no data
- **LoadingSpinner**: Loading indicator
- **MotionWrapper**: Animation wrapper
- **Portal**: Render outside component hierarchy
- **VisuallyHidden**: Hidden from view but accessible
- **MediaQuery**: Responsive component wrapper
- **ThemeToggle**: Switch between light/dark modes
- **DevTools**: Development-only debug tools

## 2. Component Documentation Requirements

### A. Technical Documentation

Each component must include documentation following this structure:

```typescript
interface ComponentDoc {
  /** Component name */
  name: string;

  /** Version number */
  version: string;

  /** Component category */
  category:
    | "Atomic"
    | "Composite"
    | "Container"
    | "Layout"
    | "Feature"
    | "Utility";

  /** Component dependencies */
  dependencies: {
    /** External npm packages */
    external: string[];
    /** Internal components */
    internal: string[];
  };

  /** Component props */
  props: {
    /** Prop name */
    name: string;
    /** TypeScript type */
    type: string;
    /** Default value */
    default: any;
    /** Whether prop is required */
    required: boolean;
    /** Prop description */
    description: string;
    /** Validation rules */
    validation: string[];
  }[];

  /** Events emitted by component */
  events: {
    /** Event name */
    name: string;
    /** Event payload type */
    payload: string;
    /** Event description */
    description: string;
  }[];

  /** For compound components, slot info */
  slots?: {
    /** Slot name */
    name: string;
    /** Slot description */
    description: string;
    /** Slot prop scope */
    scope: Record<string, any>;
  }[];

  /** Public methods */
  methods: {
    /** Method name */
    name: string;
    /** Method parameters */
    parameters: string[];
    /** Return type */
    return: string;
    /** Method description */
    description: string;
  }[];

  /** Usage examples */
  examples: {
    /** Example title */
    title: string;
    /** Example description */
    description: string;
    /** Example code */
    code: string;
    /** Whether to render preview */
    preview: boolean;
  }[];

  /** Accessibility considerations */
  a11y: {
    /** WCAG compliance level */
    wcagLevel: "A" | "AA" | "AAA";
    /** Keyboard navigation */
    keyboard: string[];
    /** Screen reader considerations */
    screenReader: string[];
    /** Color contrast requirements */
    contrast: string;
  };
}
```

Example technical documentation (simplified):

```jsx
/**
 * @component
 * @name OptionCard
 * @version 1.0.0
 * @category Composite
 *
 * @dependencies
 * external: ["framer-motion", "date-fns"]
 * internal: ["Card", "Badge", "Button", "CurrencyFormatter"]
 *
 * @props
 * - option: OptionData - Required - Option data object
 * - selected: boolean - false - Whether the option is selected
 * - onSelect: (option: OptionData) => void - undefined - Called when option is selected
 * - onExercise: (option: OptionData) => Promise<void> - undefined - Called when option is exercised
 *
 * @a11y
 * wcagLevel: AA
 * keyboard: ["Focusable with Tab", "Activatable with Enter/Space"]
 * screenReader: ["Announces option details", "States availability"]
 * contrast: "Maintains 4.5:1 ratio for text"
 */
```

### B. Usage Documentation

Each component must include the following usage documentation:

#### Installation Instructions

```tsx
// For shadcn/ui components
npx shadcn-ui@latest add button

// For custom BitHedge components
// Import from the appropriate path
import { OptionCard } from "@/components/options/option-card";
```

#### Basic Usage

```tsx
// Basic example
<OptionCard option={optionData} onSelect={handleSelect} />
```

#### Advanced Patterns

```tsx
// Advanced example with all props and customizations
<OptionCard
  option={optionData}
  selected={isSelected}
  highlighted={isHighlighted}
  onSelect={handleSelect}
  onExercise={handleExercise}
  onView={handleView}
  variant="detailed"
  renderPrice={(price) => <PriceWithTrend value={price} trend={priceTrend} />}
/>
```

#### Live Demos

All components must have Storybook stories with:

- Default state
- All variants
- Interactive controls
- Edge cases (loading, error, empty)
- Responsive behavior demo

#### Accessibility Requirements

- WCAG 2.1 AA compliance for all components
- Keyboard navigation support
- Screen reader announcements
- Sufficient color contrast
- Focus management
- ARIA attributes

## 3. Component Quality Standards

### A. Code Quality

#### Coding Standards

- Follow TypeScript strict mode
- Use functional components with hooks
- Maintain consistent naming conventions
- Follow shadcn/ui patterns for consistency
- Use ESLint with project configuration
- Format with Prettier

#### TypeScript Requirements

- Strict typing for all props
- No `any` type unless absolutely necessary
- Use generics for reusable components
- Define interfaces for complex props
- Export public types for consumer use
- Use discriminated unions for variants

Example:

```tsx
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

// Export for consumer use
export type { ButtonProps, ButtonVariant, ButtonSize };
```

#### Testing Coverage

- Unit tests for all components
- Integration tests for composite components
- Visual regression tests for UI components
- Minimum 80% test coverage
- Test all variants and states
- Test accessibility compliance

#### Performance Benchmarks

- Bundle size < 15KB per component
- Render time < 16ms (60fps)
- No layout shifts after rendering
- Lighthouse performance score > 90
- Core Web Vitals compliant

#### Accessibility Compliance

- WCAG 2.1 AA compliance
- Keyboard navigable
- Screen reader compatible
- Sufficient color contrast
- Focus management
- ARIA attributes

#### Browser Compatibility

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

### B. Visual Quality

#### Design Consistency

- Follow BitHedge design system
- Consistent use of color tokens
- Consistent spacing using spacing scale
- Consistent typography using type scale
- Consistent border radius and shadows
- Consistent animations and transitions

#### Responsive Behavior

- Mobile-first approach
- Support for standard breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
- No horizontal scrolling on mobile
- Touch-friendly targets (min 44x44px)
- Different layouts for different viewports
- Maintain readability at all sizes

#### Animation Standards

- Use Framer Motion for complex animations
- Use CSS transitions for simple animations
- Respect user's reduced motion preference
- Maintain 60fps performance
- Consistent timing functions
- Purpose-driven animations (no gratuitous motion)

#### Asset Optimization

- Optimize SVG icons
- Use Next.js Image component
- Implement lazy loading
- Use WebP/AVIF formats
- Implement responsive images
- Inline critical SVGs

#### Visual Regression Testing

- Capture screenshots for all variants
- Compare against baseline images
- Test across different viewports
- Test light and dark themes
- Test different states (hover, active, focus)

## 4. Component Development Workflow

### A. Development Process

#### Component Proposal

1. Identify need for new component
2. Check if existing component can be extended
3. Create proposal with:
   - Purpose and use cases
   - Proposed API
   - Visual mockups
   - Accessibility considerations
   - Performance considerations

#### Design Review

1. Review against design system
2. Check for consistency with existing components
3. Ensure responsive design
4. Validate accessibility
5. Approve design or request changes

#### Development

1. Create component file structure
2. Implement component with TypeScript
3. Add props validation
4. Implement responsive behavior
5. Add accessibility features
6. Optimize performance
7. Write tests

#### Testing

1. Unit tests with Vitest
2. Integration tests with React Testing Library
3. Visual regression tests with Storybook
4. Accessibility tests with axe-core
5. Performance tests with Lighthouse

#### Documentation

1. Add JSDoc comments
2. Create Storybook stories
3. Write usage examples
4. Document props and events
5. Add accessibility notes

#### Peer Review

1. Code review by at least one other developer
2. Design review by designer
3. Accessibility review
4. Performance review
5. Documentation review

#### Release

1. Merge to main branch
2. Update version number
3. Update changelog
4. Publish to internal registry
5. Announce release to team

### B. Version Control

#### Branching Strategy

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/component-name`: Feature branches
- `fix/component-name`: Bug fix branches
- `refactor/component-name`: Refactoring branches

#### Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(component): add new feature`
- `fix(component): fix issue`
- `docs(component): update documentation`
- `style(component): format code`
- `refactor(component): refactor code`
- `test(component): add tests`
- `chore(component): update build tasks`

#### PR Templates

- Description of changes
- Screenshots/videos of visual changes
- List of issues addressed
- Testing performed
- Documentation updates
- Breaking changes

#### Review Checklist

- Code follows style guide
- Tests are comprehensive
- Documentation is complete
- Accessibility requirements are met
- Performance is acceptable
- No regression in existing functionality
- Design implementation is accurate

## 5. Component Testing Requirements

### A. Test Types

#### Unit Tests

Test individual component functionality:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders loading state correctly", () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
```

#### Integration Tests

Test interaction between components:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OptionConfigurator } from "./OptionConfigurator";

describe("OptionConfigurator", () => {
  it("updates premium when strike price changes", async () => {
    render(<OptionConfigurator />);

    // Find and interact with strike price slider
    const slider = screen.getByRole("slider", { name: /strike price/i });
    await userEvent.click(slider);

    // Check that premium display updated
    expect(screen.getByText(/premium:/i)).toHaveTextContent("50 STX");
  });
});
```

#### Visual Regression

Use Storybook and Chromatic for visual regression testing:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: "Button Text",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
```

#### Accessibility Tests

Use axe-core for accessibility testing:

```tsx
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "./Button";

expect.extend(toHaveNoViolations);

describe("Button accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### Performance Tests

Test rendering performance:

```tsx
import { renderToString } from "react-dom/server";
import { performance } from "perf_hooks";
import { OptionsTable } from "./OptionsTable";

describe("OptionsTable performance", () => {
  it("renders 100 rows efficiently", () => {
    const options = Array.from({ length: 100 }).map((_, i) => ({
      id: `option-${i}`,
      strike: 100 + i,
      premium: 50 + i / 2,
      expiry: new Date(Date.now() + 86400000 * ((i % 30) + 1)),
    }));

    const start = performance.now();
    renderToString(<OptionsTable options={options} />);
    const end = performance.now();

    expect(end - start).toBeLessThan(100); // Should render in under 100ms
  });
});
```

### B. Test Coverage

#### Functional Coverage

- Test all component functions
- Test all props variations
- Test all state transitions
- Test all user interactions
- Test error handling
- Test edge cases (empty, loading, error states)

#### Visual Coverage

- Test all visual variants
- Test all responsive breakpoints
- Test light and dark themes
- Test animations and transitions
- Test hover, focus, active states
- Test with different content lengths

#### Interaction Coverage

- Test keyboard navigation
- Test mouse interactions
- Test touch interactions
- Test focus management
- Test form submissions
- Test drag and drop (if applicable)

#### Responsive Coverage

- Test at all breakpoints
- Test orientation changes
- Test text scaling
- Test with different viewport sizes
- Test with different device pixel ratios
- Test with different font sizes

#### Edge Cases

- Test with minimum/maximum values
- Test with empty/null values
- Test with long text
- Test with special characters
- Test with different languages
- Test with screen readers
- Test with high contrast mode

## Responsive Design Implementation

### Breakpoints

BitHedge follows Tailwind CSS breakpoints:

| Name | Size (px) | Description                                    |
| ---- | --------- | ---------------------------------------------- |
| xs   | < 640     | Extra small devices (phones)                   |
| sm   | ≥ 640     | Small devices (large phones, portrait tablets) |
| md   | ≥ 768     | Medium devices (landscape tablets)             |
| lg   | ≥ 1024    | Large devices (laptops)                        |
| xl   | ≥ 1280    | Extra large devices (desktops)                 |
| 2xl  | ≥ 1536    | Extra extra large devices (large desktops)     |

### Implementation Patterns

#### Container Queries

For components that need to respond to their container rather than viewport:

```tsx
<div className="@container">
  <div className="@md:grid @md:grid-cols-2 @lg:grid-cols-3">
    {/* Content */}
  </div>
</div>
```

#### Responsive Props

Components accept responsive props using array notation:

```tsx
<Stack direction={["column", "row"]} spacing={[2, 4, 6]}>
  {/* Items will be stacked vertically on mobile, horizontally on tablet and above */}
  {/* Spacing will be 2 on mobile, 4 on tablet, 6 on desktop */}
</Stack>
```

#### Responsive Variants

Define component variants for different screen sizes:

```tsx
<Card
  variant={{
    base: "compact",
    md: "default",
    lg: "expanded",
  }}
>
  {/* Content */}
</Card>
```

#### Mobile-First Approach

All components are designed for mobile first, then enhanced for larger screens:

```tsx
// Example Tailwind classes
<div className="text-sm p-2 md:text-base md:p-4 lg:text-lg lg:p-6">
  {/* Content grows in size as screen size increases */}
</div>
```

### Responsive Design Patterns

#### Stack to Grid

Components that stack vertically on mobile and form grids on larger screens:

```tsx
<div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>
```

#### Progressive Disclosure

Show less information on smaller screens, more on larger screens:

```tsx
<OptionCard>
  <OptionCard.Title>Call Option #123</OptionCard.Title>
  <OptionCard.BasicInfo /> {/* Always visible */}
  <OptionCard.DetailedInfo className="hidden md:block" /> {/* Only on md+ */}
  <OptionCard.AdvancedAnalytics className="hidden lg:block" /> {/* Only on lg+ */}
</OptionCard>
```

#### Responsive Navigation

Navigation adapts based on screen size:

```tsx
<>
  {/* Mobile: Hamburger menu */}
  <MobileNav className="block md:hidden" />

  {/* Desktop: Full navigation */}
  <DesktopNav className="hidden md:flex" />
</>
```

#### Adaptive Layouts

Layouts that completely change based on screen size:

```tsx
<>
  {/* Mobile: Tabbed interface */}
  <TabView className="block md:hidden" />

  {/* Desktop: Side-by-side layout */}
  <SplitView className="hidden md:grid" />
</>
```

## Conclusion

This component library specification provides a comprehensive framework for developing, documenting, and maintaining the BitHedge UI components. By following these standards, the team will create a consistent, accessible, and performant user interface that delivers a high-quality user experience across all devices and platforms.

The component library will evolve over time, with new components added as needed and existing components refined based on user feedback and changing requirements. Regular reviews of the component library will ensure it continues to meet the needs of the BitHedge platform and its users.
