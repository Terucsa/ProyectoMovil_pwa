import type {NewUser} from "../../domain/user/user.types"

const NAME_DB = "USERNADA";
const VERSION_DB = 1;
const COLECTION_NAME = "USER";

function initDB() : Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request: IDBOpenDBRequest = indexedDB.open(NAME_DB, VERSION_DB);

        request.onupgradeneeded = function(e: IDBVersionChangeEvent) {
            const db = (e.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(COLECTION_NAME)) {
                db.createObjectStore(COLECTION_NAME, { keyPath: "id" });
                console.log("Base de datos creada");
            }
        }

        request.onsuccess = function() {
            resolve(request.result);
        }

        request.onerror = function() {
            reject("Error al abrir la coleccion");
        }
    })
}

export async function addUserDB(user : NewUser): Promise<boolean> {
    const db = await initDB();

    return new Promise((resolve, reject) => {
        const transaction: IDBTransaction = db.transaction([COLECTION_NAME], "readwrite");
        const store: IDBObjectStore = transaction.objectStore(COLECTION_NAME);

        const request = store.put(user);

        request.onsuccess = function() {
            resolve(true);
        };

        request.onerror = function() {
            reject(false);
        };
    })
}