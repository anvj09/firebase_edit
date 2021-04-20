import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import coolPerson from "./pages/coolPerson";


function App() {
  return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path={"/"} component={coolPerson} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;