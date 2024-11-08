const Tooltip = ({ text, children, position = "top" }) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div 
        className={`
          absolute z-10 p-2 bg-black text-white text-xs 
          rounded-md opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 
          ${positionClasses[position]}
        `}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
