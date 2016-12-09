import * as firebase from 'firebase'

export function initializeFireBase () {
  const config = {
    apiKey: "AIzaSyBDML_zeFtZo0iUVGfwbsjKDUwP5Mb9Ei8",
    authDomain: "map-game-55e0a.firebaseapp.com",
    databaseURL: "https://map-game-55e0a.firebaseio.com",
    storageBucket: "map-game-55e0a.appspot.com",
    messagingSenderId: "363304701650"
  }
  firebase.intializeApp(config)





