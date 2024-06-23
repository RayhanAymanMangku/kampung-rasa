<?php
include '../../conf/koneksi.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Connect to the database
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'kampung_rasa_db';

$conn = new mysqli($host, $user, $password, $dbname);

// Check if the connection is successful
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => "Connection failed: ". $conn->connect_error]);
    exit;
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if data is received
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'No data received']);
        exit;
    }

    // Prepare SQL statement to insert data
    $stmt = $conn->prepare("INSERT INTO pengeluaran (namaPengeluaran, jumlahPengeluaran, tanggalPengeluaran, keterangan) VALUES (?,?,?,?)");
    
    // Set variables
    $namaPengeluaran = $data['namaPengeluaran'];
    $jumlahPengeluaran = $data['jumlahPengeluaran'];
    $tanggalPengeluaran = $data['tanggalPengeluaran'];
    $keterangan = $data['keterangan'];

    if (!$namaPengeluaran || !$jumlahPengeluaran || !$tanggalPengeluaran || !$keterangan) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
        exit;
    }

    // Bind parameters
    $stmt->bind_param("sdss", $namaPengeluaran, $jumlahPengeluaran, $tanggalPengeluaran, $keterangan);

    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(['error' => 'Error executing the query: '. $stmt->error]);
        exit;
    }

    $stmt->close();
    echo json_encode(['message' => 'Data pengeluaran berhasil disimpan']);
    exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT SUM(jumlahPengeluaran) as totalPengeluaran FROM pengeluaran");
    $totalPengeluaran = 0;
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $totalPengeluaran = $row['totalPengeluaran'];
    }

    $result = $conn->query("SELECT idPengeluaran, namaPengeluaran, jumlahPengeluaran, tanggalPengeluaran, keterangan FROM pengeluaran");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode([
        'totalPengeluaran' => $totalPengeluaran,
        'data' => $data
    ]);
    exit;
}

// Handle DELETE request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'No data received']);
        exit;
    }

    $id = $data['idPengeluaran'];

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM pengeluaran WHERE idPengeluaran = ?");
    $stmt->bind_param("i", $id);

    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(['error' => 'Error executing the query: '. $stmt->error]);
        exit;
    }

    $stmt->close();
    echo json_encode(['message' => 'Data pengeluaran berhasil dihapus']);
    exit;
}

// Handle invalid request method
http_response_code(405);
echo json_encode(['error' => 'Invalid request method']);
?>