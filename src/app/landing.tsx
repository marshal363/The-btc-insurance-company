import {
  HeroSection,
  ValueProposition,
  HowItWorks,
  EducationalSection,
  UserPaths,
  SocialProof,
  FinalCTA
} from "@/components/landing";

export default function Landing() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <ValueProposition />
      <HowItWorks />
      <EducationalSection />
      <UserPaths />
      <SocialProof />
      <FinalCTA />
    </div>
  );
} 