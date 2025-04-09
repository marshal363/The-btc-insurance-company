"use client";

import { useState } from "react";
import Link from "next/link";

type OptionType = "call" | "put";
type StepType = "type" | "strike" | "expiry" | "review";

export default function EasyOption() {
  const [currentStep, setCurrentStep] = useState<StepType>("type");
  const [optionType, setOptionType] = useState<OptionType>("call");
  const [strikePrice, setStrikePrice] = useState<number>(48500);
  const [expiryDays, setExpiryDays] = useState<number>(14);

  const handleNext = () => {
    if (currentStep === "type") setCurrentStep("strike");
    else if (currentStep === "strike") setCurrentStep("expiry");
    else if (currentStep === "expiry") setCurrentStep("review");
  };

  const handleBack = () => {
    if (currentStep === "strike") setCurrentStep("type");
    else if (currentStep === "expiry") setCurrentStep("strike");
    else if (currentStep === "review") setCurrentStep("expiry");
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Easy Option Trading</h1>
      
      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-8 max-w-2xl mx-auto">
        <div className={`flex flex-col items-center w-1/4 ${currentStep === "type" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "type" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>1</div>
          <span className="text-sm">Choose</span>
        </div>
        <div className="w-1/6 h-0.5 bg-muted"></div>
        <div className={`flex flex-col items-center w-1/4 ${currentStep === "strike" || currentStep === "expiry" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "strike" || currentStep === "expiry" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>2</div>
          <span className="text-sm">Configure</span>
        </div>
        <div className="w-1/6 h-0.5 bg-muted"></div>
        <div className={`flex flex-col items-center w-1/4 ${currentStep === "review" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "review" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>3</div>
          <span className="text-sm">Review</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-2xl mx-auto bg-card rounded-lg p-6 text-card-foreground shadow-sm mb-6">
        {currentStep === "type" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Choose Option Type</h2>
            <div className="flex gap-4 mb-6">
              <div
                className={`flex-1 border rounded-lg p-4 cursor-pointer ${
                  optionType === "call" ? "border-primary bg-primary/10" : "border-muted"
                }`}
                onClick={() => setOptionType("call")}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-4 h-4 rounded-full ${optionType === "call" ? "bg-primary" : "border border-muted"}`}></div>
                  <h3 className="font-medium">BUY CALL OPTION</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  A call option gives you the right to buy sBTC at a fixed price, protecting against BTC price increases.
                </p>
              </div>
              <div
                className={`flex-1 border rounded-lg p-4 cursor-pointer ${
                  optionType === "put" ? "border-primary bg-primary/10" : "border-muted"
                }`}
                onClick={() => setOptionType("put")}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-4 h-4 rounded-full ${optionType === "put" ? "bg-primary" : "border border-muted"}`}></div>
                  <h3 className="font-medium">BUY PUT OPTION</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  A put option gives you the right to sell sBTC at a fixed price, protecting against BTC price decreases.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === "strike" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Select Strike Price</h2>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current BTC: $48,500</span>
                <span className="text-sm font-medium">Selected: ${strikePrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="43650"
                max="53350"
                step="50"
                value={strikePrice}
                onChange={(e) => setStrikePrice(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>-10%</span>
                <span>ATM</span>
                <span>+10%</span>
              </div>
            </div>
          </div>
        )}

        {currentStep === "expiry" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Select Expiration</h2>
            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 border rounded-lg p-3 ${
                  expiryDays === 7 ? "border-primary bg-primary/10" : "border-muted"
                }`}
                onClick={() => setExpiryDays(7)}
              >
                1 WEEK
              </button>
              <button
                className={`flex-1 border rounded-lg p-3 ${
                  expiryDays === 14 ? "border-primary bg-primary/10" : "border-muted"
                }`}
                onClick={() => setExpiryDays(14)}
              >
                2 WEEKS
              </button>
              <button
                className={`flex-1 border rounded-lg p-3 ${
                  expiryDays === 30 ? "border-primary bg-primary/10" : "border-muted"
                }`}
                onClick={() => setExpiryDays(30)}
              >
                1 MONTH
              </button>
            </div>
            <div className="bg-muted/30 p-3 rounded-md text-sm">
              Expires: {new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toLocaleDateString()} ({expiryDays} days from now)
            </div>
          </div>
        )}

        {currentStep === "review" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Review Your Option</h2>
            <div className="bg-muted/30 p-4 rounded-md mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Option Type</div>
                  <div className="font-medium">{optionType.toUpperCase()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Strike Price</div>
                  <div className="font-medium">${strikePrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Expiration</div>
                  <div className="font-medium">{new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Premium</div>
                  <div className="font-medium">50 STX</div>
                </div>
              </div>
            </div>
            <div className="bg-muted/30 p-4 rounded-md mb-6">
              <h3 className="font-medium mb-2">Option Cost & Potential Outcomes</h3>
              <div className="mb-2">
                <span className="text-sm text-muted-foreground">Premium:</span>
                <span className="ml-2">50 STX ($50)</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Maximum loss:</span>
                <span className="ml-2">50 STX</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-2xl mx-auto">
        {currentStep !== "type" ? (
          <button
            onClick={handleBack}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back
          </button>
        ) : (
          <Link
            href="/home"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back to Home
          </Link>
        )}
        {currentStep !== "review" ? (
          <button
            onClick={handleNext}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => alert("Option purchased successfully!")}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Purchase Option
          </button>
        )}
      </div>
    </div>
  );
} 