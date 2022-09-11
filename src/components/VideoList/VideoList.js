import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';

import './VideoList.scss';

function VideoList({ id }) {
    const { category } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, id);
            setVideos(res.results.slice(0, 5));
        };
        getVideos();
    }, [category, id]);

    return <>{videos && videos.map((video, index) => <Video key={index} data={video} />)}</>;
}

const Video = ({ data }) => {
    const video = data;

    const iframeRef = useRef(null);

    useEffect(() => {
        const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="video">
            <div className="video__name">
                <h2>{video.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${video.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    );
};

export default VideoList;
