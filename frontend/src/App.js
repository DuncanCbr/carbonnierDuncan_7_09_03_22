import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home';
import createpost from "./pages/Createpost";




function App() {
  return (
    <Router>
    <div className='navBar'>
      <Link to="/createpost" className='link'> creat a post</Link>
      <Link to="/" className='link'> Home Page</Link>
    </div>
    <Switch>
      <Route exact path="/"  component={Home}/>
      <Route exact path="/createpost"  component={createpost}/>
    </Switch>
  </Router>
  );
}

export default App;
