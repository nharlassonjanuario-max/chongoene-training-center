import {
    db,
    auth,
    collection,
    getDocs,
    onAuthStateChanged,
    signOut
}
from "./firebase.js";

let grafico;

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    carregarDashboard();

});

async function carregarDashboard() {

    const snapshot =
        await getDocs(
            collection(db, "inscricoes")
        );

    let total = 0;
    let confirmados = 0;

    let cursos = {
        "Informática Básica":0,
        "Informática Avançada":0,
        "Excel Avançado e Profissional":0,
        "Inglês (3 Níveis)":0,
        "Programação Web":0
    };

    snapshot.forEach((doc) => {

        const aluno = doc.data();

        total++;

        if(aluno.status === "confirmado"){
            confirmados++;
        }

        if(cursos[aluno.curso] !== undefined){
            cursos[aluno.curso]++;
        }

    });

    document.getElementById("total").innerText =
        total;

    document.getElementById("confirmados").innerText =
        confirmados;

    document.getElementById("pendentes").innerText =
        total - confirmados;

    desenharGrafico(cursos);

}

function desenharGrafico(cursos){

    const ctx =
        document.getElementById("graficoCursos");

    if(grafico){
        grafico.destroy();
    }

    grafico = new Chart(ctx, {

        type:"bar",

        data:{
            labels:Object.keys(cursos),

            datasets:[{
                label:"Inscrições",
                data:Object.values(cursos)
            }]
        },

        options:{
            responsive:true
        }

    });

}

window.logout = async function(){

    await signOut(auth);

    window.location.href =
        "login.html";

}