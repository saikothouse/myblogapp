import config from "@config/config.json";
import {
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoTwitter,
  IoShareSocialOutline
} from "react-icons/io5";

const socialPlatforms = [
  {
    name: 'facebook',
    icon: IoLogoFacebook,
    color: 'text-[#3b5998] hover:bg-[#3b5998]',
    shareUrl: (base_url, slug, title) => 
      `https://facebook.com/sharer/sharer.php?u=${base_url}/${slug}`
  },
  {
    name: 'twitter',
    icon: IoLogoTwitter,
    color: 'text-[#1da1f2] hover:bg-[#1da1f2]',
    shareUrl: (base_url, slug, title) => 
      `https://twitter.com/intent/tweet/?text=${title}&amp;url=${base_url}/${slug}`
  },
  {
    name: 'linkedin',
    icon: IoLogoLinkedin,
    color: 'text-[#0077b5] hover:bg-[#0077b5]',
    shareUrl: (base_url, slug, title, description) => 
      `https://www.linkedin.com/shareArticle?mini=true&url=${base_url}/${slug}&title=${title}&summary=${description}&source=${base_url}`
  },
  {
    name: 'pinterest',
    icon: IoLogoPinterest,
    color: 'text-[#cb2027] hover:bg-[#cb2027]',
    shareUrl: (base_url, slug, title, description) => 
      `https://pinterest.com/pin/create/button/?url=${base_url}/${slug}&media=&description=${description}`
  }
];

const Share = ({ title, description, slug, className }) => {
  const { base_url } = config.site;

  const handleShare = (platform) => {
    const shareUrl = platform.shareUrl(base_url, slug, title, description);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center space-x-2 bg-theme-light/50 rounded-full p-1 pr-3">
        <span className="flex items-center text-dark/70 text-sm">
          <IoShareSocialOutline className="mr-2" /> Share
        </span>
        <ul className="flex items-center space-x-2">
          {socialPlatforms.map((platform) => {
            const PlatformIcon = platform.icon;
            return (
              <li 
                key={platform.name}
                className="group"
              >
                <button
                  onClick={() => handleShare(platform)}
                  aria-label={`${platform.name} share button`}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center 
                    transition-all duration-300 ease-in-out
                    ${platform.color}
                    hover:text-white
                    focus:outline-none focus:ring-2 focus:ring-opacity-50
                    transform hover:scale-110 active:scale-95
                  `}
                >
                  <PlatformIcon className="text-lg" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Share;
