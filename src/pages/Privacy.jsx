function Privacy() {
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const policies = [
    {
      title: "1. Information We Collect",
      text: `FlimStar may collect certain information about your visit, such as your browser type, IP address, and the pages you visit. We may also collect information you voluntarily provide, such as when you create an account or contact us.`,
    },
    {
      title: "2. How We Use Your Information",
      text: `We use the information we collect to provide and improve our service, to understand how users interact with our website, and to communicate with you about updates or changes to our service.`,
    },
    {
      title: "3. Cookies and Similar Technologies",
      text: `FlimStar uses cookies and similar technologies to enhance your experience on our website. You can set your browser to refuse all or some browser cookies, but this may affect your ability to use certain features of our service.`,
    },
    {
      title: "4. Third-Party Services",
      text: `We may use third-party services, such as analytics providers and content delivery networks, to help us provide and improve our service. These third parties may collect information about your use of FlimStar.`,
    },
    {
      title: "5. Data Security",
      text: `We take reasonable measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.`,
    },
    {
      title: "6. Children's Privacy",
      text: `FlimStar is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.`,
    },
    {
      title: "7. Changes to This Privacy Policy",
      text: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.`,
    },
    {
      title: "8. Contact Us",
      text: `If you have any questions about this Privacy Policy, please contact us at privacy@FlimStar.com.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-red-400 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">Last updated: {currentDate}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-400 transition-all"
            >
              <h2 className="text-xl font-semibold text-red-300 mb-2">
                {policy.title}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {policy.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Privacy;
