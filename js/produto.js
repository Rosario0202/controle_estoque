export function cadastrar(nomeProduto, dataValidade, quantidade, lote, tipoProduto) {
    const data = {
        "nomeProduto": nomeProduto,
        "dataValidade": dataValidade,
        "quantidade": quantidade,
        "lote": lote,
        "tipoProduto": tipoProduto
    }

    fetch("https://localhost:44385/api/Produto", {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
    .catch((error) => {
        Swal.fire({
            icon: "error",
            title: "Preencha os Campos Corretamente!",
            text: "Preencha os Campos Corretamente!"
        })
    })
}