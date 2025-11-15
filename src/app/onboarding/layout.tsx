import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding - RecruitVoiceAI",
  description: "Onboarding für neue RecruitVoiceAI Kunden",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

