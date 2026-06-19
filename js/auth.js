import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD9qLjl9yERrotNBT9SBIMEvOO-cujeRzY",
    authDomain: "chongoene-training-center.firebaseapp.com",
    projectId: "chongoene-training-center",
    storageBucket: "chongoene-training-center.firebasestorage.app",
    messagingSenderId: "525548593258",
    appId: "1:525548593258:web:e1cbe8a82a28902894ea13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = async function () {

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );

        alert("Login realizado com sucesso!");

        window.location.href = "admin.html";

    } catch (error) {

        alert("Email ou senha incorretos");

        console.log(error);

    }

}