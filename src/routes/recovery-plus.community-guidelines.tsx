import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const Route = createFileRoute("/recovery-plus/community-guidelines")({
  head: () => ({
    meta: [
      { title: "User Agreement & Community Guidelines — Recovery Plus | Aftermath Studio" },
      {
        name: "description",
        content:
          "Guidelines for participating respectfully and responsibly in the Recovery Plus community.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CommunityGuidelinesPage,
});

const P = ({ children }: { children: React.ReactNode }) => <p>{children}</p>;
const UL = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-1 pl-6">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

function CommunityGuidelinesPage() {
  return (
    <LegalPageLayout
      title="User Agreement & Community Guidelines"
      intro={
        <>
          <P>
            Recovery Plus exists to support individuals on their recovery journey by providing
            tools, education, accountability, encouragement, and AI-assisted guidance in a safe and
            respectful environment.
          </P>
          <P>
            Recovery is a personal journey. Every individual deserves to be treated with dignity,
            compassion, and respect. By using Recovery Plus, you agree to contribute positively to
            that environment.
          </P>
        </>
      }
      sections={[
        {
          heading: "1. Acceptance",
          body: (
            <>
              <P>By creating an account or using Recovery Plus, you agree to:</P>
              <UL
                items={[
                  "Follow these Community Guidelines",
                  "Respect other users",
                  "Use Recovery Plus responsibly",
                  "Comply with all applicable laws",
                ]}
              />
            </>
          ),
        },
        {
          heading: "2. Respect for Others",
          body: (
            <>
              <P>Recovery Plus has zero tolerance for abusive behaviour. Users must not:</P>
              <UL
                items={[
                  "Harass other users",
                  "Threaten violence",
                  "Bully or intimidate others",
                  "Discriminate based on race, nationality, ethnicity, religion, disability, age, sex, gender, or other protected characteristics",
                  "Encourage self-harm or harm to others",
                  "Promote hate speech",
                  "Share illegal material",
                ]}
              />
            </>
          ),
        },
        {
          heading: "3. Honest Participation",
          body: (
            <>
              <P>Users agree not to:</P>
              <UL
                items={[
                  "Create fake accounts",
                  "Pretend to be another individual",
                  "Misrepresent treatment history",
                  "Manipulate recovery tracking",
                  "Use automated tools to abuse the Service",
                  "Submit fraudulent information",
                ]}
              />
            </>
          ),
        },
        {
          heading: "4. Recovery Responsibility",
          body: (
            <>
              <P>Recovery Plus provides tools to assist your journey. However:</P>
              <UL
                items={[
                  "You remain responsible for your own choices",
                  "Recovery Plus cannot guarantee sobriety",
                  "Recovery outcomes differ for every individual",
                  "Personal decisions remain your responsibility",
                ]}
              />
            </>
          ),
        },
        {
          heading: "5. AI Assistant",
          body: (
            <>
              <P>Recovery Plus includes AI features. The AI is not:</P>
              <UL
                items={[
                  "A therapist",
                  "A doctor",
                  "A psychologist",
                  "A psychiatrist",
                  "Legal counsel",
                  "Emergency support",
                ]}
              />
              <P>
                AI responses should always be considered alongside professional advice where
                appropriate.
              </P>
            </>
          ),
        },
        {
          heading: "6. Crisis Situations",
          body: (
            <>
              <P>Recovery Plus is not an emergency service. If you are:</P>
              <UL
                items={[
                  "In immediate danger",
                  "Experiencing a medical emergency",
                  "At risk of harming yourself",
                  "At risk of harming another person",
                ]}
              />
              <P>
                contact your local emergency services or a qualified healthcare professional
                immediately. Do not rely on Recovery Plus or its AI for emergency assistance.
              </P>
            </>
          ),
        },
        {
          heading: "7. Journals & Personal Reflections",
          body: (
            <P>
              Users remain responsible for the information they choose to record. You should avoid
              storing information that could unnecessarily expose your personal safety or the
              privacy of others.
            </P>
          ),
        },
        {
          heading: "8. Wise Counsel",
          body: (
            <P>
              Wise Counsel is an upcoming feature intended to allow users to invite trusted
              individuals to provide accountability, encouragement, and guidance. Participation
              will always be voluntary and users will choose who participates. Advice shared
              through Wise Counsel represents the opinions of participating individuals and not
              those of Recovery Plus or Aftermath Studio.
            </P>
          ),
        },
        {
          heading: "9. Reporting Concerns",
          body: (
            <>
              <P>Where community features are available, users are encouraged to report:</P>
              <UL
                items={[
                  "Harassment",
                  "Abuse",
                  "Threats",
                  "Fraud",
                  "Spam",
                  "Impersonation",
                  "Illegal content",
                  "Other violations of these Guidelines",
                ]}
              />
            </>
          ),
        },
        {
          heading: "10. Consequences of Misconduct",
          body: (
            <UL
              items={[
                "Issue a warning",
                "Remove content",
                "Temporarily suspend access",
                "Permanently terminate an account",
                "Restrict access to specific features",
                "Report unlawful conduct to appropriate authorities where required",
              ]}
            />
          ),
        },
        {
          heading: "11. Appropriate Use of AI",
          body: (
            <>
              <P>Users agree not to intentionally use the AI to:</P>
              <UL
                items={[
                  "Promote illegal activity",
                  "Generate abusive or threatening content",
                  "Circumvent platform safeguards",
                  "Spread misinformation",
                  "Harass other individuals",
                  "Commit fraud",
                ]}
              />
            </>
          ),
        },
        {
          heading: "12. Privacy of Others",
          body: (
            <>
              <P>Do not upload personal information about another person without their permission, including:</P>
              <UL
                items={[
                  "Contact details",
                  "Medical information",
                  "Treatment information",
                  "Personal photographs",
                  "Confidential communications",
                ]}
              />
            </>
          ),
        },
        {
          heading: "13. Intellectual Property",
          body: (
            <P>
              Recovery Plus — including its software, branding, logos, design, AI systems, and
              content — remains the intellectual property of Aftermath Studio. Users may not copy,
              reproduce, modify, reverse engineer, distribute, or commercially exploit any part of
              the Service without prior written permission.
            </P>
          ),
        },
        {
          heading: "14. Feedback",
          body: (
            <P>
              If you voluntarily submit ideas, feature requests, or feedback, you acknowledge that
              Aftermath Studio may use those suggestions to improve the Service without any
              obligation to provide compensation.
            </P>
          ),
        },
        {
          heading: "15. Account Security",
          body: (
            <>
              <P>You are responsible for:</P>
              <UL
                items={[
                  "Keeping your account secure",
                  "Protecting your login credentials",
                  "Using a strong password where applicable",
                  "Logging out from shared devices",
                ]}
              />
              <P>
                If you suspect unauthorised access to your account, notify us promptly at
                contact@aftermathstudio.co.za.
              </P>
            </>
          ),
        },
        {
          heading: "16. Changes to this Agreement",
          body: (
            <P>
              Where changes are significant, we will provide reasonable notice through in-app
              notifications, email, or announcements on aftermathstudio.co.za. Continued use
              constitutes acceptance of the revised terms.
            </P>
          ),
        },
        {
          heading: "17. Contact Information",
          body: (
            <P>
              Questions regarding this User Agreement may be directed to
              contact@aftermathstudio.co.za.
            </P>
          ),
        },
      ]}
      closer={
        <>
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">Our Commitment</h2>
          <P>
            Recovery Plus was created to encourage hope, accountability, and long-term recovery. We
            ask every member of our community to help make Recovery Plus a place where people feel
            supported, respected, and empowered to continue moving forward.
          </P>
        </>
      }
    />
  );
}
