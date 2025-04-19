// module/handlerApi.js
export async function fetchProdutos() {
    try {
        const response = await fetch('http://localhost:3000/produtos');

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao consumir a API:', error);
        return []; // retorna array vazio em caso de erro
    }
}
