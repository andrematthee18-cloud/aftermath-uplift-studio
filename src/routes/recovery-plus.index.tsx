import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { AppPageLayout } from "@/components/AppPageLayout";
import { RecoveryPlusWaitlistForm } from "@/components/RecoveryPlusWaitlistForm";

const legalLinks = [
  { to: "/recovery-plus/privacy-policy", label: "Privacy Policy" },
  { to: "/recovery-plus/terms", label: "Terms & Conditions" },
  { to: "/recovery-plus/data-retention", label: "Data Retention & Account Deletion" },
  { to: "/recovery-plus/community-guidelines", label: "User Agreement & Community Guidelines" },
  { to: "/recovery-plus/ai-disclaimer", label: "AI & Medical Disclaimer" },
] as const;

export const Route = createFileRoute("/recovery-plus/")({
  head: () => ({
    meta: [
      { title: "Recovery Plus — Recovery Beyond Sobriety | Aftermath Studio" },
      { name: "description", content: "A faith-inspired recovery companion for building healthier habits, accountability, and lasting freedom beyond addiction." },
      { property: "og:title", content: "Recovery Plus — Recovery Beyond Sobriety" },
      { property: "og:description", content: "A faith-inspired recovery companion for building healthier habits, accountability, and lasting freedom beyond addiction." },
    ],
  }),
  component: RecoveryPlusPage,
});

function RecoveryPlusPage() {
  return (
    <AppPageLayout
      name="Recovery Plus"
      tagline="Recovery Beyond Sobriety."
      status="Launching Soon"
      accent="oklch(0.7 0.18 35 / 0.6)"
      icon={<Heart className="h-7 w-7" />}
      waitlistProduct="Recovery Plus"
      intro={
        <>
          <p>
            Recovery Plus is a faith-inspired recovery companion designed to help people overcome
            addiction by building healthier habits, maintaining accountability, and celebrating every
            step of progress.
          </p>
          <p>
            Recovery is about far more than simply stopping a destructive behavior. It is about
            rebuilding your life, strengthening your relationships, restoring your purpose, and
            becoming the person you were created to be. Recovery Plus was built around this
            philosophy.
          </p>
          <p>
            Whether someone is recovering from substance abuse, gambling, pornography, alcohol, or
            other addictive behaviours, Recovery Plus provides practical tools that support long-term
            recovery through consistency rather than perfection.
          </p>
        </>
      }
      sections={[
        {
          heading: "Built for Everyday Recovery",
          body: (
            <>
              <p>
                Recovery Plus gives users a structured daily environment that encourages growth
                through small, measurable victories.
              </p>
              <p>
                The platform combines habit tracking, sobriety milestones, emotional check-ins,
                journaling, accountability features, and motivational content into one simple
                experience that helps users remain focused on their recovery journey.
              </p>
              <p>
                Instead of simply counting sober days, Recovery Plus helps users understand their
                progress, identify patterns, and develop healthier routines that last.
              </p>
            </>
          ),
        },
      ]}
      features={[
        "Daily sobriety tracking",
        "Habit and routine building",
        "Personal journal and reflection tools",
        "Recovery milestone celebrations",
        "Progress analytics",
        "Emotional wellness check-ins",
        "Faith-based encouragement and motivation",
        "Accountability features",
        "Secure cloud backup",
        "Cross-device synchronization",
      ]}
      closer={
        <>
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Why Recovery Plus?</h2>
          <p>Most recovery tools focus on avoiding relapse.</p>
          <p className="text-foreground">Recovery Plus focuses on building a better life.</p>
          <p>
            By encouraging consistency, self-awareness, accountability, and personal growth,
            Recovery Plus helps users move beyond addiction toward lasting freedom.
          </p>
          <p>Every day is another opportunity to take one measurable step forward.</p>
          <p className="text-xl font-semibold text-accent">Recovery Beyond Sobriety.</p>
          <div className="pt-6">
            <RecoveryPlusWaitlistForm />
          </div>
        </>
      }
    />
  );
}
