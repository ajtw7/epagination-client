const Wishlist = ({ wishlist }) => {
  // // if passing down ONE property, you can name the property,
  // whereas if there are multiple, you input "props"

  return (
    <div className="profile-page-landing">
      <div id="wl-title">
        <h1>
          <u>MY WISHLIST</u>
        </h1>
      </div>
      <div className="wishlist-container">
        {wishlist &&
          wishlist.map((item) => {
            return (
              <div className="single-wishlist-item">
                <p>
                  <u>{item.bookTitle}</u>
                </p>
                <p>{item.authorName[0].name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Wishlist;
