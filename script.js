// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPfnLfN2G9XXDzLithx-SvopJd6XiMs1U",
    authDomain: "photo-ranking-game.firebaseapp.com",
    databaseURL: "https://photo-ranking-game-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "photo-ranking-game",
    storageBucket: "photo-ranking-game.firebasestorage.app",
    messagingSenderId: "714695496415",
    appId: "1:714695496415:web:c01da2b0f93d3823f60f6a",
    measurementId: "G-TH3HDT95ZT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Initialize photos in Firebase
async function initializeFirebase() {
    try {
        console.log('Initializing Firebase...');
        const photosRef = database.ref('photos');
        const snapshot = await photosRef.once('value');
        
        // Initialize photos if they don't exist in Firebase
        if (!snapshot.exists()) {
            console.log('Initializing photos in Firebase...');
            for (const photo of photos) {
                await set(ref(database, `photos/${photo.id}`), photo);
            }
        }
        
        // Start listening for updates
        onValue(ref(database, 'photos'), (snapshot) => {
            const firebasePhotos = [];
            snapshot.forEach((childSnapshot) => {
                firebasePhotos.push(childSnapshot.val());
            });
            // Update local photos array with Firebase data
            photos.length = 0;
            photos.push(...firebasePhotos);
            
            // Select initial photos if needed
            if (currentPhotos.length === 0) {
                selectNewPhotos();
            }
        });
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        // If Firebase fails, still try to show photos
        selectNewPhotos();
    }
}
    
    if (!snapshot.exists()) {
        // Initialize each photo in Firebase
        for (const photo of photos) {
            await set(ref(database, `photos/${photo.id}`), photo);
        }
    }
    
    // Start listening for updates
    onValue(ref(database, 'photos'), (snapshot) => {
        const firebasePhotos = [];
        snapshot.forEach((childSnapshot) => {
            firebasePhotos.push(childSnapshot.val());
        });
        // Update local photos array with Firebase data
        photos.length = 0;
        photos.push(...firebasePhotos);
        // Initial photo selection if needed
        if (currentPhotos.length === 0) {
            selectNewPhotos();
        }
    });
}

// --- Photo Data (Placeholder) ---
const photos = [
    { id: 1, file: './img/photo-1.png', votes: 0 },
    { id: 2, file: './img/photo-2.png', votes: 0 },
    { id: 3, file: './img/photo-3.png', votes: 0 },
    { id: 4, file: './img/photo-4.png', votes: 0 },
    { id: 5, file: './img/photo-5.png', votes: 0 },
    { id: 6, file: './img/photo-6.png', votes: 0 },
    { id: 7, file: './img/photo-7.png', votes: 0 },
    { id: 8, file: './img/photo-8.png', votes: 0 },
    { id: 9, file: './img/photo-9.png', votes: 0 },
    { id: 10, file: './img/photo-10.png', votes: 0 },
    { id: 11, file: 'img/photo-11.png', votes: 0 },
    { id: 12, file: 'img/photo-12.png', votes: 0 },
    { id: 13, file: 'img/photo-13.png', votes: 0 },
    { id: 14, file: 'img/photo-14.png', votes: 0 },
    { id: 15, file: 'img/photo-15.png', votes: 0 },
    { id: 16, file: 'img/photo-16.png', votes: 0 },
    { id: 17, file: 'img/photo-17.png', votes: 0 },
    { id: 18, file: 'img/photo-18.png', votes: 0 },
    { id: 19, file: 'img/photo-19.png', votes: 0 },
    { id: 20, file: 'img/photo-20.png', votes: 0 },
    { id: 21, file: 'img/photo-21.png', votes: 0 },
    { id: 22, file: 'img/photo-22.png', votes: 0 },
    { id: 23, file: 'img/photo-23.png', votes: 0 },
    { id: 24, file: 'img/photo-24.png', votes: 0 },
    { id: 25, file: 'img/photo-25.png', votes: 0 },
    { id: 26, file: 'img/photo-26.png', votes: 0 },
    { id: 27, file: 'img/photo-27.png', votes: 0 },
    { id: 28, file: 'img/photo-28.png', votes: 0 },
    { id: 29, file: 'img/photo-29.png', votes: 0 },
    { id: 30, file: 'img/photo-30.png', votes: 0 },
    { id: 31, file: 'img/photo-31.png', votes: 0 },
    { id: 32, file: 'img/photo-32.png', votes: 0 }
];

// --- Game State Variables ---
let currentPhotos = [];
let roundCount = 0;

