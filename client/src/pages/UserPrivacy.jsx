import LegalPage from "../components/LegalPage";

export default function UserPrivacy() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="December 27, 2025">
      <section className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          1. Sanctuary Data
        </h2>
        <p>
          At <strong>Love Unfolds</strong>, we value the heartbeats you share. We only collect the information necessary to keep your sanctuary secure, such as your email address and name provided during registration.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          2. Your Whispers
        </h2>
        <p>
          The stories you "unfold" are stored in our database so the community can find inspiration in them. You have full control over your whispers and can delete them at any time from your profile.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          3. Security
        </h2>
        <p>
          We use industry-standard encryption (JWT) to protect your account. We never sell your data to third parties because a sanctuary should always be private.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          4. Contact Us
        </h2>
        <p>
          If you have questions about your data, feel free to reach out to the Love Unfolds team.
        </p>
      </section>
    </LegalPage>
  );
}
