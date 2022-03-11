import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home';




function App() {
  return (
    <Router>
    <div className='navBar'>
      <Link to="/" className='link'> Home Page</Link>
    </div>
    <Switch>
      <Route exact path="/"  component={Home}/>
    </Switch>
  </Router>
  );
}

export default App;
