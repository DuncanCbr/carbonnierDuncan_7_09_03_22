import React, {useContext, useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {AuthContext} from '../helpers/AuthContext';
function Createpost() {
let history = useHistory();
const {authState} = useContext(AuthContext);
const [image, setImage] = useState("");
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
console.log(data);
const formData = new FormData();
formData.append("title", data.title);
formData.append("postText", data.postText);
formData.append("image", image);
axios.post("http://localhost:3002/posts", formData, {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
history.push("/");
});
}
return (
<div className='App'>
<h1>CrÃ©ez votre poste</h1>
<div className='creatPostPage App'>
<Formik initialValues={initialValues} onSubmit={onSubmit} method="POST" encType='multipart/form-data' validationSchema={validationSchema}>
<Form className='form'>
<label className="fieldStyle"><span>Titre </span>
<Field className="inputForm" id='inputCreatPost' name="title" placeholder="(ex. Ma Story...)"/>
<ErrorMessage name="title" component="span" className='msgError' />
</label>
<label className="fieldStyle"><span>Texte</span>
<Field className="inputText" id='inputCreatPost' name="postText" placeholder="(ex. je vis Ã  paris...)"/>
<ErrorMessage name="postText" component="span" className='msgError' />
</label>
<label className="fieldStyle">
<span>Image</span>
<Field type="file" name="image" id='inputImage' className="marginFile" onChange={(e)=>setImage(e.target.files[0])}></Field>
</label>
<button className="submitButton" type='submit'>CrÃ©ez votre message</button>
</Form>
</Formik>
</div>
</div>
)
}
export default Createpost;