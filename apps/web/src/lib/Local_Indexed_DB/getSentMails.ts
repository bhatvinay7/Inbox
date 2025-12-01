import {Mail} from 'types'
import openMailDB from './createIndexedDB';
export async function getAllLocalMails() {
  const db:IDBDatabase = await openMailDB();
  const tx = db.transaction("mails", "readonly");
  const store = tx.objectStore("mails");

  return new Promise((resolve, reject) => {
    const req:IDBRequest<Mail[]>= store.getAll();

    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
