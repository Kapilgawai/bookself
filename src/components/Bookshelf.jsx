import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Bookshelf() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div className="bookshelf-page">
      <div className="header">
        <h1>My Bookshelf</h1>
        <Link to="/">
          <button>Search Books</button>
        </Link>
      </div>
      <div className="bookshelf">
        {bookshelf.map((book, index) => (
          <div key={index} className="book-card">
            <p><strong>Book Title:</strong> {book.title}</p>
            <p><strong>Edition Count:</strong> {book.edition_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookshelf;
