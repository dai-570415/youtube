import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Top from './pages/Top';
import Watch from './pages/Watch';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Top} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/watch" component={Watch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
