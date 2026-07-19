import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const Route = createFileRoute("/recovery-plus/data-retention")({
  head: () => ({
    meta: [
      { title: "Data Retention & Account Deletion — Recovery Plus | Aftermath Studio" },
      {
        name: "description",
        content: "How Recovery Plus stores, retains, and deletes personal information.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DataRetentionPage,
});

const P = ({ children }: { children: React.ReactNode }) => <p>{children}</p>;
const UL = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-1 pl-6">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

function DataRetentionPage() {
  return (
    <LegalPageLayout
      title="Data Retention & Account Deletion Policy"
      intro={
        <>
          <P>
            This Policy explains how Recovery Plus stores, retains, archives, and deletes personal
            information. It should be read together with our Terms &amp; Conditions, Privacy
            Policy, User Agreement &amp; Community Guidelines, and AI &amp; Medical Disclaimer.
          </P>
        </>
      }
      sections={[
        {
          heading: "1. Our Approach",
          body: (
            <UL
              items={[
                "Minimise the amount of personal information collected",
                "Retain information only as long as reasonably necessary",
                "Protect personal information using appropriate security measures",
                "Delete information securely when it is no longer required",
              ]}
            />
          ),
        },
        {
          heading: "2. Information We Retain",
          body: (
            <>
              <P>
                <strong>Account information:</strong> email, authentication provider, unique user
                identifier, account creation date, last sign-in.
              </P>
              <P>
                <strong>Recovery information (voluntary):</strong> sobriety start date, milestones,
                treatment history, goals, check-ins, journal entries, mood tracking, reflections,
                notes.
              </P>
              <P>
                <strong>AI conversation history</strong> associated with your account, used to
                maintain context, personalise future interactions, and improve your experience.
              </P>
              <P>
                <strong>Technical information:</strong> device info, app version, OS version, crash
                reports, diagnostic logs, performance information, security logs.
              </P>
            </>
          ),
        },
        {
          heading: "3. How Long Information Is Retained",
          body: (
            <>
              <P>We retain information only for as long as reasonably necessary to:</P>
              <UL
                items={[
                  "Operate Recovery Plus",
                  "Provide requested services",
                  "Improve application functionality",
                  "Meet legal obligations",
                  "Resolve disputes",
                  "Protect users",
                  "Prevent fraud or abuse",
                ]}
              />
            </>
          ),
        },
        {
          heading: "4. Account Deletion",
          body: (
            <>
              <P>Users may request deletion of their Recovery Plus account. Deleting an account generally results in the deletion of:</P>
              <UL
                items={[
                  "Profile information",
                  "Recovery records",
                  "Journal entries",
                  "AI conversation history",
                  "Daily check-ins",
                  "Treatment history",
                  "Personal preferences",
                  "Other user-generated content associated with the account, unless retention is required by law",
                ]}
              />
            </>
          ),
        },
        {
          heading: "5. Authentication Records",
          body: (
            <P>
              Recovery Plus uses third-party authentication services. Where technically possible,
              authentication records will be removed as part of the account deletion process. Some
              records may be retained where required by law or necessary for security purposes.
            </P>
          ),
        },
        {
          heading: "6. Backup Systems",
          body: (
            <P>
              Encrypted backups may be maintained for disaster recovery and business continuity.
              Information in backups is not immediately removed when an account is deleted and is
              automatically replaced over time as backup cycles continue. We do not restore
              deleted personal information from backups except where necessary to recover from a
              major system failure.
            </P>
          ),
        },
        {
          heading: "7. Information Retained After Deletion",
          body: (
            <>
              <P>Certain limited information may be retained where reasonably necessary for:</P>
              <UL
                items={[
                  "Legal compliance",
                  "Fraud prevention",
                  "Security investigations",
                  "Audit requirements",
                  "Resolving disputes",
                  "Enforcing our agreements",
                ]}
              />
            </>
          ),
        },
        {
          heading: "8. Anonymous Information",
          body: (
            <P>
              Recovery Plus may retain anonymised information — which can no longer reasonably
              identify an individual — to improve the app, understand usage, improve AI
              performance, generate statistical reports, and conduct research and analytics.
            </P>
          ),
        },
        {
          heading: "9. User Responsibilities",
          body: (
            <P>
              Before requesting account deletion, users should ensure they have saved any
              information they wish to keep. Once deletion has been completed, Recovery Plus may
              not be able to recover deleted information.
            </P>
          ),
        },
        {
          heading: "10. Future Export Features",
          body: (
            <P>
              Recovery Plus may introduce features allowing users to export their journal entries,
              recovery history, daily check-ins, AI conversations, and progress summaries in
              commonly used digital formats.
            </P>
          ),
        },
        {
          heading: "11. Security During Retention",
          body: (
            <UL
              items={[
                "Secure authentication",
                "Encrypted communications where appropriate",
                "Access controls",
                "Security monitoring",
                "Regular software updates",
                "Protection against unauthorised access",
              ]}
            />
          ),
        },
        {
          heading: "12. Data Requests",
          body: (
            <>
              <P>Subject to applicable law, users may request:</P>
              <UL
                items={[
                  "Access to their personal information",
                  "Correction of inaccurate information",
                  "Deletion of personal information",
                  "Information regarding how their data is processed",
                ]}
              />
              <P>
                We may request reasonable proof of identity before processing certain requests to
                protect user privacy.
              </P>
            </>
          ),
        },
        {
          heading: "13. Changes to this Policy",
          body: (
            <P>
              Material changes will be communicated via in-app notifications, email (where
              appropriate), or announcements on aftermathstudio.co.za. Continued use constitutes
              acceptance of the revised Policy.
            </P>
          ),
        },
        {
          heading: "14. Contact Information",
          body: (
            <P>
              For data-related requests, contact Aftermath Studio at contact@aftermathstudio.co.za.
            </P>
          ),
        },
      ]}
      closer={
        <>
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">Our Commitment</h2>
          <P>
            Recovery Plus is committed to respecting your privacy and giving you meaningful control
            over your personal information. We recognise that recovery journeys often involve
            highly personal experiences, and our goal is to earn and maintain your trust by
            handling your information with care, integrity, and respect.
          </P>
        </>
      }
    />
  );
}
