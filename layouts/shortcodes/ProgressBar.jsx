const ProgressBar = ({ progress }) => {
  return (
    <div className="bg-gray-200 rounded-full w-full h-4">
      <div 
        className="bg-primary h-full rounded-full" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
