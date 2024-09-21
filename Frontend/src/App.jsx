import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import UpdateDetails from './UpdateDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/update-details" component={UpdateDetails} />
      </Switch>
    </Router>
  );
}

export default App;
