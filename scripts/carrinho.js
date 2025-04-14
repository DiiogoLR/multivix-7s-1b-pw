// Carrinho de compras
let carrinho = [];
const miniCarrinho = document.querySelector('.mini-carrinho');
const miniCarrinhoOverlay = document.querySelector('.mini-carrinho-overlay');
const carrinhoContador = document.querySelector('.carrinho-contador');
const miniCarrinhoItens = document.querySelector('.mini-carrinho-itens');
const valorTotal = document.querySelector('.valor-total');
const carrinhoItens = document.querySelector('.carrinho-itens');
const resumoSubtotal = document.querySelector('.resumo-subtotal');
const resumoValorTotal = document.querySelector('.resumo-valor-total');
const btnLimparCarrinho = document.querySelector('.btn-limpar-carrinho');
const recomendadosGrid = document.querySelector('.recomendados-grid');

// Funções auxiliares
function formatarPreco(preco) {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

// Inicializar carrinho do localStorage
function inicializarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    }
    
    atualizarContadorCarrinho();
    renderizarCarrinho();
    renderizarMiniCarrinho();
    carregarProdutosRecomendados();
}

// Salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidade, 0);
    carrinhoContador.textContent = quantidadeTotal;
}

// Calcular total do carrinho
function calcularTotalCarrinho() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

