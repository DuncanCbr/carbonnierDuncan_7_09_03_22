import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let history = useHistory();

  const changePassword = () => {
    axios
      .put(
        "http://localhost:3002/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
        history.push("/home");
      });
  };

  return (
    <div className="changePwContainer">
      <h1>Changez votre mots de passe</h1>
      <input 
        className="changePwInput"
        type="text"
        placeholder="Ancien Mots de passe..."
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
      className="changePwInput"
        type="text"
        placeholder="Nouveau mots de passe..."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button className="changePwBtn" onClick={changePassword}> Sauvegarder les changements</button>
    </div>
  );
}

export default ChangePassword;

