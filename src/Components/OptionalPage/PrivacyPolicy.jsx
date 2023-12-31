import Helmet from 'react-helmet';


const PrivacyPolicy = () => {
  return (
    <div>
      <Helmet>
      <title>Privacy Policy</title></Helmet>
  <div className="pb-8 pt-6 mb-4 mt-16 px-12">
    <h2 className="text-3xl font-semibold mb-4">Privacy Policy</h2>
    <p>
      At Luxurious Hotel, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit or make use of our website and services.
    </p>
    <h3 className="text-xl font-semibold mt-4">Information Collection</h3>
    <p>
      We may collect personal information when you make a reservation, sign up for our newsletter, or interact with our website. This information may include your name, email address, contact details, and reservation preferences.
    </p>
    <h3 className="text-xl font-semibold mt-4">How We Use Your Information</h3>
    <p>
      We use your information to personalize your experience, manage your bookings, and provide you with relevant updates and offers. Rest assured that your data is used solely for these purposes and is not shared with third parties without your consent.
    </p>
    <h3 className="text-xl font-semibold mt-4">Security</h3>
    <p>
      We take all necessary measures to ensure the security of your data. Your personal and financial information is encrypted, and we employ industry-standard security protocols to protect your sensitive data.
    </p>
    <h3 className="text-xl font-semibold mt-4">Cookies</h3>
    <p>
      Our website may use cookies to enhance your browsing experience and provide personalized content. These cookies do not store any sensitive information and can be disabled in your browser settings.
    </p>
    <h3 className="text-xl font-semibold mt-4">Contact Us</h3>
    <p>
      If you have any questions or concerns about your privacy or data security, please reach out to our dedicated team at{' '}
      <a href="mailto:privacy@luxurioushotel.com" className="text-orange-500 hover:underline">
        privacy@luxurioushotel.com
      </a>
      .
    </p>
    <p>
      We are committed to maintaining your trust and providing transparency in how your data is handled. Your privacy is of utmost importance to us.
    </p>
  </div>


    </div>
  );
};

export default PrivacyPolicy;
