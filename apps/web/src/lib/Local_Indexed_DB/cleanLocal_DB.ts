import {Mail} from 'types'
import {fetch_sent_mail} from '../../utils/getUserMails'
import storeMail from   './storeMails'
import openMailDB from './createIndexedDB'
async function cleanLocalDB() {
  const db = await openMailDB();
  const tx = db.transaction("mails", "readwrite");
  const store = tx.objectStore("mails");

  return new Promise<void>((resolve, reject) => {
    const request = store.openCursor();

    request.onerror = () => reject(request.error);

    request.onsuccess = async (e) => {
      const cursor = (e?.target as IDBRequest<IDBCursorWithValue | null>).result

      if (!cursor) {
        resolve();
        return;
      }

      const localMail:Mail = cursor.value;

      try {
        const res: Mail = await fetch_sent_mail(localMail.uuid);

        if (res.status === "SENT") {
          cursor.delete(); 
          await storeMail(res); 
        }
      } catch (err) {
        console.error("Error processing mail:", err);
      }

      cursor.continue();
    };
  });
}


export default cleanLocalDB
