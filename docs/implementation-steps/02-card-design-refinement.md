# Card Design Refinement

## Current Issues

- Cards have basic styling with minimal visual interest
- Limited visual hierarchy between card elements
- No interactive states for selection feedback
- Flat design lacks depth and modern feel

## Implementation Steps

### 1. Update Base Card Component

```jsx
// Before
const ProtectionCard = ({ icon, title, description, isSelected, onClick }) => (
  <div
    className={`
      p-6 rounded-lg ${isSelected ? "bg-blue-50 border border-blue-200" : "bg-gray-100"}
    `}
    onClick={onClick}
  >
    {/* Card content */}
  </div>
);

// After
const ProtectionCard = ({ icon, title, description, isSelected, onClick }) => (
  <div
    className={`
      p-6 rounded-xl transition-all duration-200
      ${
        isSelected
          ? "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-md"
          : "bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm hover:shadow hover:-translate-y-0.5"
      }
    `}
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-pressed={isSelected}
  >
    {/* Card content */}
  </div>
);
```

### 2. Add Depth and Visual Interest

```css
/* Add to your global CSS */
.card-inner-shadow {
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8);
}

.card-highlight {
  position: relative;
  overflow: hidden;
}

.card-highlight::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(59, 130, 246, 0),
    rgba(59, 130, 246, 0.6),
    rgba(59, 130, 246, 0)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-highlight:hover::before,
.card-highlight[aria-pressed="true"]::before {
  opacity: 1;
}
```

### 3. Enhance Selected State

```jsx
// Add this to the card component
{
  isSelected && (
    <div className="absolute top-3 right-3">
      <div className="bg-blue-500 text-white rounded-full p-1">
        <CheckIcon className="h-4 w-4" />
      </div>
    </div>
  );
}
```

### 4. Implement Protection Card Content

```jsx
<div className="relative card-highlight">
  <div
    className={`
      p-6 rounded-xl transition-all duration-200 card-inner-shadow
      ${
        isSelected
          ? "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-md"
          : "bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm hover:shadow hover:-translate-y-0.5"
      }
    `}
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-pressed={isSelected}
  >
    {isSelected && (
      <div className="absolute top-3 right-3">
        <div className="bg-blue-500 text-white rounded-full p-1">
          <CheckIcon className="h-4 w-4" />
        </div>
      </div>
    )}

    <div className="flex items-center">
      <div
        className={`
        p-2 rounded-full 
        ${isSelected ? "bg-blue-100" : "bg-blue-50"}
        ${isSelected ? "text-blue-600" : "text-blue-500"}
      `}
      >
        {icon}
      </div>
      <h3 className="text-xl font-medium ml-3">{title}</h3>
    </div>

    <div className="mt-4">
      <p className="text-blue-600 font-medium flex items-center">
        <ArrowRightIcon className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>{description}</span>
      </p>
    </div>
  </div>
</div>
```

### 5. Enhanced Price Drop Protection Card

```jsx
// Implementation for the "Protect against Bitcoin price drops" card
const PriceDropCard = ({ isSelected, onClick }) => (
  <div className="relative card-highlight">
    <div
      className={`
        p-6 rounded-xl transition-all duration-200 card-inner-shadow
        ${
          isSelected
            ? "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-md"
            : "bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm hover:shadow hover:-translate-y-0.5"
        }
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="bg-blue-500 text-white rounded-full p-1">
            <CheckIcon className="h-4 w-4" />
          </div>
        </div>
      )}

      <div className="flex items-center">
        <div
          className={`
          p-2 rounded-full 
          ${isSelected ? "bg-blue-100" : "bg-blue-50"}
          ${isSelected ? "text-blue-600" : "text-blue-500"}
        `}
        >
          <ShieldIcon className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-medium ml-3">Protect against Bitcoin price drops</h3>
      </div>

      <div className="mt-4">
        <p className="text-blue-600 font-medium flex items-start">
          <ArrowRightIcon className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
          <span>Price Drop Protection ensures you can sell Bitcoin at a guaranteed value</span>
          <InfoButton
            title="Price Drop Protection"
            content={
              <>
                <p>
                  A price protection policy gives you the right to sell sBTC at a fixed price, even
                  if the market price decreases.
                </p>
                <p>Maximum cost: Only the protection premium you pay</p>
              </>
            }
          />
        </p>
      </div>
    </div>
  </div>
);
```

### 6. Implement Animation on Selection

```jsx
// Add this to your component or a util file
const useCardAnimation = (isSelected) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isSelected && cardRef.current) {
      // Add a pulse animation when selected
      cardRef.current.animate([
        { transform: 'scale(1)', boxShadow: 'var(--shadow)' },
        { transform: 'scale(1.02)', boxShadow: 'var(--shadow-md)' },
        { transform: 'scale(1)', boxShadow: 'var(--shadow)' }
      ], {
        duration: 300,
        easing: 'ease-in-out'
      });
    }
  }, [isSelected]);

  return cardRef;
};

// Then in your card component
const cardRef = useCardAnimation(isSelected);

// And add the ref to your div
<div
  ref={cardRef}
  className={`...`}
>
```
