# リスト取得

```bash
$ npm install axios
```

## api受け取り

```js
// apis/index.js
import axios from 'axios';

const KEY = 'YourKEY';

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
});

export const fetchPopularData = async () => {
    return await youtube.get('/videos', {
        params: {
            part: 'snippet',
            maxResults: 40,
            key: KEY,
            regionCode: 'JP',
            type: 'video',
            chart: 'mostPopular',
        }
    });
}
```

## データ取得

```js
// pages/Top.js
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { fetchPopularData } from '../apis/';

const Top = () => {
    useEffect(() => {
        fetchPopularData().then((res) => {
            console.log(res);
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