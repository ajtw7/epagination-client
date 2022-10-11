import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {

  const [results, setResults] = useState([]);
  
  const params = useParams()

    // const location = useLocation();
    // console.log(props)
    useEffect(() => {
    
      const fetchResults = async () => {
        await fetch(`https://openlibrary.org/search.json?title=${params}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "DATA")
            console.log(data.docs);
            setResults(data.docs);
        })
        // .then(json => setSearchResults(json))
        .catch((err) => console.log(err));}

        fetchResults();

        // const getImages = async () => {
        //   results.forEach()
        // }
        

    })


  return (
    <div>
        { results && results.map((result) => {
            return (
              <div>
                <h1>{result.author_name}</h1>
              </div>
            );
          })}
    
    </div>
    
    )
};

export default SearchResults;
