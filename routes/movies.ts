import { Router } from 'express';
import { getMovieByID, moviesToPDF } from '../controllers/movies';

const router = Router();
router.get('/:movie_id', getMovieByID);
router.get('/', moviesToPDF);

export default router;
