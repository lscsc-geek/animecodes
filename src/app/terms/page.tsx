import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - AnimeCodes',
  description: 'Terms of service and usage conditions for AnimeCodes',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f1115]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-[#1a1c21] rounded-xl overflow-hidden shadow-xl">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                Last updated: January 2025
              </p>

              <h2>1. Terms</h2>
              <p>
                By accessing AnimeCodes, you agree to be bound by these terms of service and agree that you are responsible for compliance with any applicable local laws.
              </p>

              <h2>2. Use License</h2>
              <p>
                Permission is granted to temporarily access the materials on AnimeCodes for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>

              <h2>3. Disclaimer</h2>
              <p>
                The materials on AnimeCodes are provided on an 'as is' basis. AnimeCodes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation:
              </p>
              <ul>
                <li>Warranties or conditions of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of intellectual property</li>
              </ul>

              <h2>4. Limitations</h2>
              <p>
                In no event shall AnimeCodes or its suppliers be liable for any damages arising out of the use or inability to use the materials on the website.
              </p>

              <h2>5. Accuracy of Materials</h2>
              <p>
                The materials appearing on AnimeCodes could include technical, typographical, or photographic errors. AnimeCodes does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>

              <h2>6. Links</h2>
              <p>
                AnimeCodes has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AnimeCodes.
              </p>

              <h2>7. Modifications</h2>
              <p>
                AnimeCodes may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h2>8. Contact</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <ul>
                <li>Email: terms@animecodes.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 