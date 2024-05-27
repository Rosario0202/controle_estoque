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
                <td id="actions"><img src="../assets/trash.svg" id="btnExcluir" onclick="excluir(${idProduto})"/><img src="../assets/edit.svg" id="btnEdit" onclick="alterar(${idProduto})"/></td>
            </tr>
        `

        let tr = document.createElement('tr');
        tr.innerHTML = linha;

        tabela.appendChild(tr);
    }
}

function alterar(id) {
    Swal.fire({
        title: "Alterar Produto",
        icon: "info",
        html: `
        <form id="formCadastro" autocomplete="off">
            <div class="mb-3 text-start">
                <label for="nomeProduto" class="form-label fw-bold">Nome do Produto</label>
                <input type="text" class="form-control" id="nomeProduto" placeholder="Nome do Produto" required minlength="2">
            </div>
            <div class="mb-3 text-start">
                <label for="dataValidade" class="form-label fw-bold">Validade</label>
                <input type="date" class="form-control w-50" id="dataValidade" required>
            </div>
            <div class="mb-3 text-start">
                <label for="quantidade" class="form-label fw-bold">Quantidade</label>
                <input type="number" class="form-control w-50" id="quantidade" placeholder="Ex: 25" required>
            </div>
            <div class="mb-3 text-start">
                <label for="lote" class="form-label fw-bold">Lote</label>
                <input type="number" class="form-control w-50" id="lote" placeholder="Ex: 123" required>
            </div>
            <div class="mb-3 text-start">
                <label for="tipoProduto" class="form-label fw-bold">Tipo de Produto</label>
                <select class="form-select" aria-label="Default select example" id="tipoProduto" required >
                    <option value="" data-default disabled selected></option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Vestimenta">Vestimenta</option>
                    <option value="Alimento">Alimento</option>
                    <option value="Utilidade">Utilidade</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
        </form>
            `,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Alterar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        let nomeProdutoV = document.getElementById('nomeProduto').value;
        let dataValidadeV = document.getElementById('dataValidade').value;
        let quantidadeV = document.getElementById('quantidade').value;
        let loteV = document.getElementById('lote').value;
        let tipoProdutoV = document.getElementById('tipoProduto').value;

        const novoProduto = {
            nomeProduto: nomeProdutoV,
            dataValidade: dataValidadeV,
            quantidade: quantidadeV,
            lote: loteV,
            tipoProduto: tipoProdutoV
        }

        if(result.isConfirmed) {
            fetch(`http://localhost:63025/api/Produto/${id}`, {
                method: "PUT",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoProduto)
            }).then(data => {
                Swal.fire(
                    "Sucesso!",
                    "Produto alterado com sucesso!",
                    "success"
                ).then(() => {
                    listar();
                })
            })
        }
    })
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