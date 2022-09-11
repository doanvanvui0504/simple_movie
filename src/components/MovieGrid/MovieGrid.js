import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import tmdbApi, { tvType, movieType, category } from '../../api/tmdbApi';
import MovieCard from '../MovieCard/MovieCard';
import Button, { OutlineButton } from '../Button/Button';
import Input from '../Input/Input';

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
            <div className="section mb-3">
                <MovieSearch category={cateProps} keyword={keyword}></MovieSearch>
            </div>
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

export function MovieSearch({ keyword: keywordProps, category: cateProps }) {
    const [keyword, setKeyword] = useState(keywordProps);

    const navigate = useNavigate();

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            navigate(`/${category[cateProps]}/search/${keyword}`);
        }
    }, [keyword, navigate, cateProps]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        window.addEventListener('keyup', enterEvent);
        return () => {
            window.removeEventListener('keyup', enterEvent);
        };
    }, [goToSearch, keyword]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>
                Search
            </Button>
        </div>
    );
}

export default MovieGrid;
