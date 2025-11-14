import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

      <div className="prose prose-lg text-gray-700 space-y-6">
        <p className="text-sm text-gray-500">Last updated: November 13, 2025</p>

        <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
        <p>
          Blink Micro Blog ("we", "us", "our", or "Company") operates the Blink Micro Blog website and application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">2. Information Collection and Use</h2>
        <p>We collect several different types of information for various purposes to provide and improve our Service to you:</p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">2.1 Account Information</h3>
        <p>
          When you register for an account, we collect information such as your name, email address, password, and profile picture. This information is necessary to create and maintain your account and provide personalized features.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">2.2 Content Data</h3>
        <p>
          We store the stories, comments, and other content you create on our platform. This data is necessary to provide the core functionality of our Service and to display your content to other users.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">2.3 Usage Data</h3>
        <p>
          We automatically collect information about how you interact with our Service, including but not limited to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Pages visited and time spent on each page</li>
          <li>Posts and comments you engage with</li>
          <li>Device information (IP address, browser type, operating system)</li>
          <li>Referral source and exit pages</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">2.4 Cookies</h3>
        <p>
          We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">3. Use of Data</h2>
        <p>Blink Micro Blog uses the collected data for various purposes:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so we can improve our Service</li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
          <li>To provide you with news, special offers, and general information</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900">4. Security of Data</h2>
        <p>
          The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">5. Third-Party Services</h2>
        <p>
          Our Service may use third-party services to facilitate our application, analyze Service usage, or provide other services on our behalf. These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Third parties we use:</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Firebase (Authentication and Database)</li>
          <li>Cloudinary (Image Storage and Processing)</li>
          <li>Google APIs (for Google Sign-In)</li>
          <li>Gemini AI (for content generation features)</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900">6. Links to Other Sites</h2>
        <p>
          Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
        </p>
        <p>
          We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">7. Children's Privacy</h2>
        <p>
          Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from children under 13. If we become aware that a child under 13 has provided us with personal data, we immediately delete such information from our servers.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">8. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">9. Your Rights</h2>
        <p>
          Depending on your location, you may have certain rights regarding your personal data, including:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>The right to access your personal data</li>
          <li>The right to correct inaccurate data</li>
          <li>The right to request deletion of your data</li>
          <li>The right to restrict processing of your data</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900">10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
        </p>
        <ul className="list-none space-y-2 ml-4 mt-3">
          <li><strong>Email:</strong> privacy@blinkmicroblog.com</li>
          <li><strong>Support:</strong> support@blinkmicroblog.com</li>
        </ul>
      </div>
    </div>
  );
}
