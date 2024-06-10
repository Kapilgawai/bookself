import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
function SearchPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(`https://openlibrary.org/search.json?q=lord+of+the+rings&limit=10&page=1`);
      setBooks(response.data.docs);
    };
    fetchBooks();
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const handleSearch = async (e) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length > 2) {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${q}&limit=10&page=1`);
      setBooks(response.data.docs);
    } else {
      const response = await axios.get(`https://openlibrary.org/search.json?q=lord+of+the+rings&limit=10&page=1`);
      setBooks(response.data.docs);
    }
  };

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  const isBookInBookshelf = (book) => {
    return bookshelf.some((b) => b.key === book.key);
  };

  return (
    <div className="search-page">
      <div className="header">
        <h1>Search by book name:</h1>
        <Link to="/bookshelf">
          <button>My Bookshelf</button>
        </Link>
      </div>
      <input type="text" value={query} onChange={handleSearch} placeholder="Search for books..." />
      <div className="results">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <p><strong>Book Title:</strong> {book.title}</p>
            <p><strong>Edition Count:</strong> {book.edition_count}</p>
            {!isBookInBookshelf(book) && (
              <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
