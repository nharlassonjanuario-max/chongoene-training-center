import {
    auth,
    db,
    createUserWithEmailAndPassword,
    doc,
    setDoc
}
from "./firebase.js";

window.registar = async function () {

    const nome =
        document.getElementById("nome").value;

    const telefone =
        document.getElementById("telefone").value;

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;

    if (
        !nome ||
        !telefone ||
        !email ||
        !senha
    ) {

        alert("Preencha todos os campos.");

        return;
    }

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                senha
            );

        const user =
            userCredential.user;

        await setDoc(
            doc(db, "usuarios", user.uid),
            {
                nome,
                telefone,
                email,
                tipo: "aluno"
            }
        );

        alert(
            "Conta criada com sucesso!"
        );

        window.location.href =
            "login-aluno.html";

    }
    catch (error) {

        console.error(error);

        alert(
            "Erro ao criar conta."
        );

    }

}