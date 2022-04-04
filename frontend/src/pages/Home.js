import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  let history = useHistory();
  const { authState } = useContext(AuthContext);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3002/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const deletePost = (id) => {
    axios.delete(
      `http://localhost:3002/posts/${id}`,
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    ).then(() => {
      window.location.reload(false);
    })
  };

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3002/like",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };
  

  
  return (
    <div className="postDisplay">
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="postCard">
            <div className="headerCard">
              <div className="title">{value.title}</div>
              {(authState.username === value.username || authState.role === "roleAdmin" ) &&  (
                  <DeleteForeverIcon className="delModBtn"
                  onClick={() => {
                    deletePost(value.id);
                  }}
                />

            )}
            </div>
            <div
              className="bodyCard pointer"
              onClick={() => history.push(`/post/${value.id}`)}
            >
              {value.postText}
            </div>
            <div className="footerCard">
              <div className="username">
                <Link
                  className="noDecoration colorText"
                  to={`/profile/${value.UserId}`}
                >
                  {" "}
                  {value.username}{" "}
                </Link>
              </div>
              <div className="likeContainer">
                <div className="likeBtnContainer">
                  <ThumbUpAltIcon
                    className={
                      likedPosts.includes(value.id) ? "unlikeBtn" : "likeBtn"
                    }
                    onClick={() => {
                      likeAPost(value.id);
                    }}
                  />
                </div>

                <label className="likeCount">{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
