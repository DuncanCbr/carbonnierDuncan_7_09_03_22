import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';

function Post() {

    let {id}=useParams();
    const [postObject, setPostObject] = useState({});

    useEffect (() => {
        axios.get(`http://localhost:3002/posts/byId/${id}`).then((response) => {
            setPostObject(response.data)});
    })

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
            vos commentaires
        </div>    
    </div>
  )
}

export default Post