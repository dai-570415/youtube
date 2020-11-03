# 動画プレイヤーの追加 & 関連動画取得

```bash
$ npm install react-youtube
$ npm install react-linkify --save
```

## 詳細画面

```js
// components/VideoDetail/VideoDetail.js
import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSelectedData } from '../../apis/';
import { Store } from '../../store/';
import VideoPlay from '../VideoPlay/VideoPlay';
import Linkify from 'react-linkify';
// import Style from './VideoDetail.module.scss';

const VideoDetail = () => {
    const { globalState, setGlobalState } = useContext(Store);
    console.log(globalState);
    const location = useLocation();
    const setSelectedVideo = async () => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('v');
        await fetchSelectedData(id).then((res) => {
            const item = res.data.items.shift();
            setGlobalState({ type: 'SET_SELECTED', payload: { selected: item } });
        });
    }

    useEffect(() => {
        setSelectedVideo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]); // locationが更新されるたびに描画する

    return globalState.selected && globalState.selected.id ? (
        <div>
            <VideoPlay id={ globalState.selected.id } />
            <h3>{ globalState.selected.snippet.title }</h3>
            <Linkify>
                <pre>{ globalState.selected.snippet.description }</pre>
            </Linkify>
        </div>
    ) : (<>No Data</>);
}

export default VideoDetail;
```

```js
// components/VideoPlay/VideoPlay.js
import React from 'react';
import Youtube from 'react-youtube';
// import Style from './VideoPlay.module.scss';

const VideoPlay = ({ id }) => {
    return (
        <div>
            <Youtube videoId={ id } />
        </div>
    );
}

export default VideoPlay;
```

## 関連動画取得

### store追加

```js
// store/index.js
import React, { createContext, useReducer } from 'react';

const initialState = {
    popular: [],
    related: [],
    selected: {},
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_POPULAR':
            return { ...state, popular: action.payload.popular };
        case 'SET_RELATED':
            return { ...state, related: action.payload.related };
        case 'SET_SELECTED':
            return { ...state, selected: action.payload.selected };
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

### apis追加

```js
// apis/index.js
import axios from 'axios';

const KEY = 'AIzaSyBO0efKDMNBBFTeEnoQON0PHg7p7XZSWGM';

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
});

const params = {
    part: 'snippet',
    maxResults: 40,
    key: KEY,
    regionCode: 'JP',
    type: 'video',
}

export const fetchPopularData = async () => {
    return await youtube.get('/videos', {
        params: {
            ...params,
            chart: 'mostPopular',
        }
    });
}

export const fetchRelatedData = async (id) => {
    return await youtube.get('/search', {
        params: {
            ...params,
            relatedToVideoId: id,
        }
    });
}

export const fetchSelectedData = async (id) => {
    return await youtube.get('videos', {
        params: {
            ...params,
            id,
        }
    });
}
```

### SideList実装

```js
// components/SideList/SideList.js
import React, { useEffect, useContext } from 'react';
import { Store } from '../../store/';
import { fetchRelatedData } from '../../apis/';
import SideListItem from '../SideListItem/SideListItem';
// import Style from './SideList.module.scss';

const SideList = () => {
    const { globalState, setGlobalState } = useContext(Store);
    const setRelatedVideo = async (id) => {
        await fetchRelatedData(id).then((res) => {
            setGlobalState({ type: 'SET_RELATED', payload: { related: res.data.items } });
        });
    }
    useEffect(() => {
        setRelatedVideo(globalState.selected.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalState.selected])

    return (
        <div>
            {globalState.related ? globalState.related.map((video) => {
                return (
                    <SideListItem
                        id={video.id.videoId}
                        key={video.id.videoId}
                        src={video.snippet.thumbnails.medium.url}
                        title={video.snippet.title}
                    />
                );
            }) : (<>No Data</>)}
        </div>
    );
}

export default SideList;
```

```js
// components/SideListItem/SideListItem.js
import React from 'react';
import { Link } from 'react-router-dom';
// import Style from './SideListItem.module.scss';

const SideListItem = ({ id, src, title }) => {
    return (
        <Link to={{ pathname: 'watch', search: `?v=${id}` }}>
            <img src={src} alt={title} />
            <div>{ title }</div>
        </Link>
    );
}

export default SideListItem;
```

### Watchページに追加

```js
// pages/Watch.js
import React from 'react';
import Layout from '../components/Layout/Layout';
import SideList from '../components/SideList/SideList';
import VideoDetail from '../components/VideoDetail/VideoDetail';

const Watch = () => {
    return (
        <Layout>
            <VideoDetail />
            <SideList />
        </Layout>
    );
}

export default Watch;
```