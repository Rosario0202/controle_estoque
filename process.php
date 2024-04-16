<?php
// Conexão com o banco de dados (exemplo simples)
$servername = "Estoque";
$username = "root";
$password = "";
$dbname = "insumos";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Adicionar ou Atualizar Insumo
if (isset($_POST['save'])) {
    $nome = $_POST['nome'];
    $lote = $_POST['lote'];
    $validade = $_POST['validade'];
    $quantidade = $_POST['quantidade'];

    // Inserir novo usuário
    $sql = "INSERT INTO produtos (nome, lote , validade , quantidade) VALUES ('$nome', '$lote' , '$validade', '$quantidade)";
    
    if ($conn->query($sql) === TRUE) {
        echo "Insumo adicionado com sucesso!";
    } else {
        echo "Erro ao adicionar Insumo: " . $conn->error;
    }
}

// Excluir Insumo
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];

    // Deletar usuário
    $sql = "DELETE FROM produtos WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Insumo excluído com sucesso!";
    } else {
        echo "Erro ao excluir Insumo: " . $conn->error;
    }
}

// Recuperar todos os Insumos
$sql = "SELECT * FROM produtos";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . $row['NomeProduto'] . "</td>
                <td>" . $row['LoteProduto'] . "</td>
                <td>" . $row['ValidadeProduto'] . "</td>
                <td>" . $row['QuantidadeProduto'] . "</td>
                <td>
                    <a href='edit.php?id=" . $row['idprodutos'] . "' class='btn btn-sm btn-warning'>Editar</a>
                    <a href='process.php?delete=" . $row['idprodutos'] . "' class='btn btn-sm btn-danger'>Excluir</a>
                </td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='3'>Nenhum Insumo encontrado.</td></tr>";
}

$conn->close();
?>