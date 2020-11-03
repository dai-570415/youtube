import React, { useContext } from 'react';
import { Store } from '../../store/';
import Linkify from 'react-linkify';
import Youtube from 'react-youtube';
import Style from './VideoDetail.module.scss';

const VideoDetail = () => {
    const { globalState } = useContext(Store);

    return globalState.selected && globalState.selected.id ? (
        <div className={Style.leftWrapper}>
            <div className={Style.videowrap}>
                <Youtube className={Style.video} videoId={ globalState.selected.id } />
            </div>
            <h3>{ globalState.selected.snippet.title }</h3>
            <p>{ globalState.selected.snippet.publishedAt.substr(0,10) }</p>

            <h4>{ globalState.selected.snippet.channelTitle }</h4>

            <input id="trigger" className={Style.gradTrigger} type="checkbox" />
            <label className={Style.gradBtn} for="trigger"></label>
            <div className={Style.gradItem}>
                <Linkify>
                    <pre>{ globalState.selected.snippet.description }</pre>
                </Linkify>
            </div>
        </div>
    ) : (<>No Data</>);
}

export default VideoDetail;
