const admin = require("firebase-admin");
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../../configs/admin_cred.json";

if (!admin.apps.length) {
  admin.initializeApp(
    { credential: admin.credential.cert(serviceAccount) },
    "admin_account"
  );
}


const app_admin = admin.app("admin_account");
const firestore_admin = getFirestore(app_admin);
const storage_admin = getStorage(app_admin);
const auth_admin = getAuth(app_admin);

export { app_admin, firestore_admin, storage_admin, auth_admin };