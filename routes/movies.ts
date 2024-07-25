import { Router } from 'express';
import { moviesToPDF } from '../controllers/movies';

const router = Router();

router.get('/', moviesToPDF);

export default router;
