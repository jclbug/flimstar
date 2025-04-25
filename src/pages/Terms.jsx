function Terms() {
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const terms = [
    {
      title: "1. Acceptance of Terms",
      text: `By accessing or using FlimStar, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.`,
    },
    {
      title: "2. Description of Service",
      text: `FlimStar provides information about movies and TV shows, including details, ratings, and trailers. We use data from The Movie Database (TMDB) and other sources to provide this information.`,
    },
    {
      title: "3. User Conduct",
      text: `You agree not to use FlimStar for any unlawful purpose or in any way that could damage, disable, or impair the service. You also agree not to attempt to gain unauthorized access to any part of the service.`,
    },
    {
      title: "4. Intellectual Property",
      text: `All content on FlimStar, including text, graphics, logos, and software, is the property of FlimStar or its content suppliers and is protected by copyright laws.`,
    },
    {
      title: "5. Disclaimer of Warranties",
      text: `FlimStar is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be error-free or uninterrupted.`,
    },
    {
      title: "6. Limitation of Liability",
      text: `FlimStar shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.`,
    },
    {
      title: "7. Changes to Terms",
      text: `We reserve the right to modify these Terms of Service at any time. Your continued use of FlimStar after such changes constitutes your acceptance of the new terms.`,
    },
    {
      title: "8. Governing Law",
      text: `These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-red-400 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400">Last updated: {currentDate}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
          {terms.map((term, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-400 transition-all"
            >
              <h2 className="text-xl font-semibold text-red-300 mb-2">
                {term.title}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {term.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Terms;
