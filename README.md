# 🛍️ Street Style & Co

## 🌟 1. Nome do Projeto e Tema Escolhido
- **Nome do Projeto**: Street Style & Co
- **Tema Escolhido**: Loja de produtos de e-commerce

## 👥 2. Integrantes do Grupo
- Diogo Lima (6-2212861)
- Guilherme Pagio (6-2212925)
- Luana Dan (6-2212572)

## 📝 3. Descrição Detalhada da Proposta do Projeto
O projeto **Street Style & Co** é uma página web desenvolvida para exibir produtos de uma loja de e-commerce com foco em moda urbana. O objetivo é oferecer uma navegação simples, visualmente atrativa e responsiva, com listagem de produtos, preços e descrições obtidos por meio de uma API própria. 🎨

A API, desenvolvida em **Node.js**, permite controle total sobre os dados, com customização do formato de resposta, filtragem e simulação de um ambiente real de back-end. Os dados retornados incluem nome do produto, preço e descrição, utilizados para renderização dinâmica dos elementos na interface com **JavaScript**. 🚀

## 🖥️ 4. Estrutura da Página
A página foi organizada para proporcionar uma navegação intuitiva e clara, com a seguinte estrutura:
- **Cabeçalho (header)**: Contém o logotipo da loja e links de navegação para as seções:
  - Início 🏠
  - Sobre Nós ℹ️
  - Contato 📧
  - Produtos 🛒
- **Seção "Sobre Nós"**: Apresenta brevemente a loja, seu propósito e valores, destacando o conceito de moda urbana. 🌆
- **Seção "Contato"**: Inclui um formulário de envio e informações de contato, como e-mail e redes sociais. 📲
- **Página de Produtos**: Exibe os produtos em uma página dedicada, consumindo dados da API em Node.js. Cada item é renderizado dinamicamente, exibindo nome, preço e um botão de ação. 🛍️

A página é **responsiva**, adaptando-se a diferentes tamanhos de tela, garantindo uma navegação fluida entre informações institucionais e produtos. 📱

## 🛠️ 5. Tecnologias Utilizadas
- **HTML**: Versão 5, para marcação semântica da estrutura da página.
- **CSS**: Versão 3, para estilização da interface, com layout responsivo e uso de Flexbox.
- **JavaScript**: Vanilla JS, para consumo da API e manipulação do DOM.
- **API**:
  - Tipo: API própria desenvolvida em Node.js
  - URL: `http://localhost:3000/produtos`
  - Formato dos dados: JSON

**Exemplo de retorno da API**:
```json
{
  "idProduto": 1,
  "nome": "Tênis Street Classic",
  "descricao": "Tênis casual com design urbano e confortável.",
  "preco": 249.99
}
```

## ⚙️ 6. Instruções de Execução do Projeto
1. Clone ou baixe o repositório com os arquivos do projeto. 📂
2. Instale o **Node.js** (versão 10.9.2 utilizada no projeto). 🖥️
3. Navegue até a pasta `api` e execute os seguintes comandos:
   ```bash
   npm install
   node app.js
   ```
4. Certifique-se de que o servidor esteja rodando em `http://localhost:3000/produtos`. 🌐
5. Abra o arquivo `index.html` utilizando o **Live Server** no VS Code (ou outra ferramenta equivalente). 🖼️
6. A página buscará os produtos automaticamente por meio do módulo `handlerApi`, utilizando a função `fetch()` para consumir a API. 🔄

### Dependências da API
- **Node.js** instalado.

**Nota**: Não é necessário o uso de chave de API. ✅

## 🎉 7. Considerações Finais
O maior desafio durante o desenvolvimento foi a integração da API em **Node.js** com a interface HTML utilizando **JavaScript puro**, sem bibliotecas como jQuery ou frameworks front-end. Além disso, foi necessário lidar com questões de **CORS** e estruturar os dados da API de forma limpa e eficiente. 🧩

As soluções adotadas incluíram:
- Boas práticas de modularização no back-end. 📦
- Uso da função `fetch()` para comunicação entre front-end e back-end. 🔗

O projeto proporcionou um aprendizado significativo sobre integração entre front-end e back-end, além da importância de uma interface bem estruturada e responsiva para a experiência do usuário. 🌟

---

### Instruções para Salvar o README
1. Copie o conteúdo acima.
2. Crie um arquivo chamado `README.md` na raiz do repositório do projeto.
3. Cole o conteúdo no arquivo e salve.

### Observações
- **Relevância da Memória**: Notei que, em uma conversa anterior (18/04/2025, 12:48), você mencionou interesse em adicionar elementos dinamicamente em JavaScript para um elemento com a classe `produtos-grid`, o que está alinhado com o tema de e-commerce e manipulação de DOM do projeto "Street Style & Co". No entanto, como sua solicitação atual é apenas sobre o README, não incluí referências a essa conversa, mas posso integrar algo relacionado (como uma menção à função de adição de produtos) se desejar.
- **Ajustes**: Se você quis dizer algo diferente sobre "colocou no final" (por exemplo, remover emojis de outros lugares, mudar o estilo ou adicionar algo específico), por favor, esclareça! 😊