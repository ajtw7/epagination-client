import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const searchSubmit = (event) => {
    console.log("button clicked");
    event.preventDefault();
    fetch(`https://openlibrary.org/search.json?title=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.docs);
        setSearchResults(data.docs);
      })
      // .then(json => setSearchResults(json))
      .catch((err) => console.log(err));
  };

  return (
    <div className="home-landing">
      <div className="home-container">
        <h1 className="home-text">Welcome to Le Shell!</h1>

        <form onSubmit={searchSubmit}>
          <label>Search</label>
          <input
            name="search"
            placeholder="Search for a title here"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </form>

        {searchResults &&
          searchResults.map((result) => {
            return (
              <div key={result.key}>
                {result.author_name && (
                  <div>
                    <h2>{result.title}</h2>
                    <h4>{result.author_name}</h4>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
