import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
import CastList from '../../components/CastList/CastList';
import VideoList from '../../components/VideoList/VideoList';
import MovieList from '../../components/MovieList/MovieList';

import './Detail.scss';

function Detail() {
    const [item, setItem] = useState(null);

    const { category, id } = useParams();

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
        };
        getDetail();
    }, [category, id]);

    return (
        <>
            {item && (
                <>
                    <div
                        className="banner"
                        style={{
                            backgroundImage: `url(${apiConfig.originalImage(
                                item.backdrop_path || item.poster_path
                            )})`,
                        }}
                    ></div>
                    <div className="movie__content mb-3 container">
                        <div className="movie__content__poster">
                            <div
                                className="movie__content__poster__img"
                                style={{
                                    backgroundImage: `url(${apiConfig.originalImage(
                                        item.backdrop_path || item.poster_path
                                    )})`,
                                }}
                            ></div>
                        </div>
                        <div className="movie__content__info">
                            <h1 className="title">{item.title || item.name}</h1>
                            <div className="genres">
                                {item.genres &&
                                    item.genres.slice(0, 5).map((genre, index) => (
                                        <span key={index} className="genres__item">
                                            {genre.name}
                                        </span>
                                    ))}
                            </div>
                            <p className="overview">{item.overview}</p>
                            <div className="cast">
                                <div className="section__header">
                                    <h2>Casts</h2>
                                </div>

                                <CastList id={item.id} />
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="mb-3 section">
                            <VideoList id={item.id} />
                        </div>
                        <div className="mb-3 section">
                            <div className="section__header mb-2">
                                <h2>Simalar</h2>
                            </div>
                            <MovieList category={category} type="similar" id={item.id} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Detail;
