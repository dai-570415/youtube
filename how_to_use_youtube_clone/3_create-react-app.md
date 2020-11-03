# 3_create-react-app

```bash
$ npm install --save react-router-dom
$ npm i normalize.css
```

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

```js
// App.js
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
```

```js
// pages/Top.js
import React from 'react';

const Top = () => {
    return (
        <div>
            Top
        </div>
    );
}

export default Top;
```

```js
// pages/Watch.js
import React from 'react';

const Watch = () => {
    return (
        <div>
            Watch
        </div>
    );
}

export default Watch;
```

```js
// pages/Search.js
import React from 'react';

const Search = () => {
    return (
        <div>
            Search
        </div>
    );
}

export default Search;
```