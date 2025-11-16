import express from 'express';
import callbackHandler from '../controllers/authCallback.js';
import googleauth from '../controllers/googleauth.js';
import refreshTokenHandler from '../controllers/refreshAccessToken.js';
const router = express.Router();
router.get('/auth/googleAuth', googleauth);
router.get('/auth/callback/google', callbackHandler);
router.get('/refresh_token',refreshTokenHandler)
export default router;

