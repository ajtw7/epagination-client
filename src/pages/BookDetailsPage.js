import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import xtype from "xtypejs";

const BookDetailsPage = () => {
  const [book, setBook] = useState({});
  const [work, setWork] = useState({});

  const params = useParams();

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
    <div>
      <h1>{work.title}</h1>
      <img src="" alt="preview of book"></img>
      <h6>book link</h6>
      <h3>author</h3>
      <h5>isbn</h5>
      <p>number_of_pages_median</p>
      <p>details.description</p>
      <h6>subjects</h6>
      <button>Wishlist</button>
      <button>Already Read </button>

      {book.authors &&
        book.authors.map((author) => {
          return (
            <div>
              <h4>{author.name}</h4>
            </div>
          );
        })}

      {work.description && (
        <div>
          {xtype.type(work.description) === "string" ? (
            <p>{work.description}</p>
          ) : (
            <p>{work.description.value}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
