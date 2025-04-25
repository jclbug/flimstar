import { Link } from "react-router-dom";
import { Film, Github, Twitter, Instagram } from "lucide-react";

function Footer() {
  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 878, name: "Sci-Fi" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Film className="h-6 w-6 text-red-600" />
              <span className="font-bold text-xl text-white">FlimStar</span>
            </Link>
            <p className="text-sm">
              Discover the latest movies and TV shows. Your ultimate
              entertainment guide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="font-medium text-white mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="hover:text-white transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="font-medium text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {genres.map((genre) => (
                <li key={genre.id}>
                  <Link
                    to={`/genre/${genre.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="font-medium text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB. All movie data and images are provided by The Movie Database
            (TMDB).
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} FlimStar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
