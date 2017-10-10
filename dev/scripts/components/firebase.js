import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDIkpeMpVJsmI9LYBsNPQXak30lRgYYBNM",
  authDomain: "gifigy-1eaf0.firebaseapp.com",
  databaseURL: "https://gifigy-1eaf0.firebaseio.com",
  projectId: "gifigy-1eaf0",
  storageBucket: "gifigy-1eaf0.appspot.com",
  messagingSenderId: "622835275739"
};
firebase.initializeApp(config);

  export default firebase;