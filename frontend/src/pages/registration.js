import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function registration() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    username: "",
    password: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required(),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3002/auth", data).then(() => {
      console.log(data);
    });
  };

  const redirection = () => {
      document.location.href="/login"
  };

  return (
    <div className="App">
      <div><h1>Inscrivez vous !</h1></div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <label className="fieldStyle">
            <span>Nom d'utilisateur </span>
            <Field
              className="inputForm"
              name="username"
              placeholder="(ex. John...)"
            />
            <ErrorMessage
              name="username"
              component="span"
              className="msgError"
            />
          </label>
          <label className="fieldStyle">
            <span>Email </span>
            <Field
              className="inputForm"
              name="email"
              placeholder="(ex. Exemple@gmail.com...)"
            />
            <ErrorMessage name="email" component="span" className="msgError" />
          </label>
          <label className="fieldStyle">
            <span>Téléphone </span>
            <Field
              className="inputForm"
              name="phone"
              placeholder="(Your Phone Number"
            />
            <ErrorMessage name="phone" component="span" className="msgError" />
          </label>
          <label className="fieldStyle">
            <span>Mots de passe </span>
            <Field
              className="inputForm"
              type="password"
              name="password"
              placeholder="Enter a password"
            />
            <ErrorMessage
              name="Password"
              component="span"
              className="msgError"
            />
          </label>
            <button className="submitButton" type="submit" onClick={redirection}>
              Inscription
            </button>
        </Form>
      </Formik>
    </div>
  );
}

export default registration;
