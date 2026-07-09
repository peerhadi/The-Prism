"use client";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content:
        "We collect information you provide directly, such as when you create an account, update your profile, or contact us. This may include your name, email address, and profile image. We also collect usage data automatically, including your IP address, browser type, device identifiers, pages visited, and interaction patterns within The Prism platform. Our systems may process article metadata, saved searches, reading history, and bias analysis preferences to improve your experience and refine our narrative intelligence algorithms.",
    },
    {
      title: "How We Use Your Information",
      content:
        "Your information is used to operate, maintain, and improve The Prism platform. This includes personalizing your feed, generating bias analysis, providing AI chat responses, and delivering relevant narrative intelligence. We may use aggregated, anonymized data for research, product development, and to train our machine learning models. We do not sell your personal information to third parties. Usage patterns may be analyzed to detect abuse, prevent fraud, and ensure platform security.",
    },
    {
      title: "Data Retention",
      content:
        "We retain your account information for as long as your account is active. Usage logs and interaction data are retained for up to 24 months, after which they are anonymized or deleted. If you delete your account, we will remove your personal information within 30 days, though anonymized aggregate data may be retained for analytical purposes. You may request a copy of your data at any time by contacting our support team.",
    },
    {
      title: "Cookies & Tracking",
      content:
        "We use essential cookies to maintain session state and authentication. Analytics cookies help us understand platform usage patterns. You may control cookie preferences through your browser settings. Third-party services integrated into The Prism, such as authentication providers, may set their own cookies in accordance with their privacy policies. We do not use cookies for cross-site tracking or advertising purposes.",
    },
    {
      title: "Data Sharing & Disclosure",
      content:
        "We may share your information with trusted service providers who help operate our infrastructure, process payments, or deliver communications. These providers are contractually bound to protect your data. We may disclose information if required by law, or in good faith belief that such action is necessary to comply with legal obligations, protect our rights, or ensure the safety of our users. In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.",
    },
    {
      title: "Security",
      content:
        "We implement industry-standard security measures including encryption in transit (TLS), encrypted data storage, and regular security audits. Access to personal data is restricted to authorized personnel only. Despite these measures, no system is completely secure. We encourage you to use strong passwords and enable two-factor authentication where available. Please report any security vulnerabilities to our security team immediately.",
    },
    {
      title: "Your Rights",
      content:
        "Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal data. You may also have the right to restrict or object to certain processing activities. To exercise these rights, please contact us through the platform settings or email our privacy team. We will respond to your request within the timeframe required by applicable law. You also have the right to lodge a complaint with your local data protection authority.",
    },
    {
      title: "Third-Party Services",
      content:
        "The Prism integrates with third-party services including Google OAuth for authentication. These services operate under their own privacy policies. We encourage you to review their policies before using these integrations. We are not responsible for the privacy practices of third-party services. Our platform may display content or links from external sources; we do not control and are not responsible for their data practices.",
    },
    {
      title: "Children's Privacy",
      content:
        "The Prism is not intended for users under the age of 16. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete it. Parents or guardians who believe their child has submitted personal information should contact us immediately.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. Material changes will be notified through the platform or via email. Your continued use of The Prism after changes take effect constitutes acceptance of the updated policy. We encourage you to review this policy periodically. The date of the latest revision is displayed at the top of this page.",
    },
    {
      title: "Contact",
      content:
        "For questions about this Privacy Policy or our data practices, please contact us at privacy@theprism.io or through the contact form in the platform. Our data protection officer can be reached at dpo@theprism.io. We aim to respond to all inquiries within 48 hours.",
    },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, var(--primary-soft), transparent 35%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at bottom right, var(--secondary-soft), transparent 30%)",
        }}
      />

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-14">
          <p className="mb-3 text-[11px] font-black tracking-[0.3em] text-[var(--primary)] uppercase">
            Legal
          </p>
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Last updated: July 1, 2026
          </p>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--text-secondary)]">
            This Privacy Policy explains how The Prism collects, uses, stores,
            and protects your personal information when you use our narrative
            intelligence platform. By using The Prism, you consent to the data
            practices described in this policy.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <section
              key={i}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--primary-border)] bg-[var(--primary-soft)] text-[11px] font-black text-[var(--primary)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-lg font-black uppercase tracking-[0.05em]">
                  {section.title}
                </h2>
              </div>
              <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
