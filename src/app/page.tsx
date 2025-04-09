import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Hedge Bitcoin Volatility with sBTC Options</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Protect your Bitcoin portfolio against price movements using decentralized options secured by Bitcoin&apos;s own security
      </p>
      <div className="flex gap-4 mb-12">
        <Link
          href="/home"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 py-3"
        >
          Launch App
        </Link>
        <Link
          href="#how-it-works"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-11 px-6 py-3"
        >
          Learn How It Works
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Bitcoin-Secured Protection</h3>
          <p>Options secured by Bitcoin&apos;s own consensus mechanism through the sBTC protocol.</p>
        </div>
        <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Simple Option Trading</h3>
          <p>User-friendly interface designed for both beginners and experienced traders.</p>
        </div>
        <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold mb-2">No Liquidation Risk</h3>
          <p>Maximum loss is limited to your premium - no margin calls or liquidations.</p>
        </div>
      </div>

      <div className="mt-24 w-full max-w-5xl" id="how-it-works">
        <h2 className="text-3xl font-bold mb-8">Hedging Made Simple</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm max-w-xs">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">Connect</h3>
            <p>Connect your Hiro Wallet to get started with BitHedge.</p>
          </div>
          <div className="hidden md:block text-primary">→</div>
          <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm max-w-xs">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">Select</h3>
            <p>Choose your option parameters based on your risk profile.</p>
          </div>
          <div className="hidden md:block text-primary">→</div>
          <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm max-w-xs">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">Protect</h3>
            <p>Secure your Bitcoin portfolio against market volatility.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
