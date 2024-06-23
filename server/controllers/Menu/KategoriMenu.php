<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$servername = "localhost";
$username = "root";
$password = "";
$database = "kampung_rasa_db";

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $database);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$query = 'SELECT idKategoriMenu, kategoriMenu FROM kategorimenu'; // Query SQL untuk mengambil data dari database
$result = $conn->query($query);

$data = array();

if ($result === false) {
    // Query execution failed
    echo json_encode(array('error' => 'Query execution failed: ' . $conn->error));
} else {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        // No rows found
        echo json_encode(array('message' => 'No rows found'));
    }
}

$conn->close();
?>