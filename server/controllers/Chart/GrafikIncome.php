<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header('Access-Control-Allow-Headers: Content-Type, Authorization');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connect to the database
$host = 'localhost';
$user = 'root';  // Sesuaikan dengan user database Anda
$password = '';  // Sesuaikan dengan password user database Anda
$dbname = 'kampung_rasa_db';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Fetch income data for the year 2024
$year = 2024;
$sql = "SELECT MONTH(waktuPesanan) as month, SUM(totalPrice) as totalIncome 
        FROM pesanan 
        WHERE YEAR(waktuPesanan) = ? 
        GROUP BY MONTH(waktuPesanan)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die(json_encode(['error' => 'Prepare failed: ' . $conn->error]));
}

$stmt->bind_param("i", $year);
$stmt->execute();

if ($stmt->error) {
    die(json_encode(['error' => 'Execute failed: ' . $stmt->error]));
}

$result = $stmt->get_result();
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($data);
?>