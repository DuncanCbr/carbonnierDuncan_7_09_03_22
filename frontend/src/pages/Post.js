import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [inpTitle, setInpTitle] = useState("");
  const [inpText, setInpText] = useState("");
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:3002/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3002/comments/${id}`).then((response) => {
      setComments(response.data);
    });
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

  const editPost = () => {
    let newTitle = inpTitle;
    let newText = inpText;
    axios
      .put(
        "http://localhost:3002/posts/editPost",
        {
          newTitle: newTitle,
          newText: newText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        setPostObject({ ...postObject, title: newTitle, postText: newText });
        document.getElementById("modal").style.display = "none";
      });
  };
  return (
    <div className="postPage">
      <div id="modal" className="modalForm">
      <CloseIcon className="closeModal" onClick={() => {document.getElementById("modal").style.display = "none";}}/>
        <div className="modalInput">
          <label htmlFor="title"> titre</label>
          <input
            name="title"
            className="field"
            placeholder={postObject.title}
            onChange={(e) => {
              setInpTitle(e.target.value);
            }}
          />
        </div>
        <div className="modalInput">
          <label htmlFor="text"> Texte</label>
          <input
            name="text"
            className="field"
            placeholder={postObject.postText}
            onChange={(e) => {
              setInpText(e.target.value);
            }}
          />
        </div>
        <div>
          <input type="file" className="marginFile"></input>
        </div>
        <button className="validModifBtn" onClick={editPost}>
          Valider
        </button>
      </div>
      <div className="leftside">
        <div className="postCard">
          <div className="headerCard">
            <div className="title">{postObject.title}</div>
            {(authState.username === postObject.username) &&
            <EditIcon
              className="delModBtn pointer"
              onClick={() => {
                if (authState.username === postObject.username) {
                  document.getElementById("modal").style.display = "flex";
                }
              }}
            />
                  
                }
          </div>
          <div className="bodyCard">{postObject.postText}</div>
          <div className="footerCard">
            <div className="username">{postObject.username}</div>
            {(authState.username === postObject.username ||
              authState.role === "roleAdmin") && (
              <button
                className="dltBtn pointer"
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                effacer
              </button>
            )}
          </div>
        </div>
      </div>
      <div><div className="borderPost"></div></div>
      <div className="rightside">
        <div><h1>Les Commentaires</h1></div>
        <div className="listOfComments">
          {comments.map((comment, index) => {
            return (
              <div key={index} className="comment">
                <div className="commentBody">{comment.commentBody}</div>
                <div className="commentFooter">
                  <label className="ml20">{comment.username}</label>
                  {authState.username === comment.username && (
                    <button className="mr20"
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    >
                      effacer
                    </button>
                  )}
                </div>
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
            placeholder="commentaire..."
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          ></input>
          <button className="btnAddComment pointer" onClick={addComment}>
            ajouter un commentaire
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
