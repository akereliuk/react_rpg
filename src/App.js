import logo from './logo.svg';
import ViewContainer from './components/ViewContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <ViewContainer ViewLayout="MainMenuView" />
          </Route>
          <Route exact path="/mainmenu">
            <ViewContainer ViewLayout="MainMenuView" />
          </Route>
          <Route path="/cityview">
            <ViewContainer ViewLayout="CityView" />
          </Route>
          <Route path="/battleview">
            <ViewContainer ViewLayout="BattleView" />
          </Route>
          <Route path="/fieldview">
            <ViewContainer ViewLayout="FieldView" />
          </Route>
          <Route path="*">
            <ViewContainer ViewLayout="MainMenuView" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
