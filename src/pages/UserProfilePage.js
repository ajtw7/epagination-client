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
      <h1>Welcome, {profileInfo.username}</h1>
      <p>The email associated to your account is: {profileInfo.email}</p>
      <hr />
      <div>
        <Wishlist wishlist={profileInfo.wishlist} />
      </div>
      <div>
        <FinishedBooks finishedBook={profileInfo.finishedBooks} />
      </div>
    </div>
  );
};

export default UserProfilePage;
