const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'fa7cc59f237ff851eec41ae881a5b38a',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
