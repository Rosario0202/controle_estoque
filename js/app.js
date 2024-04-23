import { cadastrar } from './produto.js';

let nomeProduto = document.getElementById('nomeProduto');
let dataValidade = document.getElementById('dataValidade');
let quantidade = document.getElementById('quantidade');
let lote = document.getElementById('lote');
let tipoProduto = document.getElementById('tipoProduto');

const formCadastro = document.getElementById('formCadastro');

formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    let nomeProdutoV = nomeProduto.value;
    let dataValidadeV = dataValidade.value;
    let quantidadeV = quantidade.value;
    let loteV = lote.value;
    let tipoProdutoV = tipoProduto.value;

    let erros = [];
    let dataAtual = new Date();
    let splitDataValidade = dataValidadeV.split('-');
    let anoProduto = splitDataValidade[0];

    if (nomeProdutoV.length < 2) {
        erros.push("Insira um nome válido para o produto");
    }
    if (dataAtual.getFullYear() > anoProduto) {
        erros.push("O produto está vencido ou insira uma data válida");
    }
    if (quantidadeV<= 0) {
        erros.push("O produto deve conter pelo menos 1 unidade");
    }
    if (loteV <= 0) {
        erros.push("Insira um lote válido");
    }
    if (tipoProdutoV === "") {
        erros.push("Insira um tipo de produto");
    }

    if (erros.length == 0) {
        Swal.fire({
            icon: "success",
            title: "Produto Cadastrado com Sucesso!",
            text: "Produto Cadastrado com Sucesso!"
        }).then(() => {
            cadastrar(nomeProdutoV, dataValidadeV, quantidadeV, loteV, tipoProdutoV);
        })
    } else {
        Swal.fire({
            icon: "error",
            title: "Preencha os Campos Corretamente!",
            text: erros.join(" // ")
        });
    }
})