import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Logout from "../App";

function Profile() {
  let history = useHistory();
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3002/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
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
        <h1> Username: {username}</h1>
        {(authState.username === username ||
          authState.role ===
            "roleAdmin") && (
              <div>
                <button
                  onClick={() => {
                    history.push("/ChangePassword");
                  }}
                >
                  {" "}
                  change my Password
                </button>
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
      <div className="listOfPost">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post">
              <div className="postHeader">
                <div className="username">{value.username}</div>
                <div className="title">{value.title}</div>
              </div>
              <div
                className="body"
                onClick={() => history.push(`/post/${value.id}`)}
              >
                {value.postText}
                <label>{value.Likes.length}</label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
