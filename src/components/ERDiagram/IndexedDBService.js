export function saveJSONArrayToIndexedDB(data) {
  return new Promise((resolve, reject) => {
    const dbName = "myDB";
    const storeName = "jsonArrayStore";

    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const objectStore = db.createObjectStore(storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
        // You can define the structure of your object store here
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(storeName, "readwrite");
      const objectStore = transaction.objectStore(storeName);

      data.forEach((item) => {
        const addRequest = objectStore.add(item);
        addRequest.onsuccess = () => {
          console.log("Data added to IndexedDB");
        };
        addRequest.onerror = () => {
          console.error("Error adding data to IndexedDB");
          reject();
        };
      });

      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
    };

    request.onerror = () => {
      console.error("Error opening IndexedDB");
      reject();
    };
  });
}

export function deleteAllDataFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const dbName = "myDB";
    const storeName = "jsonArrayStore";

    const request = indexedDB.open(dbName, 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(storeName, "readwrite");
      const objectStore = transaction.objectStore(storeName);

      const clearRequest = objectStore.clear();

      clearRequest.onsuccess = () => {
        console.log("All data cleared from IndexedDB");
        resolve();
      };

      clearRequest.onerror = () => {
        console.error("Error clearing data from IndexedDB");
        reject();
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    request.onerror = () => {
      console.error("Error opening IndexedDB");
      reject();
    };
  });
}
