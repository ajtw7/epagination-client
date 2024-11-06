import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { fetchResults } from '../services/resultsService';

const SearchResults = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const {
    data: results,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery(
    ['results', { searchTerm: params.searchTerm }],
    fetchResults,
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, results) => {
        // results is an arr of all page data fetched thus far
        const allPages = results.flatMap((page) => page.results);
        if (lastPage.numFound > results.length) {
          return allPages.length + 1;
        }
        console.log('pages:', results);
        console.log('lastPage:', lastPage);
        return undefined;
      },
    }
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  } else if (status === 'error') {
    return <div>Error: {error.message}</div>;
  } else if (status === 'success') {
    return (
      <div className="search-results-landing">
        <h1>Search Results</h1>
        <hr />
        <div className="search-results-container">
          {results.pages.flatMap(page => page.results).map(result => (
                <div
                  className="search-results-return"
                  key={result.cover_edition_key}
                >
                  {result.cover_edition_key && (
                    <div className="individual-result" key={result.cover_edition_key}>
                      <h4>{result.title}</h4>
                      <h4>
                        {result.author_name && result.author_name.join(', ')}
                      </h4>

                      <img
                        id="book-image"
                        alt="cover not found"
                        src={`https://covers.openlibrary.org/b/id/${result.cover_i}-L.jpg`}
                      />
                      <Link
                        to={`/book-details/${result.key.slice(7)}/${
                          result.cover_edition_key
                        }`}
                      >
                        Details
                      </Link>
                    </div>
                  )}
                </div>
              ))}

          <div>
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 1}
            >
              Previous Page
            </button>
            <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SearchResults;

// init gh pull request -> refact001
