import {
    auth,
    db,
    collection,
    addDoc
} from "./firebase.js";

window.inscrever = async function () {

    const user = auth.currentUser;

    if (!user) {

        alert(
            "Faça login ou crie uma conta antes de se inscrever."
        );

        window.location.href = "login-aluno.html";

        return;
    }

    const nome =
        document.getElementById("nome").value.trim();

    const telefone =
        document.getElementById("telefone").value.trim();

    const curso =
        document.getElementById("curso").value;

    const nivel =
        document.getElementById("nivel").value;

    if (
        nome === "" ||
        telefone === "" ||
        curso === ""
    ) {

        alert(
            "Preencha todos os campos obrigatórios."
        );

        return;
    }

    try {

        await addDoc(
            collection(db, "inscricoes"),
            {
                nome: nome,
                telefone: telefone,
                email: user.email,
                curso: curso,
                nivel: nivel || "",
                metodo: "E-Mola",
                status: "pendente",
                dataInscricao:
                    new Date().toISOString()
            }
        );

        document.getElementById("resposta").innerHTML = `

        <div class="confirmacao">

            <h3>
                Inscrição enviada com sucesso!
            </h3>

            <p>
                Obrigado,
                <strong>${nome}</strong>.
            </p>

            <p>
                A sua inscrição foi registada no sistema.
            </p>

            <div class="dados-pagamento">

                <h2>
                    E-Mola
                </h2>

                <p>
                    <strong>870569900</strong>
                </p>

                <p>
                    Efetue o pagamento e envie o comprovativo
                    para o WhatsApp abaixo.
                </p>

            </div>

            <a
                href="https://wa.me/258870569900"
                target="_blank"
                class="btn-whatsapp"
            >
                Enviar Comprovativo
            </a>

        </div>

        `;

        document.getElementById("nome").value = "";
        document.getElementById("telefone").value = "";
        document.getElementById("curso").value = "";
        document.getElementById("nivel").value = "";

        document
            .getElementById("resposta")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
    catch (error) {

        console.error(
            "Erro ao inscrever:",
            error
        );

        alert(
            "Erro ao enviar inscrição. Verifique a ligação ao Firebase."
        );

    }

};