import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:3002/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3002/comments/${id}`).then((response) => {
      setComments(response.data);
    });
    console.log(authState);
  }, [authState.status]);

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3002/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const addComment = () => {
    axios
      .post(
        "http://localhost:3002/comments",
        { commentBody: newComment, PostId: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3002/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/");
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter new title:");
      axios.put("http://localhost:3002/posts/title", {
        newTitle: newTitle,
        id: id,
      },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
      );

      setPostObject({...postObject, title: newTitle})
    } else {
      let newPostText = prompt("Enter new post:");
      axios.put("http://localhost:3002/posts/postText", {
        newText: newPostText,
        id: id,
      },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
      );
      setPostObject({...postObject, postText: newPostText})
    }

  };
  return (
    <div className="postPage">
      <div className="leftside">
        <div className="cardPost">
          <div
            className="postHeader"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}
          >
            <div className="username">{postObject.username}</div>
            <div className="title">{postObject.title}</div>
            {(authState.username === postObject.username || authState.role === "roleAdmin" ) &&  (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                delete post
              </button>
            )}
          </div>
          <div
            className="postBody"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("body");
              }
            }}
          >
            {postObject.postText}
          </div>
        </div>
      </div>
      <div className="rightside">
        <div className="listOfComments">
          {comments.map((comment, index) => {
            return (
              <div key={index} className="comment">
                {comment.commentBody}
                <label> Username : {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    DELETE
                  </button>
                )}
              </div>
            );
          })}
          ;
        </div>
        <div className="addCommentContainer">
          <input
            className="inputComment"
            value={newComment}
            type="text"
            placeholder="comment..."
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          ></input>
          <button className="btnAddComment" onClick={addComment}>
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
