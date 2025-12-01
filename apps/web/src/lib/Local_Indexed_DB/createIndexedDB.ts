function openMailDB() :Promise<IDBDatabase>{
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MailBrokerDB", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("mails")) {
        db.createObjectStore("mails", { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export default openMailDB