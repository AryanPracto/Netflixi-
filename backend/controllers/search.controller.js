import Movie from "../models/movie.model.js"

export async function searchMovieByCategory(req, res) {
  try {
    const { category } = req.params; 

    const movies = await Movie.findAll({
      where: {
        category: category, 
      },
    });

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found for this category" });
    }

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies by category:", error);
    res.status(500).json({ message: "An error occurred while fetching movies. Please try again." });
  }
}

export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.findAll();

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "An error occurred while fetching movies. Please try again." });
  }
}