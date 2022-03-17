import React, {useContext, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useHistory} from "react-router-dom"; 
import {AuthContext} from '../helpers/AuthContext';

function Createpost() {

  let history = useHistory();
  const {authState} = useContext(AuthContext);

  const initialValues = {
    title: "",
    postText: "",
  };
  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      history.push("/login");
    }
  },[]);
    const validationSchema = Yup.object().shape({
      title: Yup.string().required(),
      postText: Yup.string().required(),
    })

    const onSubmit = (data) => {
      axios.post("http://localhost:3002/posts", data, {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
        history.push("/");
    });
    }
  return (
    <div className='creatPostPage App'> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='form'>
                <label className="fieldStyle"><span>Title </span>
                <Field className="inputForm" id='inputCreatPost' name="title" placeholder="(ex. Story Time...)"/>
                <ErrorMessage name="title" component="span" className='msgError' />
                </label>
                <label className="fieldStyle"><span>Text</span>
                <Field className="inputForm inputText" id='inputCreatPost' name="postText" placeholder="(ex. I live in paris...)"/>
                <ErrorMessage name="postText" component="span" className='msgError' />
                </label>
                <button className="submitButton" type='submit'>Create your post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Createpost;