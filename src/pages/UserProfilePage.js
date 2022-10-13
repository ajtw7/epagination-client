import { useEffect, useState, useContext } from "react";
import Wishlist from "../components/Wishlist";
import { get } from "../authService/authService";

// import { AuthContext } from "../contexts/auth.context";
// import { useParams } from "react-router-dom";

const UserProfilePage = () => {

  const [profileInfo, setProfileInfo] = useState({})
  // const {wishlist, setWishList} = useState([])
  // const {readlist, setReadList} = useState([])


  useEffect(() => {
    get("/users/profile").then((res) => {
      console.log(res.data[0], "RESPONSE");
      setProfileInfo(res.data[0])
    });
  }, []);

  return (
    <div>
      <h1>Welcome User</h1>
      <hr />
      <h3>Email Address</h3>
      <p>{profileInfo.email}</p>
      <div>
        <h3>
          <u>Wishlist</u>
        </h3>
        <Wishlist wishlist={profileInfo.wishlist} />
      </div>
      <div>
        <h3>
          <u>Finished Books</u>
        </h3>
        <img src="" alt="finishedBook_id" />
        <img src="" alt="finishedBook_id" />
        <img src="" alt="finishedBook_id" />
      </div>
    </div>
  );
};

export default UserProfilePage;
