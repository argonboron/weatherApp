import { Router } from 'express';
// import { z } from 'zod';
// import { validate } from '../middleware/validate';
// import { AuthPayload } from '@shared/types';

const router = Router();

// TODO: Add Zod validation, controller logic
router.post('/register', (req, res) => {
  // TODO: Register user, return JWT
  res.json({ success: true, token: 'TODO', user: { id: 'TODO', username: req.body.username } });
});

router.post('/login', (req, res) => {
  // TODO: Authenticate user, return JWT
  res.json({ success: true, token: 'TODO', user: { id: 'TODO', username: req.body.username } });
});

export default router;
