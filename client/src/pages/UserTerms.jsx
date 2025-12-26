import LegalPage from "../components/LegalPage";

export default function UserTerms() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="December 27, 2025">
      <section className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          1. Community Conduct
        </h2>
        <p>
          Love Unfolds is a sanctuary for connection and reflection. By using this platform, you agree to share your stories with respect and empathy. We do not tolerate hate speech, harassment, or content that promotes violence.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          2. Content Ownership
        </h2>
        <p>
          Your whispers belong to you. By publishing a story on Love Unfolds, you grant us a non-exclusive license to display your content to our community. You retain the right to delete your stories at any time.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          3. Account Responsibility
        </h2>
        <p>
          You are responsible for maintaining the confidentiality of your account token and for all activities that occur under your profile. Please notify us immediately if you suspect unauthorized use of your account.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          4. Termination
        </h2>
        <p>
          We reserve the right to remove stories or suspend accounts that violate our community sanctuary guidelines to ensure Love Unfolds remains a safe space for everyone.
        </p>
      </section>
    </LegalPage>
  );
}
