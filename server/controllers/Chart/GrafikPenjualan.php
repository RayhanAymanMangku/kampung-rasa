<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Connect to the database
$host = 'localhost';
$user = 'root';  // Sesuaikan dengan user database Anda
$password = '';  // Sesuaikan dengan password user database Anda
$dbname = 'kampung_rasa_db';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$year = isset($_GET['year']) ? $_GET['year'] : '';

if (empty($year)) {
    die("Year parameter is missing.");
}

if ($year == '2024') {
    // Fetch data based on the year
    $sql = "SELECT MONTH(waktuPesanan) as month, COUNT(*) as orders
            FROM pesanan
            WHERE YEAR(waktuPesanan) = ?
            GROUP BY MONTH(waktuPesanan)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die("Prepare statement failed: " . $conn->error);
    }
    $stmt->bind_param("s", $year);
    $stmt->execute();
    $result = $stmt->get_result();
    if (!$result) {
        die("Execute statement failed: " . $stmt->error);
    }

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);

    $stmt->close();
} else {
    // Return empty data for dummy years
    echo json_encode([]);
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn->close();
?>