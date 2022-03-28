import react, { useState, useEffect, useContext } from "react";
import "../../css/login-register.css";
import { useNavigate } from "react-router-dom";
import api from "../../http/axios";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function RegisterReq() {
    const registerData = JSON.stringify({
      email: email,
      password: password,
      name: name,
    });

    api
      .post("/auth/register", registerData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        navigate("/login");
      });
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h3>Register</h3>
        <div>
          <input
            type="text"
            className="fadeIn first"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="fadeIn second"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="text"
            className="fadeIn third"
            placeholder="Username"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-primary mb-4 mt-4 fadeIn fourth"
          onClick={() => RegisterReq()}
        >
          Register
        </button>
        <div id="formFooter">
          <a className="underlineHover" href="/login">
            Already got an account? Login!
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
