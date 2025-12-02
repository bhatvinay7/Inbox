import express,{Router} from 'express';
import {fetch_single_sentMail,fetch_user_mail,fetch_thread_mails} from '../controllers/fetch_user_mails.js';
const router:Router = express.Router();
router.get('/fetch_sent_mail/:uuid',fetch_single_sentMail);
router.get('/fetch_inbox_mail',fetch_user_mail);
router.get('/fetch_thread_mails/:conversationId',fetch_thread_mails)
export default router;

