import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import ActivityCreate from './components/ActivityCreate';
import Detail from './components/Detail'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* Hacemos el ruteo, el switch es para q en el caso q ponegas un link q no es, hace que tome el ultimo link q tomo */}
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
         <Route path= '/home/detail/:id' component={Detail}/>
        <Route path= '/home' component = {Home}/>
        <Route path= '/create' component={ActivityCreate}/>
       
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
