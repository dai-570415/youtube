import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import VideoWatch from '../components/VideoWatch/VideoWatch';
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
            <VideoWatch>
                <VideoDetail />
                <SideList />
            </VideoWatch>
        </Layout>
    );
}

export default Watch;
