import React from 'react';

const BookCard = ({ book, onAdd }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Edition Count: {book.edition_count}</p>
      <button onClick={() => onAdd(book)}>Add to Bookshelf</button>
    </div>
  );
};

export default BookCard;
