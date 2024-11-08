import { 
  IoInformationCircle, 
  IoWarning, 
  IoCheckmarkCircle, 
  IoCloseCircle 
} from 'react-icons/io5';

const Alert = ({ type = "info", children }) => {
  const alertStyles = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-800",
      icon: <IoInformationCircle className="text-blue-500" />
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      text: "text-yellow-800",
      icon: <IoWarning className="text-yellow-500" />
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-800",
      icon: <IoCheckmarkCircle className="text-green-500" />
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-800",
      icon: <IoCloseCircle className="text-red-500" />
    }
  };

  const { bg, border, text, icon } = alertStyles[type];

  return (
    <div 
      className={`
        flex items-center p-4 mb-4 rounded-lg border 
        ${bg} ${border} ${text}
      `}
      role="alert"
    >
      <div className="mr-4">{icon}</div>
      <div>{children}</div>
    </div>
  );
};

export default Alert;
