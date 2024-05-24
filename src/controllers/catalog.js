const {getAllMovies, getMovieById} = require("../services/movie");
const {all} = require("express/lib/application");
module.exports = {
    home: async (req, res) => {
        const movies = await getAllMovies();

        res.render('home', {movies});
    },
    details: async (req, res) => {
        const id = req.params.id
        const movie = await getMovieById(id)

        if (!movie) {
            res.render('404')
            return
        }

        movie.starRating = "&#x2605;".repeat(movie.rating); // Generate star rating
        res.render('details', {movie})
    },
    search: async (req, res) => {
        const { search, genre, year } = req.query;

        console.log('Received search:', search);
        console.log('Received genre:', genre);
        console.log('Received year:', year);

        const allMoviesObject = await getAllMovies();
        const allMovies = Object.values(allMoviesObject);
        // Filter movies based on any matching query parameters
        const uniqueFilteredMovies = new Set();
        const filteredMovies = allMovies.filter(movie => {
            const movieTitle = movie.title.toLowerCase();
            const movieGenre = movie.genre.toLowerCase();
            const movieYear = movie.year.toString();

            // Check if any of the search criteria match
            if ((!search || movieTitle.startsWith(search.toLowerCase())) &&
                (!genre || movieGenre.startsWith(genre.toLowerCase())) &&
                (!year || movieYear === year)) {
                return true;
            }
            return false;
        });

        // Convert the set of unique movies back to an array
        // const filteredMovies = Array.from(uniqueFilteredMovies);

        // Render the view with the filtered movies
        res.render('search', { movies: filteredMovies });
    }
};
