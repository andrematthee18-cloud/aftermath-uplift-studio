import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { AppPageLayout } from "@/components/AppPageLayout";

export const Route = createFileRoute("/habit-wealth")({
  head: () => ({
    meta: [
      { title: "Habit Wealth — Build Better Habits. Build Greater Wealth. | Aftermath Studio" },
      { name: "description", content: "An intelligent personal finance platform that turns everyday money management into simple habits with receipt scanning and estimated credit insights." },
      { property: "og:title", content: "Habit Wealth — Build Better Habits. Build Greater Wealth." },
      { property: "og:description", content: "Track income, expenses, and goals. Scan receipts, import statements, and build lasting financial confidence." },
    ],
  }),
  component: HabitWealthPage,
});

function HabitWealthPage() {
  return (
    <AppPageLayout
      name="Habit Wealth"
      tagline="Build Better Habits. Build Greater Wealth."
      status="In Development"
      accent="oklch(0.72 0.17 145 / 0.55)"
      icon={<Wallet className="h-7 w-7" />}
      waitlistProduct="Habit Wealth"
      intro={
        <>
          <p>
            Habit Wealth is an intelligent personal finance platform designed to help people take
            control of their money through better financial habits, smarter budgeting, and
            meaningful insights.
          </p>
          <p>
            Financial success isn't built through one perfect decision — it is built through
            thousands of small, consistent choices.
          </p>
          <p>
            Habit Wealth transforms everyday financial management into simple habits that create
            long-term results.
          </p>
        </>
      }
      sections={[
        {
          heading: "Complete Financial Visibility",
          body: (
            <>
              <p>
                Track your income, expenses, savings, and financial goals in one secure place.
              </p>
              <p>
                Habit Wealth automatically organizes spending, helping users understand exactly
                where their money goes and where opportunities exist to save more.
              </p>
              <p>
                The platform provides clear financial dashboards that simplify money management for
                everyone.
              </p>
            </>
          ),
        },
        {
          heading: "Smarter Money Management",
          body: (
            <>
              <p>
                Users can upload bank statements or simply photograph receipts, allowing Habit
                Wealth to automatically extract and categorize transactions using intelligent
                document processing.
              </p>
              <p>
                This reduces manual data entry while giving users an accurate picture of their
                financial health.
              </p>
            </>
          ),
        },
        {
          heading: "Financial Insights",
          body: (
            <>
              <p>Habit Wealth goes beyond tracking expenses.</p>
              <p>
                The platform analyses spending behaviour, identifies recurring patterns, estimates a
                user's credit profile, and provides personalised recommendations that encourage
                healthier financial decisions over time.
              </p>
              <p>
                Every recommendation is designed to help users improve their financial future one
                habit at a time.
              </p>
            </>
          ),
        },
      ]}
      features={[
        "Income and expense tracking",
        "Budget planning",
        "Savings goals",
        "Receipt scanning with AI",
        "Bank statement importing",
        "Automatic transaction categorisation",
        "Spending analytics",
        "Financial insights",
        "Estimated credit score analysis",
        "Secure cloud synchronization",
        "Google and email sign-in",
      ]}
      closer={
        <>
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
            Build Wealth Through Better Habits
          </h2>
          <p>Financial freedom begins with understanding your money.</p>
          <p>
            Habit Wealth gives users the tools, insights, and habits they need to spend wisely, save
            consistently, and build lasting financial confidence.
          </p>
          <p className="text-xl font-semibold text-accent">Small habits. Big results. Lasting wealth.</p>
        </>
      }
    />
  );
}
