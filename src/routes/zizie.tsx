import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { AppPageLayout } from "@/components/AppPageLayout";

export const Route = createFileRoute("/zizie")({
  head: () => ({
    meta: [
      { title: "Zizie — Your AI. Everywhere. | Aftermath Studio" },
      { name: "description", content: "A next-generation personal AI assistant with continuous memory that follows you across every device." },
      { property: "og:title", content: "Zizie — Your AI. Everywhere." },
      { property: "og:description", content: "A next-generation personal AI assistant with continuous memory that follows you across every device." },
    ],
  }),
  component: ZiziePage,
});

function ZiziePage() {
  return (
    <AppPageLayout
      name="Zizie"
      tagline="Your AI. Everywhere."
      status="In Development"
      accent="oklch(0.65 0.18 200 / 0.5)"
      icon={<Activity className="h-7 w-7" />}
      waitlistProduct="Zizie"
      intro={
        <>
          <p>
            Zizie is a next-generation personal AI assistant built to become a true digital
            companion rather than just another chatbot.
          </p>
          <p>
            Designed with a continuous memory architecture, Zizie remembers conversations,
            understands context, and remains available across multiple devices, creating a seamless
            AI experience that follows you wherever you go.
          </p>
          <p>
            Whether you're working, studying, driving, exercising, or relaxing at home, Zizie stays
            connected to your world.
          </p>
        </>
      }
      sections={[
        {
          heading: "More Than an AI Assistant",
          body: (
            <>
              <p>Zizie is designed to think alongside you.</p>
              <p>
                It helps organize your life, automate everyday tasks, answer questions, generate
                ideas, assist with creative work, manage information, and provide intelligent
                recommendations based on your ongoing conversations.
              </p>
              <p>
                Instead of starting over every time you open the app, Zizie maintains context so
                every interaction feels like continuing an existing conversation.
              </p>
            </>
          ),
        },
        {
          heading: "Universal Presence",
          body: (
            <>
              <p>
                Zizie's Universal Presence Platform allows your AI companion to exist across all of
                your connected devices.
              </p>
              <p>
                Your conversations, memories, preferences, and ongoing tasks remain synchronized
                between your phone, desktop, smartwatch, vehicle, and future supported platforms.
              </p>
              <p>
                No matter where you continue the conversation, Zizie remembers exactly where you
                left off.
              </p>
            </>
          ),
        },
        {
          heading: "Intelligent Personalisation",
          body: (
            <>
              <p>
                Over time, Zizie learns your preferences, communication style, workflows, and
                routines to provide increasingly relevant assistance while always keeping you in
                control of your data.
              </p>
              <p>
                The result is an AI that becomes genuinely useful instead of repeatedly asking the
                same questions.
              </p>
            </>
          ),
        },
      ]}
      features={[
        "Persistent conversational memory",
        "Cross-device synchronization",
        "Voice interaction",
        "AI-powered productivity tools",
        "Creative writing assistance",
        "Research and learning support",
        "Smart reminders",
        "Context-aware conversations",
        "Personal knowledge management",
        "Universal Presence Platform",
        "Device-aware intelligence",
      ]}
      closer={
        <>
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
            The Future of Personal AI
          </h2>
          <p>Most AI assistants answer questions.</p>
          <p>
            Zizie builds a lasting relationship with its user by remembering, learning, and helping
            every day.
          </p>
          <p className="text-xl font-semibold text-accent">
            One AI. Every device. Always with you.
          </p>
        </>
      }
    />
  );
}
