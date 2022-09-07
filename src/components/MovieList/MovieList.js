import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category } from '../../api/tmdbApi';
import MovieCard from '../MovieCard/MovieCard';

import './MovieList.scss';

function MovieList({ type, category: categoryProps, id }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;

            const params = {};

            if (type !== 'similar') {
                switch (categoryProps) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(type, { params });
                }
            } else {
                response = await tmdbApi.similar(categoryProps, id);
            }

            setItems(response.results);
        };

        getList();
    }, [categoryProps, id, type]);
    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {items &&
                    items.length > 0 &&
                    items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <MovieCard data={item} category={categoryProps} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}

export default MovieList;
