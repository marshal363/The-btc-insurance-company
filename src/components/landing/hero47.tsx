import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Persona } from "./old/hero";
import Link from "next/link";
import { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';

export type Hero47Props = {
  heading?: string;
  subheading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  activePersona?: Persona;
};

const Hero47 = ({
  heading,
  subheading,
  description,
  buttons,
  activePersona = "protection",
}: Hero47Props) => {
  // Define content based on activePersona
  const content = {
    protection: {
      heading: "Protect Your Bitcoin Value",
      subheading: "Without Selling a Single Sat",
      description: "No more sleepless nights during market dips. Your policy activates automatically when Bitcoin prices fall below your protected value.",
      buttons: {
        primary: {
          text: "Secure My Bitcoin Value",
          url: "/easy-option",
        },
        secondary: {
          text: "See How It Works",
          url: "#how-it-works",
        },
      },
    },
    income: {
      heading: "Earn Premium Income",
      subheading: "Providing Bitcoin Insurance",
      description: "Receive premiums instantly while your collateral is securely locked in non-custodial contracts. No intermediaries, just yield.",
      buttons: {
        primary: {
          text: "Start Earning Today",
          url: "/income-center",
        },
        secondary: {
          text: "Explore Strategies",
          url: "#how-it-works",
        },
      },
    },
  };

  // Use provided props or fallback to persona-specific content
  const currentHeading = heading || content[activePersona].heading;
  const currentSubheading = subheading || content[activePersona].subheading;
  const currentDescription = description || content[activePersona].description;
  const currentButtons = buttons || content[activePersona].buttons;
  
  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Images for carousel
  const mockupImages = [
    "/mockups/mock-up.webp",
    "/mockups/mock-up-2.webp",
    "/mockups/mock-up-3.webp"
  ];
  
  // Auto-play the carousel
  useEffect(() => {
    if (!emblaApi) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    
    // Update the current slide when it changes
    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    
    return () => {
      clearInterval(interval);
      if (emblaApi) emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);
  
  return (
    <section className="bg-background py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="container max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-12 lg:gap-16">
          <motion.div 
            className="flex flex-col gap-6 md:gap-8 w-full lg:w-[52%] pt-6 lg:pt-10"
            key={`content-${activePersona}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-left leading-tight">
              <span className="text-foreground block">{currentHeading}</span>
              <span className={`${activePersona === 'protection' ? 'text-primary' : 'text-amber-500'} block`}>
                {currentSubheading}
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              {currentDescription}
            </p>
            
            <div className="flex flex-wrap items-center gap-5 mt-4">
              <Button 
                asChild 
                size="lg" 
                className={`rounded-full ${activePersona === 'income' ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
              >
                <Link href={currentButtons.primary?.url || "#"}>
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="size-5" />
                  </div>
                  <span className="pl-2 lg:pl-3">{currentButtons.primary?.text}</span>
                </Link>
              </Button>
              
              <Button asChild variant="link" className="text-muted-foreground hover:text-foreground">
                <Link href={currentButtons.secondary?.url || "#"}>{currentButtons.secondary?.text}</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative w-full lg:w-[48%] flex justify-center lg:justify-end items-center"
            key={`image-${activePersona}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-[280px] sm:w-[320px] md:w-[380px]">
              <div className="absolute top-2.5 left-1/2 h-[92%] w-[69%] -translate-x-[52%] overflow-hidden rounded-[35px]">
                {/* Carousel container */}
                <div className="embla h-full w-full" ref={emblaRef}>
                  <div className="embla__container h-full flex">
                    {mockupImages.map((src, index) => (
                      <div className="embla__slide h-full w-full flex-[0_0_100%]" key={index}>
                        <img
                          src={src}
                          alt={`BitHedge Mockup ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Carousel dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {mockupImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        currentSlide === index 
                          ? `bg-white` 
                          : `bg-white/50`
                      }`}
                      onClick={() => emblaApi?.scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <img
                className="relative z-10 w-full h-auto"
                src="https://shadcnblocks.com/images/block/mockups/phone-2.png"
                alt="iPhone mockup"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Hero47 };
