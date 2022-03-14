import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home';
import createpost from "./pages/Createpost";
import Post from "./pages/Post";




function App() {
  return (
    <Router>
    <div className='navBar'>
      <Link to="/createpost" className='link'> creat a post</Link>
      <Link to="/" className='link'> Home Page</Link>
      <Link to="/login" className='link'> login</Link>
      <Link to="/registration" className='link'>registration</Link>
    </div>
    <Switch>
      <Route exact path="/"  component={Home}/>
      <Route exact path="/createpost"  component={createpost}/>
      <Route exact path="/post/:id" component={Post}/>
    </Switch>
  </Router>
  );
}

export default App;
