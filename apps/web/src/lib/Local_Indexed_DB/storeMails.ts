import formatDate from '../../utils/getDate_Time'
import openMailDB from './createIndexedDB'
import { attachment } from '../../../../../packages/types/src/web.types';
import {Mail} from 'types'
async function storeMail(mail:Mail) {
  const db = await openMailDB();
  const tx = db.transaction("mails", "readwrite");
  const store = tx.objectStore("mails");
  store.put({
     from: mail.from,
     to: mail.to,
     uuid: mail.uuid,
     body: mail.body,
     subject: mail.subject,
     status: mail.status,
     tag: mail?.tag,
     uid: mail?.uid,
     raw: mail?.raw,
     parentMailId :mail?.parentMailId,
     gmailLabels: mail?.gmailLabels ? mail?.gmailLabels:[""],
     attachments: mail.attachments ? mail.attachments : [""],
     data: mail?.date ? mail?.date : formatDate(new Date())
  });

  return tx.oncomplete;
}

export default storeMail