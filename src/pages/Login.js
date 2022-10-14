import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { post } from "../authService/authService";
import Username from "../components/Username";
import Password from "../components/Password";
const Login = () => {
  const { authenticateUser, setIsLoading, setMessage } =
    useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const submit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    post("/users/login", {
      username: username,
      password: password,
    })
      .then((results) => {
        localStorage.setItem("authToken", results.data.token);
        localStorage.setItem("id", results.data.id);
        console.log(results.data.message, "LOGIN MESSAGE")
        setMessage(results.data.message);
        navigate("/");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        console.log("Something went wrong", err.message);
        setIsLoading(false);
      })
      .finally(() => {
        authenticateUser();
      });
  };
  return (
    <div className="home-landing">
      <div className="home-container">
      <h1>Welcome to ePagination Digital Library</h1>
        <form onSubmit={submit}>
          <div className="login-box">
            <Username setUsername={setUsername} />
            <Password setPassword={setPassword} />
          <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
