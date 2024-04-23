function listar() {
    fetch("https://localhost:44385/api/Produto", {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        }
        }).then((response) => response.json())
        .then((result) => {
            renderizar(result);
        })
        .catch((error) => {
            Swal.fire(
                "Erro",
                "Erro ao Listar os Dados!",
                "error"
            );
        })
    }

function renderizar(produtos) {
    let tabela = document.querySelector('#myTable tbody');

    for(let produto of produtos) {
        let linha = `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nomeProduto}</td>
                <td>${produto.dataValidade}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.lote}</td>
                <td>${produto.tipoProduto}</td>
                <td><a href="#">Excluir</a> <a href="#">Alterar</a></td>
            </tr>
        `

        let tr = document.createElement('tr');
        tr.innerHTML = linha;

        tabela.appendChild(tr);
    }
}