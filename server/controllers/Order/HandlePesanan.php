<?php
include '../../conf/koneksi.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
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
        header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

// Handle GET request to retrieve order details
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!isset($_GET['id'])) {
        echo json_encode(['status' => 'error', 'message' => 'ID parameter is missing']);
        exit;
    }

    $idPesanan = $_GET['id'];

    $query = "SELECT dp.idDetailPesanan, dp.idMenu, dp.quantity, m.namaMenu
              FROM detailPesanan dp
              JOIN menu m ON dp.idMenu = m.idMenu
              WHERE dp.idPesanan = ?";
    $stmt = mysqli_prepare($koneksi, $query);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $idPesanan);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        
        $details = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $details[] = $row;
        }
        mysqli_stmt_close($stmt);

        if (count($details) > 0) {
            echo json_encode(['status' => 'success', 'data' => $details]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Detail pesanan not found']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement: ' . mysqli_error($koneksi)]);
    }
    exit;
}

// Handle POST request to insert order data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $orderData = json_decode(file_get_contents('php://input'), true);

    if ($orderData === null || !isset($orderData['idCustomer']) || !isset($orderData['waktuPesanan']) || !isset($orderData['orderDetails']) || !isset($orderData['totalPrice'])) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request data']);
        exit;
    }

    $idCustomer = $orderData['idCustomer'];
    $waktuPesanan = date('Y-m-d H:i:s', strtotime($orderData['waktuPesanan']));
    $totalPrice = $orderData['totalPrice'];
    $orderDetails = $orderData['orderDetails'];

    try {
        $pdo = new PDO("mysql:host=localhost;dbname=kampung_rasa_db", 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $pdo->beginTransaction();

        $stmt = $pdo->prepare("INSERT INTO pesanan (idCustomer, waktuPesanan, totalPrice) VALUES (?, ?, ?)");
        $stmt->execute([$idCustomer, $waktuPesanan, $totalPrice]);
        $idPesanan = $pdo->lastInsertId();

        $stmt = $pdo->prepare("INSERT INTO detailPesanan (idPesanan, idMenu, quantity) VALUES (?, ?, ?)");
        foreach ($orderDetails as $detail) {
            $stmt->execute([$idPesanan, $detail['idMenu'], $detail['quantity']]);
        }

        $pdo->commit();

        echo json_encode(['status' => 'success', 'idOrder' => $idPesanan]);
    } catch (Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        logError($e->getMessage());
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

    $pdo = null;
    exit;
}

// Handle DELETE request to delete an order
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Check for id parameter in query string or body
    $idPesanan = isset($_GET['id']) ? $_GET['id'] : null;
    if (!$idPesanan) {
        parse_str(file_get_contents("php://input"), $_DELETE);
        $idPesanan = $_DELETE['id'] ?? null;
    }

    if (!$idPesanan) {
        echo json_encode(['status' => 'error', 'message' => 'ID parameter is missing']);
        exit;
    }

    logError("Received idPesanan: " . $idPesanan);

    try {
        $pdo = new PDO("mysql:host=localhost;dbname=kampung_rasa_db", 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("DELETE FROM detailPesanan WHERE idPesanan = ?");
        $stmt->execute([$idPesanan]);

        if ($stmt->rowCount() === 0) {
            echo json_encode(['status' => 'error', 'message' => 'Detail pesanan not found']);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM pesanan WHERE idPesanan = ?");
        $stmt->execute([$idPesanan]);

        if ($stmt->rowCount() === 0) {
            echo json_encode(['status' => 'error', 'message' => 'Order not found']);
            exit;
        }

        echo json_encode(['status' => 'success', 'message' => 'Order deleted successfully']);
    } catch (Exception $e) {
        logError($e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete order']);
    }

    $pdo = null;
    exit;
}
?>