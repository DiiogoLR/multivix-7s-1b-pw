// Script para a página de produtos

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const produtosGrid = document.querySelector('.produtos-grid');
    const todosCards = document.querySelectorAll('.produto-card');
    const filtroBotoes = document.querySelectorAll('.filtros-lista a');
    const selectOrdenar = document.getElementById('ordenarPor');
    const quantidadeProdutos = document.getElementById('quantidade-produtos');
    const modalProduto = document.getElementById('modalProduto');
    const fecharModal = document.querySelector('.fechar-modal');
    const botaoVerRapido = document.querySelectorAll('.ver-rapido');
    const modalImagem = document.getElementById('modalImagem');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalPreco = document.getElementById('modalPreco');
    const modalCores = document.getElementById('modalCores');
    const modalDescricao = document.getElementById('modalDescricao');
    const botaoAumentarQtd = document.querySelector('.aumentar-quantidade');
    const botaoDiminuirQtd = document.querySelector('.diminuir-quantidade');
    const inputQuantidade = document.getElementById('quantidadeProduto');
    const opcoesTamanho = document.querySelectorAll('.opcao-tamanho');
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    // Menu mobile toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('menu-aberto');
            menuToggle.classList.toggle('menu-ativo');
        });
    }

    // Função para filtrar produtos por categoria
    function filtrarProdutos(categoria) {
        let produtosVisiveis = 0;

        todosCards.forEach(card => {
            if (categoria === 'todos' || card.getAttribute('data-categoria') === categoria) {
                card.style.display = 'block';
                produtosVisiveis++;
            } else {
                card.style.display = 'none';
            }
        });

        // Atualiza contador de produtos
        quantidadeProdutos.textContent = produtosVisiveis;
    }

    // Função para ordenar produtos
    function ordenarProdutos(criterio) {
        const cards = Array.from(todosCards);
        
        cards.sort((a, b) => {
            if (criterio === 'preco-baixo') {
                return parseFloat(a.getAttribute('data-preco')) - parseFloat(b.getAttribute('data-preco'));
            } else if (criterio === 'preco-alto') {
                return parseFloat(b.getAttribute('data-preco')) - parseFloat(a.getAttribute('data-preco'));
            } else if (criterio === 'lancamento') {
                return new Date(b.getAttribute('data-lancamento')) - new Date(a.getAttribute('data-lancamento'));
            }
            // Relevância (padrão) - mantém a ordem original
            return 0;
        });
        
        // Reordenar os cards no DOM
        cards.forEach(card => {
            produtosGrid.appendChild(card);
        });
    }

    // Eventos para botões de filtro
    filtroBotoes.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove classe ativa de todos os botões
            filtroBotoes.forEach(btn => btn.classList.remove('filtro-ativo'));
            
            // Adiciona classe ativa ao botão clicado
            this.classList.add('filtro-ativo');
            
            // Filtra os produtos
            const categoria = this.getAttribute('data-categoria');
            filtrarProdutos(categoria);
        });
    });

    // Evento para select de ordenação
    if (selectOrdenar) {
        selectOrdenar.addEventListener('change', function() {
            ordenarProdutos(this.value);
        });
    }

    // Abrir modal ao clicar em "Ver rápido"
    botaoVerRapido.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.produto-card');
            const imagemProduto = card.querySelector('.produto-imagem img').src;
            const tituloProduto = card.querySelector('h4').textContent;
            const precoProduto = card.querySelector('.preco').textContent;
            const coresHTML = card.querySelector('.cores-disponiveis').innerHTML;
            
            // Preenche o modal com informações do produto
            modalImagem.src = imagemProduto;
            modalTitulo.textContent = tituloProduto;
            modalPreco.textContent = precoProduto;
            modalCores.innerHTML = coresHTML;
            
            // Adiciona uma descrição genérica baseada no produto
            modalDescricao.textContent = `${tituloProduto} - Peça exclusiva com design urbano, confortável e versátil para seu estilo street wear. Perfeito para o dia a dia com qualidade premium.`;
            
            // Exibe o modal
            modalProduto.style.display = 'block';
            
            // Adiciona classe ao body para evitar rolagem
            document.body.style.overflow = 'hidden';
        });
    });

    // Fechar modal
    if (fecharModal) {
        fecharModal.addEventListener('click', function() {
            modalProduto.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modalProduto) {
            modalProduto.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Controle de quantidade no modal
    if (botaoAumentarQtd) {
        botaoAumentarQtd.addEventListener('click', function() {
            let quantidade = parseInt(inputQuantidade.value);
            if (quantidade < 10) {
                inputQuantidade.value = quantidade + 1;
            }
        });
    }

    if (botaoDiminuirQtd) {
        botaoDiminuirQtd.addEventListener('click', function() {
            let quantidade = parseInt(inputQuantidade.value);
            if (quantidade > 1) {
                inputQuantidade.value = quantidade - 1;
            }
        });
    }

    // Seleção de tamanho
    opcoesTamanho.forEach(opcao => {
        opcao.addEventListener('click', function() {
            // Remove classe selecionado de todos
            opcoesTamanho.forEach(opt => opt.classList.remove('selecionado'));
            
            // Adiciona classe selecionado ao clicado
            this.classList.add('selecionado');
        });
    });

    // Botões de adicionar ao carrinho
    const cardProdutos = document.querySelectorAll('.produto-card');
    cardProdutos.forEach(card => {
        card.querySelector(".adicionar-carrinho").addEventListener('click', () => {
            console.log(card);
            console.log("ai meu cu 2")

            const nome = card.querySelector("h4").textContent;
            const precoString = card.querySelector(".preco").textContent.trim().replace(",", ".").replace("R$ ", "").trim();
            const preco = parseFloat(precoString);

            const lista = JSON.parse(localStorage.getItem("carrinho")) || [];
            const novoId = lista.length > 0 ? lista[lista.length - 1].id + 1 : 1;
          
            const item = {
              id: novoId,
              nome,
              preco
            };
          
            lista.push(item);
            localStorage.setItem("carrinho", JSON.stringify(lista));

            // Exibe o carrinho no console
            console.log("Itens no carrinho:", JSON.parse(localStorage.getItem("carrinho")) || []);

            // Simulação de adição ao carrinho
            const mensagem = document.createElement('div');
            mensagem.classList.add('mensagem-carrinho');
            mensagem.textContent = 'Produto adicionado ao carrinho!';
            mensagem.style.position = 'fixed';
            mensagem.style.top = '20px';
            mensagem.style.left = '50%';
            mensagem.style.transform = 'translateX(-50%)';
            mensagem.style.backgroundColor = 'var(--marrom-claro)';
            mensagem.style.color = 'var(--texto-claro)';
            mensagem.style.padding = '12px 20px';
            mensagem.style.borderRadius = '4px';
            mensagem.style.zIndex = '2000';
            mensagem.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
            
            document.body.appendChild(mensagem);
            
            // Remove a mensagem após 3 segundos
            setTimeout(() => {
                mensagem.style.opacity = '0';
                mensagem.style.transition = 'opacity 0.5s ease';

                setTimeout(() => {
                    document.body.removeChild(mensagem);
                }, 500);
            }, 3000);
        });
    }
    );

    // Paginação
    const botoesPagina = document.querySelectorAll('.pagina, .pagina-prox');
    botoesPagina.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remove classe ativa de todos os botões
            document.querySelectorAll('.pagina').forEach(btn => {
                btn.classList.remove('pagina-ativa');
            });
            
            // Se não for o botão "Próxima", adiciona classe ativa
            if (!this.classList.contains('pagina-prox')) {
                this.classList.add('pagina-ativa');
            }
            
            // Rolagem para o topo da lista de produtos
            const offsetTop = document.querySelector('.filtros-produtos').offsetTop;
            window.scrollTo({
                top: offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // Botão de inscrição newsletter
    const botaoNewsletter = document.querySelector('.botao-newsletter');
    if (botaoNewsletter) {
        botaoNewsletter.addEventListener('click', function() {
            const emailInput = document.querySelector('.newsletter-form input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                // Email válido
                const mensagemElement = document.createElement('p');
                mensagemElement.textContent = 'Inscrição realizada com sucesso!';
                mensagemElement.style.color = 'var(--texto-claro)';
                mensagemElement.style.marginTop = '15px';
                
                const form = document.querySelector('.newsletter-form');
                form.innerHTML = '';
                form.appendChild(mensagemElement);
            } else {
                // Email inválido
                const emailInput = document.querySelector('.newsletter-form input[type="email"]');
                emailInput.style.borderColor = '#ff5050';
                
                // Shake animation
                emailInput.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    emailInput.style.animation = '';
                }, 500);
            }
        });
    }

    // Adiciona animação de shake
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(styleSheet);
});