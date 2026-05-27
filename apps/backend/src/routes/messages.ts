import { Router } from 'express';
// import { z } from 'zod';
// import { validate } from '../middleware/validate';
// import { Message } from '@shared/types';

const router = Router();

// TODO: Add Zod validation, controller logic
router.post('/', (req, res) => {
  // TODO: Create message, emit to Socket.IO
  res.json({ success: true });
});

router.get('/:city', (req, res) => {
  // TODO: Return messages for city
  res.json({ success: true, data: [] });
});

export default router;
