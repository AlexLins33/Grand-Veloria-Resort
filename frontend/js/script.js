document.addEventListener("DOMContentLoaded", () => {
    
    const API_URL = "http://127.0.0.1:5000/api";

    const formCadastro = document.getElementById("form-cadastro");
    
    if (formCadastro) {
        formCadastro.addEventListener("submit", async (evento) => {
            // Evita o comportamento padrão do form para permitir a submissão assíncrona da payload via fetch
            evento.preventDefault(); 

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            try {
                const resposta = await fetch(`${API_URL}/cadastro`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome, email, senha })
                });

                const dados = await resposta.json();

                if (resposta.ok) {
                    alert("Cadastro realizado com sucesso! Faça seu login.");
                    window.location.href = "login.html"; 
                } else {
                    alert("Erro: " + dados.mensagem);
                }
            } catch (erro) {
                console.error("Erro ao cadastrar:", erro);
                alert("Erro ao conectar com o servidor.");
            }
        });
    }

    const formLogin = document.getElementById("form-login");

    if (formLogin) {
        formLogin.addEventListener("submit", async (evento) => {
            evento.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            try {
                const resposta = await fetch(`${API_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, senha })
                });

                const dados = await resposta.json();

                if (resposta.ok) {
                    // O armazenamento no localStorage permite a persistência do estado da sessão e identificação entre as rotas estáticas
                    localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));
                    
                    alert("Login realizado com sucesso!");
                    window.location.href = "index.html"; 
                } else {
                    alert("Erro: " + dados.mensagem);
                }
            } catch (erro) {
                console.error("Erro ao fazer login:", erro);
                alert("Erro ao conectar com o servidor.");
            }
        });
    }

    const formCheckout = document.getElementById("form-checkout");

    if (formCheckout) {
        formCheckout.addEventListener("submit", async (evento) => {
            evento.preventDefault();

            const usuarioStorage = localStorage.getItem("usuarioLogado");
            
            if (!usuarioStorage) {
                alert("Você precisa estar logado para fazer uma reserva!");
                window.location.href = "login.html";
                return;
            }

            const usuario = JSON.parse(usuarioStorage);
            
            const quarto = document.getElementById("quarto").value; 
            const checkin = document.getElementById("checkin").value;
            const checkout = document.getElementById("checkout").value;
            const hospedes = document.getElementById("hospedes").value;
            const preco = document.getElementById("preco").value; 

            try {
                const resposta = await fetch(`${API_URL}/checkout`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        usuario_id: usuario.id, 
                        quarto: quarto,
                        checkin: checkin,
                        checkout: checkout,
                        hospedes: hospedes,
                        preco: preco
                    })
                });

                const dados = await resposta.json();

                if (resposta.ok) {
                    alert("Reserva confirmada! Prepare suas malas para o Grand Veloria.");
                    window.location.href = "index.html";
                } else {
                    alert("Erro ao fazer reserva: " + dados.mensagem);
                }
            } catch (erro) {
                console.error("Erro no checkout:", erro);
                alert("Erro ao conectar com o servidor.");
            }
        });
    }
});