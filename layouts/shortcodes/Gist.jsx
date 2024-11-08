const Gist = ({ id, file }) => {
  const gistUrl = file 
    ? `https://gist.github.com/${id}.js?file=${file}` 
    : `https://gist.github.com/${id}.js`;

  return (
    <div className="gist-embed my-4">
      <script 
        src={gistUrl} 
        type="text/javascript"
      />
    </div>
  );
};

export default Gist;
