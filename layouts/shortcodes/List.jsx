const List = ({ items, ordered = false }) => {
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <ListTag className="list-disc list-inside my-4">
      {items.map((item, index) => (
        <li key={index} className="mb-2">{item}</li>
      ))}
    </ListTag>
  );
};

export default List;
