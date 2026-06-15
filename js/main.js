function mostrarNumero() {

    const metodo = document.getElementById("metodo").value;

    const numero = document.getElementById("numeroPagamento");

    if (metodo === "M-Pesa") {

        numero.innerHTML = "M-Pesa: 870 569 900";

    } else if (metodo === "E-Mola") {

        numero.innerHTML = "E-Mola: 871 176 035";

    } else {

        numero.innerHTML = "";

    }

}

function inscrever() {

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const curso = document.getElementById("curso").value;
    const nivel = document.getElementById("nivel").value;
    const metodo = document.getElementById("metodo").value;

    if (!nome || !telefone || !curso) {

        alert("Preencha todos os campos.");

        return;
    }

    let lista =
        JSON.parse(localStorage.getItem("inscricoes")) || [];

    lista.push({
        nome,
        telefone,
        curso,
        nivel,
        metodo,
        status: "pendente"
    });

    localStorage.setItem(
        "inscricoes",
        JSON.stringify(lista)
    );

    document.getElementById("resposta").innerHTML =
    `
    <div class="confirmacao">
        <h3>Inscrição enviada com sucesso!</h3>
        <p>${nome}</p>
    </div>
    `;

}