// Renderizar mini carrinho
function renderizarMiniCarrinho() {
    miniCarrinhoItens.innerHTML = '';
    
    if (carrinho.length === 0) {
        miniCarrinhoItens.innerHTML = '<p>Seu carrinho está vazio.</p>';
        valorTotal.textContent = formatarPreco(0);
        return;
    }
    
    carrinho.forEach(item => {
        const miniCarrinhoItem = document.createElement('div');
        miniCarrinhoItem.classList.add('mini-carrinho-item');
        
        miniCarrinhoItem.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}" class="mini-item-imagem">
            <div class="mini-item-detalhes">
                <h4 class="mini-item-nome">${item.nome}</h4>
                <div class="mini-item-preco">${formatarPreco(item.preco)}</div>
                <div class="mini-item-quantidade">Qtd: ${item.quantidade}</div>
            </div>
            <button class="mini-item-remover" data-id="${item.id}">&times;</button>
        `;
        
        miniCarrinhoItens.appendChild(miniCarrinhoItem);
        
        // Adicionar evento para remover item
        miniCarrinhoItem.querySelector('.mini-item-remover').addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.target.dataset.id;
            removerItemCarrinho(id);
        });
    });
    
    const total = calcularTotalCarrinho();
    valorTotal.textContent = formatarPreco(total);
}

// Renderizar página de carrinho
function renderizarCarrinho() {
    if (!carrinhoItens) return; // Se não estiver na página de carrinho
    
    if (carrinho.length === 0) {
        carrinhoItens.innerHTML = `
            <div class="carrinho-vazio">
                <p>Seu carrinho está vazio.</p>
                <a href="produtos.html">Continuar Comprando</a>
            </div>
        `;
        
        // Atualizar resumo
        if (resumoSubtotal) resumoSubtotal.textContent = formatarPreco(0);
        if (resumoValorTotal) resumoValorTotal.textContent = formatarPreco(0);
        return;
    }
    
    carrinhoItens.innerHTML = '';
    
    carrinho.forEach(item => {
        const carrinhoItem = document.createElement('div');
        carrinhoItem.classList.add('carrinho-item');
        
        carrinhoItem.innerHTML = `
            <div class="item-produto">
                <img src="${item.imagem}" alt="${item.nome}" class="item-imagem">
                <div class="item-info">
                    <h4>${item.nome}</h4>
                    <p>${item.categoria || 'Moda Urbana'}</p>
                </div>
            </div>
            <div class="item-preco">${formatarPreco(item.preco)}</div>
            <div class="item-quantidade-container">
                <div class="item-quantidade">
                    <button class="btn-quantidade btn-diminuir" data-id="${item.id}">-</button>
                    <input type="text" class="quantidade-valor" value="${item.quantidade}" readonly>
                    <button class="btn-quantidade btn-aumentar" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="item-subtotal">${formatarPreco(item.preco * item.quantidade)}</div>
            <div class="item-acoes">
                <button class="btn-remover" data-id="${item.id}">&times;</button>
            </div>
        `;
        
        carrinhoItens.appendChild(carrinhoItem);
        
        // Adicionar eventos aos botões
        carrinhoItem.querySelector('.btn-diminuir').addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            atualizarQuantidadeItem(id, -1);
        });
        
        carrinhoItem.querySelector('.btn-aumentar').addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            atualizarQuantidadeItem(id, 1);
        });
        
        carrinhoItem.querySelector('.btn-remover').addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            removerItemCarrinho(id);
        });
    });
    
    // Atualizar resumo
    const total = calcularTotalCarrinho();
    if (resumoSubtotal) resumoSubtotal.textContent = formatarPreco(total);
    if (resumoValorTotal) resumoValorTotal.textContent = formatarPreco(total);
}

// Adicionar item ao carrinho
function adicionarAoCarrinho(produto) {
    // Verificar se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    
    salvarCarrinho();
    atualizarContadorCarrinho();
    renderizarMiniCarrinho();
    renderizarCarrinho();
    abrirMiniCarrinho();
}

// Atualizar quantidade de um item
function atualizarQuantidadeItem(id, delta) {
    const item = carrinho.find(item => item.id === id);
    
    if (item) {
        item.quantidade += delta;
        
        if (item.quantidade <= 0) {
            removerItemCarrinho(id);
            return;
        }
        
        salvarCarrinho();
        atualizarContadorCarrinho();
        renderizarMiniCarrinho();
        renderizarCarrinho();
    }
}

// Remover item do carrinho
function removerItemCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    
    salvarCarrinho();
    atualizarContadorCarrinho();
    renderizarMiniCarrinho();
    renderizarCarrinho();
}

// Limpar carrinho
function limparCarrinho() {
    carrinho = [];
    
    salvarCarrinho();
    atualizarContadorCarrinho();
    renderizarMiniCarrinho();
    renderizarCarrinho();
}

// Abrir mini carrinho
function abrirMiniCarrinho() {
    miniCarrinho.classList.add('aberto');
    miniCarrinhoOverlay.classList.add('aberto');
}

// Fechar mini carrinho
function fecharMiniCarrinho() {
    miniCarrinho.classList.remove('aberto');
    miniCarrinhoOverlay.classList.remove('aberto');
}

// Produtos exemplo para recomendados
const produtosRecomendados = [
    {
        id: 'p001',
        nome: 'Camiseta Street Urban',
        preco: 79.90,
        imagem: 'imagens/produto1.jpg'
    },
    {
        id: 'p002',
        nome: 'Calça Jeans Destroyed',
        preco: 159.90,
        imagem: 'imagens/produto2.jpg'
    },
    {
        id: 'p003',
        nome: 'Tênis Casual Urban',
        preco: 199.90,
        imagem: 'imagens/produto3.jpg'
    },
    {
        id: 'p004',
        nome: 'Boné Aba Reta Style',
        preco: 69.90,
        imagem: 'imagens/produto4.jpg'
    }
];

// Carregar produtos recomendados
function carregarProdutosRecomendados() {
    if (!recomendadosGrid) return; // Se não estiver na página de carrinho
    
    recomendadosGrid.innerHTML = '';
    
    // Filtrar produtos que não estão no carrinho ou pegar aleatoriamente
    const produtosParaMostrar = produtosRecomendados
        .filter(p => !carrinho.some(c => c.id === p.id))
        .slice(0, 4);
    
    produtosParaMostrar.forEach(produto => {
        const produtoElement = document.createElement('div');
        produtoElement.classList.add('produto-recomendado');
        
        produtoElement.innerHTML = `
            <div class="recomendado-imagem">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>
            <div class="recomendado-info">
                <h4>${produto.nome}</h4>
                <div class="recomendado-preco">${formatarPreco(produto.preco)}</div>
                <button class="btn-adicionar-recomendado" data-id="${produto.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        
        recomendadosGrid.appendChild(produtoElement);
        
        // Adicionar evento aos botões
        produtoElement.querySelector('.btn-adicionar-recomendado').addEventListener('click', () => {
            adicionarAoCarrinho(produto);
        });
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    inicializarCarrinho();
    
    // Evento para abrir mini carrinho
    const carrinhoIcon = document.querySelector('.carrinho-icon');
    if (carrinhoIcon) {
        carrinhoIcon.addEventListener('click', abrirMiniCarrinho);
    }
    
    // Evento para fechar mini carrinho
    const fecharCarrinhoBtn = document.querySelector('.fechar-carrinho');
    if (fecharCarrinhoBtn) {
        fecharCarrinhoBtn.addEventListener('click', fecharMiniCarrinho);
    }
    
    // Evento para fechar ao clicar no overlay
    if (miniCarrinhoOverlay) {
        miniCarrinhoOverlay.addEventListener('click', fecharMiniCarrinho);
    }
    
    // Evento para limpar carrinho
    if (btnLimparCarrinho) {
        btnLimparCarrinho.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar o carrinho?')) {
                limparCarrinho();
            }
        });
    }
    
    aplicarCupomBtn.addEventListener('click', () => {
        const cupomInput = document.querySelector('#cupom-input');
        if (!cupomInput || !cupomInput.value) return;
        
        const cupom = cupomInput.value.trim().toUpperCase();
        
        // Lista de cupons válidos (normalmente viria do backend)
        const cuponsValidos = {
            'DESC10': 0.10,
            'PROMO20': 0.20,
            'URBAN15': 0.15
        };
        
        if (cuponsValidos[cupom]) {
            // Calcular desconto
            const subtotal = calcularTotalCarrinho();
            const desconto = subtotal * cuponsValidos[cupom];
            
            // Atualizar resumo
            document.querySelector('.resumo-desconto-valor').textContent = `-${formatarPreco(desconto)}`;
            document.querySelector('.resumo-valor-total').textContent = formatarPreco(subtotal - desconto);
            
            // Adicionar classe para mostrar linha de desconto
            document.querySelector('.resumo-desconto').classList.add('ativo');
            
            // Desabilitar input e botão
            cupomInput.disabled = true;
            aplicarCupomBtn.disabled = true;
            aplicarCupomBtn.textContent = 'Aplicado';
            
            // Feedback
            alert(`Cupom ${cupom} aplicado com sucesso!`);
        } else {
            alert('Cupom inválido ou expirado!');
            cupomInput.value = '';
        }
    });
})

