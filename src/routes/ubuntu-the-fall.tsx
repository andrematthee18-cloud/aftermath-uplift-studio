import { createFileRoute } from "@tanstack/react-router";
import { Skull } from "lucide-react";
import { AppPageLayout } from "@/components/AppPageLayout";

export const Route = createFileRoute("/ubuntu-the-fall")({
  head: () => ({
    meta: [
      { title: "Ubuntu: The Fall — Survival Game | Aftermath Studio" },
      { name: "description", content: "A survival game rooted in African landscape and lore. Scarcity, community, and the choices that decide who makes it through the night." },
      { property: "og:title", content: "Ubuntu: The Fall — Survival Game" },
      { property: "og:description", content: "A survival game rooted in African landscape and lore." },
    ],
  }),
  component: UbuntuPage,
});

function UbuntuPage() {
  return (
    <AppPageLayout
      name="Ubuntu: The Fall"
      tagline="Survive together, or not at all."
      status="On the Horizon"
      accent="oklch(0.55 0.2 25 / 0.5)"
      icon={<Skull className="h-7 w-7" />}
      comingSoon
      intro={
        <>
          <p>
            Ubuntu: The Fall is a survival game rooted in African landscape and lore — a world of
            scarcity, community, and the choices that decide who makes it through the night.
          </p>
          <p>
            Set against sweeping savannas, weathered ruins, and the deep silence of the bush, the
            game explores what it means to endure alongside others when everything is falling apart.
          </p>
        </>
      }
      sections={[
        {
          heading: "A World Still Taking Shape",
          body: (
            <>
              <p>
                Ubuntu: The Fall is currently in early concept development at Aftermath Studio.
                We're taking our time to build something that respects both the survival genre and
                the stories of the continent it comes from.
              </p>
              <p>
                More details will be shared as the world, systems, and characters come together.
              </p>
            </>
          ),
        },
      ]}
      features={[
        "Survival in an African-inspired open world",
        "Community and cooperation systems",
        "Scarcity-driven decision making",
        "Story rooted in local lore",
      ]}
      closer={
        <>
          <p className="text-xl font-semibold text-accent">
            I am because we are.
          </p>
        </>
      }
    />
  );
}
