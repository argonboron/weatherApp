import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createMessageHandler, listMessagesHandler } from '../controllers/messagesController.js';
import { messageSchema } from '../validation/messageSchemas.js';

const router = Router();

router.post('/', requireAuth, validateRequest(messageSchema), createMessageHandler);
router.get('/:city', listMessagesHandler);

export default router;
