// pages/privacy-policy.tsx
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <main style={{ padding: '60px 20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333', lineHeight: 1.6 }}>
        <h1 style={{ fontSize: '2em', marginBottom: '0.8em' }}>Privacy Policy</h1>
        <p><strong>Effective Date: June 5, 2025</strong></p>

        <p>
          We are committed to protecting your privacy and safeguarding your personal information. This Privacy Policy
          describes how we collect, use, and disclose your information when you visit our website.
        </p>
        <p>
          This policy complies with applicable privacy laws including Canada’s <em>Personal Information Protection and Electronic Documents Act (PIPEDA)</em> and is aligned with global standards such as the <em>General Data Protection Regulation (GDPR)</em>.
        </p>

        <h2 style={{ fontSize: '1.3em', marginTop: '1.6em' }}>1. Information We Collect</h2>
        <p>We may collect the following types of personal information:</p>
        <ul style={{ paddingLeft: '1.2em' }}>
          <li>Name, email address, and contact details</li>
          <li>Billing and payment information</li>
          <li>IP address, browser type, and usage data (via cookies or analytics tools)</li>
        </ul>

        <h2 style={{ fontSize: '1.3em', marginTop: '1.6em' }}>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul style={{ paddingLeft: '1.2em' }}>
          <li>Process transactions or inquiries</li>
          <li>Provide customer support</li>
          <li>Improve website performance</li>
          <li>Send optional promotional communications (with consent)</li>
        </ul>

        <h2 style={{ fontSize: '1.3em', marginTop: '1.6em' }}>3. Legal Basis for Processing</h2>
        <p>We process your personal data based on:</p>
        <ul style={{ paddingLeft: '1.2em' }}>
          <li>Your consent</li>
          <li>Our contractual obligations to you</li>
          <li>Compliance with legal requirements</li>
          <li>Our legitimate interests in improving our services</li>
        </ul>

        <h2 style={{ fontSize: '1.3em', marginTop: '1.6em' }}>4. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies to enhance your browsing experience, analyze traffic, and remember user preferences.
          You can manage or disable cookies through your browser settings. Disabling cookies may impact site functionality.
        </p>

        <h2 style={{ fontSize: '1.3em', marginTop: '1.6em' }}>5. Data Sharing and Disclosure</h2>
        <p>We do <strong>not</strong> sell your personal information. We may share it with:</p>
        <ul style={{ paddingLeft: '1.2em' }}>
          <li>Trusted service providers (e.g., payment processors, analytics)</li>
          <li>Legal authorities, if required by law</li>
        </ul>

        <h2 style={{ fontSize: '1.3em', marginTop: '1.6em' }}>6. Data Retention</h2>
        <p>
          We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by law.
        </p>

        <h2 style={{ fontSize: '1.3em', marginTop: '1.6em' }}>7. Security Measures</h2>
        <p>
          We take reasonable steps to protect your data from unauthorized access, loss, or misuse using physical,
          technical, and administrative safeguards.
        </p>

        <h2 style={{ fontSize: '1.3em', marginTop: '1.6em' }}>8. Your Rights</h2>
        <p>You have the right to:</p>
        <ul style={{ paddingLeft: '1.2em' }}>
          <li>Access the personal information we hold about you</li>
          <li>Request corrections or deletion of your information</li>
          <li>Withdraw consent at any time</li>
          <li>File a complaint with a data protection authority</li>
        </ul>
        <p>
          To exercise your rights, please contact us using the details below.
        </p>

        <h2 style={{ fontSize: '1.3em', marginTop: '1.6em' }}>9. Third-Party Links</h2>
        <p>
          Our website may link to external sites. We are not responsible for the privacy practices of those sites.
          Please review their privacy policies separately.
        </p>

        <h2 style={{ fontSize: '1.3em', marginTop: '1.6em' }}>10. Contact Us</h2>
        <p>
          If you have questions or concerns about this Privacy Policy or how your data is handled, contact us at:{' '}
          <a href="mailto:abfishingca@gmail.com" style={{ color: '#0066cc' }}>abfishingca@gmail.com</a>
        </p>
      </main>
    </>
  );
}
