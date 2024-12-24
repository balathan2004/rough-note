import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { Analytics, getAnalytics ,isSupported} from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId:process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};
const app = initializeApp(firebaseConfig,"client");
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider=new GoogleAuthProvider()
let analytics:Analytics|null=null;


isSupported().then((supported) => {
  if (supported) {
    console.log("Supported")
  return  analytics = getAnalytics(app);
  }else{
    console.log("Not supported " )
  }
});
export { app, firestore, storage ,auth,provider,analytics};