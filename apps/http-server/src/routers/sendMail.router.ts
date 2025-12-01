import express,{Router} from 'express';
import sendMail from '../controllers/postMail.js';
const router:Router= express.Router();
router.get('/sendMail',sendMail);

export default router;

