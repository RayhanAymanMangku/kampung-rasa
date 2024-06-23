<?php
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'kampung_rasa_db';

// Buat koneksi
$koneksi = mysqli_connect($host, $user, $password, $database);

// Periksa koneksi
if (!$koneksi) {
    $response = array("error" => "Koneksi gagal: " . mysqli_connect_error());
    echo json_encode($response);
} else {
    // $response = array("message" => "Koneksi berhasil!");
    // echo json_encode($response);
    return $koneksi;
}
?>