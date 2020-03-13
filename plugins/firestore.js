import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  var firebaseConfig = {
    apiKey: 'AIzaSyAyR49uuFs_fH8eakYjvo2SjM6ozZp3tCA',
    authDomain: 'cms-deuex.firebaseapp.com',
    databaseURL: 'https://cms-deuex.firebaseio.com',
    projectId: 'cms-deuex',
    storageBucket: 'cms-deuex.appspot.com',
    messagingSenderId: '578152582267',
    appId: '1:578152582267:web:e362b8ecd0d81cf4dfa6de'
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

export default db
