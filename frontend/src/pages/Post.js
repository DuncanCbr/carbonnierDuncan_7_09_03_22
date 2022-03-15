import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';

function Post() {

    let {id}=useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3002/posts/byId/${id}`).then((response) => {
          setPostObject(response.data);
        });
    
        axios.get(`http://localhost:3002/comments/${id}`).then((response) => {
          setComments(response.data);
        });
      }, []);

      const addComment = () => {
        axios.post("http://localhost:3002/comments", {commentBody: newComment, PostId: id},  {headers: {accessToken: sessionStorage.getItem("accessToken")}}).then((response) => {
        if(response.data.error){
          console.log(response.data.error);
        } else {
          const commentToAdd = {commentBody: newComment}
          setComments([...comments, commentToAdd])
          setNewComment("");
        };
        });
      };
  return (
    <div className='postPage'>
        <div className='leftside'>
            <div className="cardPost">
                <div className='postHeader'>
                    <div className='username'>{postObject.username}</div>
                    <div className='title'>{postObject.title}</div>
                </div>
                    <div className='postBody'>{postObject.postText}</div>   
            </div>
        </div>    
        <div className='rightside'>
            <div className='listOfComments'>
                {comments.map((comment, index) => {
                    return <div key={index} className='comment'> {comment.commentBody} </div>
                })};
            </div>
            <div className="addCommentContainer">
                <input  className='inputComment' value={newComment} type="text" placeholder='comment...' onChange={(event) => {setNewComment(event.target.value)}}></input>
                <button className='btnAddComment' onClick={addComment}>Add Comment</button>
            </div>
        </div>    
    </div>
  )
}

export default Post

