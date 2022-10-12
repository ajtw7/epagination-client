import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState([]);

  const params = useParams();

  // const location = useLocation();
  // console.log(props)
  useEffect(() => {
   
    fetch(`https://openlibrary.org/search.json?title=${params.searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "DATA");
          // console.log(data.docs);
          setResults(data.docs);
        })
        // .then(json => setSearchResults(json))
        .catch((err) => console.log(err));

  }, []);

  return (
    <div>
      {results &&
        results.map((result) => {
          return (
            <div>
            {result.cover_edition_key && 
                  <div>
                    <h3>{result.title}</h3>
                    <h4>{result.author_name && result.author_name.join(', ')}</h4>
                    <img alt='cover not found' src={`https://covers.openlibrary.org/b/id/${result.cover_i}-L.jpg`}/>
                    <Link to={`/book-details/${result.key.slice(7)}/${result.cover_edition_key}`}>Details</Link>
                  </div>
                }

              <h5>{result.isbn && result.isbn[0]}</h5>
              <p>{result.number_of_pages_median}</p>
              <ul>
                  <h6>{result.subject && result.subject[0]}</h6>
                  <h6>{result.subject && result.subject[1]}</h6>
                  <h6>{result.subject && result.subject[2]}</h6>
              </ul>

            </div>
          );
        })}
    </div>
  );
};

export default SearchResults;
