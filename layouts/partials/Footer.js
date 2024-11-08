import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { 
  IoLogoGithub, 
  IoMail, 
  IoLocationSharp 
} from "react-icons/io5";

const Footer = () => {
  const { copyright } = config.params;
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="
        bg-gradient-to-br 
        from-gray-900 
        to-primary/90 
        text-white 
        py-12 
        transition-all 
        duration-300
      "
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Bookworm Blog
            </h3>
            <p className="text-gray-300 mb-4">
              Sharing inspiring stories, insights, and knowledge through our blog.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <IoMail className="text-primary" />
                <span>contact@bookworm.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <IoLocationSharp className="text-primary" />
                <span>123 Blog Street, Internet City</span>
              </div>
            </div>
          </div>

          {/* Footer Menu */}
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {menu.footer.map((menuItem) => (
                <li key={menuItem.name}>
                  <Link 
                    href={menuItem.url} 
                    className="
                      text-gray-300 
                      hover:text-white 
                      hover:translate-x-1 
                      transition-all 
                      inline-block
                    "
                  >
                    {menuItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social and Newsletter */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-semibold mb-4 text-white">
              Stay Connected
            </h4>
            
            {/* Social Icons */}
            <Social 
              source={social} 
              className="
                flex justify-center md:justify-end 
                space-x-4 
                mb-6
              " 
            />

            {/* Newsletter Signup */}
            <div className="bg-white/10 rounded-lg p-4">
              <h5 className="text-lg font-medium mb-3 text-white">
                Subscribe to Our Newsletter
              </h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="
                    w-full 
                    px-3 py-2 
                    rounded-l-lg 
                    bg-white/20 
                    text-white 
                    placeholder-gray-300 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-primary
                  "
                />
                <button 
                  className="
                    bg-primary 
                    text-white 
                    px-4 py-2 
                    rounded-r-lg 
                    hover:bg-primary-dark 
                    transition-colors
                  "
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="
            mt-8 
            pt-6 
            border-t 
            border-white/10 
            text-center 
            flex 
            flex-col 
            md:flex-row 
            justify-between 
            items-center
          "
        >
          {/* Copyright */}
          <div className="text-gray-300 mb-2 md:mb-0">
            {markdownify(
              `© ${currentYear} Bookworm Blog. All Rights Reserved.`, 
              "p", 
              "text-sm"
            )}
          </div>

          {/* Additional Links */}
          <div className="flex space-x-4 justify-center">
            <Link 
              href="/privacy-policy" 
              className="text-gray-300 hover:text-white text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-300 hover:text-white text-sm"
            >
              Terms of Service
            </Link>
          </div>

          {/* Developer Link */}
          <div className="flex items-center justify-center mt-2 md:mt-0">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="
                flex items-center 
                text-gray-300 
                hover:text-white 
                text-sm 
                space-x-2
              "
            >
              <IoLogoGithub className="text-lg" />
              <span>Made with ❤️ by Your Name</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
