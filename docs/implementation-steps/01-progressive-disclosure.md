# Progressive Disclosure Implementation

## Current Issue

- Current screens contain multiple paragraphs of explanation shown simultaneously
- All educational content is visible at once, creating cognitive overload
- Users must process too much information before making decisions

## Implementation Steps

### 1. Create InfoButton Component

```jsx
const InfoButton = ({ content, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="inline-flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="ml-1 p-1 text-gray-400 hover:text-primary focus:outline-none"
        aria-label="More information"
      >
        <InfoIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <Modal title={title} onClose={() => setIsOpen(false)}>
          <div className="prose max-w-none">{content}</div>
        </Modal>
      )}
    </span>
  );
};
```

### 2. Modify Protection Type Cards

**Before:**

```jsx
<div className="p-6 bg-gray-100 rounded-lg">
  <div className="flex items-center">
    <ShieldIcon className="h-8 w-8 text-blue-500" />
    <h3 className="text-xl font-medium ml-2">Protect against Bitcoin price drops</h3>
  </div>

  <div className="mt-4">
    <p className="text-blue-600 font-medium flex items-center">
      <ArrowRightIcon className="h-4 w-4 mr-1" />
      Price Drop Protection ensures you can sell Bitcoin at a guaranteed value even if market price falls.
    </p>

    <p className="mt-3 text-gray-600">
      A price protection policy gives you the right to sell sBTC at a fixed price, even if the
      market price decreases.
    </p>

    <p className="mt-3 text-gray-600">Maximum cost: Only the protection premium you pay</p>
  </div>
</div>
```

**After:**

```jsx
<div className="p-6 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
  <div className="flex items-center">
    <ShieldIcon className="h-10 w-10 text-blue-500" />
    <h3 className="text-xl font-medium ml-2">Protect against Bitcoin price drops</h3>
  </div>

  <div className="mt-4">
    <p className="text-blue-600 font-medium flex items-center">
      <ArrowRightIcon className="h-4 w-4 mr-1" />
      Price Drop Protection ensures you can sell Bitcoin at a guaranteed value
      <InfoButton
        title="Price Drop Protection"
        content={
          <>
            <p>
              A price protection policy gives you the right to sell sBTC at a fixed price, even if
              the market price decreases.
            </p>
            <p>Maximum cost: Only the protection premium you pay</p>
          </>
        }
      />
    </p>
  </div>
</div>
```

### 3. Create Expandable Details Section

```jsx
const ExpandableDetails = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 border-t border-gray-200 pt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-primary focus:outline-none"
      >
        <span>{title}</span>
        <ChevronIcon className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      {isExpanded && <div className="mt-3 text-gray-600 animate-slideDown">{children}</div>}
    </div>
  );
};
```

### 4. Implement on Protection Against Price Movement Section

**Before:**

```jsx
<div className="mt-8">
  <div className="flex items-center">
    <ShieldIcon className="h-6 w-6 text-red-500" />
    <h4 className="text-lg font-medium ml-2">Protection Against Price Movement</h4>
  </div>

  <p className="mt-3 text-gray-600">
    Bitcoin protection policies give you the right (but not the obligation) to buy or sell BTC at a
    fixed price. They can be used to:
  </p>

  <ul className="mt-3 space-y-2">
    <li className="flex items-start">
      <BulletIcon className="h-4 w-4 text-gray-400 mt-1 mr-2" />
      <span>Protect against adverse price movements</span>
    </li>
    <li className="flex items-start">
      <BulletIcon className="h-4 w-4 text-gray-400 mt-1 mr-2" />
      <span>Secure future Bitcoin prices with limited risk</span>
    </li>
    <li className="flex items-start">
      <BulletIcon className="h-4 w-4 text-gray-400 mt-1 mr-2" />
      <span>Safeguard your existing Bitcoin holdings</span>
    </li>
  </ul>
</div>
```

**After:**

```jsx
<ExpandableDetails title="Learn more about Bitcoin protection">
  <div className="mt-2">
    <div className="flex items-center">
      <ShieldIcon className="h-6 w-6 text-red-500" />
      <h4 className="text-lg font-medium ml-2">Protection Against Price Movement</h4>
    </div>

    <p className="mt-3 text-gray-600">
      Bitcoin protection policies give you the right (but not the obligation) to buy or sell BTC at
      a fixed price. They can be used to:
    </p>

    <ul className="mt-3 space-y-2">
      <li className="flex items-start">
        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
        <span>Protect against adverse price movements</span>
      </li>
      <li className="flex items-start">
        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
        <span>Secure future Bitcoin prices with limited risk</span>
      </li>
      <li className="flex items-start">
        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
        <span>Safeguard your existing Bitcoin holdings</span>
      </li>
    </ul>
  </div>
</ExpandableDetails>
```
