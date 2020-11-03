# Video詳細の取得

## fetchデータの追加

```js
// apis/index.js
import axios from 'axios';

const KEY = 'AIzaSyBO0efKDMNBBFTeEnoQON0PHg7p7XZSWGM';

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
});

// 共通化
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
            ...params, // スプレット構文
            chart: 'mostPopular',
        }
    });
}

// Detailページのfetchデータ
export const fetchSelectedData = async (id) => {
    return await youtube.get('videos', {
        params: {
            ...params,　// スプレット構文
            id,
        }
    });
}
```

## Reducerの追加

```js
// store/index.js
import React, { createContext, useReducer } from 'react';

const initialState = {
    popular: [],
    selected: {}, // 追加
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_POPULAR':
            return { ...state, popular: action.payload.popular };
        // 追加
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

## 詳細ページのコンポーネント実装

```js
// components/VideoDetail/VideoDetail.js
import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSelectedData } from '../../apis/';
import { Store } from '../../store/';

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
    }, [])

    return (
        <div>
            
        </div>
    );
}

export default VideoDetail;
```

## Watchページで読み込み

```js
// pages/Watch.js
import React from 'react';
import Layout from '../components/Layout/Layout';
import VideoDetail from '../components/VideoDetail/VideoDetail';

const Watch = () => {
    return (
        <Layout>
            <VideoDetail />
        </Layout>
    );
}

export default Watch;
```