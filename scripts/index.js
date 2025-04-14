// Espera o documento carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const botaoMenu = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (botaoMenu && menu) {
        botaoMenu.addEventListener('click', function() {
            menu.classList.toggle('active');
            
            // Anima os traços do hamburger para um X
            const tracos = botaoMenu.querySelectorAll('span');
            tracos.forEach(traco => traco.classList.toggle('active'));
        });
    }
    
    // Rolagem suave para links de ancoragem
    document.querySelectorAll('a[href^="#"]').forEach(ancora => {
        ancora.addEventListener('click', function(e) {
            e.preventDefault();
            
            const idAlvo = this.getAttribute('href');
            const elementoAlvo = document.querySelector(idAlvo);
            
            if (elementoAlvo) {
                window.scrollTo({
                    top: elementoAlvo.offsetTop - 70, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
                
                // Fecha o menu móvel se estiver aberto
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    botaoMenu.querySelectorAll('span').forEach(traco => {
                        traco.classList.remove('active');
                    });
                }
            }
        });
    });
    
    // Animação nos botões de adicionar ao carrinho
    const botoesCarro = document.querySelectorAll('.adicionar-carrinho');
    
    botoesCarro.forEach(botao => {
        botao.addEventListener('click', function() {
            const textoOriginal = this.textContent;
            
            // Muda o texto e desabilita o botão temporariamente
            this.textContent = 'Adicionado ✓';
            this.disabled = true;
            this.style.backgroundColor = '#4CAF50';
            
            // Volta ao estado original após 2 segundos
            setTimeout(() => {
                this.textContent = textoOriginal;
                this.disabled = false;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Formulário de contato
    const formularioContato = document.getElementById('formularioContato');
    
    if (formularioContato) {
        formularioContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Valores do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Simulação de envio (em uma aplicação real, isso seria enviado para um servidor)
            console.log('Formulário enviado:', { nome, email, mensagem });
            
            // Feedback para o usuário
            const containerFormulario = formularioContato.parentElement;
            const conteudoOriginal = containerFormulario.innerHTML;
            
            containerFormulario.innerHTML = `
                <div class="mensagem-sucesso">
                    <h3>Mensagem Enviada!</h3>
                    <p>Obrigado, ${nome}! Entraremos em contato em breve.</p>
                    <button class="botao resetar-formulario">Enviar outra mensagem</button>
                </div>
            `;
            
            // Botão para resetar o formulário
            const botaoResetar = containerFormulario.querySelector('.resetar-formulario');
            if (botaoResetar) {
                botaoResetar.addEventListener('click', function() {
                    containerFormulario.innerHTML = conteudoOriginal;
                    
                    // Reativa o listener do formulário após restaurá-lo
                    const novoFormulario = document.getElementById('formularioContato');
                    if (novoFormulario) {
                        novoFormulario.addEventListener('submit', arguments.callee);
                    }
                });
            }
        });
    }
    
    // Efeito de revelação ao scroll
    const elementosRevelacao = document.querySelectorAll('.recurso, .produto-card, .depoimento');
    
    function verificarRevelacao() {
        const gatilhoInferior = window.innerHeight * 0.8;
        
        elementosRevelacao.forEach(elemento => {
            const topoElemento = elemento.getBoundingClientRect().top;
            
            if (topoElemento < gatilhoInferior) {
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializa os elementos com opacidade 0
    elementosRevelacao.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Verifica a posição inicial dos elementos
    verificarRevelacao();
    
    // Adiciona o evento de scroll
    window.addEventListener('scroll', verificarRevelacao);
});