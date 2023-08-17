let request;
let db;
let version = 1;
const storeName = 'contactsDatabaseStore';

export const initDB = () => {
  return new Promise((resolve) => {
    request = indexedDB.open('contactsDatabase');

    request.onupgradeneeded = (e) => {
      db = e.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      version = db.version;
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = (data) => {
  return new Promise((resolve) => {
    request = indexedDB.open('contactsDatabase', version);

    request.onsuccess = (e) => {
      db = e.target.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};

export const deleteData = (key) => {
  return new Promise((resolve) => {
    request = indexedDB.open('contactsDatabase', version);

    request.onsuccess = (e) => {
      db = e.target.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const res = store.delete(key);
      res.onsuccess = () => {
        resolve(true);
      };
      res.onerror = () => {
        resolve(false);
      };
    };
  });
};

export const updateData = (data) => {
  return new Promise((resolve) => {
    request = indexedDB.open('contactsDatabase', version);

    request.onsuccess = (e) => {
      db = e.target.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const res = store.get(data.id);
      res.onsuccess = () => {
        const newData = { ...res.result, ...data };
        store.put(newData);
        resolve(newData);
      };
      res.onerror = () => {
        resolve(null);
      };
    };
  });
};

export const getStoreData = () => {
  return new Promise((resolve) => {
    request = indexedDB.open('contactsDatabase');

    request.onsuccess = (e) => {
      db = e.target.result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};
