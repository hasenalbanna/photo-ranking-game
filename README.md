# Photo Ranking Game

A real-time interactive photo ranking game where multiple players can vote for their favorite photos and see live results.

## Setup Instructions

1. Create a Firebase Project:

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Realtime Database
   - Copy your Firebase configuration

2. Configure the App:

   - Open `script.js`
   - Replace the Firebase configuration object with your project's configuration:

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     databaseURL: "YOUR_DATABASE_URL",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

3. Deploy:
   - Host the files on a web server
   - Make sure all players can access the same URL

## Features

- Real-time voting system
- Live leaderboard updates across all players
- Glass morphism UI design
- Responsive layout

## How to Play

1. Two photos are displayed at a time
2. Click on your preferred photo
3. The selected photo stays while the other is replaced with a new one
4. View the leaderboard to see real-time rankings

## Technical Details

- Uses Firebase Realtime Database for live updates
- Modern ES6+ JavaScript
- CSS Glass morphism effects
- Responsive design for all devices

## File Structure

```
photo-ranking-game/
├── index.html
├── style.css
├── script.js
└── img/
    ├── background.jpg
    └── photo-*.png
```
