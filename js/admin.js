if (localStorage.getItem("admin") !== "true") {

    window.location.href = "login.html";

}

function carregar() {

    const lista =
    JSON.parse(localStorage.getItem("inscricoes")) || [];

    const tbody =
    document.getElementById("lista");

    tbody.innerHTML = "";

    let confirmados = 0;

    lista.forEach((aluno, index) => {

        if (aluno.status === "confirmado") {
            confirmados++;
        }

        tbody.innerHTML += `
        <tr>

            <td>${aluno.nome}</td>

            <td>${aluno.telefone}</td>

            <td>${aluno.curso}</td>

            <td>${aluno.metodo || "-"}</td>

            <td>
                <span class="status ${aluno.status}">
                    ${aluno.status}
                </span>
            </td>

            <td>

                <button
                class="btn-confirmar"
                onclick="confirmar(${index})">
                ✔
                </button>

                <button
                class="btn-remover"
                onclick="remover(${index})">
                ✖
                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("total").innerHTML =
    "Total: " + lista.length;

    document.getElementById("confirmados").innerHTML =
    "Confirmados: " + confirmados;

    document.getElementById("pendentes").innerHTML =
    "Pendentes: " + (lista.length - confirmados);

}

function confirmar(index) {

    let lista =
    JSON.parse(localStorage.getItem("inscricoes"));

    lista[index].status = "confirmado";

    localStorage.setItem(
        "inscricoes",
        JSON.stringify(lista)
    );

    carregar();

}

function remover(index) {

    let lista =
    JSON.parse(localStorage.getItem("inscricoes"));

    lista.splice(index, 1);

    localStorage.setItem(
        "inscricoes",
        JSON.stringify(lista)
    );

    carregar();

}

function logout() {

    localStorage.removeItem("admin");

    window.location.href = "login.html";

}

window.onload = carregar;