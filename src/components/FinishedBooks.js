const FinishedBooks = ({ finishedBook }) => {
  return (
    <div className="profile-page-landing">
      <div id="fb-title">
        <h1>
          <u>MY FINISHED BOOKS</u>
        </h1>
      </div>
      <div className="finishedbooks-container">
        {finishedBook &&
          finishedBook.map((item) => {
            return (
              <div className="single-finishedbook-item">
                <p>{item.bookTitle}</p>
                <p>{item.authorName[0].name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FinishedBooks;
