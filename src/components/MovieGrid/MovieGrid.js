import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import tmdbApi, { tvType, movieType, category } from '../../api/tmdbApi';
import MovieCard from '../MovieCard/MovieCard';
import { OutlineButton } from '../Button/Button';

import './MovieGrid.scss';

function MovieGrid({ category: cateProps }) {
    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;

            if (keyword === undefined) {
                const params = {};
                switch (cateProps) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword,
                };
                response = await tmdbApi.search(cateProps, { params });
            }

            setItems(response.results);
            setTotalPage(response.total_pages);
        };

        getList();
    }, [cateProps, keyword]);

    const loadMore = async () => {
        let response = null;

        if (keyword === undefined) {
            const params = {
                page: page + 1,
            };
            switch (cateProps) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            response = await tmdbApi.search(cateProps, { params });
        }

        setItems([...items, ...response.results]);
        setPage(page + 1);
    };

    return (
        <>
            <div className="movie-grid">
                {items.map((item, index) => (
                    <MovieCard key={index} data={item} category={cateProps}></MovieCard>
                ))}
            </div>
            {page < totalPage && (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={loadMore}>
                        Load more
                    </OutlineButton>
                </div>
            )}
        </>
    );
}

export default MovieGrid;
