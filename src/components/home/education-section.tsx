import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, AlertTriangle, ExternalLink } from "lucide-react";

export function EducationSection() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="flex items-center text-xl">
          <BookOpen className="h-5 w-5 mr-2" />
          <span>Learning Resources</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-5">
          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex items-center justify-start h-auto py-3 px-4 bg-slate-50 hover:bg-slate-100 border-slate-200"
            >
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">New to Options?</span>
                <span className="text-xs text-gray-500">Learn the basics</span>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-start h-auto py-3 px-4 bg-slate-50 hover:bg-slate-100 border-slate-200"
            >
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">How BitHedge Works</span>
                <span className="text-xs text-gray-500">Platform guide</span>
              </div>
            </Button>
          </div>
          
          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-slate-200">
              <AccordionTrigger className="text-sm py-3 hover:no-underline hover:bg-slate-50 px-1">
                What is a Bitcoin Option?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-700 px-1 pb-3">
                A Bitcoin option gives you the right, but not the obligation, to buy or sell 
                Bitcoin at a specified price (the strike price) on or before a certain date. 
                It&apos;s like insurance for your Bitcoin.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b border-slate-200">
              <AccordionTrigger className="text-sm py-3 hover:no-underline hover:bg-slate-50 px-1">
                How do I hedge my Bitcoin?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-700 px-1 pb-3">
                To hedge Bitcoin, buy put options that give you the right to sell at a set price. 
                If Bitcoin&apos;s price falls below this price, your option gains value, offsetting 
                your Bitcoin losses. Use our Hedging Calculator to determine how many options you need.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b border-slate-200">
              <AccordionTrigger className="text-sm py-3 hover:no-underline hover:bg-slate-50 px-1">
                What fees does BitHedge charge?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-700 px-1 pb-3">
                BitHedge charges a small transaction fee of 1% when buying or selling options.
                There are also network fees for transactions on the Bitcoin network.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Risk Disclaimer */}
          <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-md border border-amber-100">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-amber-800">Risk Disclaimer</h4>
              <p className="text-xs text-amber-700 mt-1">
                Options trading involves significant risk. Past performance is not indicative 
                of future results. Only trade with funds you can afford to lose.
              </p>
              <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-amber-600">
                <span className="text-xs flex items-center">
                  Read full disclaimer <ExternalLink className="h-3 w-3 ml-1" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 