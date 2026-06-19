import {
    auth,
    db,
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    onAuthStateChanged,
    signOut
} from "./firebase.js";

async function carregar() {

    const tbody =
        document.getElementById("lista");

    tbody.innerHTML = "";

    let total = 0;
    let confirmados = 0;

    try {

        const snapshot = await getDocs(
            collection(db, "inscricoes")
        );

        snapshot.forEach((documento) => {

            total++;

            const aluno = documento.data();

            if (aluno.status === "confirmado") {
                confirmados++;
            }

            tbody.innerHTML += `
            <tr>

                <td>${aluno.nome || ""}</td>

                <td>${aluno.telefone || ""}</td>

                <td>${aluno.curso || ""}</td>

                <td>${aluno.nivel || "-"}</td>

                <td>${aluno.metodo || "E-Mola"}</td>

                <td>
                    <span class="status ${aluno.status || "pendente"}">
                        ${aluno.status || "pendente"}
                    </span>
                </td>

                <td>

                    <button
                        class="btn-confirmar"
                        onclick="confirmar('${documento.id}')">
                        
                    </button>

                    <button
                        class="btn-remover"
                        onclick="remover('${documento.id}')">
                        
                    </button>

                </td>

            </tr>
            `;
        });

        document.getElementById("total").innerHTML =
            "Total: " + total;

        document.getElementById("confirmados").innerHTML =
            "Confirmados: " + confirmados;

        document.getElementById("pendentes").innerHTML =
            "Pendentes: " + (total - confirmados);

    } catch (error) {

        console.error(error);

        alert(
            "Erro ao carregar inscrições."
        );
    }
}

window.confirmar = async function(id) {

    try {

        await updateDoc(
            doc(db, "inscricoes", id),
            {
                status: "confirmado"
            }
        );

        carregar();

    } catch (error) {

        console.error(error);

        alert(
            "Erro ao confirmar inscrição."
        );
    }
};

window.remover = async function(id) {

    if (
        !confirm(
            "Deseja remover esta inscrição?"
        )
    ) {
        return;
    }

    try {

        await deleteDoc(
            doc(db, "inscricoes", id)
        );

        carregar();

    } catch (error) {

        console.error(error);

        alert(
            "Erro ao remover inscrição."
        );
    }
};

window.logout = async function() {

    try {

        await signOut(auth);

        window.location.href =
            "login.html";

    } catch (error) {

        console.error(error);

        alert(
            "Erro ao terminar sessão."
        );
    }
};

onAuthStateChanged(
    auth,
    (user) => {

        if (!user) {

            window.location.href =
                "login.html";

            return;
        }

        carregar();
    }
);