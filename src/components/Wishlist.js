
const Wishlist = ({ wishlist }) => {
  // // if passing down ONE property, you can name the property, 
  // whereas if there are multiple, you input "props"


  return (
    <div>
      {wishlist &&
        wishlist.map((item) => {
          return <p>{item.bookTitle}</p>;
        })}
    </div>
  );
};

export default Wishlist;
