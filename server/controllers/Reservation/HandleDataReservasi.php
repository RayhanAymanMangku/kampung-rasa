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
    $stmt = $conn->prepare("INSERT INTO reservasi (jenisReservasi, namaCustomer, jumlahOrang, tempat, tanggalReservasi) VALUES (?,?,?,?,?)");
    
    // Set variables
    $jenisReservasi = $data['jenisReservasi'];
    $namaCustomer = $data['namaCustomer'];
    $jumlahOrang = $data['jumlahOrang'];
    $tempat = $data['tempat'];
    $tanggal = $data['tanggalReservasi'];

    if (!$jenisReservasi || !$namaCustomer || !$jumlahOrang || !$tempat || !$tanggal) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
        exit;
    }

    // Bind parameters
    $stmt->bind_param("ssiss", $jenisReservasi, $namaCustomer, $jumlahOrang, $tempat, $tanggal);

    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(['error' => 'Error executing the query: '. $stmt->error]);
        exit;
    }

    $stmt->close();
    echo json_encode(['message' => 'Data reservasi berhasil disimpan']);
    exit;
}


// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM reservasi");

    if ($result->num_rows > 0) {
        $reservasi = [];
        while ($row = $result->fetch_assoc()) {
            $reservasi[] = $row;
        }
        echo json_encode($reservasi);
    } else {
        echo json_encode([]);
    }
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

    $id = $data['idReservasi'];

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM reservasi WHERE idReservasi = ?");
    $stmt->bind_param("i", $id);

    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(['error' => 'Error executing the query: '. $stmt->error]);
        exit;
    }

    $stmt->close();
    echo json_encode(['message' => 'Data reservasi berhasil dihapus']);
    exit;
}

// Handle invalid request method
http_response_code(405);
echo json_encode(['error' => 'Invalid request method']);
?>