import {
    auth,
    signInWithEmailAndPassword
}
from "./firebase.js";

window.loginAluno = async function () {

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

        alert(
            "Login realizado com sucesso!"
        );

        window.location.href =
            "dashboard-aluno.html";

    }
    catch (error) {

        console.error(error);

        alert(
            "Email ou senha incorretos."
        );

    }

}