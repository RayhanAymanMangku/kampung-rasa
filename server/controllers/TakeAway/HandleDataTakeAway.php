<?php
include '../../conf/koneksi.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Enable detailed error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set custom error log file
ini_set('error_log', '/Applications/XAMPP/xamppfiles/logs/php_errors.log');

// Function to log error messages
function logError($message) {
    error_log($message, 3, '/Applications/XAMPP/xamppfiles/logs/php_errors.log');
}

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

// Handle GET request to retrieve takeaway orders
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = "SELECT takeaway_orders.idOrder, customer.namaCustomer, customer.kontakCustomer
              FROM takeaway_orders
              JOIN customer ON takeaway_orders.idCustomer = customer.idCustomer";
    $result = mysqli_query($koneksi, $query);

    if ($result) {
        $orders = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $idOrder = $row['idOrder'];

            // Fetch order details
            $queryDetails = "SELECT menu.idMenu, menu.namaMenu, detailPesanan.quantity
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
        echo json_encode(array("error" => "Gagal mengambil data take-away orders. Error: " . $error_message));
    }
}

// Handle POST request to add a new customer and order
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['action']) && $data['action'] === 'add_customer') {
        $namaCustomer = mysqli_real_escape_string($koneksi, $data['namaCustomer']);
        $kontakCustomer = mysqli_real_escape_string($koneksi, $data['kontakCustomer']);

        // Add new customer
        $query = "INSERT INTO customer (namaCustomer, kontakCustomer) VALUES (?, ?)";
        $stmt = mysqli_prepare($koneksi, $query);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "ss", $namaCustomer, $kontakCustomer);
            mysqli_stmt_execute($stmt);

            $idCustomer = mysqli_insert_id($koneksi);
            mysqli_stmt_close($stmt);

            // Add new takeaway order
            $queryTakeawayOrder = "INSERT INTO takeaway_orders (idCustomer) VALUES (?)";
            $stmtTakeawayOrder = mysqli_prepare($koneksi, $queryTakeawayOrder);

            if ($stmtTakeawayOrder) {
                mysqli_stmt_bind_param($stmtTakeawayOrder, "i", $idCustomer);
                mysqli_stmt_execute($stmtTakeawayOrder);
                $idOrder = mysqli_insert_id($koneksi);
                mysqli_stmt_close($stmtTakeawayOrder);

                echo json_encode(array("status" => "success", "idCustomer" => $idCustomer, "idOrder" => $idOrder));
            } else {
                $error_message = mysqli_error($koneksi);
                error_log("MySQL error: " . $error_message);
                http_response_code(500);
                echo json_encode(array("error" => "Gagal menambahkan pesanan baru. Error: " . $error_message));
            }
        } else {
            $error_message = mysqli_error($koneksi);
            error_log("MySQL error: " . $error_message);
            http_response_code(500);
            echo json_encode(array("error" => "Gagal menambahkan pelanggan baru. Error: " . $error_message));
        }
    } else {
        echo json_encode(array("error" => "Invalid action specified."));
    }
}
?>