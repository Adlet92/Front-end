import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import { UserAuth } from "../context/AuthContext";

const MainPage: React.FC = () => {
  const navigate = useNavigate()
  const auth = UserAuth();
  const user = auth && auth.user;

    const handleLogin = () => {
      if (user) {
        navigate(routes.chat);
      } else {
        navigate(routes.signin);
      }
    };

  return (
    <div className="mainPage">
      <div className="textArea">
        <h1 className="labelName">Q-1 Search</h1>
        <p className="descText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt u
        </p>
        <button onClick={handleLogin} className="loginButton">
          Login
        </button>
      </div>
    </div>
  )
}

export default MainPage
