<?php
include '../../conf/koneksi.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type, Authorization');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

// Handle GET request to retrieve dine-in orders
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = "SELECT orders.idOrder, customer.namaCustomer, customer.kontakCustomer, tables.idTable
              FROM orders
              INNER JOIN customer ON orders.idCustomer = customer.idCustomer
              INNER JOIN tables ON orders.idTable = tables.idTable";
    $result = mysqli_query($koneksi, $query);

    if ($result) {
        $orders = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $idOrder = $row['idOrder'];

            // Fetch order details
            $queryDetails = "SELECT menu.namaMenu, detailPesanan.quantity
                             FROM detailPesanan
                             JOIN menu ON detailPesanan.idMenu = menu.idMenu
                             WHERE detailPesanan.idPesanan = ?";
            $stmtDetails = mysqli_prepare($koneksi, $queryDetails);
            if ($stmtDetails) {
                mysqli_stmt_bind_param($stmtDetails, "i", $idOrder);
                mysqli_stmt_execute($stmtDetails);
                $resultDetails = mysqli_stmt_get_result($stmtDetails);

                $details = array();
                while ($detailRow = mysqli_fetch_assoc($resultDetails)) {
                    $details[] = $detailRow;
                }
                mysqli_stmt_close($stmtDetails);

                // Append order details to the order
                $row['details'] = $details;
            } else {
                error_log("Failed to prepare statement for order details: " . mysqli_error($koneksi));
            }

            // Add the order to the orders array
            $orders[] = $row;
        }
        echo json_encode($orders);
    } else {
        $error_message = mysqli_error($koneksi);
        error_log("MySQL error: " . $error_message);
        http_response_code(500);
        echo json_encode(array("error" => "Gagal mengambil data dine-in orders. Error: " . $error_message));
    }
}

// Handle POST request to add a new dine-in order
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['idCustomer']) && isset($data['selectedTable'])) {
        $idCustomer = mysqli_real_escape_string($koneksi, $data['idCustomer']);
        $idTable = mysqli_real_escape_string($koneksi, $data['selectedTable']);

        // Insert new order into orders table
        $query = "INSERT INTO orders (idCustomer, idTable) VALUES (?, ?)";
        $stmt = mysqli_prepare($koneksi, $query);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "ii", $idCustomer, $idTable);
            mysqli_stmt_execute($stmt);
            $idOrder = mysqli_insert_id($koneksi);
            mysqli_stmt_close($stmt);

            echo json_encode(array("status" => "success", "idOrder" => $idOrder));
        } else {
            $error_message = mysqli_error($koneksi);
            error_log("MySQL error: " . $error_message);
            http_response_code(500);
            echo json_encode(array("error" => "Gagal menambahkan pesanan. Error: " . $error_message));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Data pesanan tidak lengkap."));
    }
}
?>