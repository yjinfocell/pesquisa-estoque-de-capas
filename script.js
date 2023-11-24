var dados;  // Variável global para armazenar os dados da planilha

// Função para carregar os dados da planilha CSV
function carregarDados() {
    // Substitua 'capas.csv' pelo caminho correto se estiver em um diretório diferente
    Papa.parse('capas.csv', {
        download: true,
        header: true,
        complete: function (result) {
            dados = result.data;
        }
    });
}

// Função para pesquisar
function pesquisar() {
    var termoPesquisa = document.getElementById('termo_pesquisa').value.toLowerCase();
    var resultados = [];

    // Iterar sobre os dados da planilha
    for (var linha = 0; linha < dados.length; linha++) {
        var setor = dados[linha]['setores'];
        for (var coluna in dados[linha]) {
            if (coluna !== 'setores') {
                var valorCelula = dados[linha][coluna].toLowerCase();
                if (valorCelula.includes(termoPesquisa) && !resultados.includes(valorCelula)) {
                    resultados.push({
                        termo: valorCelula,
                        setor: setor,
                        posicao: coluna
                    });
                }
            }
        }
    }

    exibirResultados(resultados);
}

// Função para exibir resultados
// Função para exibir resultados
function exibirResultados(resultados) {
    var listaResultados = document.getElementById('resultados');
    listaResultados.innerHTML = '';

    if (resultados.length === 0) {
        var itemLista = document.createElement('li');
        itemLista.textContent = 'Nenhum resultado encontrado.';
        listaResultados.appendChild(itemLista);
    } else {
        resultados.forEach(function (resultado) {
            var itemLista = document.createElement('li');
            var termoDestacado = destacarTermo(resultado.termo);
            itemLista.innerHTML = `<strong>Setor:</strong> ${resultado.setor}, <strong>Posição:</strong> ${resultado.posicao}, <strong>Termo:</strong> ${termoDestacado}`;
            listaResultados.appendChild(itemLista);
        });
    }
}

// Função para destacar o termo pesquisado
function destacarTermo(termo) {
    var termoPesquisa = document.getElementById('termo_pesquisa').value.toLowerCase();
    var indice = termo.toLowerCase().indexOf(termoPesquisa);

    if (indice !== -1) {
        var parte1 = termo.substring(0, indice);
        var parte2 = termo.substring(indice, indice + termoPesquisa.length);
        var parte3 = termo.substring(indice + termoPesquisa.length);
        return `${parte1}<strong>${parte2}</strong>${parte3}`;
    } else {
        return termo;
    }
}

// Função para pesquisar quando pressionar "Enter"
function verificarTecla(event) {
    if (event.key === 'Enter') {
        pesquisar();
    }
}

// Adicionar ouvinte de evento ao campo de entrada
document.getElementById('termo_pesquisa').addEventListener('keyup', verificarTecla);

// Carregar dados ao iniciar a página
carregarDados();
