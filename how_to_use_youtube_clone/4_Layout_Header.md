# 4_Layout_Header

## Headerコンポーネント

```js
// components/Header/Header.js
import React from 'react';

const Header = () => {
    return (
        <div>
            Header
        </div>
    );
}

export default Header;
```

## Layoutコンポーネント
- pagesの情報をchildrenノードで受け取る
- Headerコンポーネント共通化

```js
// components/Layout/Layout.js
import React from 'react';
import Header from '../Header/Header';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            { children }
        </div>
    );
}

export default Layout;
```

## Layoutコンポーネント読み込み

```js
// pages/Top.js
import React from 'react';
import Layout from '../components/Layout/Layout';

const Top = () => {
    return (
        <Layout>
            Top
        </Layout>
    );
}

export default Top;
```

```js
// pages/Watch.js
import React from 'react';
import Layout from '../components/Layout/Layout';

const Watch = () => {
    return (
        <Layout>
            Watch
        </Layout>
    );
}

export default Watch;
```

```js
// pages/Search.js
import React from 'react';
import Layout from '../components/Layout/Layout';

const Search = () => {
    return (
        <Layout>
            Search
        </Layout>
    );
}

export default Search;
```

```bash
$ npm install node-sass@4.14.1
$ npm i --save @fortawesome/fontawesome-svg-core \
             @fortawesome/free-solid-svg-icons \
             @fortawesome/react-fontawesome
```

## Header作り込み

```js
// components/Header/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Style from './Header.module.scss';

const Header = () => {
    return (
        <div className={ Style.header }>
            <div className={ Style.item }>
                <Link to="/">ReactTube</Link>
            </div>
            <div className={ Style.item }>
                <form>
                    <input type="text" placeholder="Search..." />
                    <button type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Header;
```

```scss
// components/Header/Header.module.scss
.header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 56px;
    background: #202020;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    a {
        line-height: 56px;
        color: #fff;
        padding: 0 0 0 1rem;
        text-decoration: none;
    }
}
form {
    display: flex;
    width: 320px;
    height: 32px;
    margin: 12px 0;
    input {
        color: #fff;
        width: 80%;
        text-indent: 0.5rem;
        border: none;
        background:#181818;
        outline: none;
    }
}
button {
    color: #fff;
    width: 16%;
    background: #303030;
    border: none;
    outline: none;
}
```

## Layoutスタイリング

```js
// components/Layout/Layout.js
import React from 'react';
import Header from '../Header/Header';
import Style from './Layout.module.scss';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className={Style.main}>
                { children }
            </div>
        </div>
    );
}

export default Layout;
```

```scss
// components/Layout/Layout.module.scss
/* font-family: 'Noto Sans JP', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap');

* {
    font-family: 'Noto Sans JP', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    overflow-x: hidden;
    background: #181818;
}
h1 { 
    font-size: 40px; 
    font-weight: 500;
    line-height: 1;
}
h2 { font-size: 25px; font-weight: 500; }
h3 { font-size: 18px; font-weight: 500; }
h4 { font-size: 16px; font-weight: 100; }
h5 { font-size: 14px; font-weight: 100; }
h6 { font-size: 12px; font-weight: 100; }
p { 
    text-align: justify;
    font-size: 14px; 
    line-height: 1.5;
    font-weight: 300;
}
a {
    display: block;
    font-weight: 300;
    color: #fff;
    text-decoration: none;
}
ul li {
    list-style: none;
}
.main {
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: 64px auto 0;
}
```
