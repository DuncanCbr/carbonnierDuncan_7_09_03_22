import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import {useHistory} from "react-router-dom"; 
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function Home() {
    let history = useHistory();
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3002/posts", {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(response.data.likedPosts.map((like) => {
          return like.PostId;
        }));
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
            return post;
          }
        })
        );
        

        if(likedPosts.includes(postId)){
          setLikedPosts(likedPosts.filter((id) => {
            return id != postId;
          })
          );
        }else{
          setLikedPosts([...likedPosts, postId]);
        }
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
            <ThumbUpAltIcon className={likedPosts.includes(value.id) ? "unlikeBtn" : "likeBtn"} onClick={() => {likeAPost(value.id)}}/>
        </div>
        );
        })}
    </div>
  )
}

export default Home