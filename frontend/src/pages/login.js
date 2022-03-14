import React, {useState} from "react";
import axios from 'axios';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:3002/auth/login", data).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <div>
      <input type="text" onChange={(event) => {setUsername(event.target.value)}}></input>
      <input type="password" onChange={(event) => {setPassword(event.target.value)}}></input>
      <button onClick={Login}>Login</button>
    </div>
  )
}

export default Login