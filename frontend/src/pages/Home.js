import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import {useHistory} from "react-router-dom"; 

function Home() {
    let history = useHistory();
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3002/posts").then((response) => {
        setListOfPosts(response.data);
    });
    }, []);

    const likeAPost = (postId) => {
      axios.post("http://localhost:3002/like", 
      {PostId: postId}, 
      {headers: {accessToken: localStorage.getItem("accessToken")}}
      ).then((response) => {
        setListOfPosts(listOfPosts.map((post) => {
          if(post.id === postId) {
            if(response.data.liked){
              return{...post, Likes: [...post.Likes, 0]};
            } else {
              const likeArray = post.Likes;
              likeArray.pop();
              return{...post, Likes: likeArray};
            }
          }else{
            return post
          }
        }))
      });
    }
  return (
    <div className="App">
      {listOfPosts.map((value, key) => { 
        return (
        <div key={key} className="post">
            <div className="postHeader"> 
              <div className="username">{value.username}</div>
              <div className="title">{value.title}</div> 
            </div>
            <div className="body" onClick={() => history.push(`/post/${value.id}`)}> 
              {value.postText}
              <label>{value.Likes.length}</label>
            </div>
            <button onClick={() => {likeAPost(value.id);}}>like</button>
        </div>
        );
        })}
    </div>
  )
}

export default Home