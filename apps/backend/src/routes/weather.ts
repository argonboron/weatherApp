import { Router } from 'express';
// import { z } from 'zod';
// import { validate } from '../middleware/validate';
// import { WeatherResponse } from '@shared/types';

const router = Router();

// TODO: Add Zod validation, controller logic
router.get('/', (req, res) => {
  // TODO: Fetch weather from WeatherAPI.com
  res.json({ success: true, data: { city: req.query.city, temperature: 0, condition: 'TODO' } });
});

export default router;
