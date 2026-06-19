// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

// Authentication
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Firestore
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD9qLjl9yERrotNBT9SBIMEvOO-cujeRzY",
    authDomain: "chongoene-training-center.firebaseapp.com",
    projectId: "chongoene-training-center",
    storageBucket: "chongoene-training-center.firebasestorage.app",
    messagingSenderId: "525548593258",
    appId: "1:525548593258:web:e1cbe8a82a28902894ea13",
    measurementId: "G-QXYST1QV6Y"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar tudo para os outros ficheiros
export { auth, db };

export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
};

export {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    setDoc
};