import React, {useState, useContext} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';
function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const {setAuthState} = useContext(AuthContext);
let history = useHistory();
const Login = () => {
const data = {username: username, password: password};
axios.post("http://localhost:3002/auth/login", data).then((response) => {
if(response.data.error) {
alert(response.data.error);
} else {
localStorage.setItem("accessToken", response.data.token);
setAuthState({username: response.data.username, id: response.data.id, role: response.data.role, status: true});
history.push('/');
}
});
};
return (
<div className="loginForm column">
<div><h1>Connectez vous !</h1></div>
<label className="column"> Nom d'utilisateur
<input className="loginInput" type="text" onChange={(event)=> {setUsername(event.target.value)}}></input>
</label>
<label className="column"> Mots de passe
<input className="loginInput" type="password" onChange={(event)=> {setPassword(event.target.value)}}></input>
</label>
<button className="loginButton pointer" onClick={Login}>Connection</button>
</div>
)
}
export default Login;