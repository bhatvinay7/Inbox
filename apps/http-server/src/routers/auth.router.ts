import express,{Router} from 'express';
import callbackHandler from '../controllers/authCallback.js';
import googleauth from '../controllers/googleauth.js';
import refreshTokenHandler from '../controllers/refreshWorkerAccessToken.controller.js';
const router:Router = express.Router();
router.get('/auth/googleAuth', googleauth);
router.get('/auth/callback/google', callbackHandler);
router.post('/refresh-token',refreshTokenHandler)

export default router;

