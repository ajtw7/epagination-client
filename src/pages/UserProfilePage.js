import { useEffect, useState, useContext } from "react";
import { get } from "../authService/authService";
import Wishlist from "../components/Wishlist";
import FinishedBooks from "../components/FinishedBooks";

const UserProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    get("/users/profile").then((res) => {
      console.log(res.data[0], "RESPONSE");
      setProfileInfo(res.data[0]);
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
        <FinishedBooks finishedBook={profileInfo.finishedBooks} />
      </div>
    </div>
  );
};

export default UserProfilePage;
