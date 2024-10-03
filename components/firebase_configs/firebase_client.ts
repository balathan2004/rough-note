import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { Analytics, getAnalytics ,isSupported} from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQh5bYzB5Uw-QcP8wOcbL_nWKaY3ErgYU",
  authDomain: "rough-note-de9b7.firebaseapp.com",
  projectId: "rough-note-de9b7",
  storageBucket: "rough-note-de9b7.appspot.com",
  messagingSenderId: "175218120868",
  appId: "1:175218120868:web:5f60ecb872d60c2edfae31",
  measurementId: "G-V116H51MQE"
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