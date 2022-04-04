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
        <p> Username: {profileInfo.username}</p>
        <div className="infoContainerA">
          <div className="infoContainerB">
            <p> phone: {profileInfo.phone}</p>
            <button
              onClick={() => {
                history.push("/ChangePassword");
              }}
            >
              {" "}
              change my Password
            </button>
          </div>

          {(authState.username === profileInfo.username ||
            authState.role === "roleAdmin") && (
            <div className="infoContainerB">
              <p> email: {profileInfo.email}</p>
              <button
                onClick={() => {
                  deleteUser(id);
                }}
              >
                {" "}
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="postContainer">
        <h1>Your Posts : </h1>
        <div className="listOfPost">
          {listOfPosts.map((value, key) => {
            return (
              <div key={key} className="postCard">
                <div className="headerCard">
                  <div className="title">{value.title}</div>
                </div>
                <div
                  className="bodyCard pointer"
                  onClick={() => history.push(`/post/${value.id}`)}
                >
                  {value.postText}
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
