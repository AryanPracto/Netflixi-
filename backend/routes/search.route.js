import expess from "express"
import {searchMovieByCategory,getAllMovies } from "../controllers/search.controller.js";

const router=expess.Router();

router.get('/:category',searchMovieByCategory);
router.get('/movie/allMovies',getAllMovies);

export default router;