import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* Hacemos el ruteo, el switch es para q en el caso q ponegas un link q no es, hace que tome el ultimo link q tomo */}
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route path= '/home' component = {Home}/>
      </Switch>
      <h1>Henry Countries</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
