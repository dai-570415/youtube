# 検索機能

```js
// components/Header/Header.js
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Style from './Header.module.scss';
import { Store } from '../../store/';

const Header = () => {
    const [term, setTerm] = useState('');
    const history = useHistory();
    const { globalState, setGlobalState } = useContext(Store);
    const handleSubmit = e => {
        e.preventDefault();
        setGlobalState({ type: 'SET_TERM', payload: { term } });
        history.push(`search?query=${term}`);
    }
    useEffect(() => {
        setTerm(globalState.term);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={ Style.header }>
            <div className={ Style.item }>
                <Link to="/">ReactTube</Link>
            </div>
            <div className={ Style.item }>
                <form onSubmit={ handleSubmit }>
                    <input
                        type="text" 
                        placeholder="検索"
                        onChange={ e => setTerm(e.target.value) }
                        // value={ term } // Waning出る(なぜか不明)
                    />
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

```js
// store/index.js
import React, { createContext, useReducer } from 'react';

const initialState = {
    popular: [],
    related: [],
    selected: {},
    turm: '',
    searched: [],
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_POPULAR':
            return { ...state, popular: action.payload.popular };
        case 'SET_RELATED':
            return { ...state, related: action.payload.related };
        case 'SET_SELECTED':
            return { ...state, selected: action.payload.selected };
        case 'SET_TERM':
            return { ...state, term: action.payload.term };
        case 'SET_SEARCHED':
            return { ...state, searched: action.payload.searched };
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

```js
// apis/index.js
import axios from 'axios';

const KEY = 'AIzaSyDsyla5LQZKr_tvFL2OVHaFagoczOquPoY';

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

export const fetchSearchData = async (query) => {
    return await youtube.get('/search', {
        params: {
            ...params,
            q: query
        }
    });
}
```

```js
// pages/Search.js
import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { fetchSearchData } from '../apis/';
import { Store } from '../store/';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import VideoGridItem from '../components/VideoGridItem/VideoGridItem';

const Search = () => {
    const { globalState, setGlobalState } = useContext(Store);
    const location = useLocation();
    const serSearchResult = async () => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');

        if (query) {
            await fetchSearchData(query).then((res) => {
                setGlobalState({ type: 'SET_SEARCHED', payload: { searched: res.data.items } });
            });
        }
    }
    useEffect(() => {
        serSearchResult();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    return (
        <Layout>
            <VideoGrid>
                {globalState.searched ? globalState.searched.map((search) => {
                    return (
                        <VideoGridItem
                            id={ search.id.videoId }
                            key={ search.id.videoId }
                            src={ search.snippet.thumbnails.medium.url }
                            title={ search.snippet.title }
                        />
                    );
                }) : (<>No Data</>)}
            </VideoGrid>
        </Layout>
    );
}

export default Search;
```