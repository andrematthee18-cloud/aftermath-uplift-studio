import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const Route = createFileRoute("/recovery-plus/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Recovery Plus | Aftermath Studio" },
      {
        name: "description",
        content:
          "How Recovery Plus collects, uses, stores, protects, and shares your personal information.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrivacyPolicyPage,
});

const P = ({ children }: { children: React.ReactNode }) => <p>{children}</p>;
const UL = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-1 pl-6">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      intro={
        <>
          <P>Your privacy is important to us.</P>
          <P>
            This Privacy Policy explains how Recovery Plus collects, uses, stores, protects, and
            shares your personal information when you use the Recovery Plus mobile application,
            website, and related services (collectively, the &ldquo;Service&rdquo;).
          </P>
          <P>
            By creating an account or using Recovery Plus, you acknowledge that you have read and
            understood this Privacy Policy.
          </P>
        </>
      }
      sections={[
        {
          heading: "1. Who We Are",
          body: (
            <P>
              Recovery Plus is developed and operated by Aftermath Studio. Questions may be sent to
              contact@aftermathstudio.co.za.
            </P>
          ),
        },
        {
          heading: "2. Information We Collect",
          body: (
            <>
              <P>
                <strong>Account Information:</strong> email address, authentication provider (such
                as Google Sign-In), unique account identifier, account creation date, and last
                sign-in information. Passwords are securely managed through our authentication
                provider and are never stored in plain text by Recovery Plus.
              </P>
              <P>
                <strong>Profile Information:</strong> country, age group, recovery preferences, and
                app settings.
              </P>
              <P>
                <strong>Recovery Information (voluntary):</strong> sobriety start date, milestones,
                treatment history, goals, daily check-ins, journal entries, mood tracking,
                reflections, and personal notes.
              </P>
              <P>
                <strong>AI Conversations</strong> may be securely stored to maintain continuity,
                personalise your experience, and improve future interactions within your account.
              </P>
              <P>
                <strong>Device &amp; Usage Information:</strong> device model, OS version, app
                version, language, time zone, crash reports, performance metrics, and information
                about how the app is used.
              </P>
            </>
          ),
        },
        {
          heading: "3. Information We Do Not Collect",
          body: (
            <>
              <P>Unless explicitly required for future features, Recovery Plus does not intentionally collect:</P>
              <UL
                items={[
                  "Continuous GPS location",
                  "Contact lists",
                  "SMS messages",
                  "Phone call history",
                  "Photos or videos (unless voluntarily uploaded)",
                  "Audio recordings (unless voluntarily submitted)",
                  "Banking information",
                  "Government identification documents",
                ]}
              />
            </>
          ),
        },
        {
          heading: "4. How We Use Your Information",
          body: (
            <UL
              items={[
                "Create and manage your account",
                "Authenticate your identity",
                "Provide recovery tracking and display progress",
                "Improve AI conversations",
                "Synchronise your data across devices",
                "Maintain application security and prevent fraud",
                "Improve app performance",
                "Respond to support requests",
                "Notify you of important service updates",
                "Comply with legal obligations",
              ]}
            />
          ),
        },
        {
          heading: "5. Marketing Communications",
          body: (
            <>
              <P>Recovery Plus does not send marketing emails without your consent.</P>
              <P>
                Service-related emails, including security notifications and important account
                updates, may still be sent when necessary. You may unsubscribe from non-essential
                communications at any time.
              </P>
            </>
          ),
        },
        {
          heading: "6. AI Processing",
          body: (
            <>
              <P>
                Recovery Plus uses artificial intelligence to provide supportive tools and
                educational information. AI-generated responses are not professional medical advice,
                may contain inaccuracies, and should not replace professional judgement.
              </P>
            </>
          ),
        },
        {
          heading: "7. Sharing Your Information",
          body: (
            <>
              <P>We do not sell your personal information. We may share information only when necessary with:</P>
              <UL
                items={[
                  "Cloud infrastructure providers",
                  "Authentication providers",
                  "Analytics providers",
                  "Technical service providers",
                  "Payment providers (if subscriptions are introduced)",
                  "Legal authorities where required by law",
                ]}
              />
            </>
          ),
        },
        {
          heading: "8. International Users",
          body: (
            <P>
              Recovery Plus is available worldwide. Your information may be processed or stored in
              countries outside your own. We take reasonable steps to protect personal information
              transferred internationally in accordance with applicable laws.
            </P>
          ),
        },
        {
          heading: "9. Data Security",
          body: (
            <UL
              items={[
                "Secure authentication",
                "Encrypted communications where appropriate",
                "Access controls",
                "Regular software updates",
                "Security monitoring",
              ]}
            />
          ),
        },
        {
          heading: "10. Data Retention",
          body: (
            <P>
              We retain personal information only for as long as reasonably necessary to provide the
              Service, maintain your account, meet legal obligations, resolve disputes, and protect
              the security and integrity of the platform.
            </P>
          ),
        },
        {
          heading: "11. Your Rights",
          body: (
            <UL
              items={[
                "Access your personal information",
                "Correct inaccurate information",
                "Update your information",
                "Request deletion of your account",
                "Withdraw consent where applicable",
                "Object to certain processing activities",
                "Request a copy of your information where legally required",
              ]}
            />
          ),
        },
        {
          heading: "12. Cookies and Similar Technologies",
          body: (
            <P>
              Our website may use cookies and similar technologies to improve functionality,
              analyse traffic, remember preferences, and enhance user experience. You may manage
              cookie preferences through your browser settings where applicable.
            </P>
          ),
        },
        {
          heading: "13. Children's Privacy",
          body: (
            <P>
              Recovery Plus is intended for individuals aged 16 years and older. We do not knowingly
              collect personal information from children below the minimum permitted age.
            </P>
          ),
        },
        {
          heading: "14. Third-Party Services",
          body: (
            <P>
              Recovery Plus may integrate with trusted third-party services including authentication
              providers, cloud hosting, databases, analytics, email services, and future payment
              processors. Each provider maintains its own privacy practices.
            </P>
          ),
        },
        {
          heading: "15. Future Features",
          body: (
            <P>
              Where new features require the collection of additional personal information, this
              Privacy Policy will be updated before those changes take effect.
            </P>
          ),
        },
        {
          heading: "16. Advertising",
          body: (
            <P>
              Recovery Plus currently does not display advertisements. If advertising is introduced
              in the future, this Privacy Policy will be updated accordingly.
            </P>
          ),
        },
        {
          heading: "17. Changes to this Privacy Policy",
          body: (
            <P>
              We may update this Privacy Policy from time to time. Material changes will be
              communicated via in-app notifications, email (where appropriate), or announcements on
              our website. Your continued use of Recovery Plus after changes become effective
              constitutes acceptance of the revised Privacy Policy.
            </P>
          ),
        },
        {
          heading: "18. Contact Us",
          body: (
            <P>
              Questions regarding this Privacy Policy may be directed to Aftermath Studio at
              contact@aftermathstudio.co.za.
            </P>
          ),
        },
      ]}
    />
  );
}
