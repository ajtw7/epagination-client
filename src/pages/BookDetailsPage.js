import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { useParams } from "react-router-dom";
import { post } from "../authService/authService";

import xtype from "xtypejs";

const BookDetailsPage = () => {
  const { message, setMessage } = useContext(AuthContext);

  const [book, setBook] = useState({});
  const [work, setWork] = useState({});

  const params = useParams();

  const addToWishlist = (e) => {
    e.preventDefault();
    post("/wishlist/addToWishlist", {
      bookTitle: work.title,
      authorName: book.authors,
      bookId: params.book,
    });
    setMessage(`${work.title} has been added to your Wishlist.`);
  };

  const addToRead = () => {
    post("/finishedBooks/addToReadList", {
      bookTitle: work.title,
      authorName: book.authors,
      bookId: params.book,
    });
    setMessage(`${work.title} has been added to your list of finished books.`);
  };

  useEffect(() => {
    fetch(
      `https://openlibrary.org/api/books?bibkeys=OLID:${params.book}&jscmd=data&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(Object.values(data)[0], "DATA");
        setBook(Object.values(data)[0]);
      })
      .catch((err) => console.log(err));

    fetch(`https://openlibrary.org/works/${params.work}.json`)
      .then((res) => res.json())
      .then((info) => {
        console.log(info, "info");
        setWork(info);
      })
      .catch((err) => console.log(err));
  }, []);

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
        {/* <h6>book link</h6>
      <h3>author</h3>
      <h5>isbn</h5>
      <p>number_of_pages_median</p>
      <p>details.description</p>
      <h6>subjects</h6> */}

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
            {xtype.type(work.description) === "string" ? (
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
        {/* {message && <p>{message}</p>} */}
      </div>
    </div>
  );
};

export default BookDetailsPage;
