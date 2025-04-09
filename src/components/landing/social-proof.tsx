"use client";

export function SocialProof() {
  return (
    <section className="py-12 border-t border-b">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-center text-lg font-medium mb-8 text-muted-foreground">Powered by</h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {/* Placeholder for logos - these would be actual image components in production */}
          <div className="flex items-center justify-center h-8 w-32 bg-muted rounded opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-sm font-medium">Stacks</span>
          </div>
          <div className="flex items-center justify-center h-8 w-32 bg-muted rounded opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-sm font-medium">sBTC</span>
          </div>
          <div className="flex items-center justify-center h-8 w-32 bg-muted rounded opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-sm font-medium">Hiro Wallet</span>
          </div>
        </div>
        <div className="flex justify-center mt-8 gap-8">
          <span className="text-sm text-muted-foreground">Bitcoin Vegas Hackathon Project</span>
          <span className="text-sm text-muted-foreground">Open Source</span>
        </div>
      </div>
    </section>
  );
} 