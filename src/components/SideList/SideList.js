import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../../store/';
import Style from './SideList.module.scss';

const SideList = () => {
    const { globalState } = useContext(Store);

    return (
        <div className={Style.side}>
            <h4>次の動画</h4>
            {globalState.related ? globalState.related.map((video) => {
                return (
                    <div className={Style.item} key={video.id.videoId}>
                        <Link to={{ pathname: 'watch', search: `?v=${video.id.videoId}` }}>
                            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                        </Link>
                        <Link to={{ pathname: 'watch', search: `?v=${video.id.videoId}` }}>
                            <p>
                                { video.snippet.title.substr(0,25) }
                                <span>...</span>
                            </p>
                            <h6>{ video.snippet.channelTitle }</h6>
                        </Link>
                    </div>
                );
            }) : (<>No Data</>)}
        </div>
    );
}

export default SideList;
