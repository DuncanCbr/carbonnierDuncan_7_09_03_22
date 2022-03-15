import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home';
import createpost from "./pages/Createpost";
import Post from "./pages/Post";
import login from "./pages/login";
import registration from "./pages/registration";
import {AuthContext} from './helpers/AuthContext';
import {useState, useEffect} from "react";
import axios from 'axios';



function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3002/auth/auth', {headers : {accessToken : localStorage.getItem('accessToken')}}).then((response) => {
      if(response.data.error){
        setAuthState(false)
      }else{
        setAuthState(true);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
    <div className='navBar'>
      <Link to="/createpost" className='link'> creat a post</Link>
      <Link to="/" className='link'> Home Page</Link>
      {!authState && (
        <>
      <Link to="/login" className='link'> Login</Link>
      <Link to="/registration" className='link'>Registration</Link>
        </>
      )}
    </div>
    <Switch>
      <Route exact path="/"  component={Home}/>
      <Route exact path="/createpost"  component={createpost}/>
      <Route exact path="/post/:id" component={Post}/>
      <Route exact path="/login" component={login}/>
      <Route exact path="/registration" component={registration}/>
    </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
