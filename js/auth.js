function login() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "admin@cctc.com" && senha === "1234") {

        localStorage.setItem("admin", "true");

        window.location.href = "admin.html";

    } else {

        alert("Email ou senha incorretos");

    }

}