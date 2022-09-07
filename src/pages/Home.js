import { Link } from 'react-router-dom';

import { OutlineButton } from '../components/Button/Button';
import HeroSlide from '../components/HeroSlide/HeroSlide';
import MovieList from '../components/MovieList/MovieList';
import { category, movieType, tvType } from '../api/tmdbApi';

function Home() {
    return (
        <>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList type={movieType.popular} category={category.movie}></MovieList>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList type={movieType.top_rated} category={category.movie}></MovieList>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Tv Series</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList type={tvType.popular} category={category.tv}></MovieList>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>On The Air Tv</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList type={tvType.on_the_air} category={category.tv}></MovieList>
                </div>
            </div>
        </>
    );
}

export default Home;
