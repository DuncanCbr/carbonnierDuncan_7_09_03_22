import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Home from "./pages/Home";
import createpost from "./pages/Createpost";
import Post from "./pages/Post";
import login from "./pages/login";
import PageNotFound from "./pages/PageNotFound";
import registration from "./pages/registration";
import profilePage from "./pages/profile";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import profile from "./pages/profile";
import ChangePassword from "./pages/changePassword";
import logo from "./fcImages/icon-left-font-monochrome-white.svg";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';


function App() {

  const [authState, setAuthState] = useState({
    username: "",
    role: "roleUser",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            role: response.data.role,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);


  const linkTarget = (() => {
    document.location.href = `/profile/${authState.id}`;
  });



const Logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, role: "", status: false });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <div className="navBar">
          {!authState.status ? (
            <>
              <Link to="/login" className="link noDecoration colorText">
                {" "}
                Connection
              </Link>
              <Link to="/registration" className="link noDecoration colorText">
                inscription
              </Link>
            </>
          ) : (
            <>
              <div className="navLinkPlacement">
                <Link to="/createpost" className="link noDecoration colorText">
                  {" "}
                  Postez votre message
                </Link>
                <Link to="/" className="link noDecoration colorText">
                  {" "}
                  Accueil
                </Link>
              </div>
              <div className="btnLogPlacement">
                <div className=" profileIcon noDecoration colorText pointer" onClick={() => {linkTarget()}}><PersonIcon /></div>
                <Link to='/login' className="noDecoration">
                <button className="btnLog pointer" onClick={Logout}>
                  <LogoutIcon/>
                </button>
                </Link>
              </div>
            </>
          )}
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/createpost" component={createpost} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/login" component={login} />
          <Route exact path="/registration" component={registration} />
          <Route exact path="/profile/:id" component={profilePage} />
          <Route exact path="/changePassword" component={ChangePassword} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
        <footer>
          <div className="logoContainer">
            <img src={logo} alt="logo de Groupomania" className="logoStyle"/>
          </div>
          <div className="polPryContainer">
            <p className="polPryStyle pointer colorText">Nous contacter</p>
            <p className="polPryStyle pointer colorText">Mentions Légales</p>
            <p className="polPryStyle pointer colorText">Politique et Confidentialité</p>
          </div>
        </footer>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

