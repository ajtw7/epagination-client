import { useState } from "react";
import SearchResults from "./SearchResults";
import { useNavigate} from "react-router-dom";
import Search from "../components/Search";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const searchSubmit = (event) => {
    console.log("button clicked");
    event.preventDefault();
    navigate(`/search/${searchTerm}`)
    
  };

  return (
    <div className="home-landing">
      <div className="home-container">
        <h1 className="home-text">Welcome to ePagination Digital Library</h1>
          
        <form onSubmit={searchSubmit}>
          <Search setSearchTerm={setSearchTerm}/>
          {/* <label>Search</label>
          <input
            name="search"
            placeholder="Search for a title here"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input> */}
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
              /* <div>
                <SearchResults 
                  title={result.title}
                  author={result.author}
                   />
              </div> */
          

            );
          })}
      </div>
    </div>
  );
};

export default Home;

