const Quote = ({ text, author }) => {
  return (
    <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 my-4">
      <p>{text}</p>
      {author && <cite className="block mt-2 text-right">— {author}</cite>}
    </blockquote>
  );
};

export default Quote;
