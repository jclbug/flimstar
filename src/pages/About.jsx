import { Film } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <Film className="h-12 w-12 text-red-600 mr-4" />
          <h1 className="text-5xl font-bold">About FlimStar</h1>
        </div>

        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              At FlimStar, our mission is to connect movie enthusiasts with the
              films and TV shows they love. We believe that great stories have
              the power to inspire, entertain, and bring people together. Our
              platform is designed to help you discover new content, learn more
              about your favorites, and share your passion with others.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-red-500">
                  Comprehensive Database
                </h3>
                <p className="text-gray-300">
                  Access information on thousands of movies and TV shows,
                  including details, ratings, cast information, and trailers.
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-red-500">
                  Latest Updates
                </h3>
                <p className="text-gray-300">
                  Stay informed about the newest releases, trending content, and
                  upcoming titles in the world of entertainment.
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-red-500">
                  User-Friendly Interface
                </h3>
                <p className="text-gray-300">
                  Enjoy a seamless browsing experience with our intuitive design
                  and responsive layout.
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-red-500">
                  Personalized Recommendations
                </h3>
                <p className="text-gray-300">
                  Discover new content tailored to your preferences and viewing
                  history.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              FlimStar was founded in 2023 by a group of film enthusiasts who
              wanted to create a better way to explore and engage with movies
              and TV shows. What started as a small project has grown into a
              platform used by thousands of people around the world.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We're constantly working to improve FlimStar and add new features
              that enhance your experience. Our team is passionate about cinema
              and dedicated to building the best possible resource for movie
              lovers everywhere.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Data Sources</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              FlimStar uses data from The Movie Database (TMDB) and other
              trusted sources to provide accurate and up-to-date information.
              We're grateful to these organizations for making their data
              available and helping us create a comprehensive resource for our
              users.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
