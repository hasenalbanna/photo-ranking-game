// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPfnLfN2G9XXDzLithx-SvopJd6XiMs1U",
  authDomain: "photo-ranking-game.firebaseapp.com",
  databaseURL: "https://photo-ranking-game-default-rtdb.firebaseio.com",
  projectId: "photo-ranking-game",
  storageBucket: "photo-ranking-game.firebasestorage.app",
  messagingSenderId: "714695496415",
  appId: "1:714695496415:web:c01da2b0f93d3823f60f6a",
  measurementId: "G-TH3HDT95ZT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Make database available globally
window.database = database;