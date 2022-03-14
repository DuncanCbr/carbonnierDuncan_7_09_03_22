import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function registration() {
    const initialValues = {
        username: "",
        password: "",
      };
    
        const validationSchema = Yup.object().shape({
            username: Yup.string().min(3).max(15).required(),
            password: Yup.string().min(4).max(20).required(),
        })

        const onSubmit = (data) => {
            axios.post("http://localhost:3002/auth", data).then(() => {
                console.log(data);
            });
        };

        return (
            <div className='App'> 
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className='form'>
                        <label className="fieldStyle"><span>Username </span>
                        <Field className="inputForm"  name="username" placeholder="(ex. John...)"/>
                        <ErrorMessage name="username" component="span" className='msgError' />
                        </label>
                        <label className="fieldStyle"><span>Password </span>
                        <Field className="inputForm" type="password"  name="password" placeholder="enter a password"/>
                        <ErrorMessage name="Password" component="span" className='msgError' />
                        </label>
                        <button className="submitButton" type='submit'>Register</button>
                    </Form>
                </Formik>
            </div>
        )
}

export default registration