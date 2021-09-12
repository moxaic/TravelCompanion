// TODO(developer): save this file as firebase.config.js

import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  // your firebase config credentials
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const storage = firebase.storage();

export { database, storage };
