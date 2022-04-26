import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
function Profile() {
let history = useHistory();
let { id } = useParams();
const [profileInfo, setProfileInfo] = useState("");
const [listOfPosts, setListOfPosts] = useState([]);
const { authState } = useContext(AuthContext);
useEffect(() => {
axios.get(`http://localhost:3002/auth/basicinfo/${id}`).then((response) => {
setProfileInfo(response.data);
});
axios.get(`http://localhost:3002/posts/byuserId/${id}`).then((response) => {
setListOfPosts(response.data);
});
}, []);
const deleteUser = (id) => {
axios
.delete(`http://localhost:3002/auth/deleteaccount/${id}`, {
headers: { accessToken: localStorage.getItem("accessToken") },
})
.then(() => {
if (authState.role === "roleAdmin") {
history.push("/");
} else {
localStorage.removeItem("accessToken");
document.location.href = "/login";
}
});
};
return (
<div className="profilePageContainer">
<div className="basicInfo">
{""}
<p> <span className="bold">Nom d'utilisateur</span>: {profileInfo.username}</p>
<div className="info">
<div className="infoContainerText">
<div className="m16"> <span className="bold">TÃ©lÃ©phone</span>: {profileInfo.phone}</div>
<div className="m16"> <span className="bold">email</span>: {profileInfo.email}</div>
</div>
<div className="infoContainerBtn">
{(authState.username === profileInfo.username ||
authState.role === "roleAdmin") && (
<div className="m16">
<button onClick={()=> {
history.push("/ChangePassword");
}}
>
{" "}
changer de mots de passe
</button>
</div>
)}
{(authState.username === profileInfo.username ||
authState.role === "roleAdmin") && (
<div className="btnDeleteContainer m16">
<button className="btnDelete " onClick={()=> {
deleteUser(id);
}}
>
{" "}
effacer le compte
</button>
</div>
)}
</div>
</div>
</div>
<div className="postContainer">
<h1> <b>{authState.username === profileInfo.username ? "Vos postes :" : `Les postes de ${profileInfo.username} : ` }</b> </h1>
<div className="listOfPost">
{listOfPosts.map((value, key) => {
return (
<div key={key} className="postCard">
<div className="headerCard">
<div className="title">{value.title}</div>
</div>
<div className="bodyCard pointer" onClick={()=> history.push(`/post/${value.id}`)}
>
{value.image && (
<div className="imgPostContainer">
<img src={`http://localhost:3002/${value.image}`} className="imgPost" />
</div>
)}
<div className="textCard">
<p>{value.postText}</p>
</div>
</div>
<div className="footerCard">
<div className="username">{value.username}</div>
<div className="likeContainer">{value.Likes.length}</div>
</div>
</div>
);
})}
</div>
</div>
</div>
);
}
export default Profile;