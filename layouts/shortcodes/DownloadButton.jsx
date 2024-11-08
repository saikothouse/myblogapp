import { IoDownload } from 'react-icons/io5';

const DownloadButton = ({ 
  href, 
  text = "Download", 
  size = "medium", 
  variant = "primary" 
}) => {
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg"
  };

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white"
  };

  return (
    <a
      href={href}
      download
      className={`
        inline-flex items-center justify-center rounded-lg 
        transition duration-300 ease-in-out transform 
        hover:scale-105 focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-primary
        ${sizeClasses[size]}
        ${variantClasses[variant]}
      `}
    >
      <IoDownload className="mr-2" />
      {text}
    </a>
  );
};

export default DownloadButton;
