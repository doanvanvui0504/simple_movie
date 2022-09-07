import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './MovieCard.scss';

function MovieCard({ data, category: categoryProps }) {
    const item = data ? data : [];

    const link = '/' + category[categoryProps] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

export default MovieCard;
