import {
  HeroSection,
  ValueProposition,
  HowItWorks,
  EducationalSection,
  UserPaths,
  SocialProof,
  FinalCTA,
  FAQSection
} from "@/components/landing";
import { LandingFooter } from "@/components/shared/landing-footer";

export default function Landing() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ValueProposition />
      <HowItWorks />
      <EducationalSection />
      <UserPaths />
      <SocialProof />
      <FAQSection />
      <FinalCTA />
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-center items-center py-6 mb-4">
          <p className="text-center text-sm text-muted-foreground">
            100% Non-custodial · Built on Stacks · Secured by Bitcoin
          </p>
        </div>
        <LandingFooter />
      </div>
    </div>
  );
} 