// Evento para finalizar compra
// Verificar o evento para finalizar checkout
const btnFinalizarCheckout = document.querySelector('.btn-finalizar-checkout');
if (btnFinalizarCheckout) {
    btnFinalizarCheckout.addEventListener('click', () => {
        // Verificar se o carrinho tem itens
        if (!carrinho || carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        try {
            // Obter informações para o checkout
            const total = calcularTotalCarrinho();
            const desconto = parseFloat(document.querySelector('.resumo-desconto-valor')?.textContent?.replace(/[^\d,.]/g, '')?.replace(',', '.') || 0);
            const valorFinal = total - desconto;
            
            // Salvando informações do pedido no localStorage para uso na página de checkout
            const pedido = {
                itens: carrinho,
                subtotal: total,
                desconto: desconto,
                total: valorFinal,
                dataHora: new Date().toISOString()
            };
            
            localStorage.setItem('pedidoAtual', JSON.stringify(pedido));
            
            // Simulando finalização de compra
            alert('Pedido registrado com sucesso! Você será redirecionado para o pagamento.');
            
            // Opção 1: Redirecionar para checkout
            window.location.href = 'checkout.html';
            
            // Opção 2: Se não quiser redirecionar ainda, apenas mostrar confirmação
            // alert('Pedido #' + Math.floor(Math.random() * 10000) + ' confirmado! Obrigado pela sua compra.');
            // limparCarrinho();
        } catch (error) {
            console.error('Erro ao finalizar compra:', error);
            alert('Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.');
        }
    });
}

// Evento para continuar comprando
const btnContinuarComprando = document.querySelector('.btn-continuar-comprando');
if (btnContinuarComprando) {
    btnContinuarComprando.addEventListener('click', () => {
        window.location.href = 'produtos.html';
    });
}

// Eventos para botões do mini carrinho
const btnVerCarrinho = document.querySelector('.btn-ver-carrinho');
if (btnVerCarrinho) {
    btnVerCarrinho.addEventListener('click', () => {
        window.location.href = 'carrinho.html';
    });
}

const btnFinalizar = document.querySelector('.btn-finalizar');
if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        window.location.href = 'carrinho.html';
    });
}

