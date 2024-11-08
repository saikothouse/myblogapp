import config from "@config/config.json";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ src }) => {
  // destructuring items from config object
  const { logo, logo_width, logo_height, logo_text, title } = config.site;

  return (
    <Link 
      href="/" 
      className="navbar-brand block transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
      aria-label={title}
    >
      {src || logo ? (
        <div className="relative flex items-center">
          <Image
            width={logo_width.replace("px", "") * 2}
            height={logo_height.replace("px", "") * 2}
            src={src ? src : logo}
            alt={title}
            priority
            className="object-contain transition-all duration-300 ease-in-out"
            style={{
              height: logo_height.replace("px", "") + "px",
              width: logo_width.replace("px", "") + "px",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
      ) : logo_text ? (
        <span className="text-2xl font-bold text-primary transition-colors hover:text-primary-dark">
          {logo_text}
        </span>
      ) : (
        <span className="text-2xl font-bold text-dark transition-colors hover:text-primary">
          {title}
        </span>
      )}
    </Link>
  );
};

export default Logo;
