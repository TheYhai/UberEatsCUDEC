  const firebaseConfig = {
    apiKey: "AIzaSyDJGZ26PW8XW5gH8aPR2jApA1mygQQGJM4",
    authDomain: "yhaieats.firebaseapp.com",
    projectId: "yhaieats",
    storageBucket: "yhaieats.firebasestorage.app",
    messagingSenderId: "488840192532",
    appId: "1:488840192532:web:fd8e3e6150ef6071bfbd01"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();