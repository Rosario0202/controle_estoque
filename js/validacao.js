$(document).ready(function() {
    $("#formCadastro").validate({
        rules: {
            nomeProduto: {
                required: true,
                minlength: 2
            },
            dataValidade: {
                required: true
            },
            quantidade: {
                required: true
            },
            lote: {
                required: true
            },
            tipoProduto: {
                required: true
            }
        }
    })
})

$.extend($.validator.messages, {
    required: "Este campo é obrigatório",
    minlength: "Este campo deve conter no mínimo {0} caracteres"
})