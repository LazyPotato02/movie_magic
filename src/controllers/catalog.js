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
        try {
            const allMoviesObject = await getAllMovies();
            const allMovies = Object.values(allMoviesObject);

            // Filter movies based on any matching query parameters
            const uniqueFilteredMovies = new Set();
            allMovies.forEach(movie => {
                const movieTitle = movie.title.toLowerCase();
                const movieGenre = movie.genre.toLowerCase();
                const movieYear = movie.year.toString();

                // Check if any of the search criteria match
                const titleMatch = !search || (search && movieTitle.startsWith(search.toLowerCase()));
                const genreMatch = !genre || (genre && movieGenre === genre.toLowerCase());
                const yearMatch = !year || (year && movieYear === year.toString());
                // If any of the search criteria match, add the movie to the set
                if (titleMatch) {
                    uniqueFilteredMovies.add(movie);
                }
            });

            // Convert the set of unique movies back to an array
            const filteredMovies = Array.from(uniqueFilteredMovies);
            // Render the view with the filtered movies
            res.render('search', { movies: filteredMovies });
        } catch (error) {
            // Handle any errors, for example, by rendering an error view
            res.render('search', {movies: null});

        }
    }
};
