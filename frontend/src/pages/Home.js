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


  return (
    <div className="App">
      {listOfPosts.map((value, key) => { 
        return (
        <div key={key} className="post" onClick={() => history.push(`/post/${value.id}`)}>
            <div className="postHeader"> 
              <div className="username">{value.username}</div>
              <div className="title">{value.title}</div> 
            </div>
            <div className="body"> {value.postText}</div>
        </div>
        );
        })}
    </div>
  )
}

export default Home