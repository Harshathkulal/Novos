import authRoute from './auth-route';
import userRoute from './user-route';
import messageRoute from './message-route';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/messages', messageRoute);

export default router;