// --- DOM Elements ---
const photo1Img = document.getElementById('photo-1-img');
const photo2Img = document.getElementById('photo-2-img');
const photo1Container = document.getElementById('photo-1-container');
const photo2Container = document.getElementById('photo-2-container');
const showLeaderboardBtn = document.getElementById('show-leaderboard-btn');
const leaderboardContainer = document.getElementById('leaderboard-container');
const leaderboardList = document.getElementById('leaderboard-list');
const roundNumberSpan = document.getElementById('round-number');

// --- Functions ---
function getRandomPhoto(excludeId) {
    // Get a random photo that's not the excluded one
    const availablePhotos = photos.filter(photo => photo.id !== excludeId);
    const randomIndex = Math.floor(Math.random() * availablePhotos.length);
    return availablePhotos[randomIndex];
}

function getTwoRandomPhotos() {
    // Shuffles the array and gets two unique photos
    const shuffledPhotos = photos.sort(() => 0.5 - Math.random());
    return [shuffledPhotos[0], shuffledPhotos[1]];
}

function renderNextRound() {
    roundCount++;
    roundNumberSpan.textContent = roundCount;
    currentPhotos = getTwoRandomPhotos();
    photo1Img.src = currentPhotos[0].file;
    photo2Img.src = currentPhotos[1].file;
}

async function handleVote(votedPhotoId, position) {
    try {
        const votedPhoto = photos.find(p => p.id === votedPhotoId);
        if (votedPhoto) {
            const photoRef = database.ref('photos/' + votedPhotoId);
            const snapshot = await photoRef.once('value');
            const currentVotes = (snapshot.val()?.votes || 0) + 1;
            
            // Update votes in Firebase
            await photoRef.update({
                id: votedPhoto.id,
                file: votedPhoto.file,
                votes: currentVotes
            });
        }
        
        // Keep the voted photo in its position and get a new opponent
        roundCount++;
        roundNumberSpan.textContent = roundCount;
        
        if (position === 1) {
            currentPhotos[1] = getRandomPhoto(votedPhotoId);
            photo2Img.src = currentPhotos[1].file;
        } else {
            currentPhotos[0] = getRandomPhoto(votedPhotoId);
            photo1Img.src = currentPhotos[0].file;
        }
    } catch (error) {
        console.error('Error updating vote:', error);
    }
}

function renderLeaderboard() {
    // Get real-time updates from Firebase
    const photosRef = ref(database, 'photos');
    onValue(photosRef, (snapshot) => {
        const firebasePhotos = [];
        snapshot.forEach((childSnapshot) => {
            firebasePhotos.push(childSnapshot.val());
        });

        // Sort photos by vote count in descending order
        const sortedPhotos = firebasePhotos.sort((a, b) => b.votes - a.votes);

        // Clear existing leaderboard
        leaderboardList.innerHTML = '';

    // Create and append list items for each photo
    sortedPhotos.forEach((photo, index) => {
        const listItem = document.createElement('li');
        const imgElement = document.createElement('img');
        imgElement.src = photo.file;
        imgElement.alt = `Rank ${index + 1}`;
        imgElement.classList.add('leaderboard-image');

        const textElement = document.createElement('span');
        textElement.textContent = `Rank ${index + 1}: Votes: ${photo.votes}`;

        listItem.appendChild(imgElement);
        listItem.appendChild(textElement);
        leaderboardList.appendChild(listItem);
    });

    // Display the leaderboard
    leaderboardContainer.style.display = 'block';
}

// --- Event Listeners ---
photo1Container.addEventListener('click', () => {
    handleVote(currentPhotos[0].id, 1);
});

photo2Container.addEventListener('click', () => {
    handleVote(currentPhotos[1].id, 2);
});

showLeaderboardBtn.addEventListener('click', () => {
    renderLeaderboard();
});

// --- Initial setup ---
// Initialize photos in Firebase if they don't exist
async function initializeFirebase() {
    const photosRef = ref(db, 'photos');
    const snapshot = await get(photosRef);
    
    if (!snapshot.exists()) {
        // Initialize each photo in Firebase
        for (const photo of photos) {
            const photoRef = ref(db, `photos/${photo.id}`);
            await update(photoRef, photo);
        }
    } else {
        // Load existing votes from Firebase
        const firebasePhotos = [];
        snapshot.forEach((childSnapshot) => {
            firebasePhotos.push(childSnapshot.val());
        });
        photos = firebasePhotos;
    }

    // Start listening for real-time updates
    onValue(ref(db, 'photos'), (snapshot) => {
        const updatedPhotos = [];
        snapshot.forEach((childSnapshot) => {
            updatedPhotos.push(childSnapshot.val());
        });
        photos = updatedPhotos;
    });

    renderNextRound();
}

initializeFirebase();