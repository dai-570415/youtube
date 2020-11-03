# 詳細ページ最適化

## Watchページ読み込みの共通化

```js
// pages/Watch.js
import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import SideList from '../components/SideList/SideList';
import VideoDetail from '../components/VideoDetail/VideoDetail';
import { Store } from '../store/';
import { fetchSelectedData, fetchRelatedData } from '../apis/';

const Watch = () => {
    const { setGlobalState } = useContext(Store);
    const location = useLocation();
    const setVideos = async () => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('v');
        if (id) {
            const [selected, related] = await Promise.all([ fetchSelectedData(id), fetchRelatedData(id) ]);
            setGlobalState({ type: 'SET_SELECTED', payload: { selected: selected.data.items.shift() } });
            setGlobalState({ type: 'SET_RELATED', payload: { related: related.data.items } });
        }
    }

    useEffect(() => {
        setVideos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search])

    return (
        <Layout>
            <VideoDetail />
            <SideList />
        </Layout>
    );
}

export default Watch;
```

## VideoDetailとSideList被ってる部分削除

```js
// components/VideoDetail/VideoDetail.js
import React, { useContext } from 'react';
import { Store } from '../../store/';
import VideoPlay from '../VideoPlay/VideoPlay';
import Linkify from 'react-linkify';
// import Style from './VideoDetail.module.scss';

const VideoDetail = () => {
    const { globalState } = useContext(Store);

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
// components/SideList/SideList.js
import React, { useContext } from 'react';
import { Store } from '../../store/';
import SideListItem from '../SideListItem/SideListItem';
// import Style from './SideList.module.scss';

const SideList = () => {
    const { globalState } = useContext(Store);

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