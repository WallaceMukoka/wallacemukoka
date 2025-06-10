import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/walle.png"
                alt="Wallace Mukoka Logo"
                className="h-12 w-auto mr-3"
              />
              <h2 className="text-xl font-bold text-white">Wallace Mukoka</h2>
            </div>
            <p className="mb-4 text-gray-400">
              Agronomist & Author passionate about educating people on agriculture and personal development.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100069923168873&mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com/wallacemukoka?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/wallace-mukoka-2635b5182?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/wallamrfresh_king"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-400 hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-gray-400 hover:text-white transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <a href="tel:+263774707637" className="hover:text-white transition-colors">+263 77 470 7637</a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <a href="tel:+263771708658" className="hover:text-white transition-colors">+263 77 170 8658</a>
              </li>
              <li>Email: wallace.mw14@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wallace Mukoka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 