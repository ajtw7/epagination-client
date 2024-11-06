// import { useEffect, useState, useContext } from 'react';
import useFetchUserProfile from '../services/fetchUserProfile';
import Wishlist from '../components/Wishlist';
import FinishedBooks from '../components/FinishedBooks';

const UserProfilePage = () => {
  const { profileInfo, error, isLoading } = useFetchUserProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
