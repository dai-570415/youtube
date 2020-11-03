import React from 'react';
import Style from './VideoWatch.module.scss';

const VideoWatch = ({ children }) => {
    return (
        <div className={ Style.container }>
            { children }
        </div>
    );
}

export default VideoWatch;
