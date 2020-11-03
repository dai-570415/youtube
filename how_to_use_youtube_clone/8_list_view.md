# リストの表示


```js
// components/VideoGrid/VideoGrid.js
import React from 'react';
import Style from './VideoGrid.module.scss';

const VideoGrid = ({ children }) => {
    return (
        <div className={ Style.container }>
            { children }
        </div>
    );
}

export default VideoGrid;
```

```scss
// components/VideoGrid/VideoGrid.module.scss
.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
```

```js
// components/VideoGridItem/VideoGridItem.js
import React from 'react';
import Style from './VideoGridItem.module.scss';
import { Link } from 'react-router-dom';

const VideoGridItem = ({ id, src, title }) => {
    return (
        <Link to={{ pathname: 'watch', search: `?v=${id}` }} className={ Style.item }>
            <div>
                <img src={src} alt={title} />
                <p>{title}</p>
            </div>
        </Link>
    );
}

export default VideoGridItem;
```

```scss
// components/VideoGridItem/VideoGridItem.module.scss
.item {
    display: block;
    width: 24%;
    margin: 24px auto;
    @media screen and (max-width: 768px) {
        width: 48%;
        margin: 24px auto;
    }
    @media screen and (max-width: 560px) {
        width: 95%;
        margin: 16px auto;
    }
    img {
        display: block;
        width: 100%;
        height: 128px;
        object-fit: cover;
        margin: 0 0 8px 0;
        @media screen and (max-width: 768px) {
            height: 100%;
        }
    }
}
```

## TopにVideoGrid、VideoGridItemを読み込む

```js
// pages/Top.js
import React, { useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import { fetchPopularData } from '../apis/';
import { Store } from '../store/';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import VideoGridItem from '../components/VideoGridItem/VideoGridItem';

const Top = () => {
    const { globalState, setGlobalState } = useContext(Store);

    useEffect(() => {
        fetchPopularData().then((res) => {
            setGlobalState({ type: 'SET_POPULAR', payload: { popular: res.data.items }});
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <VideoGrid>
                {globalState.popular && globalState.popular.map((popular) => {
                    return (
                        <VideoGridItem
                            id={ popular.id }
                            key={ popular.id }
                            src={ popular.snippet.thumbnails.standard.url }
                            title={ popular.snippet.title }
                        />
                    );
                })}
            </VideoGrid>
        </Layout>
    );
}

export default Top;
```