// Adicionar eventos a todos os botões "Adicionar ao Carrinho" na página
const botoesAdicionarCarrinho = document.querySelectorAll('.adicionar-carrinho');
botoesAdicionarCarrinho.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const produtoElement = e.target.closest('.produto-card');
        
        if (produtoElement) {
            const produto = {
                id: produtoElement.dataset.id || `p${Math.floor(Math.random() * 1000)}`,
                nome: produtoElement.querySelector('h4').textContent,
                preco: parseFloat(produtoElement.querySelector('.preco').textContent.replace('R$', '').replace(',', '.')),
                imagem: produtoElement.querySelector('img').src,
                categoria: produtoElement.dataset.categoria || 'Moda Urbana'
            };
            
            adicionarAoCarrinho(produto);
        }
    });
});


// Função para atualizar o carrinho a partir do sistema de persistência
function atualizarCarrinhoDoStorage() {
const carrinhoSalvo = localStorage.getItem('carrinho');

if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
    atualizarContadorCarrinho();
    renderizarMiniCarrinho();
    renderizarCarrinho();
}
}

// Monitorar alterações no localStorage (caso o carrinho seja atualizado em outra aba)
window.addEventListener('storage', (e) => {
if (e.key === 'carrinho') {
    atualizarCarrinhoDoStorage();
}
});

// Inicializar contador do carrinho no cabeçalho
function inicializarContadorCarrinho() {
const carritoCount = document.createElement('span');
carritoCount.classList.add('carrinho-contador');
carritoCount.textContent = '0';

const carritoIcon = document.querySelector('.carrinho-icon');
if (carritoIcon) {
    carritoIcon.appendChild(carritoCount);
}
}

// Função para criar o mini carrinho dinâmicamente se não existir no HTML
function criarMiniCarrinho() {
if (document.querySelector('.mini-carrinho')) return;

const miniCarrinhoHTML = `
    <div class="mini-carrinho-overlay"></div>
    <div class="mini-carrinho">
        <div class="mini-carrinho-header">
            <h3>Seu Carrinho</h3>
            <button class="fechar-carrinho">&times;</button>
        </div>
        <div class="mini-carrinho-itens"></div>
        <div class="mini-carrinho-footer">
            <div class="mini-carrinho-total">
                <span>Total:</span>
                <span class="valor-total">R$ 0,00</span>
            </div>
            <a href="carrinho.html" class="btn-ver-carrinho">Ver carrinho</a>
            <button class="btn-finalizar">Finalizar compra</button>
        </div>
    </div>
`;

const miniCarrinhoContainer = document.createElement('div');
miniCarrinhoContainer.innerHTML = miniCarrinhoHTML;
document.body.appendChild(miniCarrinhoContainer);

// Reinicializar referências
miniCarrinho = document.querySelector('.mini-carrinho');
miniCarrinhoOverlay = document.querySelector('.mini-carrinho-overlay');
miniCarrinhoItens = document.querySelector('.mini-carrinho-itens');
valorTotal = document.querySelector('.valor-total');

// Adicionar eventos
document.querySelector('.fechar-carrinho').addEventListener('click', fecharMiniCarrinho);
miniCarrinhoOverlay.addEventListener('click', fecharMiniCarrinho);
document.querySelector('.btn-ver-carrinho').addEventListener('click', () => {
    window.location.href = 'carrinho.html';
});
document.querySelector('.btn-finalizar').addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    window.location.href = 'carrinho.html';
});
}

// Inicializar elementos dinâmicos do carrinho
function inicializarElementosCarrinho() {
criarMiniCarrinho();
inicializarContadorCarrinho();
inicializarCarrinho();
}

// Chamar inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', inicializarElementosCarrinho);
} else {
inicializarElementosCarrinho();
}

// API pública para ser usada em outras páginas
window.carrinhoAPI = {
adicionarAoCarrinho,
removerItemCarrinho,
atualizarQuantidadeItem,
limparCarrinho,
abrirMiniCarrinho,
fecharMiniCarrinho,
obterCarrinho: () => carrinho,
calcularTotalCarrinho
};