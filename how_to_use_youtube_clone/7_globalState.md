# globalStateの追加

## store追加

```js
// store/index.js
import React, { createContext, useReducer } from 'react';

const initialState = {
    popular: [],
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_POPULAR':
            return { ...state, popular: action.payload.popular };
        default:
            return state;
    }
}

export const Store = createContext({
    globalState: initialState,
    setGlobalState: () => null,
});

export const StoreProvider = ({ children }) => {
    const [globalState, setGlobalState] = useReducer(reducer, initialState);

    return (
        <Store.Provider value={{globalState, setGlobalState}}>{ children }</Store.Provider>
    );
}
```

## 作成したStoreProviderを全体にくくる

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './store/';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

## リストの取得

```js
// pages/Top.js
import React, { useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import { fetchPopularData } from '../apis/';
import { Store } from '../store/';

const Top = () => {
    const { globalState, setGlobalState } = useContext(Store);
    console.log(globalState);

    useEffect(() => {
        fetchPopularData().then((res) => {
            console.log(res);
            setGlobalState({ type: 'SET_POPULAR', payload: { popular: res.data.items }});
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            Top
        </Layout>
    );
}

export default Top;
```