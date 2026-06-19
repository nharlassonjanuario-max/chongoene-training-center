import {
    auth,
    db,
    onAuthStateChanged,
    collection,
    getDocs,
    doc,
    getDoc,
    signOut
}
from "./firebase.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href =
            "login-aluno.html";

        return;
    }

    try {

        const usuarioDoc =
            await getDoc(
                doc(db, "usuarios", user.uid)
            );

        if (usuarioDoc.exists()) {

            const dados =
                usuarioDoc.data();

            document.getElementById(
                "nomeAluno"
            ).innerHTML =
                dados.nome;

            document.getElementById(
                "emailAluno"
            ).innerHTML =
                dados.email;

        }

        carregarInscricoes(user);

    }
    catch (error) {

        console.log(error);

    }

});

async function carregarInscricoes(user) {

    const tbody =
        document.getElementById(
            "listaInscricoes"
        );

    tbody.innerHTML = "";

    const snapshot =
        await getDocs(
            collection(db, "inscricoes")
        );

    snapshot.forEach((documento) => {

        const aluno =
            documento.data();

        if (
            aluno.email === user.email
        ) {

            tbody.innerHTML += `
            <tr>

                <td>${aluno.curso}</td>

                <td>${aluno.nivel || "-"}</td>

                <td>${aluno.metodo}</td>

                <td>
                    <span class="status ${aluno.status}">
                        ${aluno.status}
                    </span>
                </td>

            </tr>
            `;
        }

    });

}

window.logout = async function () {

    await signOut(auth);

    window.location.href =
        "login-aluno.html";

};