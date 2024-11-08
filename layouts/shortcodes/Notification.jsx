const Notification = ({ message, type = "info" }) => {
  const notificationStyles = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${notificationStyles[type]}`}>
      {message}
    </div>
  );
};

export default Notification;
