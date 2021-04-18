import logo from './logo.svg';
import ViewContainer from './components/ViewContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { GameConfigsProvider } from "./context/GameConfigs";
import { CampaignManagerProvider } from './context/CampaignManager';

function App() {

  return (
    <GameConfigsProvider>
      <CampaignManagerProvider>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <ViewContainer ViewLayout="MainMenuView" />
              </Route>
              <Route exact path="/mainmenu">
                <ViewContainer ViewLayout="MainMenuView" />
              </Route>
              <Route exact path="/cityview">
                <ViewContainer ViewLayout="CityView" />
              </Route>
              <Route exact path="/battleview">
                <ViewContainer ViewLayout="BattleView" />
              </Route>
              <Route exact path="/fieldview">
                <ViewContainer ViewLayout="FieldView" />
              </Route>
              <Route exact path="/settingsview">
                <ViewContainer ViewLayout="SettingsView" />
              </Route>
              <Route exact path="/loadcampaignview">
                <ViewContainer ViewLayout="LoadCampaignView" />
              </Route>
              <Route exact path="/newcampaignview">
                <ViewContainer ViewLayout="NewCampaignView" />
              </Route>
              <Route exact path="/loadingview">
                <ViewContainer ViewLayout="LoadingView" />
              </Route>
              <Route path="*">
                <ViewContainer ViewLayout="MainMenuView" />
              </Route>
            </Switch>
          </div>
        </Router>
      </CampaignManagerProvider>
    </GameConfigsProvider>
  );
}

export default App;
