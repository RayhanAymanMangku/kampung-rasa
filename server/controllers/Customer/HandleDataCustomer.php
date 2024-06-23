<?php
include '../../conf/koneksi.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Session Start
session_start();

// Pengecekan Metode Options
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

// Pengecekan Metode POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Parsing data JSON
    $data = json_decode(file_get_contents("php://input"));

    // Pengecekan Data Customer
    if (empty($data->namaCustomer) || empty($data->kontakCustomer)) {
        http_response_code(400);
        echo json_encode(array("error" => "Data customer tidak lengkap."));
        exit();
    }

    // Escape input untuk menghindari SQL Injection
    $namaCustomer = mysqli_real_escape_string($koneksi, $data->namaCustomer);
    $kontakCustomer = mysqli_real_escape_string($koneksi, $data->kontakCustomer);

    // Query SQL untuk insert customer
    $queryInsertCustomer = "INSERT INTO customer (namaCustomer, kontakCustomer) VALUES (?, ?)";
    $stmt = mysqli_prepare($koneksi, $queryInsertCustomer);

    if ($stmt) {
        // Binding parameter
        mysqli_stmt_bind_param($stmt, "ss", $namaCustomer, $kontakCustomer);

        // Eksekusi statement
        if (mysqli_stmt_execute($stmt)) {
            // Mendapatkan ID Customer baru
            $idCustomer = mysqli_insert_id($koneksi);

            if ($idCustomer) {
                // Simpan data customer ke dalam session
                $_SESSION['idCustomer'] = $idCustomer;
                $_SESSION['namaCustomer'] = $namaCustomer;
                $_SESSION['kontakCustomer'] = $kontakCustomer;

                // Mengembalikan response dengan data customer baru
                echo json_encode(array(
                    "idCustomer" => $idCustomer,
                    "namaCustomer" => $namaCustomer,
                    "kontakCustomer" => $kontakCustomer
                ));
            } else {
                http_response_code(500);
                echo json_encode(array("error" => "Gagal menyimpan data customer."));
            }
        } else {
            http_response_code(500);
            echo json_encode(array("error" => "Gagal menyimpan data customer."));
        }

        // Menutup statement
        mysqli_stmt_close($stmt);
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Gagal menyimpan data customer."));
    }
}

// Pengecekan Metode GET
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Query SQL untuk mendapatkan data pesanan dan customer
    $sql = "SELECT * FROM pesanan INNER JOIN customer ON pesanan.idCustomer = customer.idCustomer";
    $result = mysqli_query($koneksi, $sql);

    // Pengecekan hasil query
    if ($result) {
        $orders = [];
        while ($row = mysqli_fetch_assoc($result)) {
            // Memformat data pesanan
            $order = [
                "IdPesanan" => $row['idPesanan'],
                "IdCustomer" => $row['idCustomer'],
                "NamaCustomer" => $row['namaCustomer'],
                // tambahkan data customer lainnya sesuai kebutuhan
            ];
            array_push($orders, $order);
        }
        // Mengembalikan data pesanan dalam format JSON
        echo json_encode($orders);
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Gagal mengambil data pesanan"));
    }
}
?>