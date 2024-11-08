const YouTube = ({ id, title = "YouTube Video", width = "100%", height = "400px" }) => {
  return (
    <div className="youtube-embed my-4 mx-auto max-w-3xl" style={{ width }}>
      <div className="aspect-w-16 aspect-h-9 shadow-lg rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default YouTube;
