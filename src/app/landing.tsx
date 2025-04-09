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
    </div>
  );
} 