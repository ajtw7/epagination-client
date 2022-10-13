import { useEffect, useState, useContext } from "react";
import { get } from "../authService/authService";

const Wishlist = ({ wishlist }) => {
    // if passing down ONE property, you can name the property, whereas if there are multiple, you input "props"
  const [data, setData] = useState();

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
