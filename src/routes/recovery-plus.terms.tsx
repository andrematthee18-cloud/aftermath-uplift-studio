import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const Route = createFileRoute("/recovery-plus/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Recovery Plus | Aftermath Studio" },
      {
        name: "description",
        content: "The terms governing your access to and use of the Recovery Plus service.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TermsPage,
});

const P = ({ children }: { children: React.ReactNode }) => <p>{children}</p>;
const UL = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-1 pl-6">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      intro={
        <>
          <P>
            These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the
            Recovery Plus mobile application, website, and any related services (collectively, the
            &ldquo;Service&rdquo;).
          </P>
          <P>
            By creating an account, accessing, or using Recovery Plus, you acknowledge that you have
            read, understood, and agree to be bound by these Terms. If you do not agree with these
            Terms, you must not use the Service.
          </P>
        </>
      }
      sections={[
        {
          heading: "1. Eligibility",
          body: (
            <>
              <P>Recovery Plus is intended for individuals who are 16 years of age or older. You represent that:</P>
              <UL
                items={[
                  "You are at least 16 years old",
                  "You have the legal capacity to enter into this agreement",
                  "The information you provide is accurate and complete",
                  "You will keep your account information up to date",
                ]}
              />
            </>
          ),
        },
        {
          heading: "2. Purpose of Recovery Plus",
          body: (
            <>
              <P>
                Recovery Plus is designed to support individuals in their personal recovery journey
                through educational resources, progress tracking, AI-powered assistance, journaling
                tools, and accountability features.
              </P>
              <P>
                Recovery Plus is a support platform only. It is not a substitute for professional
                medical advice, psychological care, psychiatric treatment, addiction counselling,
                legal advice, or emergency services.
              </P>
            </>
          ),
        },
        {
          heading: "3. Medical Disclaimer",
          body: (
            <>
              <P>
                Recovery Plus does not diagnose, treat, cure, or prevent any medical or mental
                health condition. Information provided through the Service, including
                AI-generated information, is intended for educational and supportive purposes only.
              </P>
              <P>
                If you believe you are experiencing a medical emergency or are at immediate risk of
                harming yourself or others, contact your local emergency services immediately.
                Recovery Plus must never be relied upon as emergency support.
              </P>
            </>
          ),
        },
        {
          heading: "4. User Accounts",
          body: (
            <>
              <P>You may register using email/password, Google Sign-In, or other supported methods. You are responsible for:</P>
              <UL
                items={[
                  "Maintaining the confidentiality of your account",
                  "Protecting your password",
                  "All activity occurring under your account",
                  "Immediately notifying us of any unauthorized access",
                ]}
              />
            </>
          ),
        },
        {
          heading: "5. User Responsibilities",
          body: (
            <>
              <P>You agree not to:</P>
              <UL
                items={[
                  "Use the Service for unlawful purposes",
                  "Harass, threaten, intimidate, or abuse other users",
                  "Upload malicious software",
                  "Attempt unauthorized access or interfere with platform security",
                  "Circumvent security measures",
                  "Impersonate another individual or submit fraudulent information",
                  "Use the platform to promote illegal activities",
                ]}
              />
            </>
          ),
        },
        {
          heading: "6. Recovery Information",
          body: (
            <P>
              Recovery information you enter is provided voluntarily. Recovery Plus does not verify
              the accuracy of information submitted by users. Users remain solely responsible for
              decisions made using their own recovery information.
            </P>
          ),
        },
        {
          heading: "7. Artificial Intelligence",
          body: (
            <>
              <P>
                Recovery Plus includes AI features to answer questions, provide educational
                information, assist with reflection, and offer supportive suggestions. AI responses
                may be incomplete, may contain inaccuracies, and must not be treated as medical
                advice.
              </P>
              <P>
                To improve continuity and experience, Recovery Plus may securely store AI
                conversations associated with your account, handled in accordance with the Privacy
                Policy.
              </P>
            </>
          ),
        },
        {
          heading: "8. Wise Counsel",
          body: (
            <P>
              Recovery Plus may introduce a feature known as Wise Counsel, allowing users to seek
              guidance from trusted individuals they select. Additional terms may be published
              before the feature becomes available.
            </P>
          ),
        },
        {
          heading: "9. Availability",
          body: (
            <P>
              We do not guarantee uninterrupted access to the Service. Maintenance, updates, or
              circumstances beyond our control may temporarily interrupt availability.
            </P>
          ),
        },
        {
          heading: "10. Subscription Services & Advertising",
          body: (
            <>
              <P>
                Recovery Plus is currently free. In the future, Aftermath Studio may introduce an
                optional annual subscription to provide an ad-free experience and support continued
                operation. Any subscription is not intended to restrict access to core recovery
                features.
              </P>
              <P>
                Advertisements are not currently displayed and may be introduced in future versions
                with reasonable notice.
              </P>
            </>
          ),
        },
        {
          heading: "11. Intellectual Property",
          body: (
            <P>
              All intellectual property relating to Recovery Plus — including software, source
              code, logos, graphics, icons, branding, documentation, AI prompts, designs, databases,
              and UI elements — remains the exclusive property of Aftermath Studio.
            </P>
          ),
        },
        {
          heading: "12. User Content",
          body: (
            <P>
              You retain ownership of content you create within Recovery Plus. By submitting
              content, you grant Aftermath Studio a limited licence to store, process, display, and
              transmit that content solely to operate and improve the Service.
            </P>
          ),
        },
        {
          heading: "13. Suspension and Termination",
          body: (
            <P>
              We may suspend or terminate accounts that violate these Terms, engage in unlawful
              conduct, abuse other users, attempt unauthorized access, interfere with platform
              security, or use the Service fraudulently.
            </P>
          ),
        },
        {
          heading: "14. Disclaimer of Warranties",
          body: (
            <P>
              Recovery Plus is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
              basis. To the maximum extent permitted by law, Aftermath Studio makes no warranties
              regarding availability, accuracy, reliability, fitness for a particular purpose,
              continuous operation, or error-free performance.
            </P>
          ),
        },
        {
          heading: "15. Limitation of Liability",
          body: (
            <P>
              To the fullest extent permitted by applicable law, Aftermath Studio and its directors,
              employees, contractors, affiliates, and partners shall not be liable for any
              indirect, incidental, consequential, special, or punitive damages arising from or
              relating to the use of Recovery Plus.
            </P>
          ),
        },
        {
          heading: "16. Indemnification",
          body: (
            <P>
              You agree to indemnify and hold harmless Aftermath Studio from claims, damages,
              liabilities, and expenses arising from your misuse of the Service, violation of these
              Terms, infringement of another person&apos;s rights, or unlawful conduct.
            </P>
          ),
        },
        {
          heading: "17. Changes to the Service and these Terms",
          body: (
            <P>
              Recovery Plus may be modified, updated, expanded, discontinued, or replaced at any
              time. Material changes to these Terms will be communicated through in-app
              notifications, email, or announcements on our website. Continued use constitutes
              acceptance of the revised Terms.
            </P>
          ),
        },
        {
          heading: "18. Governing Law",
          body: (
            <P>
              These Terms shall be governed by and interpreted in accordance with the laws of the
              Republic of South Africa. Mandatory consumer protection laws in another jurisdiction
              that apply to a user remain unaffected.
            </P>
          ),
        },
        {
          heading: "19. Severability & Entire Agreement",
          body: (
            <P>
              If any provision is found invalid, remaining provisions continue in full force. These
              Terms, together with the Privacy Policy and referenced policies, constitute the
              entire agreement between you and Aftermath Studio regarding Recovery Plus.
            </P>
          ),
        },
        {
          heading: "20. Contact Information",
          body: (
            <P>Questions regarding these Terms may be sent to contact@aftermathstudio.co.za.</P>
          ),
        },
      ]}
    />
  );
}
