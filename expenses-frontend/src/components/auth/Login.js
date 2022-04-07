import { useState, useEffect } from "react";
import "../../css/login-register.css";
import { useNavigate } from "react-router-dom";
import api from "../../http/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      navigate("/expenses");
    }
  });

  function LoginReq() {
    const loginData = JSON.stringify({ email: email, password: password });
    api
      .post("/auth/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
      })
      .then(() => {
        navigate("/expenses");
      });
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h3>Login</h3>
        <div>
          <input
            type="text"
            id="login"
            className="fadeIn first"
            name="login"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            className="fadeIn second"
            name="login"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-primary mb-4 mt-4"
          onClick={() => LoginReq()}
        >
          Login
        </button>
        <div id="formFooter">
          <a className="underlineHover" href="/register">
            Haven't got an account yet? Register!
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
