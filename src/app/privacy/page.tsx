import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - AnimeCodes',
  description: 'Privacy policy and data collection practices for AnimeCodes',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0f1115]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-[#1a1c21] rounded-xl overflow-hidden shadow-xl">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                Last updated: January 2025
              </p>

              <h2>Information We Collect</h2>
              <p>
                We collect information that you voluntarily provide when using our service, including:
              </p>
              <ul>
                <li>Browser type and settings</li>
                <li>Device information</li>
                <li>Usage data</li>
                <li>IP address</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>
                We use the collected information to:
              </p>
              <ul>
                <li>Provide and maintain our service</li>
                <li>Improve user experience</li>
                <li>Analyze usage patterns</li>
                <li>Detect and prevent technical issues</li>
              </ul>

              <h2>Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                We may employ third-party companies and individuals due to the following reasons:
              </p>
              <ul>
                <li>To facilitate our service</li>
                <li>To provide analytics</li>
                <li>To assist us in analyzing how our service is used</li>
              </ul>

              <h2>Security</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul>
                <li>Email: privacy@animecodes.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 