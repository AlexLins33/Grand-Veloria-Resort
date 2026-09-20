class MenuPrincipal extends HTMLElement {
    connectedCallback() {
        const usuarioStorage = localStorage.getItem('usuarioLogado');
        let areaUsuario = '';

        if (usuarioStorage) {
            const usuario = JSON.parse(usuarioStorage);
            // Isolamento do primeiro nome para preservar a integridade estrutural do layout do header
            const primeiroNome = usuario.nome.split(' ')[0]; 

            areaUsuario = `
                <div style="display: flex; align-items: center; gap: 20px;">
                    <span style="color: var(--cor-primaria); font-weight: bold; font-size: 1.1rem;">Olá, ${primeiroNome}</span>
                    <a href="#" onclick="fazerLogout()" class="btn-reservar-header" style="background-color: transparent; color: var(--cor-secundaria); border: 2px solid var(--cor-secundaria);">SAIR</a>
                </div>
            `;
        } else {
            areaUsuario = `<a href="login.html" class="btn-reservar-header">LOGIN</a>`;
        }

        this.innerHTML = `
            <header class="header">
                <div class="logo">
                    <a href="index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
                        <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="35" r="18" fill="var(--cor-secundaria)" />
                            <path d="M 10 65 Q 30 45 50 65 T 90 65" fill="none" stroke="var(--cor-primaria)" stroke-width="8" stroke-linecap="round"/>
                            <path d="M 10 85 Q 30 65 50 85 T 90 85" fill="none" stroke="var(--cor-primaria)" stroke-width="8" stroke-linecap="round"/>
                        </svg>
                        <div style="display: flex; flex-direction: column; justify-content: center;">
                            <h2 style="color: var(--cor-primaria); font-size: 22px; margin: 0; letter-spacing: 2px; font-weight: 800;">GRAND VELORIA</h2>
                            <span style="color: var(--cor-secundaria); font-size: 10px; letter-spacing: 3px; font-weight: bold; text-transform: uppercase;">Resort & Spa</span>
                        </div>
                    </a>
                </div>
                
                <nav class="nav-menu">
                    <ul>
                        <li><a href="index.html#acomodacoes">Acomodações</a></li>
                        <li><a href="index.html#lazer">Lazer</a></li>
                        <li><a href="index.html#galeria">Galeria</a></li>
                    </ul>
                </nav>
                
                ${areaUsuario}
            </header>
        `;
    }
}

customElements.define('menu-principal', MenuPrincipal);

window.fazerLogout = function() {
    localStorage.removeItem('usuarioLogado'); 
    // O recarregamento força a atualização de estado do Web Component para remontar a UI com o botão de login
    window.location.reload(); 
};