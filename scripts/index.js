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
            const sobrenome = document.getElementById('sobrenome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            const telefone = document.getElementById('telefone').value.replace(/\D/g, '');

            // Simulação de envio (em uma aplicação real, isso seria enviado para um servidor)
            console.log('Formulário enviado:', { nome, sobrenome, email, mensagem , telefone });

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

    const telefoneInput = document.getElementById('telefone');

    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let input = e.target.value;
    
            // Remove tudo que não for número
            input = input.replace(/\D/g, '');
    
            // Limita a 11 dígitos
            input = input.slice(0, 11);
    
            // Aplica a máscara
            let formatted = '';
            if (input.length <= 10) {
                formatted = input.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
                    let result = '';
                    if (p1) result += `(${p1}`;
                    if (p2) result += `) ${p2}`;
                    if (p3) result += `-${p3}`;
                    return result;
                });
            } else {
                formatted = input.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (match, p1, p2, p3) => {
                    let result = '';
                    if (p1) result += `(${p1}`;
                    if (p2) result += `) ${p2}`;
                    if (p3) result += `-${p3}`;
                    return result;
                });
            }
    
            // Atualiza o valor no campo
            e.target.value = formatted;
    
            // Move o cursor para o final
            e.target.setSelectionRange(formatted.length, formatted.length);
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