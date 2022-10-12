import "./App.css";
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth.context";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import DeleteUser from "./pages/DeleteUser";

import SearchResults from "./pages/SearchResults";
import BookDetailsPage from "./pages/BookDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => {
  const { isLoading, message } = useContext(AuthContext);
  let token = localStorage.getItem("authToken");
  const LoggedIn = () => {
    return token ? <Outlet /> : <Navigate to="/" />;
  };
  const NotLoggedIn = () => {
    return !token ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<LoggedIn />}>
          <Route path="/delete-user" element={<DeleteUser />} />
        </Route>

        <Route element={<NotLoggedIn />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/search/:searchTerm" element={<SearchResults />} />
        <Route path="/book-details/:work/:book" element={<BookDetailsPage />} />
        <Route path="/author-details" element={<AuthorDetailsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
      {message && <p>{message}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
export default App;
