import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../contexts/auth.context';
import { useParams } from 'react-router-dom';
import { post } from '../authService/authService';
import { fetchBook } from '../services/bookService';
import { fetchWork } from '../services/workService';

import xtype from 'xtypejs';

const BookDetailsPage = () => {
  const { message, setMessage } = useContext(AuthContext);
  const params = useParams();

  /* Query to fetch the specific book */
  const {
    data: book,
    isLoading: bookLoading,
    isError: bookError,
    error: bookFetchError,
  } = useQuery(['book', params.book], () => fetchBook(params.book));

  /* Query to fetch the specific work. This is the same as the book query, but with a different key and function */
  const {
    data: work,
    isLoading: workLoading,
    isError: workError,
    error: workFetchError,
  } = useQuery(['work', params.work], () => fetchWork(params.work));

  if (bookLoading || workLoading) {
    return <div>Loading...</div>;
  }

  if (bookError || workError) {
    return (
      <div>Error: {bookFetchError?.message || workFetchError?.message}</div>
    );
  }

  const addToWishlist = (e) => {
    e.preventDefault();
    post('/wishlist/addToWishlist', {
      bookTitle: work.title,
      authorName: book.authors,
      bookId: params.book,
    });
    setMessage(`${work.title} has been added to your Wishlist.`);
  };

  const addToRead = () => {
    post('/finishedBooks/addToReadList', {
      bookTitle: work.title,
      authorName: book.authors,
      bookId: params.book,
    });
    setMessage(`${work.title} has been added to your list of finished books.`);
  };

  return (
    <div className="books-details-landing">
      <div className="book-details-container">
        <h1>{work.title}</h1>
        <div>
          <img
            src={`https://covers.openlibrary.org/b/id/${work.covers}-M.jpg`}
            alt="preview of book"
          ></img>
        </div>
        <div className="authors-group">
          {book.authors &&
            book.authors.map((author) => {
              return (
                <div>
                  <h4>Written by: {author.name}</h4>
                </div>
              );
            })}
        </div>
        {work.description && (
          <div>
            {xtype.type(work.description) === 'string' ? (
              <p>{work.description}</p>
            ) : (
              <p>{work.description.value}</p>
            )}
          </div>
        )}
        <div className="btn-group">
          <button onClick={addToWishlist}>Wishlist</button>
          <button onClick={addToRead}>Already Read </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
