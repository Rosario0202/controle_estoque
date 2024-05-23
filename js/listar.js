function listar() {
    fetch("http://localhost:63025/api/Produto", {
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
    $(document).ready(function() {
        $('#myTable').DataTable()
    })

    let tabela = document.querySelector('#myTable tbody');
    while(tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }

    for(let produto of produtos) {
        let idProduto = produto.id;
        let linha = `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nomeProduto}</td>
                <td>${formatDate(produto.dataValidade)}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.lote}</td>
                <td>${produto.tipoProduto}</td>
                <td id="actions"><img src="../assets/trash.svg" id="btnExcluir" onclick="excluir(${idProduto})"/></td>
            </tr>
        `

        let tr = document.createElement('tr');
        tr.innerHTML = linha;

        tabela.appendChild(tr);
    }
}

function excluir(idProduto) {
    Swal.fire({
        title: "Excluir produto?",
        text: "Essa ação não poderá ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Excluir",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if(result.isConfirmed) {
            fetch(`http://localhost:63025/api/Produto/${idProduto}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((result) => {
                Swal.fire(
                    "Sucesso!",
                    "Produto excluído com sucesso!",
                    "success"
                ).then(() => {
                    listar();
                })
            })
            .catch((error) => {
                console.log(error)
                Swal.fire(
                    "Erro",
                    "Erro ao Listar os Dados!",
                    "error"
                )
            })
        }
    })
}

function formatDate(date) {
    let splitDate = date.split('-')
    let ano = splitDate[0]
    let mes = splitDate[1]
    let dia = splitDate[2]

    let diaSplit = dia.split('T')
    let diaFormat = diaSplit[0]

    return `${diaFormat}/${mes}/${ano}`
}