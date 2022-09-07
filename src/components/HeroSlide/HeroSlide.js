import { useState, useEffect, useRef } from 'react';
import { Autoplay } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Button, { OutlineButton } from '../Button/Button';
import Modal, { ModalContent } from '../Modal/Modal';

import './HeroSlide.scss';

function HeroSlide() {
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {};
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results.slice(0, 3));
            } catch (error) {
                console.log(error);
            }
        };
        getMovies();
    }, []);

    return (
        <div className="hero-slide ">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
            >
                {movieItems &&
                    movieItems.length > 0 &&
                    movieItems.map((item, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <HeroSlideItem data={item} className={isActive ? 'active' : ''} />
                            )}
                        </SwiperSlide>
                    ))}
            </Swiper>

            {movieItems &&
                movieItems.length > 0 &&
                movieItems.map((item, index) => (
                    <TrailerModal key={index} data={item}></TrailerModal>
                ))}
        </div>
    );
}

function HeroSlideItem({ data, className = '' }) {
    const navigate = useNavigate();

    const item = data ? data : [];

    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path
    );

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal__${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            modal
                .querySelector('.modal__content > iframe')
                .setAttribute('src', `https://www.youtube.com/embed/${videos.results[0].key}`);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No Trailer';
        }

        modal.classList.toggle('active');
    };

    return (
        <div
            className={`hero-slide__item ${className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate('movie/' + item.id)}>Wacth Now</Button>
                        <OutlineButton onClick={setModalActive}>Watch Trailer</OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    );
}

function TrailerModal({ data }) {
    const item = data ? data : [];

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');
    return (
        <Modal active={false} id={`modal__${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="400px" title="Trailer"></iframe>
            </ModalContent>
        </Modal>
    );
}

export default HeroSlide;
