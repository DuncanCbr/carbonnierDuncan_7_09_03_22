import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const Login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:3002/auth/login", data).then((response) => {
      if(response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
        history.push('/');
      }
    });
  };
  return (
    <div className="loginForm column">
      <label className="column"> Username
      <input className="loginInput" type="text" onChange={(event) => {setUsername(event.target.value)}}></input>
      </label>
      <label className="column"> Password
      <input  className="loginInput" type="password" onChange={(event) => {setPassword(event.target.value)}}></input>
      </label>
      <button className="loginButton" onClick={Login}>Login</button>
    </div>
  )
}

export default Login