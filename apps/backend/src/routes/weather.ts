import { Router } from 'express';
import { weatherQuerySchema } from '../validation/weatherSchemas.js';
import { validateQuery } from '../middleware/validateQuery.js';
import { getWeather } from '../controllers/weatherController.js';

const router = Router();

router.get('/', validateQuery(weatherQuerySchema), getWeather);

export default router;
